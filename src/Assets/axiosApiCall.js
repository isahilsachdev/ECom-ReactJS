import axios from 'axios';
const baseURL = "http://localhost:5001/"

function axiosApiCall(url,method,data){
    console.log(`Api call success on url ${process.env.REACT_APP_BASE_URL}${url} for ${method} method with ${data}.`);
    return axios[method.toLowerCase()]
    (`${baseURL}${url}`, data);
}


export default axiosApiCall;