import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileImage from '../components/ProfileImage.jsx';
import {getAccountProfile} from '../lib/api/account/AccountApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faBullhorn , faQuestion , faBook } from '@fortawesome/free-solid-svg-icons';
import { faUser  } from '@fortawesome/free-regular-svg-icons';
const AccountProfile = ({id}) =>{

    const [uId,setUId] = useState(null);
    const [thumbnail,setThumbnail] = useState(null);
    const [nickname ,setNickname] = useState(null);
    const [major , setMajor] = useState(null);
    const [position,setPosition] = useState(null);
    const [bio,setBio] =useState(null);

    const [owner,setOwner] = useState(false);

    useEffect(()=>{
        getAccountProfile(id).then(responsedata =>{
            setUId(responsedata.data.id);
            //setThumbnail(responsedata.data.thumbnail);
            setNickname(responsedata.data.nickname);
            // setBio(responsedata.data.bio);
            setBio("안녕하세요 반갑스비낟.");
            // setMajor(responsedata.data.major);
            setMajor("영어학부");
            setPosition(responsedata.data.position);
            setOwner(responsedata.data.owner);
        });
    },[])

    return(
        <AccountProfileContainer>
            <TextGroup><Icon icon={faBarcode}/><TextDiv><p>{uId}</p></TextDiv></TextGroup>
            <AccountImage>
                <ProfileImage 
                    thumbnail = {thumbnail}
                    nickname = {thumbnail == null? nickname: null}/>
            </AccountImage>
            <TextGroup><Icon icon={faUser}/><TextDiv><p>{nickname}</p></TextDiv></TextGroup>
            {major != null?<TextGroup><Icon icon={faBook}/><TextDiv><p>{major}</p></TextDiv></TextGroup>:null}
            {/* 1~4학년 연필 // 졸업생은 졸업 // 교수님은 수업 */}
            {position != null?<TextGroup><Icon icon={faQuestion}/><TextDiv><p>{position}</p></TextDiv></TextGroup>:null}
            {bio != null?<TextGroup><Icon icon={faBullhorn}/><TextDiv><p>{bio}</p></TextDiv></TextGroup>:null}
        </AccountProfileContainer>
    );
}

export default AccountProfile;

const AccountProfileContainer = styled.div`
    width:70%;
    height:auto;
    margin:auto;
    display:flex;
    flex-direction:column;
`
const AccountImage = styled.div`
    width: 100%;
    height: auto;

    border: 1px solid #ccc;
    border-color: rgba(0,0,0,.2);
    border-radius:10px;
    box-shadow: 0px 2px 12px rgba(0,0,0,.2);
`
const TextGroup = styled.div`
    display:flex;
    padding:.5em;
    width: 100%;
`
const Icon = styled(FontAwesomeIcon)`
    padding-top:3px;
    font-size:1.2rem;
    color:#636466;
`
const TextDiv = styled.div`
    margin-left:1rem;
    font-size:1.3rem;
`

