import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { getMyThumbsUp } from '../lib/api/account/AccountApi';
import { getNewPostsApi } from '../lib/api/post/postApi';

import PostCard from './card/PostCard.jsx';
import CommunityBasicTemplate from './CommunityBasicTemplate.jsx';
import UpdatePost from './createAndUpdate/UpdatePost.jsx';

const PostCardNewPost = (props) =>{
    // 여기서 포스터들을 호출후 받아온 갯수만큼 뿌리기.
    // 포스터 받음과 동시에 따봉 누른 포스터있는지 확인. --> spring boot에서 확인.

    // 페이징 후 myThumbs 고치지 
    // ( 계정패치보다 더 빠르게 포스트 호출이 더 빨라서 response데이터에 있는 mythumbs의 결과가 예상결과값이 안나옴.)
    // ( ==> /auth/post/get-posts 호출 x /post/get-posts로 호출됨 )
    
    // const [myThumbsUp, setMyThumbsUp] = useState();

    const [forumtype, setForumType] = useState(props.match.params.forumType);// 추후 포럼타입이 생기면 이걸로 api호출
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(0);
    const [islastPost, setIsLastPost] = useState(false);
    const [isFetching ,setIsFetching] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    // 스크롤 이벤트로 호출하기 때문에 api호출을 자주해서 postid가 변경이 되면 한번만 api를 호출하게하는 변수 
    const [checkDiff, setCheckDiffOfPostId] = useState(false); 

    useEffect(()=>{
        let mounted = true;
        setIsFetching(true);
            getNewPostsApi(postId).then(result =>{
                if(mounted){
                    setPosts(result.dataList);
                    setPostId(result.dataList[result.dataList.length-1].id);
                }
            }).then(()=>{
                setIsFetching(false);
            })
        return () => mounted = false;
    },[])

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);

        return(()=>{
            window.removeEventListener('scroll',handleScroll);
        })
    })

    useEffect(()=>{
        setCheckDiffOfPostId(true);
    },[postId])

    function getMorePosts(){
        setIsFetching(true);
        setCheckDiffOfPostId(false);
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

    function handleScroll(){        
        const scrollHeight = document.documentElement.scrollHeight;
        const getDataScrollHeight = scrollHeight*3/4
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight >= getDataScrollHeight && !isFetching && !islastPost && checkDiff) {
            getMorePosts();
        }
    }

    function handleDeletePost(postId){
        deletePostApi(postId).then(result =>{
            if(result.response.status === 200){
                setPosts(posts.filter(post => post.id !== postId));
            }
        })
    }
    function handleUpdatePost(postId){
        if(updateModal){

        }
    }

    return(
        <>
        {posts.map(post =>(
            <CommunityBasicTemplate key={post.id}    
                    content = {
                        <PostCard 
                            postProp = {post}
                            deletePost = {handleDeletePost}
                            // updatePost = {handleUpdatePost}
                        />
                    }
            />
        ))}
        </>
    );
}

export default PostCardNewPost;