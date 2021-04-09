import React from 'react';
import styled from 'styled-components';
import {device} from '../lib/style/Device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDove } from '@fortawesome/free-solid-svg-icons';

const ForumToggle = () =>{

    return(
        <ToggleContainer>
            <ToggleComponent><FontAwesomeIcon icon={faDove}/><span>General</span></ToggleComponent>
        </ToggleContainer>
    )
}

export default ForumToggle;

const ToggleContainer = styled.div`
    position:absolute;
    width:100px;
    left:0;
    top:35px;
    background: #fff;
    border:2px solid #ffca08;
    border-top:none;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index:1;

    @media ${device.laptop}{
        width: 80px;
    }
`

const ToggleComponent = styled.div`
    padding:8px 0;
    color:#636466;
    font-size:1rem;
    text-align:center;
    border-top:1px solid #eee;

    @media ${device.laptop}{
        width: 80px;
        font-size:.9rem;
    }

    span{
        margin-left:3px;
    }
`