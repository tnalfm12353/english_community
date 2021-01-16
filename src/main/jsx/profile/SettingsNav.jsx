import React, { useEffect } from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faBell, } from '@fortawesome/free-regular-svg-icons';


const SettingsNav = () =>{

    const account = useSelector(state => state.Account.get('account'));

    const activeStyle = {
        color: '#ffca08',
        borderColor: '#ffca08',
        borderBottom: '5px solid #ffca08',
        boxShadow: '0px 4px 10px rgba(0,0,0,.2)'
    };

    return(
        <SettingsNavContainer>
            <NavItemGroup to={`/Profile/${account.id}/settings/account`} activeStyle={activeStyle}><Icon icon={faUser}/><TextDiv><p>Profile</p></TextDiv></NavItemGroup>
            <NavItemGroup to={`/Profile/${account.id}/settings/alarm`} activeStyle={activeStyle}><Icon icon={faBell}/><TextDiv><p>Alarm</p></TextDiv></NavItemGroup>
        </SettingsNavContainer>
    );
}

export default SettingsNav;

const SettingsNavContainer = styled.div`
    width:100%;
    height:3em;
    display:flex;
`

const NavItemGroup = styled(NavLink)`
    width:auto;
    height:100%;
    padding:0 .5em;
    display:flex;
    align-items:center;

    background: #fff;
    border: 1px solid #ccc;
    border-color: rgba(0,0,0,.2);
    
    color:#636466;
`

const Icon = styled(FontAwesomeIcon)`
    position:relative;
    font-size: 1rem;
`
const TextDiv = styled.div`
    margin:0 .5em;
    font-size: 1.2rem;
`