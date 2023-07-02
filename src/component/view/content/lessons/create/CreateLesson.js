import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../../../firebase";
import { child, ref, set, get, getDatabase } from "firebase/database";
const CreateLessonComponent = () => {

    const [ name,setName ] = useState("");
    const [ des,setDes ] = useState("");
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("../lessons");
    }


    const handleCreateLesson = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'lessons/')).then((resp) => {
            if(resp.exists()){
                const newId =  (parseInt(Object.keys(resp.val()).pop()) + 1).toString();
                set(ref(db, 'lessons/' + newId), {
                    name: name,
                    description: des,
                });
            }
            else {
                set(ref(db, 'lessons/' + 1), {
                    name: name,
                    description: des,
                });
            }
        })
        .then(()=>{
            navigate("/lessons");
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    return (
        <div>
            <div>
                <div>
                    <label>Lesson name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Lesson name"/>
                </div>
                <div>
                    <label>Lesson description:</label>
                    <input type="text" onChange={(e)=>setDes(e.target.value)} placeholder="Lesson description"/>
                </div>
            </div>
            <div>
                <button onClick={handleCreateLesson}>Create</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default CreateLessonComponent;