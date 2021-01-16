import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {device}from '../lib/style/Device';
import Logo from '../../webapp/img/bufs.jpg';

import Navi from '../headerComponents/Navi.jsx';
import AuthenticationButtons from '../headerComponents/AuthenticationButtons.jsx';
import { useSelector } from 'react-redux';
import AccountHeaderButtons from '../headerComponents/AccountHeaderButtons.jsx';
import MobileNavi from './MobileNavi.jsx';
const Header = () =>{

    const authenticated = useSelector(state => state.Account.get('authenticated'));

    return(
        <HeaderContainer>
            <MobileNaviDiv>
                <MobileNavi/>
            </MobileNaviDiv>
            <Link to="/"><LogoImg src={Logo} alt=""/></Link>
            <NaviDiv>
                <Navi/>
            </NaviDiv>
            {
                authenticated?
                    <AccountHeaderButtons/>
                    :
                    <AuthenticationButtons/>
            }
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    width:100%;
    height:50px;
    top:0;
    background: rgba(255,255,255,.2);
    backdrop-filter: saturate(180%) blur(4px);
    border-bottom: 1px solid #eee;
    position:fixed;
    display:flex;
    align-items:center;
    place-content:space-between;
    z-index:100;
`

const NaviDiv = styled.div`
    display:block;

    @media only screen and (max-width: 800px){
        display:none;
    }
`
const MobileNaviDiv = styled.div`
    display: none;
    @media only screen and (max-width: 800px){
        display : block;
        margin : auto 3em;
    }
`

const LogoImg = styled.img`
    width: 210px;
    height: 50px;
    
    @media ${device.mobileL}{
        width : 160px;
        height: 40px;
    }
    @media ${device.mobileM}{
        width: 140px;
        height: 35px;
    }
    @media ${device.mobileS}{
        margin-left:3em;
    }
`
export default Header;