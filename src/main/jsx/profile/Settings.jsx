import React from 'react';
import styled from 'styled-components';
import AccountSettings from './AccountSettings.jsx';
import StudentCertification from './StudentCertification.jsx';
import UserSettings from './UserSettings.jsx';

const Settings = () => {

    return(
        <SettingsContainer>            
            <TitleText fontSize={"2rem"}><p>계정 정보</p></TitleText>
            <TitleText fontSize={"1rem"}><p>닉네임, 비밀번호와 같이 사용하는 계정 정보</p></TitleText>
            <SettingContainer>
                <AccountSettings/>
            </SettingContainer>
            <TitleText fontSize={"2rem"}><p>개인 정보</p></TitleText>
            <TitleText fontSize={"1rem"}><p>이름, 학번과 같이 사용하는 기본 정보</p></TitleText>
            <SettingContainer>
                <UserSettings/>
            </SettingContainer>
            <TitleText fontSize={"2rem"}><p>권한 인증</p></TitleText>
            <TitleText fontSize={"1rem"}><p>학생 인증이 되었는지.</p></TitleText>
            <SettingContainer>
                <StudentCertification/>
            </SettingContainer>
            <DropOutButton >회원 탈퇴</DropOutButton>            
        </SettingsContainer>
    );
}

export default Settings;

const SettingsContainer = styled.div`
    position:relative;
    top:0;
    left:0;
    
    display:flex;
    flex-direction:column;
    padding:16px;
`

const TitleText = styled.div`
    font-size: ${({fontSize})=>fontSize};
    color:${({fontSize})=>fontSize =="2rem"? "#000":"#636466"};
    margin:.5rem;
`

const SettingContainer = styled.div`
    max-width: 800px;
    margin-bottom: 1em;

    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-color: rgba(0,0,0,.2);
    box-shadow: 0px 4px 10px rgba(0,0,0,.2);
    color:#000;
    border-radius: 8px;
`

const DropOutButton = styled.button`
    font-weight:bold;
    color:#fff;
    min-width: 100px;
    margin-right:auto;
    border:1px solid #ff0606;
    border-radius:5px;
    background:#ff0606cc;
    padding: .4em;
`