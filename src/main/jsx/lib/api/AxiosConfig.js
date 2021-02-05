export const headers={
  'Accept': 'application/json',
  'Content-Type': 'application/json;charset=UTF-8',
}

export function tokenHeader() {
    const headers={
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': "Bearer "+ localStorage.getItem("jwt")
    }

    return headers;
}

export function formDataHeader(){
  const headers={
    'Content-Type': 'multipart/form-data',
    'Authorization': "Bearer "+ localStorage.getItem("jwt")
  }

  return headers;
}

export const axiosError=(error)=>{
    if(error.response){
      console.log("error.data = " + error.response.data);
      console.log("error.status = " + error.response.status);
      console.log("error.headers = " + error.response.headers);
    }
    else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      console.log("error.request = " + error.request);
    }
    else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }
    console.log(error.config);
}