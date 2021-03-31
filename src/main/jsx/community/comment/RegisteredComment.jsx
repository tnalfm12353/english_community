import React from 'react';
import styled from 'styled-components';
import ProfileButton from '../../components/ProfileButton.jsx';
import PostAccountTemplate from '../PostAccountTemplate.jsx';

const RegisteredComment = () =>{
    const account ={
        nickname: "account",
        thumbnail: undefined
    }
    return(
        <Template>
            <PostAccountTemplate account = {account} />
            <Comment>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋasdkalsdk</Comment>
        </Template>
    )
}

export default RegisteredComment;

const Template = styled.div`
    
    border-radius: 8px;
`

const Comment = styled. div`
    margin-left: 5px;
    align-self:center;
    line-height:1.5rem;
`