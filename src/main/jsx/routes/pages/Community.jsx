import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {device} from '../../lib/style/Device';
import PostIcon from '../../../webapp/img/pencil_icon.png';
import CreatePost from '../../community/create/CreatePost.jsx';
import Axios from 'axios';

const Community = () =>{
    const canvasIconRef = useRef();
    const forumType = [];
    const selectedForum = "all";
    // account가 null이라면 버튼 없애기.
    const [createPost, setCreatePost] = useState(false);


    function callCreatePost(){setCreatePost(true);}

    function closeCreatePost(){setCreatePost(false);}
    
    useEffect(()=>{
        const canvas = canvasIconRef.current;
        const ctx = canvas.getContext('2d');
        
        let iconImage = new Image();
        iconImage.src = PostIcon;
        iconImage.addEventListener('load',()=>{
           ctx.drawImage(iconImage,0,0,64,64);
        });
    },[]);

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
            <CommunityNavi>

            </CommunityNavi>
            <CommunityContent>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Temp>gdgd</Temp>
                {/* <StickyNavi forumTypes = {forumTypes} onChange={onClickSelectedForum}/> */}
                <CreatePostIcon ref={canvasIconRef} width="64" height="64"  onClick={()=>{callCreatePost()}}></CreatePostIcon>
            </CommunityContent>
            <CommunityTemp></CommunityTemp>
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
    height:200vh;
    top:0;
`

const CommunityNavi = styled.div`
    flex-grow:1;
    
    @media ${device.mobileL}{
        display:none;
    }
`

const CommunityContent = styled.div`    
    min-width: 60vw;
    flex-grow:3;
`
const CreatePostIcon = styled.canvas`
    position: fixed;
    top:85%;
    left:72%;
    width:4rem;
    height:4rem;
    border-radius: 50%;
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
const CommunityTemp = styled.div`
    flex-grow:1;
    @media ${device.laptop}{
        display:none;
    }
`

const Temp =  styled.div`
    margin:auto;
    position:sticky;
    top:55px;
    width: 300px;
    height: 100px;
    border:1px solid #ffca;
    background:#ffca;
`