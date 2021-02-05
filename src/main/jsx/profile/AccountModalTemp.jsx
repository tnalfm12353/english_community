import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import NicknameModal from './NicknameModal.jsx';
import PasswordModal from './PasswordModal.jsx';
import ThumbnailModal from './ThumbnailModal.jsx';
const AccountModalTemp = ({title,content,onClose}) =>{
    
    function getComponent(){
        switch(content){
            case 'thumbnail' : return(<ThumbnailModal onClose={onClose}/>);
                break;
            case 'nickname' : return(<NicknameModal onClose={onClose}/>);
                break;
            case 'password' : return(<PasswordModal onClose={onClose}/>);
                break;
        }
    }

    return(
        <AccountModalContainer>
            <TitleDiv>{title}<Cancel onClick={onClose}><FontAwesomeIcon icon={faTimes} size={'sm'} color={'#636466'}/></Cancel></TitleDiv>
            <Content>{getComponent()}</Content>
        </AccountModalContainer>
    );
}

export default AccountModalTemp;

const AccountModalContainer = styled.div`
    display:flex;
    flex-direction:column;
`
const TitleDiv = styled.div`
    display:flex;
    padding:1em;
    font-size:1.2rem;

    border-bottom:1px solid #ccc;
    border-color: rgba(0,0,0,.2);
    box-shadow: 0px 4px 10px rgba(0,0,0,.2);
`
const Cancel = styled.div`
    margin-left:auto;
`

const Content = styled.div`
    border-bottom:1px solid #ccc;
    border-color: rgba(0,0,0,.2);
`