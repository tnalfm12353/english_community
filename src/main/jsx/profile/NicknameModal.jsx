import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { changeData, updateNickname } from '../redux/modules/UpdateAccount';
import {validationForm} from '../lib/api/account/Validation';
import {SignUpValueIsExist} from '../lib/api/account/AccountApi';
import SignUpInputForm from '../components/SignUpInputForm.jsx';
import UpdateButtonTemp from './UpdateButtonTemp.jsx';

const NicknameForm = ({onClose}) =>{
    const dispatch = useDispatch();

    const [nickname,setNickname] = useState(null);
    const [errorMsg, setErrorMsg] = useState("특수문자를 제외한 2~10자");
    const [validNickname, setValidNickname] = useState(false);
    const {nickCheck, regExp} = validationForm;

    useEffect(()=>{   
        if (nickname !=null && nickCheck.test(nickname) && !regExp.test(nickname)) {
            SignUpValueIsExist("nickname",nickname).then(result =>{
                setValidNickname(result);
                if(!result){
                    setErrorMsg("중복된 아이디 입니다");
                }else{
                    setErrorMsg('');
                }
            })
        }else{
            setValidNickname(false);
            setErrorMsg("특수문자를 제외한 2~10자");
        }
    },[nickname]);

    function handleChange(e){
        setNickname(e.target.value);
    }

    function handleUpdateNickname() {
        dispatch(changeData({
            name:"nickname",
            value:nickname
        }));

        dispatch(updateNickname());

        onClose();
    }
    return(
        <ContentContainer>
            <Content>
                <TextDiv>반갑습니다.</TextDiv>
                <SetNickname>
                    <SignUpInputForm name={"nickname"}labelValue={"Nickname"} validated={validNickname} onChange={handleChange} ErrorMSG={errorMsg}/>
                    <p>님</p>
                </SetNickname>
                <TextDiv>부외대(사이트 이름 미정)에 오신것을 환영합니다.</TextDiv>
            </Content>
            <UpdateButtonTemp
                buttonValue = {"해당 닉네임으로 변경"}
                updateData = {handleUpdateNickname}
                valid={validNickname}
                onClose={onClose}
            />
        </ContentContainer>
        
    );
}

export default NicknameForm;
const ContentContainer = styled.div`
    display:flex;
    flex-direction:column;
`

const Content = styled.div`
    padding:1rem;
    border-bottom:1px solid #ccc;
`
const TextDiv = styled.div`
    font-size:1.5rem;
    margin:10px;
`

const SetNickname = styled.div`
    display:flex;
    align-items:center;

    p{
        font-size:1.5rem;
        margin-bottom:1.2em;
    }
`