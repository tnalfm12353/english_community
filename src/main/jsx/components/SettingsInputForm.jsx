import React from 'react';
import styled from 'styled-components';

const SettingInputForm = ({name,labelValue,onChange,onKeyPress}) =>{

    return(
        <GroupDiv>
            <Input name={name} onChange={onChange} onKeyPress={onKeyPress} required="required"/>
            <Label>{labelValue}</Label>
        </GroupDiv>
    );
}

export default SettingInputForm;

const GroupDiv = styled.div`
    position:relative;
    flex-basis:1;
    margin-bottom:1rem;
`
const Input = styled.input`
    font-size:1.5rem;
    margin:1rem;
    padding:10px 10px 10px 5px;
    display:block;
    width:85%;
    border:none;
    border-bottom:1px solid #999;

    &:focus , &:valid{
        outline:none;
        border-bottom:1px solid #ffca08;
    }
    
    @media only screen and (max-height: 630px){
        font-size:1rem;
        margin:auto;
    }
`

const Label = styled.label`
    color:#999; 
    font-size:1.5rem;
    font-weight:normal;
    position:absolute;
    pointer-events:none;
    top:25px;
    left: 2rem; 
    transition:0.5s all; 
    -moz-transition:0.5s all; 
    -webkit-transition:0.5s all; 

    ${Input}:focus ~ & , ${Input}:valid ~ &{
        top:-10px;
        left:20px;
        font-size:1rem;
        opacity: 0.7;
        color:#ffca08;
    }

    @media only screen and (max-height: 630px){
        font-size:1.2rem;
        top:10px;
        left:32px;

        ${Input}:focus ~ & , ${Input}:valid ~ &{
            top:-10px;
            left:30px;
            font-size:1rem;
            opacity: 0.7;
            color:#ffca08;
        }
    }

`