import axios from 'axios';
import { formDataHeader } from '../AxiosConfig';
import { resizeFile,dataURLtoBlob } from '../fileConvert';
export function createPostApi(post){
    let data = new FormData();
    data.append('title',post.inputValues.title);
    data.append('content',post.inputValues.content);
    
    if(post.files.length != 0){
        for(let i = 0; i<post.files.length; i++){
            // let resizedFile = resizeFile(post.files[i].file);
            let convertedFile = dataURLtoBlob(post.files[i].file);
            console.log(convertedFile);
        
            data.append('files',convertedFile);
        }
    }

    // for (var value of data.values()) {
    //     console.log(value);
    // }

    return axios.post('/auth/post/create-post',data,{headers:formDataHeader()})
                .then(response =>({response}))
                .catch(error =>({error}));
}