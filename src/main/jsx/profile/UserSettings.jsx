import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PositionRadioBox from './PositionRadioBoxGroup.jsx';
import SettingInputForm from '../components/SettingsInputForm.jsx';
import TextareaAutoSize from '../components/TextareaAutoSize.jsx';
import {updateUserInfo} from '../lib/api/account/AccountApi';
import { useSelector } from 'react-redux';
const UserSettings = () =>{

    const account = useSelector(state=> state.Account.get('account'));
    const positions = ["Student","Graduate","Professor"];
    const grades = ["Grade 1", "Grade 2", "Grade 3","Grade 4"];
    
    const [name,setName] = useState(()=>{
        let initialState = undefined;
        if(account.name != null){
            initialState = account.name;
        }
        return initialState;
    });
    const [major,setMajor] = useState(()=>{
        let initialState = undefined;
        if(account.major != null){
            initialState = account.major;
        }
        return initialState;
    });
    const [studentNum, setStudentNum] = useState(()=>{
        let initialState = undefined;
        if(account.studentNumber != null){
            initialState = account.studentNumber;
        }
        return initialState;
    });
    const [position, setPosition] = useState(()=>{
        let initialState = undefined;
        switch(account.position){
            case "ANONYMOUS" : break;
            case "GRADUATION": initialState = positions[1];
                break;
            case "PROFESSOR" : initialState = positions[2];
                break;
            default : initialState = positions[0];
                break;
        }
        return initialState;
    }); // UI를 위해서 
    const [grade, setGrade] = useState(()=>{
        let initialState = undefined;
        switch (account.position) {
            case "GRADE_1": initialState = grades[0];
                break;
            case "GRADE_2": initialState = grades[1];
                break;
            case "GRADE_3": initialState = grades[2];
                break;
            case "GRADE_4": initialState = grades[3];
                break;
            default:
                break;
        }
        return initialState;
    }); // UI를 위해서 
    const [positionType, setPositionType] = useState(account.position);
    const [bio, setBio] = useState(()=>{
        let initialState = undefined;
        if(account.bio != null){
            initialState = account.bio;
        }
        return initialState;
    });
  

    function InputOnChange(e){
        const inputName = e.target.name;

        switch(inputName){
            case "name" : setName(e.target.value);
                break;
            case "major": setMajor(e.target.value);
                break;
            case "studentNum": setStudentNum(e.target.value);
                break;
            case "bio": setBio(e.target.value);
                break;
        }
    }

    function PositionCheckOnChange(e){
        setPosition(e.currentTarget.value);
        switch (e.currentTarget.value) {
            case "Student": setPositionType("Student");
                break;
            case "Graduate":setPositionType("GRADUATION");
                break;
            case "Professor":setPositionType("PROFESSOR");
                break;
        }
        
    }

    function GradeCheckOnChange(e){
        setGrade(e.currentTarget.value);
        switch(e.currentTarget.value){
            case "Grade 1": setPositionType("GRADE_1");
                break;
            case "Grade 2": setPositionType("GRADE_2");
                break;
            case "Grade 3": setPositionType("GRADE_3");
                break;
            case "Grade 4": setPositionType("GRADE_4");
                break;
        }
    }

    function handleUpdateUserInfo(){
        const data = JSON.stringify({name:name, major:major, studentNumber:studentNum, position:positionType,bio:bio});
        updateUserInfo(data).then(result =>{
            if(result.response.status === 200){
                alert('개인 정보를 변경했습니다.');
            }
        })
    }


    return(
        <UserSettingsContainer>
            {/* <TextDiv>안녕, 내 이름은 <SettingInputForm name={"name"} labelValue={"Name"} onChange={InputOnChange}/>이야.</TextDiv>
            <TextDiv>나는 <SettingInputForm name={"major"} labelValue={"Major"} onChange={InputOnChange}/>을 전공하고 있어.</TextDiv> */}
            <SettingInputForm name={"name"} labelValue={"Name"} value={name}onChange={InputOnChange}/>
            <SettingInputForm name={"major"} labelValue={"Major"} value={major}onChange={InputOnChange}/>
            <SettingInputForm name={"studentNum"} labelValue={"StudentNumber"} value={studentNum} type={"number"} onChange={InputOnChange}/>
            <PositionRadioBox positions={positions} name={"position"} onChange={PositionCheckOnChange} myPosition={position}/>
            {position == "Student"? <PositionRadioBox positions={grades} name={"grade"} onChange={GradeCheckOnChange} myPosition={grade}/>: null}
            <AutosizeTemp>
                <TextareaAutoSize 
                        placeholder={"나를 표현해보아요!"} 
                        name={"bio"}
                        textValue={bio}
                        handleChange={InputOnChange}
                        minRows={2}
                        maxRows={10}/>
            </AutosizeTemp>
            <UpdateButton onClick={handleUpdateUserInfo}>개인 정보 변경</UpdateButton>
        </UserSettingsContainer>
    );

}

export default UserSettings;

const UserSettingsContainer = styled.div`
    display:flex;
    flex-direction:column;
    padding:2rem 1rem;
    height:auto;
`

const UpdateButton = styled.button`
    margin-top:20px;
    margin-left:10px;
    font-weight:bold;
    width:130px;
    color:#fff;
    
    border:1px solid #fcc600;
    border-radius:5px;
    background:#ffca00cc;
    padding: .4em;
    
`
const AutosizeTemp = styled.div`
    border:1px solid #ffca00cc;
`