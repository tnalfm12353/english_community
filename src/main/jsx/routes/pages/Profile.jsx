import React from 'react';
import {Route} from 'react-router-dom';
import styled from 'styled-components';
import AccountProfile from '../../profile/AccountProfile.jsx';
import AccountSettingContainer from '../../profile/AccountSettingContainer.jsx';
import Home from './Home.jsx';

function Profile (props){
    return(
        <ProfileContainer>
            <UserInfoDiv>
                <AccountProfile id={props.match.params.id}/>
            </UserInfoDiv>
            <ContentContainer>
                <Route exact path={props.match.path} component={Home}/>
                <Route path={props.match.path+"/settings"} component={AccountSettingContainer}/>
            </ContentContainer>
        </ProfileContainer>
    );
}

export default Profile;

const ProfileContainer = styled.div`
    width:100%;
    height:auto;

    display: flex;

    @media only screen and (max-width: 800px){
        flex-direction: column;
    }
`
const UserInfoDiv = styled.div`
    width:30%;
    min-width: 300px;
    min-height: 500px;
    margin: auto;
    margin-top:5em;
    margin-bottom:5em;

    @media only screen and (max-width: 800px){
        width:100%;
    }
`
const ContentContainer = styled.div`
    flex-direction: column;

    width:70%;
    height:100%;
    margin-bottom:5em;
`
