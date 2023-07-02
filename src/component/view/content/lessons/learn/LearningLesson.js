import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ref as fdbRef, getDatabase, get, child, set} from "firebase/database";
import { db,storage } from "../../../../../firebase";
import FlipCard from "../../card/flip-card/FlipCard";
import { Button } from "@mui/material";
import { UserAuth } from "../../../../../context/AuthContext";

const LearningLesson = () => {
    const { name } = useParams();
    const { currentUser } = UserAuth();
    const [ cardsDescription, setCardsDescription ] = useState(null);
    const [ cardsImage, setCardsImage ] = useState(null); 
    const [ cardsFinalInfo, setCardsFinalInfo ] = useState(null);
    const [ currentCardIndex,setCurrentCardIndex ] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();

    const fetchImages = async () => {
        let urlPromise = [];
        const listImg = ref(storage,`images/${name}/`);
        let result = await listAll(listImg);
        if(result)
            urlPromise = result.items.map(async (imageRef) =>{
                const path = await getDownloadURL(imageRef)
                return ({
                    id: parseInt(imageRef.name),
                    path: path
                })
            })
        return Promise.all(urlPromise);
    }
        
    const loadImages = async () => {
        const urls = await fetchImages();
        setCardsImage(urls)
    }

    const fetchCardDetail = async () => {
        const dbRef = fdbRef(getDatabase());
        return get(child(dbRef, `cards/${name}/`));
    }
    
    const loadCardDetail = async () => {
        const cardDetail = await fetchCardDetail();
        console.log(cardDetail.val())
        setCardsDescription(Object.values(cardDetail.val()));
    }

    useEffect(()=>{
        loadCardDetail();
        loadImages();
        // eslint-disable-next-line
    },[]);

    useEffect(()=>{
        const mergeImagesWithDetail = (a1, a2) =>
            a1.map(itm => ({
                ...a2.find((item) => (item.id === itm.id) && item),
                ...itm
        }));
        if(cardsDescription && cardsDescription.length && cardsImage && cardsImage.length){
            var fullDetail = mergeImagesWithDetail(cardsDescription, cardsImage);
            fullDetail = fullDetail.filter(x => typeof x != 'undefined');
            setCardsFinalInfo(fullDetail);
        };
    },[cardsDescription, cardsImage])

    
    const handleChangeLesson = (isAfter) => {
        if(!isAfter) {
            console.log(currentCardIndex - 1);
            setCurrentCardIndex(cur => cur >= 1 ? cur - 1 : 0 )
        }
        else {
            console.log(currentCardIndex + 1);
            setCurrentCardIndex(cur => cur <= cardsFinalInfo.length - 2 ? cur + 1 : cardsFinalInfo.length - 2 )
        }
        console.log(cardsFinalInfo.length);
    }

    const handleNotDoneLesson = () => {
        cardsFinalInfo[currentCardIndex].user = cardsFinalInfo[currentCardIndex].user.replace(currentUser.uid, "");
        if(cardsFinalInfo[currentCardIndex].user.length === 0) {
            delete cardsFinalInfo[currentCardIndex].user;
        }
        updateLesson(cardsFinalInfo[currentCardIndex]);
    }

    const updateLesson = (lesson) => {
        set(fdbRef(db, `cards/${location.state.item.name}/${cardsFinalInfo[currentCardIndex].id}`), lesson)
        .then((resp)=>{
            const updateItems = [...cardsFinalInfo];
            setCardsFinalInfo(updateItems);
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    const handleDoneLesson = () => {
        if(typeof cardsFinalInfo[currentCardIndex].user == "undefined") {
            cardsFinalInfo[currentCardIndex].user = currentUser.uid
        }
        else if(!cardsFinalInfo[currentCardIndex].user.includes(currentUser.uid)) {
            cardsFinalInfo[currentCardIndex].user = cardsFinalInfo[currentCardIndex].user.concat(currentUser.uid);
        }
        if(checkIfDoneAllLesson()){
            alert("done lesson");
            navigate(-1);
        }
        updateLesson(cardsFinalInfo[currentCardIndex]);
    }

    const checkIfDoneAllLesson = () => {
        if(!cardsFinalInfo || typeof cardsFinalInfo == "undefined") return false;
        const filterValue = cardsFinalInfo.filter((x) => typeof x.user != "undefined" && x.user.includes(currentUser.uid));
        console.log("checking");
        if(filterValue.length === cardsFinalInfo.length){
            return true;
        }
    }

    return (
        <div style={{height: "100%", width:"100%",display: "flex", alignItems: "center", justifyContent: "center"}}>
            {
                cardsFinalInfo && cardsFinalInfo.length ? (
                    <>
                        <div>
                            <Button disabled={cardsFinalInfo && currentCardIndex === 0} onClick={() => handleChangeLesson(false)} style={{position: "absolute", left: "25%", top: "50%"}} variant="contained"> After </Button>
                            { cardsFinalInfo && cardsFinalInfo.length > 0 ? (
                                <FlipCard frontImg={cardsFinalInfo[currentCardIndex].path} backDescription={cardsFinalInfo[currentCardIndex].description}></FlipCard>
                            ) : null
                            }
                            <Button disabled={cardsFinalInfo && currentCardIndex === cardsFinalInfo.length-1} onClick={() => handleChangeLesson(true)} style={{position: "absolute", right: "25%", top: "50%"}} variant="contained"> Next </Button>
                        </div>
                        <div>
                            {
                                cardsFinalInfo && typeof cardsFinalInfo[currentCardIndex].user != "undefined" && cardsFinalInfo[currentCardIndex].user.includes(currentUser.uid) ? 
                                <i style={{position: "absolute", left:"750px",top: "650px"}} className="fa-solid fa-check fa-3x"></i>
                                :
                            <Button  style={{position: "absolute", left:"730px" ,top: "650px"}} variant="contained" onClick={handleDoneLesson}> Done </Button>
                            }
                        </div>
                    </>
                ) : (
                    <>
                        No card 
                    </>
                )
            }
            
            
        </div>
    )
}

export default LearningLesson;