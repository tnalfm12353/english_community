import { combineReducers } from 'redux';

import Account from './Account';

const combineReducer = combineReducers({
    Account
});


export default function rootReducers(state,action){
    console.log("root Reducers : state =>" + JSON.stringify(state));
    console.log("root Reducers : action =>" +JSON.stringify(action));
    
    return combineReducer(state,action);
}
