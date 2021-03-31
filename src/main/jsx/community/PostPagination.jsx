import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { getMyThumbsUp } from '../lib/api/account/AccountApi';
import { getPostsApi } from '../lib/api/post/postApi';

import PostCard from './card/PostCard.jsx';
import CommunityBasicTemplate from './CommunityBasicTemplate.jsx';

const PostPagination = () =>{
    // 여기서 포스터들을 호출후 받아온 갯수만큼 뿌리기.
    // 포스터 받음과 동시에 따봉 누른 포스터있는지 확인. --> spring boot에서 확인.

    // 페이징 후 myThumbs 고치지 
    // ( 계정패치보다 더 빠르게 포스트 호출이 더 빨라서 response데이터에 있는 mythumbs의 결과가 예상결과값이 안나옴.)
    // ( ==> /auth/post/get-posts 호출 x /post/get-posts로 호출됨 )
    
    // const [myThumbsUp, setMyThumbsUp] = useState();
    
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        let mounted = true;
        getPostsApi().then(result =>{
            if(mounted)setPosts(result.dataList);
        })
        return () => mounted = false;
    },[])
    
    return(
        <>
        {posts.map(post =>(
            <CommunityBasicTemplate key={post.id}    
                    content = {
                        <PostCard postProp = {post}/>
                    }
            />
        ))}
        </>
    );
}

export default PostPagination;

const Temp = styled.div`

`