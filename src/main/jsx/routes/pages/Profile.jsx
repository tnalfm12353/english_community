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
                <AccountProfile username={props.match.params.username}/>
            </UserInfoDiv>
            <ContentContainer >
                <Route exact path={props.match.path} component={Home}/>
                <Route exact path={props.match.path+"/settings"} component={Community}/>
                {/* <ProfileStudyDiv>
                    ProfileStudyDiv
                </ProfileStudyDiv>
                <ProfilePostDiv>
                    ProfilePostDiv
                </ProfilePostDiv> */}
            </ContentContainer>
        </ProfileContainer>
    );
}

export default Profile;

const ProfileContainer = styled.div`
    width:100%;
    height:100%;

    display: flex;
    flex-flow:wrap;
`
const UserInfoDiv = styled.div`
    width:30%;
    min-width: 300px;
    height: 100%;
    
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
