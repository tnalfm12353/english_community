import "regenerator-runtime/runtime";
import {call,put,select} from 'redux-saga/effects';
import {LOGIN_SUCCESS,LOGIN_FAILURE,UPDATED_DATA} from '../modules/Account';
import {FetchAccount, LogInApi, updateAccount, updateThumbnailApi} from '../../lib/api/account/AccountApi';

const getLoginForm = (state) => {
    return state.Account.get('loginForm').toJS();
}

const getNickname = (state) =>{
    return state.UpdateAccount.get('nickname');
}
const getThumbnail = (state) =>{
    return state.UpdateAccount.get('thumbnail');
}

export function* fetchAccount(){
    const {response}= yield call(FetchAccount);

    if(response){
        yield call(setAccountInfo,response.data.data);
    }else{
        localStorage.clear();
    }
    
}

export function* loginFlow(){
    const data = yield select(getLoginForm);
    const {response,error} = yield call(LogInApi,data);
    if(response){
        yield call(setAccountInfo,response.data.account);
        //TODO refresh token을 만들어서 쿠키에 담아야함.
        localStorage.setItem("jwt",response.data.jwt); 
    }else{
        yield put({type: LOGIN_FAILURE, payload: error.response.data});
    }
}

function* setAccountInfo(response){
    yield put({type:LOGIN_SUCCESS, payload: response});
}

export function* updateNickname(){
    const nickname = yield select(getNickname);
    yield call(updateAccount,"nickname",nickname);
    yield put({type: UPDATED_DATA, payload:{name:"nickname",value:nickname}});
}

export function* updateThumbnail(){
    const thumbnail = yield select(getThumbnail);
    yield call(updateThumbnailApi,thumbnail);
    yield put({type: UPDATED_DATA, payload:{name:"thumbnail",value:thumbnail}});
}
