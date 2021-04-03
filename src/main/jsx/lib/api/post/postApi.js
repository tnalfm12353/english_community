import axios from 'axios';
import { formDataHeader, tokenHeader } from '../AxiosConfig';
import { dataURLtoBlob } from '../fileConvert';
export function createPostApi(post){
    let data = new FormData();
    data.append('title',post.inputValues.title);
    data.append('content',post.inputValues.content);
    
    if(post.files.length != 0){
        for(let i = 0; i<post.files.length; i++){
            let convertedFile = dataURLtoBlob(post.files[i].file);
            console.log(convertedFile);
        
            data.append('files',convertedFile);
        }
    }

    return axios.post('/auth/post/create-post',data,{headers:formDataHeader()})
                .then(response =>({response}))
                .catch(error =>({error}));
}

export function getHotPostsApi(page){
    let mappingValue = '/post/get-posts/hot/'+page;
    //매개변수로 포럼타입과 인기게시글 혹은 신규게시글 받기.
    return axios.get(mappingValue, {headers:tokenHeader()})
                .then((response) =>(response.data))
                .catch(error =>({error}))
}

export function getNewPostsApi(id){
    let mappingValue = '/post/get-posts/new/'+id;
    //매개변수로 포럼타입과 인기게시글 혹은 신규게시글 받기.
    return axios.get(mappingValue, {headers:tokenHeader()})
                .then((response) =>(response.data))
                .catch(error =>({error}))
}

export function getImageApi(data){
    return axios.get('/post/get-image/'+data,{responseType:'arraybuffer'}).then(response=>response.data).catch(error=>({error}));
}

export function updateThumbsUpApi(data){
    const mappingValue = '/auth/post/'+data+'/thumbs-up';
    return axios.post(mappingValue , null , {headers:tokenHeader()})
                .then(response =>({response}))
                .catch(error =>({error}))
}