import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import PasswordInputForm from '../components/PasswordInputForm.jsx';
import UpdateButtonTemp from './UpdateButtonTemp.jsx';
import {validationForm} from '../lib/api/account/Validation';
import { updateAccount } from '../lib/api/account/AccountApi.js';
const PasswordModal = ({onClose}) =>{

    const [myPassword, setMyPassword] = useState(null)
    const [newPassword,setNewPassword] = useState(null);
    const [newPasswordCheck,setNewPasswordCheck] = useState(null);

    const [validPassword, setValidPassword] = useState(false);
    const [validPasswordCheck, setValidPasswordCheck] = useState(true);
    const [buttonVitalize, setButtonVitalize] = useState(false);

    const [validMsg,setValidMsg] = useState(null);
    const [checkValidMsg, setCheckValidMsg] = useState(null);
    const [errorMsg,setErrorMsg] = useState("");
    const {PWCheck} = validationForm;


    useEffect(()=>{   
        if (newPassword !=null && PWCheck.test(newPassword)) {
            setValidPassword(true);
            setValidMsg("")
        }else{
            setValidPassword(false);
            setValidMsg("6~16자 영어+숫자+특수문자");
        }
    },[newPassword]);

    useEffect(()=>{
        if(newPassword !=null && newPassword == newPasswordCheck){
            setValidPasswordCheck(true);
            setCheckValidMsg("");
        }else{
            setValidPasswordCheck(false);
            setCheckValidMsg("비밀번호가 다릅니다");
        }
    },[newPassword,newPasswordCheck]);

    useEffect(()=>{
        if( myPassword != null && validPassword && validPasswordCheck){
            setButtonVitalize(true);
        }else{
            setButtonVitalize(false);
        }

    },[validPassword,validPasswordCheck])

    function handleChange(e){
        switch(e.target.name){
            case "myPassword" : setMyPassword(e.target.value);
                break;
            case "newPassword" : setNewPassword(e.target.value);
                break;
            case "newPasswordCheck" : setNewPasswordCheck(e.target.value);
                break;
        };
    }

    function handleUpdatePassword() {
        const value = JSON.stringify({myPassword:myPassword,newPassword:newPassword});
        updateAccount("password",value).then(result =>{
            if(result.response){
                onClose();
            }else if(result.error.response.status == 403){
                setErrorMsg("인증 정보가 정확하지 않습니다.");
            }else{
                setErrorMsg("어떠한 문제로 비밀번호를 변경에 실패했습니다.");
            }
        });
    }

    return(
        <ContentContainer>
            <Content>
                <SetPassword>
                    <PasswordInputForm name={"myPassword"} labelValue={"My Password"} validated={null} onChange={handleChange}/>
                    <PasswordInputForm name={"newPassword"} labelValue={"New Password"} validated={validPassword} onChange={handleChange} ErrorMSG={validMsg}/>
                    <PasswordInputForm name={"newPasswordCheck"} labelValue={"New Password Check"} validated={validPasswordCheck} onChange={handleChange} ErrorMSG={checkValidMsg}/>
                </SetPassword>
                <ErrorMessageDiv>{errorMsg}</ErrorMessageDiv>
            </Content>
            <UpdateButtonTemp
                buttonValue = {"비밀번호 변경"}
                updateData = {handleUpdatePassword}
                valid = {buttonVitalize}
                onClose={onClose}
            />
        </ContentContainer>
    );
}

export default PasswordModal;

const ContentContainer = styled.div`
    display:flex;
    flex-direction:column;
`

const Content = styled.div`
    padding:2rem 1rem;
    border-bottom:1px solid #ccc;
`

const SetPassword = styled.div`
    align-items:center;
`
const ErrorMessageDiv = styled.div`
    color:red;
    text-align:center;
    margin-bottom: 1rem;
`