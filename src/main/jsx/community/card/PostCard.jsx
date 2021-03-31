import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CardTitle from './CardTitle.jsx';
import CardContent from './CardContent.jsx';
import PostFunctionTemplate from './PostFunctionTemplate.jsx';
import CardImages from '../PostImageSlider.jsx';
import PostComment from '../comment/PostComment.jsx';

import {updateThumbsUpApi} from '../../lib/api/post/postApi';

const PostCard = ({authenticated, postProp})=>{
    const [post] = useState(postProp);
    const [myThumbs, setMyThumbs] = useState(postProp.myThumbs); //이전에 추천을 눌렸는지 확인하는변수
    const [thumbsUp, setThumbsUp] = useState(postProp.thumbsUp); //

    function handleThumbsUp(){
        if(authenticated){
            updateThumbsUpApi(post.id).then(()=>{
                if(!myThumbs){
                    setThumbsUp(thumbsUp + 1);
                    setMyThumbs(true);
                }else{
                    setThumbsUp(thumbsUp - 1);
                    setMyThumbs(false);
                }
            });
        }
    }

    return(
        <PostCardContainer>
            <TitleWrapper>
                <CardTitle 
                    time = {post.createdDateTime}
                    account = {post.account}
                    title = {post.title}/>
            </TitleWrapper>
            <ImagesWrapper>
                <CardImages imagePaths = {post.imagePaths} />
            </ImagesWrapper>
            <ContentWrapper>
                <CardContent content = {post.content}/>
            </ContentWrapper>
            <PostFunctionWrapper>
                <PostFunctionTemplate myThumbs = {myThumbs} thumbsUp = {thumbsUp} updateThumbsUp = {handleThumbsUp}/>
            </PostFunctionWrapper>
            <CommentWrapper>
                <PostComment postId = {post.id} />
            </CommentWrapper>
        </PostCardContainer>
    );
}

export default PostCard;

const PostCardContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
`

const TitleWrapper = styled.div`
    width:100%;
    border-bottom: 1px solid #ccc;
`

const ImagesWrapper = styled.div`
    margin: 0 10px;
`

const ContentWrapper =styled.div`
    margin: 0 15px;
`
const PostFunctionWrapper = styled.div`
    margin: 0 10px;
`

const CommentWrapper = styled.div`
    margin: 0 10px;
`