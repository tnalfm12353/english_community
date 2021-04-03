import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { getMyThumbsUp } from '../lib/api/account/AccountApi';
import { getNewPostsApi, getHotPostsApi } from '../lib/api/post/postApi';

import PostCard from './card/PostCard.jsx';
import CommunityBasicTemplate from './CommunityBasicTemplate.jsx';

const PostCardPagination = ({hits}) =>{
    // 여기서 포스터들을 호출후 받아온 갯수만큼 뿌리기.
    // 포스터 받음과 동시에 따봉 누른 포스터있는지 확인. --> spring boot에서 확인.

    // 페이징 후 myThumbs 고치지 
    // ( 계정패치보다 더 빠르게 포스트 호출이 더 빨라서 response데이터에 있는 mythumbs의 결과가 예상결과값이 안나옴.)
    // ( ==> /auth/post/get-posts 호출 x /post/get-posts로 호출됨 )
    
    // const [myThumbsUp, setMyThumbsUp] = useState();
    
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postId, setPostId] = useState(0);
    const [islastPost, setIsLastPost] = useState(false);
    const [isFetching ,setIsFetching] = useState(false);
    // 스크롤 이벤트로 호출하기 때문에 api호출을 자주해서 postid가 변경이 되면 한번만 api를 호출하게하는 변수 
    const [checkDiff, setCheckDiffOfPostIdOrPage] = useState(false); 

    useEffect(()=>{
        let mounted = true;
        setIsFetching(true);
        if(!hits){ // call new posts
            getNewPostsApi(postId).then(result =>{
                if(mounted){
                    console.log(result);
                    setPosts(result.dataList);
                    setPostId(result.dataList[result.dataList.length-1].id);
                }
            }).then(()=>{
                setIsFetching(false);
            })
        }else if(hits){ //call hot posts
            // 내 생각엔 page넘기고 minusday 값도 넘겨서 해야할듯. 다른 방안도 생각해보길.
            getHotPostsApi(page).then(result =>{
                if(mounted){
                    console.log(result);
                    setPosts(result.dataList);
                    setPage(page + 1);
                }
            }).then(()=>{
                setIsFetching(false);
            })
        }
        return () => mounted = false;
    },[hits])

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);

        return(()=>{
            window.removeEventListener('scroll',handleScroll);
        })
    })

    useEffect(()=>{
        console.log("page ="+page);
        setCheckDiffOfPostIdOrPage(true);
    },[postId,page])

    function getMorePosts(){
        console.log("getMOrePosts");
        setIsFetching(true);
        setCheckDiffOfPostIdOrPage(false);
        if(!hits){
            getNewPosts();
        }else if(hits){
            getHotPosts();
        }
    }

    function getNewPosts(){
        getNewPostsApi(postId).then(result =>{
            if(result.dataList.length !== 0){
                setPosts(posts.concat(result.dataList));
                setPostId(result.dataList[result.dataList.length-1].id);
            }else{
                setIsLastPost(true);
            }
        }).then(()=>{
            setIsFetching(false);
        })
    }

    function getHotPosts(){
        console.log("gdgd");
        getHotPostsApi(page).then(result =>{
            if(result.dataList.length !== 0){
                setPosts(posts.concat(result.dataList));
                setPage( page + 1);
            }else{
                setIsLastPost(true);
            }
        }).then(()=>{
            setIsFetching(false);
        })
    }

    function handleScroll(){        
        const scrollHeight = document.documentElement.scrollHeight;
        const getDataScrollHeight = scrollHeight*3/4
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight >= getDataScrollHeight && !isFetching && !islastPost && checkDiff) {
            console.log("in handlescroll if");
            getMorePosts();
        }
    }
    useEffect(()=>{
        console.log(posts);
    },[posts])

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

export default PostCardPagination;

const Temp = styled.div`

`