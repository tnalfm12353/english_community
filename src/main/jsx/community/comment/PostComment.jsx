import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RegisteredComment from './RegisteredComment.jsx';
import TextareaAutoSize from '../../components/TextareaAutoSize.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';

import { createCommentApi } from '../../lib/api/post/CommentApi';
const PostComment = ({postId}) =>{

    const [comment, setComment] = useState('');
    const [commentCheck, setCommentCheck] = useState(false);

    useEffect(()=>{
        if(postId !== undefined){
            // getRegisteredCommentApi()
        }
    },[postId])

    useEffect(()=>{
        if(comment !== ''){
            setCommentCheck(true);
        }else{
            setCommentCheck(false);
        }
    },[comment])

    function handleOnChange(e){
        setComment(e.target.value);
    }

    function updateComment(){
        if(commentCheck){
            console.log(comment);
            createCommentApi(postId,comment).then((result)=>{
                console.log(result);
            })
        }
    }

    return(
        <CommentContainer>
            <CommentInputDiv>
                <TextareaAutoSize 
                    placeholder = {"댓글 쓰기..!"}
                    textValue = {comment} 
                    handleChange = {handleOnChange} 
                    minRows={1} maxRows={4}/>
                <AddCommentButton onClick={updateComment} commentCheck = {commentCheck}>
                    <FontAwesomeIcon icon={faComment} size={'2x'}/>
                </AddCommentButton>
            </CommentInputDiv>
            <RegisteredComment></RegisteredComment>
        </CommentContainer>
    );
}

export default PostComment;

const CommentContainer = styled.div`
    display:flex;
    flex-direction:column;

    margin-bottom:1rem; 
`

const CommentInputDiv = styled.div`
    display:flex;
    width:100%;
    height:auto;
    padding-left:8px;
    background-color: #eaeaea;
    border-radius: 15px;
    text-align:center;
    margin-bottom:1rem;
`

const AddCommentButton = styled.div`
    width:48px;
    height:auto;
    align-self:center;
    color: ${({commentCheck}) => commentCheck? `#ffca08` : `#ffca0840`};
`