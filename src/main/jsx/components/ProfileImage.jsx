import React from 'react';
import { useSelector } from 'react-redux';
import Jdenticon from 'react-jdenticon';
const ProfileImage =()=>{

    const account = useSelector(state => state.Account.get('account'));

    return(
        <>
            {
                account.thumbnail == null? 
                <Jdenticon value = {account.nickname} />
                :
                null
            }
        </>
    );
}

export default ProfileImage;