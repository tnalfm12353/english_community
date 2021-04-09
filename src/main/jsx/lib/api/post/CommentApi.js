import axios from 'axios';
import { tokenHeader } from '../AxiosConfig';

export function createCommentApi(postId, comment){
    return axios.post('/auth/post/comment/'+postId+'/create-comment', comment, {headers:tokenHeader()})
                .then(response =>({response}))
                .catch(error => ({error}))
}

export function deletePostCommentApi(commentId){
    return axios.get('/auth/post/comment/'+commentId+'/delete',{headers:tokenHeader()})
                .then(response=>({response}))
                .catch(error => ({error}));
}