import React from 'react';
import styled from 'styled-components';
import InputForm from './InputForm.jsx';
const SignUpForm = ({validPW,validCPW,isIdExist,isNickExist,
                    nickErrorMSG,idErrorMSG,
                    onChange,onKeyPress,signUp,isSimpleSignUp}) =>{
    return(
        <LoginDiv onKeyPress={onkeypress}>
            <InputForm
                name = "username"
                labelValue = "ID"
                onChange = {onChange}
                onKeyPress = {onKeyPress}
                validated = {isIdExist}
                ErrorMSG = {idErrorMSG}
            />
            
            <GroupDiv onClick={(e)=>e.stopPropagation()}>
                <Input type='password' name="password" onChange={onChange} onKeyPress={onKeyPress} required="required"/>
                <Label>Password</Label>
                <CheckedMark valid={validPW}>{validPW?"✓":"×"}</CheckedMark>
                {validPW?null:<Span>6~16자 영어+숫자+특수문자</Span>}
            </GroupDiv>

            <GroupDiv onClick={(e)=>e.stopPropagation()}>
                <Input type='password' name="checkPassword" onChange={onChange} onKeyPress={onKeyPress} required="required"/>
                <Label>Confirm Password</Label>
                <CheckedMark valid={validCPW}>{validCPW?"✓":"×"}</CheckedMark>
                {validCPW?null:<Span>비밀번호가 다릅니다</Span>}
            </GroupDiv>

            <GroupDiv onClick={(e)=>e.stopPropagation()}>
                <Input name="nickname" onChange={onChange} onKeyPress={onKeyPress} required="required"  />
                <Label>Nickname</Label>
                <CheckedMark valid={isNickExist}>{isNickExist?"✓":"×"}</CheckedMark>
                {nickErrorMSG === null ?null:<Span>{nickErrorMSG}</Span>}
            </GroupDiv>

            <SignUpBtn onClick={()=>{signUp()}}>Sign Up</SignUpBtn>
        </LoginDiv>
    );
}
export default SignUpForm;

const LoginDiv = styled.div`
    display:flex;
    flex-direction:column;
    flex:auto;
`
const GroupDiv = styled.div`
    position:relative;
    flex-basis:1;
    margin-bottom:1rem;
`
const Input = styled.input`
    font-size:1.5rem;
    margin:1rem;
    padding:10px 10px 10px 5px;
    display:block;
    width:85%;
    border:none;
    border-bottom:1px solid #999;

    &:focus , &:valid{
        outline:none;
        border-bottom:1px solid #ffca08;
    }
    
    @media only screen and (max-height: 630px){
        font-size:1rem;
        margin:auto;
    }
`

const Label = styled.label`
    color:#999; 
    font-size:1.5rem;
    font-weight:normal;
    position:absolute;
    pointer-events:none;
    top:25px;
    left: 2rem; 
    transition:0.5s all; 
    -moz-transition:0.5s all; 
    -webkit-transition:0.5s all; 

    ${Input}:focus ~ & , ${Input}:valid ~ &{
        top:0px;
        left:20px;
        font-size:1rem;
        opacity: 0.7;
        color:#ffca08;
    }

    @media only screen and (max-height: 630px){
        font-size:1.2rem;
        top:10px;
        left:32px;

        ${Input}:focus ~ & , ${Input}:valid ~ &{
            top:-10px;
            left:30px;
            font-size:1rem;
            opacity: 0.7;
            color:#ffca08;
        }
    }

`

const CheckedMark = styled.div`
    position:absolute;
    top:2rem;
    left:18rem;
    font-size: 1.5rem;
    line-height: 1rem;
    margin-left: 1rem;
    font-weight: 800;

    color:${props=>props.valid?"#ffca08":"#e64980"};
    opacity:0;

    ${Input}:focus ~ & , ${Input}:valid ~ &{
        opacity: 1;
    }

    @media only screen and (max-height: 630px){
        top:1rem;
        left:17rem;
    }
`

const Span =styled.span`
    margin-left:1.5rem;
    font-weight:bold;
    opacity:.5;
    color:#999;
    @media only screen and (max-height: 630px){
        font-size:.8rem;
        margin-left:1.8rem;
    }
`

const SignUpBtn = styled.div`
    font-size :2rem;
    font-weight:bold;
    font-family: 'Kalam', cursive;
    text-align: center;
    color:gray;
    width:80%;
    margin:0 auto;
    margin-bottom:2rem;
    padding:2px;    
    box-shadow: 0px 5px 6px 3px rgba(0,0,0,0.16);
    
    transition:all 0.5s;
    &:hover{
        color:#ffca08;
        box-shadow: 0px 5px 6px 3px rgba(255,202,8,0.16);
    }
`