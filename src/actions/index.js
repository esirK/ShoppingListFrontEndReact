import axios from 'axios';
import jwt from 'jsonwebtoken';
import {setAthorizationToken} from '../components/helpers';

import * as types from '../constants/actiontypes';


const URL = 'http://127.0.0.1:5000/v1/';

export function resetErrors() {
	return(dispatch) => {
		dispatch({
			type: types.CLEAR_ERRORS
		});
	};
}
export function startSubmitting(){
	console.log('Started Submitting....');
	return {
		type: types.SUBMITTING_STARTED
	};
}
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
	return (dispatch) => {
		dispatch(startSubmitting());
		return axios.post(`${URL}${route}`, {
			'email': details['email'],
			'name': details['username'],
			'password': details['password']
		}
		).then((data) => {
			console.log('Success1', data.data.message);
			console.log('Success2 Token', data.data.token);
			if (data.data.token !== undefined){
				localStorage.setItem('jwt',data.data.token);
				setAthorizationToken(data.data.token);
				dispatch(setAuthStatusOfUser(jwt.decode(data.data.token)));
				console.log('Decoded Token', jwt.decode(data.data.token));
			}
			callback();
			dispatch(submissionSuccessful(data.data.message));

		}).catch((error) => {
			console.log('error', error.response);
			dispatch(submissionFailed(error.response));
		});

	};
}