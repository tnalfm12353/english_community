import "regenerator-runtime/runtime";
import {call,put,select} from 'redux-saga/effects';
import {LOGIN_SUCCESS,LOGIN_FAILURE} from '../modules/Account';
import {FetchAccount, LogInApi} from '../../lib/api/account/AccountApi';

const getLoginForm = (state) => {
    return state.Account.get('loginForm').toJS();
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
    console.log(response);
    yield put({type:LOGIN_SUCCESS, payload: response});
}