import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {device} from '../../lib/style/Device';
import PostIcon from '../../../webapp/img/pencil_icon.png';
import CreatePost from '../../community/create/CreatePost.jsx';
import PostPagination from '../../community/PostPagination.jsx';
import CommunityBasicTemplate from '../../community/CommunityBasicTemplate.jsx';
import ForumTypeSticky from '../../community/ForumTypeSticky.jsx';
import { useSelector } from 'react-redux';

const Community = () =>{
    const canvasIconRef = useRef();
    const authenticated = useSelector(state=> state.Account.get('authenticated'));

    const notice = "학생회 혹은 학교 공지";

    const[selectedForum, setSelectedForum] = useState('general'); //현재 고른 포럼.
    const[postViewType, setPostViewType] = useState('card'); // 게시글을 카드형태, 라인형태(쿠키사용)
    const[hits, setHits] = useState(true); //true ->인기 게시글 false -> 새 게시물.

    
    const [createPost, setCreatePost] = useState(false);

    function callCreatePost(){ if(authenticated) setCreatePost(true); }
    function closeCreatePost(){ setCreatePost(false); }
    
    useEffect(()=>{
        if(authenticated){
            const canvas = canvasIconRef.current;
            const ctx = canvas.getContext('2d');
            
            let iconImage = new Image();
            iconImage.src = PostIcon;
            iconImage.addEventListener('load',()=>{
               ctx.drawImage(iconImage,0,0,64,64);
            });
        }
    },[authenticated]);

    // getForumTypes(){
    //     Axios.get('Post/GetForumTypes',{
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json;charset=UTF-8'
    //         }
    //     }).then((response)=>{
    //         setState({forumTypes: response.data});
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     });
    // }
    
    // onClickSelectedForum(e){
    //     setState({
    //         selectedForum : e.target.value
    //     })
    // }

    
    return(
        <CommunityContainer>
            <EmptySpace />
            <CommunityContent>
                <CommunityBasicTemplate
                    content = {notice}
                />
                <ForumTypeSticky hits = {hits}/>
                <PostPagination 


                />
                {authenticated &&
                <CreatePostIcon ref={canvasIconRef} width="64" height="64"  onClick={()=>{callCreatePost()}}></CreatePostIcon>}
            </CommunityContent>
            <CommunityStudyGroupNotice>
               스터디 그룹을 간략하게
            </CommunityStudyGroupNotice>
            {
                createPost?
                <CreatePost
                    onClose={closeCreatePost}
                />
                : null
            }
        </CommunityContainer>
    );
}

export default Community;

const CommunityContainer = styled.div`
    display:flex;
    width:100%;
    height:auto;
    top:0;
`

const EmptySpace = styled.div`
    flex-grow:1;

    @media ${device.laptop}{
        display:none;
    }
`

const CommunityContent = styled.div`    
    width:60%;
    flex-grow:3;

    @media ${device.laptop}{
        width: 100%;
    }
`
const CreatePostIcon = styled.canvas`
    position: fixed;
    top:85%;
    left:72%;
    width:4rem;
    height:4rem;
    border-radius: 50%;
    border:1px solid #eee;
    background: rgba(255,255,255,0.1);
    backdrop-filter: saturate(180%) blur(3px);
    
    @media ${device.laptop}{
        left:90%
    }

    @media only screen and (max-width:600px){
        left:80%;
        width:3.5rem;
        height:3.5rem;
    }

`
const CommunityStudyGroupNotice = styled.div`
    flex-grow:1;

    @media ${device.laptop}{
        display:none;
    }
`