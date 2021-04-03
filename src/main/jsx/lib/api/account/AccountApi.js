import axios from 'axios';
import {headers,axiosError, tokenHeader,formDataHeader} from '../AxiosConfig';

export function SignUpValueIsExist(name,value){
    let data = JSON.stringify({ isExist:value});
    const mappingValue = '/sign-up/valid-'+name;
    return axios.post(mappingValue, data, {headers})
                .then(response=>response.data)
                .catch(function(error){axiosError(error)});
    
}

export const SignUpApi=(mappingValue,data)=>{
  return axios.post(mappingValue,data,{headers})
              .then((response) =>response)
              .catch(function(error){axiosError(error)});

}

export function LogInApi(data){
  return axios.post("/login",data,{headers})
              .then(response=>({response}))
              .catch(error =>({error}));
}

export function FetchAccount(){
  return axios.get("/auth/account/select-current-account",{headers:tokenHeader()})
              .then(response=>({response}))
              .catch(function(error){axiosError(error)});
}

export function getAccountProfile(id){
  return axios.get("/auth/account/get-account-profile/"+id,{headers:tokenHeader()})
              .then(response=>response.data)
              .catch(function(error){axiosError(error)});
}

export function updateAccount(name,value){
  console.log(value);
  let data;
  
  switch (name) {
    case "nickname": data = JSON.stringify({"nickname":value})
      break;
    case "password": data = value;
    default:
      break;
  };

  const mappingValue = '/auth/account/settings/'+name;
  return axios.post(mappingValue, data, {headers:tokenHeader()})
              .then(response=>({response}))
              .catch(error =>({error}));
    
}

export function updateThumbnailApi(data){
  
  return axios.post('/auth/account/settings/thumbnail',data,{headers:formDataHeader()})
              .then(response=>({response}))
              .catch(error =>({error}));
}

export function deleteThumbnailApi(){
  return axios.get('/auth/account/settings/thumbnail/delete',{headers:tokenHeader()})
}

export function getThumbnail(data){
  return axios.get('/profile/thumbnail/'+data,{responseType:'arraybuffer'}).then(response=>response.data).catch(error=>({error}));
}

export function updateUserInfo(data){
  return axios.post('/auth/account/settings/user-info',data,{headers:tokenHeader()})
              .then(response=>({response}))
              .catch(error=>({error}));
}