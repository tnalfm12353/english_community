import React,{useState} from 'react';
import Jdenticon from 'react-jdenticon';
import {getThumbnail} from '../lib/api/account/AccountApi'
function ProfileImage ({thumbnail, nickname}){
    
    const [image, setImage] = useState(null);

    function convertBlobToImage(blob){ 
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(blob);
    }

    function returnImage(){
        if(thumbnail != null){
            getThumbnail(thumbnail).then(result =>{
                const blob = new Blob([result],{type:"image/png"});
                convertBlobToImage(blob);
            })
            return <img style={{width:"100%",
                                height:"100%",
                                border:"1px solid #ccc",
                                borderColor:"rgba(0,0,0,.2)",
                                borderRadius:"10px",
                                boxShadow:"0px 2px 12px rgb(0 0 0 / 20%)"}} src={image}/>
        }else if(nickname != null){
            return <Jdenticon value = {nickname}/>
        }
    }
    return(
        <>
            {returnImage()}
        </>
    );
}

export default ProfileImage;