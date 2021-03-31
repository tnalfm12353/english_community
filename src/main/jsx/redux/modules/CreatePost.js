import { createAction, handleActions} from 'redux-actions';
import { List , Map, fromJS} from 'immutable';

const CHANGE_INPUT= 'CreatePost/CHANGE_INPUT';  // title & content
const CHANGE_FILE = 'CreatePost/CHANGE_FILE';   // img
const CHANGE_POST = 'CreatePost/CHANGE_POST';   // post Type
const REMOVE_FILE = 'CreatePost/REMOVE_FILE';   // remove img
const INITIALIZE_FORM = 'CreatePost/INITALIZE_FORM';
export const CREATE_POST = 'CreatePost/CREATE_POST';

export const changeInput =  createAction(CHANGE_INPUT);
export const changeFile = createAction(CHANGE_FILE);
export const changePost = createAction(CHANGE_POST);
export const removeFile = createAction(REMOVE_FILE);
export const initializeForm = createAction(INITIALIZE_FORM);
export const createPost = createAction(CREATE_POST);

const initialState = fromJS({
    post:Map({
            postType:"",
        inputValues: Map({
            title: "",
            content:""
        }),
        files:List([
        
        ]),
    }),
});

export default handleActions({
    [CHANGE_INPUT]: (state,action) =>{
        const{name,value} = action.payload;
        return state.setIn(['post','inputValues',name],value);
    },
    [CHANGE_FILE]: (state,action) =>{
        console.log(action.payload);
        return state.updateIn(['post','files'], files => files.push(
            Map({
                id: action.payload.id,
                file: action.payload.file
            })
        ))
    },
    [CHANGE_POST]: (state,action)=>{
        return state.setIn(['post','postType'],action.payload);
    },
    [REMOVE_FILE]: (state,action) =>{
        const index= state.getIn(['post','files']).findIndex(file => file.get('id') === action.payload.id);
        return state.deleteIn(['post','files', index]);
    },

    [INITIALIZE_FORM]: (state,action) =>{
        const initializeForm = initialState.get(action.payload);
        return state.set(action.payload,initializeForm);
    },
},initialState);