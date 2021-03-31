import { createAction, handleActions} from 'redux-actions';
import { List , Map, fromJS} from 'immutable';

const GET_POST = 'Post/GET_POST';
const INITIALIZE_FORM = "Post/INITIALIZE_FORM";

export const getPost =  createAction(GET_POST);

const initialState = fromJS({
    post:List([

    ]),
});

export default handleActions({
    [INITIALIZE_FORM]: (state,action) =>{
        const initializeForm = initialState.get(action.payload);
        return state.set(action.payload,initializeForm);
    },
    [GET_POST]: (state,action) =>{
        
    }
},initialState);