import axios from "axios"
export const API_BASE_URL="http://localhost:8080";

export async function login(loginRequest){
    const auth= await axios.post(API_BASE_URL+'/api/auth/login',loginRequest)
        let token='Bearer '+ auth.data.accessToken;
        sessionStorage.setItem('Authorization',token)
        
    
}
export function getCurrentUser(){
    if(!sessionStorage.getItem('Authorization')){
        return Promise.reject('No access token set');
    }
    return Promise.resolve('got token');
}
export async function register(registerRequest){
    await axios.post(API_BASE_URL+'/api/auth/register',registerRequest)

}
