import React, { useState } from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import ProfileImage from '../components/ProfileImage.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {logOut} from '../redux/modules/Account';
import MyThumbnail from '../components/MyThumbnail.jsx';

const AccountToggleProfile = ({onClose}) =>{
    const account = useSelector(state => state.Account.get('account'));
    const dispatch = useDispatch();
    function handleLogout(){
        onClose();
       dispatch(logOut());

    }

    return(
        <ToggleContainer>
            <>
                <AccountImage>
                    <MyThumbnail/>
                </AccountImage>
                <TextDiv isNickname = {true}><p>{account.nickname}</p></TextDiv>
                <TextDiv><p>{account.username}</p></TextDiv>
            </>
            <Line/>
            <StyleButton><StyleLink to={"/Profile/"+account.id} onClick={()=> onClose()}>프로필</StyleLink></StyleButton>
            <StyleButton><StyleLink to={`/Profile/${account.id}/settings/account`} onClick={()=> onClose()}>계정 관리</StyleLink></StyleButton>
            <StyleButton onClick={()=>{handleLogout(),onClose()}}>로그아웃</StyleButton>
        </ToggleContainer>
    )
}

export default AccountToggleProfile;

const ToggleContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 1.5rem;
`

const StyleLink = styled(Link)`
    padding: .5em 5em;
`

const AccountImage = styled.div`
    margin:0 auto;
    width: 80px;
    height: 80px;

    border: 1px solid #ccc;
    border-color: rgba(0,0,0,.2);
    border-radius:100%;
    box-shadow: 0px 2px 12px rgba(0,0,0,.2);
`
const TextDiv = styled.div`
    padding-top: .5em;
    width: 100%;
    text-align:center;
    font-size:${({ isNickname })=> isNickname? "2rem": "1.2rem" };
`
const Line = styled.div`
    margin:1em 0;
    border-top: 1px solid rgba(0,0,0,.2);
`

const StyleButton = styled.button`
    margin: .5em 0;
    padding:.5rem;

    border: 1px solid #ccc;
    border-color: rgba(0,0,0,.2);
    border-radius:8px;
    box-shadow: 0px 2px 12px rgba(0,0,0,.2);

    font-size:1rem;
    font-weight:bold;
    color: rgba(0,0,0,.5);

    &:hover{
        color: #ffca08;
        border-color:#ffca08;
    }
`