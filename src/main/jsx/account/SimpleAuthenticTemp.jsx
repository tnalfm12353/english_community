import React from 'react';
import styled from 'styled-components';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

const SimpleAuthenticTemp = ({handleClose,handleLogIn,handleSignUp ,isLogin,isSignUp}) =>{
    return(
        <Overlay onClick={()=>handleClose()}>
            <AuthenticContainer onClick={(e)=>e.stopPropagation()}>
                <Title>
                    <TitleItem isLogIn = {isLogin} onClick={(e)=>{e.stopPropagation();handleLogIn()}}>Log-In</TitleItem>
                    <TitleItem isLogIn = {isSignUp} onClick={(e)=>{e.stopPropagation();handleSignUp()}}>Sign-Up</TitleItem>
                </Title>
                <Content/>
                {isLogin?
                    <Login
                        handleClose = {handleClose}
                    />
                    :
                    <SignUp
                        isSimpleSignUp = {isSignUp}
                        handleClose = {handleClose}
                    />
                }
            </AuthenticContainer>
        </Overlay>
    )
}

export default SimpleAuthenticTemp;

const Overlay = styled.div`
    position: fixed;
    width:100vw;
    height:100vh;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.45);
`

const AuthenticContainer = styled.div`
    width: 21em;
    height:auto;
    display:flex;
    flex-direction: column;
    transform: translate(0, 5em);
    margin:auto;

    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    
    @media only screen and (max-width: 630px){
        width:100%;
    }
`
const Title = styled.div`
    display:flex;
    width:100%;
`
const TitleItem = styled.div`
    width:50%;
    height:auto;
    padding:1rem;
    text-align: center;
    font-size: 2rem;
    font-family: 'Kalam', cursive;
    color: ${props=>props.isLogIn?'#ffca08':'gray'};
    box-shadow: ${props=>props.isLogIn?` 0px 2px 6px 3px rgba(255,202,8,0.16)`:null};
    transition: all .5s;

    ${props=>props.isLogIn?null:"&:hover{transform:scale(1.3);}"};

    @media only screen and (max-height: 630px){
        font-size:1.5rem;
    }
`

const Content = styled.section`
    border:none;
    margin-top: 1rem;
`