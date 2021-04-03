import React from 'react';
import styled from 'styled-components';
import PostAccountTemplate from '../PostAccountTemplate.jsx';

const RegisteredComment = ({account,time,comment}) =>{

    return(
        <Template>
            <PostAccountTemplate account = {account} time={time}/>
            <Comment>{comment}</Comment>
        </Template>
    )
}

export default RegisteredComment;

const Template = styled.div`
    border-radius: 8px;
    border:1px solid rgba(0,0,0,.1);
    margin-bottom:25px;
`

const Comment = styled. div`
    padding:10px;
    align-self:center;
    font-size: .9rem;
    line-height:1.3rem;
`