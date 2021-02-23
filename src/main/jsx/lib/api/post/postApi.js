import axios from 'axios';
import { formDataHeader } from '../AxiosConfig';
import { convertFile } from '../fileConvert';
export function createPostApi(post){
    let data = new FormData();
    data.append('title',post.inputValues.title);
    data.append('content',post.inputValues.content);
    console.log(post.files.lenght);
    if(post.files.lenght != 0){
        for(let i = 0; i<post.files.lenght; i++){
            let convertedFile = convertFile(post.files[i].file);
            data.append('files',convertedFile);
        }
    }

    for (var value of data.values()) {
        console.log(value);
    }

    return axios.post('/auth/post/create-post',data,{headers:formDataHeader()})
                .then(response =>({response}))
                .catch(error =>({error}));
}