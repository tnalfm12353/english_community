import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

import ProfileImage from '../components/ProfileImage.jsx';
import AccountModalTemp from './AccountModalTemp.jsx';
import MyThumbnail from '../components/MyThumbnail.jsx';

const AccountSettings = () =>{

    const dispatch = useDispatch();

    const account = useSelector(state=> state.Account.get('account'));
    const [openContainer,setOpenContainer] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalButton, setModalButton] = useState(null);

    function callTemplate(e){
        if(e.target.name != undefined){
            setModalContent(e.target.name);
            switch(e.target.name){
                case 'thumbnail' : setModalTitle("프로필 사진 선택"); setModalButton("프로필 사진으로 설정");
                    break;
                case 'nickname' : setModalTitle("닉네임 설정"); setModalButton("해당 닉네임으로 변경");
                    break;
                case 'password' : setModalTitle("비밀번호 설정"); setModalButton("해당 비밀번호로 변경");
                    break;
            }
        }
    }

    useEffect(()=>{
        if(modalContent != null)
            setOpenContainer(true);
    },[modalContent]);

    function closeTemplate(){
        setOpenContainer(false);
        setModalContent(null);
    }

    return(
        <SettingContainer>
            <LineSettingButton name ="thumbnail" onClick={(e)=>callTemplate(e)}>
                <SettingSubject>사진</SettingSubject> <CurrentInformation/><ImageDiv><MyThumbnail/></ImageDiv>
            </LineSettingButton>
            
            <LineSettingButton name ="nickname" onClick={(e)=>callTemplate(e)}>
                <SettingSubject>닉네임</SettingSubject> <CurrentInformation>{account.nickname}</CurrentInformation>
                <FontAwesomeIcon  icon={faChevronCircleRight} size="lg"/>
            </LineSettingButton>
            

            <LineSettingButton name ="password" onClick={(e)=>callTemplate(e)}>
                <SettingSubject name ="password">비밀번호</SettingSubject> <CurrentInformation name ="password">&middot; &middot; &middot; &middot; &middot; &middot;</CurrentInformation>
                <FontAwesomeIcon icon={faChevronCircleRight} size="lg"/>
            </LineSettingButton>

            { openContainer? <ComponentContainer>
                                <AccountModalTemp title={modalTitle} updateButton={modalButton} content={modalContent} onClose={closeTemplate}/>
                            </ComponentContainer>: null}
        </SettingContainer>
    );
}

export default AccountSettings;

const SettingContainer = styled.div`

`

const LineSettingButton = styled.button`
    display:flex;
    flex-direction:row;
    text-align:start;
    align-items:center;
    justify-content:space-between;
    padding:1rem;
    width:100%;
    border-bottom: 1px solid #ccc;
    color:#636466;
    
    &:hover{
        background-color:rgba(255,202,8,0.1);
        color:#ffca08;
    }
`

const SettingSubject = styled.div`
    font-size:0.8rem;
    
`

const CurrentInformation = styled.div`
    margin-right:50%;
    font-size:1.5rem;
    color:#000;

    // mobile 0%;
`
const ImageDiv =styled.div`
    width:50px;
    height:50px;
    background-color:#fff;
    border:1px solid #ccc;
    border-radius:100%;
`

const ComponentContainer = styled.div`
    position:absolute;
    z-index:2;
    top:0;
    left:0;
    width:90%;
    height:auto;
    
    background: #fff;
    border: 1px solid #ccc;
    border-color: rgba(0,0,0,.2);
    box-shadow: 0px 4px 10px rgba(0,0,0,.2);
    color:#000;
    border-radius: 8px;

    @media only screen and (max-width: 1300px){
        width:95%;
    }

    @media only screen and (max-width: 800px){
        width:100%;
    }
`