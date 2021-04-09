import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { getMyThumbsUp } from '../lib/api/account/AccountApi';
import { deletePostApi, getHotPostsApi } from '../lib/api/post/postApi';

import PostCard from './card/PostCard.jsx';
import CommunityBasicTemplate from './CommunityBasicTemplate.jsx';

const PostCardHotPost = (props) =>{
    // 여기서 포스터들을 호출후 받아온 갯수만큼 뿌리기.
    // 포스터 받음과 동시에 따봉 누른 포스터있는지 확인. --> spring boot에서 확인.

    // 페이징 후 myThumbs 고치지 
    // ( 계정패치보다 더 빠르게 포스트 호출이 더 빨라서 response데이터에 있는 mythumbs의 결과가 예상결과값이 안나옴.)
    // ( ==> /auth/post/get-posts 호출 x /post/get-posts로 호출됨 )
    
    // const [myThumbsUp, setMyThumbsUp] = useState();
    
    const [forumtype, setForumType] = useState(props.match.params.forumType);// 추후 포럼타입이 생기면 이걸로 api호출
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [minusDays, setMinusDays] = useState(1);
    const [islastPost, setIsLastPost] = useState(false);
    const [isFetching ,setIsFetching] = useState(false);
    // 스크롤 이벤트로 호출하기 때문에 api호출을 자주해서 postid가 변경이 되면 한번만 api를 호출하게하는 변수 
    const [checkDiff, setCheckDiffOfPage] = useState(false); 

    /*
        minusday 기준으로 hotpost를 조회하는데 
        (현재 시간 - minusday + 1) 과  (현재시간 + minusday) 사이의 thumbsup 순차적으로 부름.
        위의 당일날 추천이 많으면 pageable함수로 페이징하고 없다면 minusdays를 하루 더 늘림.
        
        단점)
        1. 쿼리가 남발됨 (minusdays가 하루 추가될려면 조회를하고 없으면 minusdays + 1 한후 다시 조회하는 방안이라 쿼리가 2번실행.. )
            ==> 인기포스트가 많으면 큰 리스크는 아니라고 생각됨..
        2. 처음 추천게시물이 없으면 스크롤이 없어서 minusDays값이 달라질때마다 한번씩 호출함.
    */
    useEffect(()=>{
        let mounted = true;
        setIsFetching(true);
        getHotPostsApi(page, minusDays).then(result =>{
            if(mounted){
                setPosts(result.dataList);
                setPage(page + 1);
            }
        }).then(()=>{
            setIsFetching(false);
        })
        return () => mounted = false;
    },[])

    useEffect(()=>{
        // 포스트가 존재할때까지 호출함. 최대 10일. ==> 포스트가 아무것도 없다면 쿼리가 총 20번....
        if(posts.length === 0){
            getMorePosts();
        }
    },[minusDays])

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);

        return(()=>{
            window.removeEventListener('scroll',handleScroll);
        })
    })

    useEffect(()=>{
        setCheckDiffOfPage(true);
    },[page])

    function getMorePosts(){
        setIsFetching(true);
        setCheckDiffOfPage(false);
        getHotPostsApi(page,minusDays).then(result =>{
            if(result.dataList.length !== 0){
                setPosts(posts.concat(result.dataList));
                setPage( page + 1);
            }else if(minusDays < 10){
                setPage( 0 );
                setMinusDays( minusDays + 1);
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

    return(
        <>
        {
            posts.map(post =>(
                <CommunityBasicTemplate key={post.id}    
                        content = {
                            <PostCard 
                                postProp = {post}
                                deletePost = {handleDeletePost}
                            />
                        }
                />
            ))    
        }
        </>
    );
}

export default PostCardHotPost;