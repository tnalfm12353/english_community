import "regenerator-runtime/runtime";
import axios from 'axios';
import {call,put,select} from 'redux-saga/effects';
import {LOGIN_SUCCESS,LOGIN_FAILURE} from '../modules/Account';
import {FetchAccount, LogInApi} from '../../lib/api/account/AccountApi';

const getLoginForm = (state) => {
    return state.Account.get('loginForm').toJS();
}


export function* fetchAccount(){
    const {response}= yield call(FetchAccount);
    console.log(response.data);

    if(response){
        yield call(setAccountInfo,response.data);
    }else{
        localStorage.clear();
    }
    
}

export function* loginFlow(){
    const data = yield select(getLoginForm);
    const {response,error} = yield call(LogInApi,data);
    if(response){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ response.data.jwt;

        yield call(setAccountInfo,response);
        //TODO refresh token을 만들어서 쿠키에 담아야함.
        localStorage.setItem("jwt",response.data.jwt); 
        // yield call(fetchAccount,response.data.jwt);
    }else{
        yield put({type: LOGIN_FAILURE, payload: error.response.data});
    }
}

function* setAccountInfo(response){
    const accountInfo = {
        id: response.data.id,
        username : response.data.username,
        nickname : response.data.nickname
    }
    yield put({type:LOGIN_SUCCESS, payload: accountInfo});
}