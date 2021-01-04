import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

const LoginForm = ({onChange,LogIn,onKeyPress}) =>{

    const errorMessage = useSelector(state => state.Account.get('errorMessage'));

    return(
        <LoginDiv>
            <GroupDiv onClick={(e)=>e.stopPropagation()}>
                <Input name="username" onChange={onChange} onKeyPress={onKeyPress} required="required"/>
                <Label>ID</Label>
            </GroupDiv>
            <GroupDiv onClick={(e)=>e.stopPropagation()}>
                <Input type='password' name="password" onChange={onChange} onKeyPress={onKeyPress} required="required"/>
                <Label>Password</Label>
            </GroupDiv>
            <ErrorMessageDiv>{errorMessage}</ErrorMessageDiv>
            <LoginBtn onClick={()=>{LogIn()}}>Log In</LoginBtn>
        </LoginDiv>
    );
}

export default LoginForm;

const LoginDiv = styled.div`
    display:flex;
    flex-direction:column;
    flex:auto;
`
const GroupDiv = styled.div`
    position:relative;
    margin-bottom:1.5rem;
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

const LoginBtn = styled.div`
    font-size :2rem;
    font-weight:bold;
    font-family: 'Kalam', cursive;
    text-align: center;
    color:gray;
    width:80%;
    margin:0 auto;
    margin-bottom:2rem;  
    padding:2px;  
    box-shadow: 0px 5px 6px 3px rgba(0,0,0,0.16);

    
    transition:all 0.5s;
    &:hover{
        color:#ffca08;
        box-shadow: 0px 5px 6px 3px rgba(255,202,8,0.16);
    }

`
const ErrorMessageDiv = styled.div`
    color:red;
    text-align:center;
    margin-bottom: 1rem;
`