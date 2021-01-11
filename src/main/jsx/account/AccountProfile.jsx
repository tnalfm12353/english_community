import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {getAccountProfile} from '../lib/api/account/AccountApi'
const AccountProfile = ({username}) =>{

    const [id,setId] = useState(null);
    const [resUsername ,setUsername] = useState(null);
    const [bio,setBio] =useState(null);
    useEffect(()=>{
        getAccountProfile(username).then(responsedata =>{
            console.log(responsedata);
            setId(responsedata.data.id);
            setUsername(responsedata.data.username);
            setBio(responsedata.data.bio);
            
        });
    },[])

    return(
        <>
        <div>{id}</div>
        <div>{resUsername}</div>
        <div>{bio != null? bio: null}</div>
        </>
    );
}

export default AccountProfile;