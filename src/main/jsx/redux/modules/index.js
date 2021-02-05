import { combineReducers } from 'redux';
import {tokenHeader} from '../../lib/api/AxiosConfig';
import Account from './Account';
import UpdateAccount from './UpdateAccount';

const combineReducer = combineReducers({
    Account,
    UpdateAccount
});


export default function rootReducers(state,action){
    // console.log("root Reducers : state =>" + JSON.stringify(state));
    console.log("root Reducers : action =>" +JSON.stringify(action));
    if(action.type === "Account/LOGOUT") {
        localStorage.removeItem('jwt');
        tokenHeader();
        state = undefined;
    }
    return combineReducer(state,action);
}
