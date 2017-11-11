import axios from 'axios';
import * as types from '../constants/actiontypes'


const URL = `http://127.0.0.1:5000/v1/register`;

export function startRegisteing(){
    console.log("started....");
    return {
        type: types.REGISTRATION_STARTED
    };
}
export function RegistrationSuccessfull(res){
    return {
      type: types.REGISTRATION_SUCCESSFUL,
        payload: res
    };
}
export function registerUser(details, callback) {
    return(dispatch) =>{
        dispatch(startRegisteing());
        axios.post(URL, {
            "email": details['email'],
            "name": details['username'],
            "password": details['password']
        }).then((data) =>{
            callback();
            dispatch(RegistrationSuccessfull(data))
        }).catch((err) => console.log('error', err))
    }
}