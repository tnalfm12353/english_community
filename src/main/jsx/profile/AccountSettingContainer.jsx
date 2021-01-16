import React, { useEffect } from 'react';
import styled from 'styled-components';
import {Route} from 'react-router-dom';
import SettingNav from './SettingsNav.jsx';
import AccountSettings from './AccountSettings.jsx';
import DevelopingModeMsg from '../components/DevelopingModeMsg.jsx';
const AccountSettingContainer = (props) =>{

    return(
        <SettingsContainer>
            <SettingNav/>
            <ContentContainer>
                <Route exact path={props.match.path+"/account"} component={AccountSettings}/>
                <Route exact path={props.match.path+"/alarm"} component={DevelopingModeMsg}/>
            </ContentContainer>
        </SettingsContainer>
    );
}

export default AccountSettingContainer;

const SettingsContainer = styled.div`
    margin-top:2em;
    width:100%;
    height:100%;

    display:flex;
    flex-direction:column;

    
`
const ContentContainer = styled.div`
    width:100%;
    height:100%;

    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-color: rgba(0,0,0,.2);
    box-shadow: 0px 4px 10px rgba(0,0,0,.2);
    color:#000;
    border-radius: 8px;
`