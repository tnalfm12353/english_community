import React from 'react';
import {Route} from 'react-router-dom';
import styled from 'styled-components';
import AccountProfile from '../../account/AccountProfile.jsx';
import Community from './Community.jsx';
import Home from './Home.jsx';

function Profile (props){
    return(
        <ProfileContainer>
            <UserInfoDiv>
                <AccountProfile id={props.match.params.id}/>
            </UserInfoDiv>
            <ContentContainer >
                <Route exact path={props.match.path} component={Home}/>
                <Route exact path={props.match.path+"/settings"} component={Community}/>
            </ContentContainer>
        </ProfileContainer>
    );
}

export default Profile;

const ProfileContainer = styled.div`
    width:100%;
    height:100%;

    display: flex;

`
const UserInfoDiv = styled.div`
    width:30%;
    min-width: 300px;
    min-height: 500px;
    margin: auto;
    margin-top:5em;
`
const ContentContainer = styled.div`
    flex-direction: column;

    width:70%;
    height:100%;
`

const ProfilePostDiv = styled.div`
    width:100%;
    height:50%;
    border:1px solid red;
`

const ProfileStudyDiv = styled.div`
    width:100%;
    height:50%;
    border:1px solid red;   
`
