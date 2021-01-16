import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Navi = ()=>{

    return (
        <Nav>
            <NavItem to="/About" activeStyle={{color: "#ffca08"}}>About</NavItem>
            <NavItem to="/Community" activeStyle={{color: "#ffca08"}}>Community</NavItem>
            <NavItem to="/signUp" activeStyle={{color: "#ffca08"}}>StudyGroup</NavItem>
            <NavItem to="/Schedule" activeStyle={{color: "#ffca08"}}>Schedule</NavItem>
        </Nav>
    );
}

export default Navi;
const Nav = styled.nav`
    background: rgba(255, 255, 255, 0);
    display:flex;
    justify-content: space-around;
    width: 50vw;
    @media only screen and (max-width: 800px){
        flex-direction:column;
        margin:auto;
    }
`
const NavItem = styled(NavLink)`
    background: rgba(255, 255, 255, 0);
    text-align: center;
    text-decoration: none;
    padding: 1em; 
    display:inline-block;
    color: #636466;
    outline:none;
    font-family: 'Kalam', cursive;
    font-size: 1.5rem;
    transition: all 1s;

    &:hover{
        color: #ffca08;
    }

    @media only screen and (max-width: 900px){
        font-size:1.2rem;
    }
    
    @media only screen and (max-width: 800px){
        font-size:2rem;
        color: #ffca08; 
    }
`