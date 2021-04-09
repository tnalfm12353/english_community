import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {device} from '../../lib/style/Device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDove } from '@fortawesome/free-solid-svg-icons';
const CardTitle = ({time, title}) =>{

    const forumType = "변수받기";
    
    function forumIcon(){
        switch(forumType){
            case "STUDENT" : return 
                break;
            case "GRADUATION": return 
                break;
            case "PROFESSOR" : return 
                break;
            default : return <FontAwesomeIcon icon={faDove} size={'1x'} color={"rgba(255,202,8)"}/>
                break;
        }
    }

    return(
        <CardTitleContainer>
            <TitleTemplate>
                {forumIcon()}
                <Title>{title}</Title>
            </TitleTemplate>
        </CardTitleContainer>
    );
}

export default CardTitle;

const CardTitleContainer = styled.div`
    display:flex;
    padding:.5rem;
    align-items:baseline;
    flex-direction:column;   
`
const TitleTemplate = styled.div`
    display:flex;
    margin:.5rem;
`

const Title = styled.div`
    margin-left:10px;
    font-weight:bolder;
`