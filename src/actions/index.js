import axios from 'axios';


export const REGISTER_USER = 'REGISTER_USER';
const URL = `http://127.0.0.1:5000/v1/register`;

export function registerUser(details) {
    console.log(details);
    const request = axios.post(URL, {
        "email": details['email'],
        "name": details['username'],
        "password": details['password']
    });
    return{
        type: REGISTER_USER,
        payload: request
    };
}