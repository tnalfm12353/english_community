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

export function getPostsApi(){
    let mappingValue = '/post/get-posts';
    const headers = tokenHeader();
    const checkingAuth = headers.Authorization.split("Bearer");
    if(checkingAuth[1] === null){ //사용자가 좋아요를 눌렷는지 확인하기 위함으로 토큰이 존재하는지 확인.
        mappingValue = '/auth/post/get-posts';
    }
    //매개변수로 포럼타입과 인기게시글 혹은 신규게시글 받기.
    return axios.get(mappingValue, {headers:headers})
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