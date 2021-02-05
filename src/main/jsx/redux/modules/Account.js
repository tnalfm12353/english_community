import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';

const INITIALIZE_FORM = 'Account/INITIALIZE_FORM';
const CHANGE_INPUT = 'LoginAuth/CHANGE_INPUT';


export const REQUEST_LOGIN = 'Account/REQUEST_LOGIN';
export const LOGIN_SUCCESS = 'Account/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'ACcouunt/LOGIN_FAILURE';
export const FETCH_ACCOUNT = 'Account/FETCH_ACCOUNT';
export const LOGOUT = 'Account/LOGOUT';
export const UPDATED_DATA = 'LoginAuth/UPDATE_DATA';

export const changeInput = createAction(CHANGE_INPUT); 
export const getAccountFetch = createAction(FETCH_ACCOUNT);
export const requestLogin = createAction(REQUEST_LOGIN);
export const logOut = createAction(LOGOUT);
export const updateData = createAction(UPDATED_DATA);


const initialState = Map({
    loginForm: Map({
        username: "",
        password: ""
    }),
    account:Map({
        
    }),
    errorMessage:null,
    authenticated:false
});

export default handleActions({
    [INITIALIZE_FORM]:(state,action) =>{
        const initializeForm = initialState.get(action.payload);
        return state.set(action.payload,initializeForm);
    },
    [CHANGE_INPUT]: (state,action) =>{
        const{name,value} = action.payload;
        return state.setIn(['loginForm',name],value);
    },
    [LOGIN_SUCCESS]:(state,action) =>{
        console.log(action.payload);
        return state.set('account',action.payload).set('authenticated',true);
    },
    [LOGIN_FAILURE]:(state,action) =>{
        return state.set('errorMessage',action.payload).set('authenticated',false);
    },
    [UPDATED_DATA]:(state,action) =>{        
        const {name,value} = action.payload;
        return state.setIn(['account',name],value);
    }

},initialState)

