import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';

const INITIALIZE_FORM = 'Account/INITIALIZE_FORM';
const CHANGE_INPUT = 'LoginAuth/CHANGE_INPUT';
export const REQUEST_LOGIN = 'Account/REQUEST_LOGIN';
export const LOGIN_SUCCESS = 'Account/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'ACcouunt/LOGIN_FAILURE';
export const FETCH_ACCOUNT = 'Account/FETCH_ACCOUNT';
export const LOGOUT = 'Account/LOGOUT';;

export const changeInput = createAction(CHANGE_INPUT); 
export const getAccountFetch = createAction(FETCH_ACCOUNT);
export const requestLogin = createAction(REQUEST_LOGIN);

const initialState = Map({
    loginForm: Map({
        username: "",
        password: ""
    }),
    account:Map({
        thumbnail:null,
        username:null,
        nickname:null
    }),
    errorMessage:null,
    authenticated:false
});

export default handleActions({
    [INITIALIZE_FORM]:(state,action) =>{
        const initializeForm = accountInfo.get(action.payload);
        return state.set(action.payload,account);
    },
    [CHANGE_INPUT]: (state,action) =>{
        const{name,value} = action.payload;
        return state.setIn(['loginForm',name],value);
    },
    [LOGIN_SUCCESS]:(state,action) =>{
        return state.set('account',action.payload).set('authenticated',true);
    },
    [LOGIN_FAILURE]:(state,action) =>{
        return state.set('errorMessage',action.payload).set('authenticated',false);
    }

},initialState)

