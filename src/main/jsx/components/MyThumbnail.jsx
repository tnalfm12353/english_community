import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Jdenticon from 'react-jdenticon';
import {getThumbnail} from '../lib/api/account/AccountApi';
const MyThumbnail =()=>{
    const [image, setImage] = useState(null);
    const account = useSelector(state => state.Account.get('account'));
    
    function convertBlobToImage(blob){ 
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(blob);
    }

    function returnImage(){
        if(account.thumbnail != null){
            getThumbnail(account.thumbnail).then(result =>{
            const blob = new Blob([result],{type:"image/png"});
            convertBlobToImage(blob);
        })
            return <img style={{width:"100%",height:"100%",borderRadius:"100%"}} src={image}/>
        }else{
            return <Jdenticon value = {account.nickname}/>
        }
    }
    return(
        <>
            {returnImage()}
        </>
    );
}

export default MyThumbnail;