import { useNavigate } from "react-router-dom"
import "./Lessons.css"
import { useEffect, useState } from "react";
import { child, ref, get, getDatabase } from "firebase/database";
import { UserAuth } from "../../../../context/AuthContext";

const Lessons = () => {
    const navigate = useNavigate();
    const [ lessons,setLessons ] = useState([]);
    const { currentUser } = UserAuth();

    const handleCreateLesson = () => {
        navigate("../create");
    }

    const handleGetData = () => {
        const dbRef = ref(getDatabase());
        return get(child(dbRef, 'lessons/'));
    }

    useEffect(()=>{
        handleGetData().then((resp) => {
            if (resp.exists()){
                setLessons(Object.values(resp.val()));
            }
            else {
                console.log("no data");
            }

        }).catch((err)=>{
            console.error(err);
        })
    },[]);

    const handleClickDetail = (item, id) => {
        const role = currentUser.email.split('@')[0];
        if(role === "admin"){
            navigate("./edit/" + item.name,{
                state:{ item: item, id: id }
            })
        }
        else {
            navigate("./learning/" + item.name,{
                state: { item: item }
            })
        }
    }


    return (
        <div>
            
            { currentUser.email.split('@')[0] === "admin" ? <div>
                <button onClick={handleCreateLesson}>Create</button>
            </div> : <></>}
            <div style={{display: "flex", justifyContent:"center"}}>
                <div className="container">
                    {/* { lessons.length > 0 ? <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            { lessons.map((item,idx)=>{
                                return (
                                <tr className="lesson-item" key={idx} onClick={() => handleClickDetail(item)}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                    : <div> nothing </div>
                    }    */}
                    { lessons.length > 0 ? <ul className="reponsive-table">
                        <li className="table-header">
                            <div className="col col-1">Name</div>
                            <div className="col col-2">Description</div>
                        </li>
                        <>
                            { lessons.map((item,idx)=>{
                                return (
                                <li className="table-row" key={idx} onClick={() => handleClickDetail(item,idx)}>
                                    <div className="col col-1">{item.name}</div>
                                    <div className="col col-2">{item.description}</div>
                                </li>
                            )})}
                        </>
                    </ul>
                    : <div> nothing </div>
                    }   
                </div>
            </div>
        </div>
    )
}

export default Lessons;