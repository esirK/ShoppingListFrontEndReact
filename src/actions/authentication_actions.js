import axios from 'axios';
import jwt from 'jsonwebtoken';

import * as types from '../constants/actiontypes';

import {URL, startSubmitting} from './index';

export function submissionSuccessful(message){
	return {
		type: types.SUBMISSION_SUCCESSFUL,
		message
	};
}
export function submissionFailed(error) {
	return{
		type: types.SUBMISSION_ERROR,
		error
	};
}
export function setAuthStatusOfUser(user){
	return {
		type: types.SWITCH_USER_AUTH_STATUS,
		user
	};
}
export function submitDetails(details, callback, route) {
	//route represents the endpoint to send this details
	return (dispatch) => {
		dispatch(startSubmitting());
		return axios.post(`${URL}${route}`, {
			'email': details['email'],
			'name': details['username'],
			'password': details['password']
		}
		).then((data) => {
			if (data.data.token !== undefined){
				//Response has token its a login i.e save the token
				localStorage.setItem('jwt',data.data.token);
				dispatch(setAuthStatusOfUser(jwt.decode(data.data.token)));
			}
			callback();
			dispatch(submissionSuccessful(data.data.message));
		}).catch((error) => {
			if(error.response != null) {
				return dispatch(submissionFailed(error.response.data.message));
			}
			if(!error.status){
				//network error
				return dispatch(submissionFailed(error.message));
			}
		});

	};
}
function show_snack(message){
	return{
		type: types.SHOW_SNACK_BAR,
		message: message
	};
}
export function update_profile(details){
	return(dispatch)=>{
		dispatch(startSubmitting());
		return axios({
			method: 'put',
			url: `${URL}${'user'}`,
			data: {
				name: details['username'],
				password: details['password']
			  },
			auth: {
				username: localStorage.getItem('jwt'),
				password: ''
			}
		}).then((data)=>{
			dispatch(show_snack(data.data.message)); 
		}).catch((error)=>{
			dispatch(show_snack(error.response.data));
		});
	};
}
function hideSb() {
	return{
		type: types.HIDE_SNACK_BAR,
	};
}
export function hideSnackBar() {
	return(dispatch)=>{
		dispatch(hideSb());
	};
}
function userLoggedOut(message){
	return{
		type: types.SHOW_SNACK_BAR,
		message
	};
}
export function Logout(){
	return(dispatch)=>{
		localStorage.removeItem('jwt');
		dispatch(setAuthStatusOfUser({}));
		dispatch(userLoggedOut('You have Been Logged out.'));
	};
}