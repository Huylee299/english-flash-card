import { useState } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

const Home = () => {
    const [ imgUpload, setImg ] = useState(null);

    const [ imgTest, setImgTest ] = useState(null);
  
    const uploadImage = () => {
      const imageRef = ref(storage,`images/${imgUpload.name}`);
      uploadBytes(imageRef, imgUpload).then(() => {
        console.log("update success");
      })
    }
  
    const seeImg = () => {
      const listImg = ref(storage,'images/');
      listAll(listImg).then((resp)=>{
        getDownloadURL(resp.items[0]).then((url)=>{
          setImgTest(url);
        })
      })
    }

    return (
        <>
            this is home page
        </>
    )
}

export default Home;