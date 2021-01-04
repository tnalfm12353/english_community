import React,{useState} from 'react';
import styled from 'styled-components';
import {device}from '../lib/style/Device';
import AuthenticTemp from '../account/SimpleAuthenticTemp.jsx';

const AccountButtons = () =>{

    const [loginHandler, setLoginHandler] = useState(false);
    const [loginComponent, setLoginComponent] =useState(false);
    const [signUpComponent, setSignUpComponent] =useState(false);

    const handleLogIn = () =>{
        setLoginHandler(true);
        setLoginComponent(true);
        setSignUpComponent(false);
    }

    const handleSignUp = () =>{
        setLoginHandler(true);
        setLoginComponent(false);
        setSignUpComponent(true);
    }

    const handleClose = () =>{
        setLoginHandler(false);
        setLoginComponent(false);
        setSignUpComponent(false);
    }
    
    return(
        <BtnContainer>
            <AuthenticBtn active={loginComponent} onClick={handleLogIn}>LogIn</AuthenticBtn>
            <AuthenticBtn active={signUpComponent} onClick={handleSignUp} turnoff = {true}>SignUp</AuthenticBtn>
            { 
                    loginHandler? 
                        <AuthenticTemp 
                            handleClose = {handleClose}
                            handleLogIn = {handleLogIn}
                            handleSignUp = {handleSignUp}
                            isLogin = {loginComponent}
                            isSignUp = {signUpComponent}
                        />
                    : null
                }
        </BtnContainer>
    )
}

const BtnContainer = styled.div`
    display:flex;
    width:auto;
    height: 100%;
    align-items:center;
`
const AuthenticBtn = styled.div`
    border: 0px solid ;
    font-family: 'Kalam', cursive;
    background-color: rgba(255,255,255,0);
    padding: .3em .6em;
    font-size: 1.5rem;
    text-align:center;
    transition: all .5s;
    border-bottom:1px solid ${props=>props.active? '#ffca08':'rgba(255,255,255,0)'};
    color: ${props=>props.active? '#ffca08':'gray'};

    &:focus{
        outline:none;
    }
    &:hover {
        border-color: #ffca08;
        color: #ffca08;
    }

    @media ${device.laptop}{
        font-size:1.5rem;
        padding: .3em .4em;
    }
    @media ${device.tablet}{
        font-size:1.3rem;
    }
    @media ${device.mobileL}{
        font-size: 1.1rem;
    }
    @media ${device.mobileM}{
        ${props => props.turnoff?`display:none`:`display`};
        font-size: 1.3rem;
    }
    @media ${device.mobileS}{
        font-size: 1rem;
        padding: .2em;
    }
`
export default AccountButtons;