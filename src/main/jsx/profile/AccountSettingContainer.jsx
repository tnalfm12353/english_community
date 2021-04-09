import React from 'react';
import styled from 'styled-components';
import {Route} from 'react-router-dom';
import SettingNav from './SettingsNav.jsx';
import Settings from './Settings.jsx';
import DevelopingModeMsg from '../components/DevelopingModeMsg.jsx';
const AccountSettingContainer = (props) =>{

    return(
        <SettingsContainer>
            <SettingNav/>
            <ContentContainer>
                <Route exact path={props.match.path+"/account"} component={Settings}/>
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
    height:auto;
`