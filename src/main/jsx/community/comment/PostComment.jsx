import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RegisteredComment from './RegisteredComment.jsx';
import TextareaAutoSize from '../../components/TextareaAutoSize.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';

import { createCommentApi } from '../../lib/api/post/CommentApi';
const PostComment = ({postId , registeredComments}) =>{
    const [isExist, setIsExist] = useState(false);
    const [comment, setComment] = useState('');
    const [commentCheck, setCommentCheck] = useState(false);
    // 댓글을 한번에 다 뿌리는게 아니라 more comments를 누르면 댓글을 담아 뿌리기위함
    const [viewComments , setViewComments] =useState([]);
    const [currentViewCommentsLength, setCurrentViewCommentsLength] = useState(0);
    const [isToomanyComments, setIsTooManyComments] = useState(false);

    useEffect(()=>{
        if(registeredComments.length !== 0){
            setIsExist(true);
            if(registeredComments.length > 2){
                setViewComments(registeredComments.slice(0,2));
                setIsTooManyComments(true);
            }else{
                setViewComments(registeredComments);
            }
        }
    },[])

    useEffect(()=>{
        if(comment !== ''){
            setCommentCheck(true);
        }else{
            setCommentCheck(false);
        }
    },[comment])

    useEffect(()=>{
        setCurrentViewCommentsLength(viewComments.length);
    },[viewComments])

    function addMoreComments(){
        if(registeredComments.length > currentViewCommentsLength){
            if(registeredComments.length> currentViewCommentsLength + 5){
                setViewComments(viewComments.concat(
                                    registeredComments.slice(currentViewCommentsLength, currentViewCommentsLength+5)));
                setIsTooManyComments(true);
            }else{
                setViewComments(viewComments.concat(
                                    registeredComments.slice(currentViewCommentsLength)));
                setIsTooManyComments(false);
            }
        }
    }


    function handleOnChange(e){
        setComment(e.target.value);
    }

    function updateComment(){
        if(commentCheck){
            createCommentApi(postId,comment).then((result)=>{
                if(result.response.status === 200){
                    setViewComments([...viewComments,result.response.data.data]);
                    setComment("");
                }
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
                <RegisterCommentButton onClick={updateComment} commentCheck = {commentCheck}>
                    <FontAwesomeIcon icon={faComment} size={'2x'}/>
                </RegisterCommentButton>
            </CommentInputDiv>
            {   isExist?
                viewComments.map(registed=>(
                    <RegisteredComment 
                        key = {registed.id}
                        account = {registed.account}
                        time = {registed.createdDateTime}
                        comment ={registed.comment}
                    />
                ))
                :null
            }
            {
                isToomanyComments?
                <MoreCommentsButton onClick={addMoreComments}>More Comments</MoreCommentsButton>
                :
                null
            }         
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

const RegisterCommentButton = styled.div`
    width:48px;
    height:auto;
    align-self:center;
    color: ${({commentCheck}) => commentCheck? `#ffca08` : `#ffca0840`};
`
const MoreCommentsButton = styled.div`
    padding: 10px;
    margin:0 auto;
    font-size:.8rem;
    color:gray;
`