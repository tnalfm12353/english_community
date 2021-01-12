import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Jdenticon from 'react-jdenticon';
function ProfileImage ({thumbnail, nickname}){

    const account = useSelector(state => state.Account.get('account'));
    
    function returnImage(){
        if(thumbnail != null){
            console.log("thumbnail");
        }else if(nickname != null){
            console.log("nickname");
            return <Jdenticon value = {nickname}/>
        }else if(account.thumbnail != null){
            console.log("Accountthumbnail");
        }else{
            console.log("Accountnickname");
            return <Jdenticon value = {account.nickname}/>
        }
    }
    return(
        <>
            {returnImage()}
        </>
    );
}

export default ProfileImage;