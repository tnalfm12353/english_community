import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

class Navi extends React.Component {
    render() {
        return (
            <Nav>
                <NavItem to="/">Home</NavItem>
                <NavItem to="/About">About</NavItem>
                <NavItem to="/Community">Community</NavItem>
                <NavItem to="/">StudyGroup</NavItem>
                <NavItem to="/Schedule">Schedule</NavItem>
            </Nav>
        );
    }
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
const NavItem = styled(Link)`
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
        transform:scale(1.3);
        transition: all 0.5s ease-in-out;
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