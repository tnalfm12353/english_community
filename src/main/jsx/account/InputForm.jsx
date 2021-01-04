import React from 'react';
import styled from 'styled-components';

const InputForm = ({name,labelValue,onChange,onKeyPress,validated,ErrorMSG}) =>{

    return(
        <GroupDiv onClick={(e)=>e.stopPropagation()}>
            <Input name={name} onChange={onChange} onKeyPress={onKeyPress} required="required"/>
            <Label>{labelValue}</Label>
            <CheckedMark valid={validated}>{validated?"✓":"×"}</CheckedMark>
            {ErrorMSG === null ?null:<Span>{ErrorMSG}</Span>}
        </GroupDiv>
    );
}

export default InputForm;

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
        top:0px;
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

const CheckedMark = styled.div`
    position:absolute;
    top:2rem;
    left:18rem;
    font-size: 1.5rem;
    line-height: 1rem;
    margin-left: 1rem;
    font-weight: 800;

    color:${props=>props.valid?"#ffca08":"#e64980"};
    opacity:0;

    ${Input}:focus ~ & , ${Input}:valid ~ &{
        opacity: 1;
    }

    @media only screen and (max-height: 630px){
        top:1rem;
        left:17rem;
    }
`

const Span =styled.span`
    margin-left:1.5rem;
    font-weight:bold;
    opacity:.5;
    color:#999;
    @media only screen and (max-height: 630px){
        font-size:.8rem;
        margin-left:1.8rem;
    }
`