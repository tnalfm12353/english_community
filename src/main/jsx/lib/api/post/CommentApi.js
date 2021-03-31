import axios from 'axios';
import { tokenHeader } from '../AxiosConfig';

export function createCommentApi(postId, comment){
    console.log(postId);
    console.log(comment);
    return axios.post('/auth/post/comment/'+postId+'/create-comment', comment, {headers:tokenHeader()})
                .then(response =>({response}))
                .catch(error => ({error}))
}