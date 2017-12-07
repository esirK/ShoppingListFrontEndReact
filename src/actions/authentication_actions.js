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
	console.log('Submission Failed', error);
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
				//Response has token its a login i.e save the token
				localStorage.setItem('jwt',data.data.token);
				dispatch(setAuthStatusOfUser(jwt.decode(data.data.token)));
				console.log('Decoded Token', jwt.decode(data.data.token));
			}
			callback();
			dispatch(submissionSuccessful(data.data.message));
		}).catch((error) => {
			if(error.response != null) {
				return dispatch(submissionFailed(error.response.data.message));
			}
			if(!error.status){
				console.log('heretoo');
				//network error
				return dispatch(submissionFailed(error.message));
			}
		});

	};
}
