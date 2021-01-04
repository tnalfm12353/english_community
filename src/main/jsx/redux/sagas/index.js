import {all, fork, call, takeLatest} from 'redux-saga/effects';
import * as authActions from '../modules/Account';
import {loginFlow,fetchAccount} from './AccountSaga';

export function* RootSaga(){
    yield all([
        takeLatest(authActions.FETCH_ACCOUNT, fetchAccount),
        takeLatest(authActions.REQUEST_LOGIN, loginFlow)
    ])
}