import {all,takeLatest} from 'redux-saga/effects';
import * as authActions from '../modules/Account';
import * as updateActions from '../modules/UpdateAccount';
import * as createPostActions from '../modules/CreatePost';
import {loginFlow,fetchAccount,updateNickname,updateThumbnail} from './AccountSaga';
import {createPost} from './PostSaga';
export function* RootSaga(){
    yield all([
        takeLatest(authActions.FETCH_ACCOUNT, fetchAccount),
        takeLatest(authActions.REQUEST_LOGIN, loginFlow),
        takeLatest(updateActions.UPDATE_NICKNAME, updateNickname),
        takeLatest(updateActions.UPDATE_THUMBNAIL, updateThumbnail),
        takeLatest(createPostActions.CREATE_POST,createPost),
    ])
}