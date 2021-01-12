import axios from 'axios';
import {headers,axiosError, tokenHeader} from '../AxiosConfig';

export const SignUpValueIsExist = (name,value)=>{
    let data = JSON.stringify({ being:value});
    const mappingValue = '/signup/valid-'+name;
    
    axios
        .post(mappingValue, data, {
            axiosHeader
        })
        .then(function (response) {
            
            
        }.bind(this))
        .catch(axiosError);
}

export const SignUpApi=(mappingValue,data)=>{
  axios.post(mappingValue,data,{headers})
        .then(function(response){
          console.log(response);
        })
        .catch(function(error){axiosError(error)});

}

export function LogInApi(data){
  return axios.post("/login",data,{headers})
              .then(response=>({response}))
              .catch(error =>({error}));
}

const tokenHeaders = tokenHeader();

export function FetchAccount(){
  return axios.get("/auth/account/select-current-account",{headers:tokenHeaders})
              .then(response=>({response}))
              .catch(function(error){axiosError(error)});
}

export function getAccountProfile(id){
  return axios.get("/auth/account/get-account-profile/"+id,{headers:tokenHeaders})
              .then(response=>response.data)
              .catch(function(error){axiosError(error)});
}