import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';

const INITIALIZE_FORM = 'UpdateAccount/INITIALIZE_FORM';
const CHANGE_DATA = 'UpdateAccount/CHANGE_DATA';
export const UPDATE_NICKNAME = 'UpdateAccount/UPDATE_NICKNAME';
export const UPDATE_THUMBNAIL = 'UpdateAccount/UPDATE_THUMBNAIL';

export const changeData = createAction(CHANGE_DATA); 
export const updateNickname = createAction(UPDATE_NICKNAME);
export const updateThumbnail = createAction(UPDATE_THUMBNAIL);

const initialState = Map({

    nickname:null,
    thumbnail:null,

    user:Map({
        major:null,
        position:null,
        studentNum:null,
        bio:null
    })
});

export default handleActions({
    [INITIALIZE_FORM]:(state,action) =>{
        const initializeForm = accountInfo.get(action.payload);
        return state.set(action.payload,account);
    },
    [CHANGE_DATA]:(state,action) =>{
        const {name,value} = action.payload;
        return state.set(name,value);
    },

},initialState)

