import "regenerator-runtime/runtime";
import {call,put,select} from 'redux-saga/effects';
import {createPostApi} from '../../lib/api/post/postApi';
const getCreatePost = (state) =>{
    return state.CreatePost.get('post').toJS();
}

export function* createPost(){
    const post = yield select(getCreatePost);
    console.log(post);
    // const {response,error} = yield call(createPostApi,post);
    yield call(createPostApi,post);
}