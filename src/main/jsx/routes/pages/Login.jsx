import React from 'react';
import styled from 'styled-components';
import Login from '../../account/Login.jsx'

const LoginPage = () =>{
    
    return(
        <LoginPageDiv>
            <Login/>
        </LoginPageDiv>
        
    );

}

export default LoginPage;
const LoginPageDiv = styled.div`
    width:40%;
    height:auto;
    margin:1em auto;
`