import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditLesson.css";
import { TextField } from "@mui/material";
import ItemCard from "../../card/item-card/ItemCard";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../../../firebase";
import { set, ref as fdbRef, getDatabase, get, child, remove } from "firebase/database";
const DetailLesson = () => {

    const [ receiverImg, setReceiveImg ] = useState(null);
    const [ listCard, setListCard ] = useState(null);
    const [ finalCardDetail, setFinalCardDetail ] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        loadCardDetail();
        loadImages();
        // eslint-disable-next-line
    },[])

    const fetchImages = async () => {
        let urlPromise = [];
        const listImg = ref(storage,`images/${location.state.item.name}/`);
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
        if(urls.length > 0)
            setReceiveImg(urls);
    }

    const fetchCardDetail = async () => {
        const dbRef = fdbRef(getDatabase());
        return get(child(dbRef, `cards/${location.state.item.name}/`));
    }
    
    const loadCardDetail = async () => {
        const cardDetail = await fetchCardDetail();
        if (cardDetail.val())
            setListCard(Object.values(cardDetail.val()));
        else setListCard(null)
    }

    useEffect(()=>{
        const mergeImagesWithDetail = (a1, a2) =>
            a1.map(itm => ({
                ...a2.find((item) => (item.id === itm.id) && item),
                ...itm
        }));
        if(listCard && listCard.length && receiverImg && receiverImg.length){
            var fullDetail = mergeImagesWithDetail(listCard, receiverImg);
            fullDetail = fullDetail.filter(x => typeof x != 'undefined');
            setFinalCardDetail(fullDetail);
        }
    },[listCard, receiverImg])

    const uploadImage = (file,id) => {
        const imageRef = ref(storage,`images/${location.state.item.name}/${id}`);
        uploadBytes(imageRef, file).then(() => {
            loadImages();
        })
    }

    const uploadCardDetail = (detail,id) => {
        set(fdbRef(db, `cards/${location.state.item.name}/${id}`), {
            description: detail,
            id: id
        }).then((resp)=>{
            loadCardDetail();
        }).catch((e)=>{
            console.log(e);
        })
    }

    const uploadCard = async (img, detail) => {
        const lastID = Math.max(...finalCardDetail.map(o => o.id));
        editCard(img, detail, lastID+1);
    }

    const hanldeAddCard = (isFirstCard) => {
        isFirstCard ? 
            setFinalCardDetail([...finalCardDetail,{
                id: -1,
                path: null,
                description: null,
            }]) 
            :
            setFinalCardDetail([{
                id: 1,
                path: null,
                description: null,
            }])
    }

    const cancelAddCard = () => {
        setFinalCardDetail(finalCardDetail.filter(x => x.id !== -1));
    }

    const deleteCard = (id) => {
        const detailInfo = remove(fdbRef(db, `cards/${location.state.item.name}/${id}`))
        const detailImg = deleteObject(ref(storage,`images/${location.state.item.name}/${id}`));
        Promise.all([detailImg, detailInfo]).then((resp)=>{
            loadImages();
            loadCardDetail();
        })
    }

    const editCard = (img, detail, id, isEdit = false) => {
        if(img && detail) {
            if(typeof img == "object") {
                uploadImage(img, id);
            }
            uploadCardDetail(detail, id);
        }
        else {
            alert("Invalid Card");
        }
    }

    const handleDeleteLesson = () => {
        remove(fdbRef(db,`lessons/${location.state.id+1}`))
            .then((resp)=>{
                if(finalCardDetail.length) {
                    remove(fdbRef(db, `cards/${location.state.item.name}`));
                    deleteFolder(`images/${location.state.item.name}`);
                }
            })
            .then(()=>{
                navigate(-1);
            })
            .catch((e)=>{
                console.log(e);
            })
    }

    const deleteFolder = (folderPath) => {
        const storageRef = ref(storage, folderPath);
        listAll(storageRef).then((result) => {
          result.items.forEach((itemRef) => {
            deleteObject(itemRef).then(() => {}).catch((error) => {
              console.error('Error deleting file:', itemRef.fullPath, error);
            });
          });
        })
    };
      


    return (
        <div className="slider-container" style={{maxWidth: "100%"}}>
            <div className="lesson-info-container">
                <div>
                    <TextField
                        label="Name"
                        defaultValue={location.state.item.name}
                    />
                    <TextField
                        label="Description"
                        defaultValue={location.state.item.description}
                    />
                </div>
                <div>
                    <button onClick={handleDeleteLesson}> Delete Lesson </button>
                </div>
            </div>
            <div className="grid-container">
                {
                    finalCardDetail && finalCardDetail.length > 0 ? 
                    (
                        finalCardDetail.map((detail)=>{
                            return (
                                <div className="grid-item" key={detail.id}>
                                    <ItemCard 
                                        description={detail.description} img={detail.path} id={detail.id}
                                        uploadCard={uploadCard} deleteCard={deleteCard} editCard={editCard} cancelAddCard={cancelAddCard}
                                    />
                                </div>
                            )
                        })
                    ) 
                    : null
                }
                { 
                    finalCardDetail && finalCardDetail.length ? (
                        finalCardDetail[finalCardDetail.length-1] && finalCardDetail[finalCardDetail.length-1].description ? 
                        (
                            <div style={{padding: "20px"}}>
                                <button onClick={hanldeAddCard}> + </button>
                            </div>
                        )
                        : 
                        null
                    ) : (
                        <div style={{padding: "20px"}}>
                            <button onClick={() => hanldeAddCard(true)}> + </button>
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}

export default DetailLesson;