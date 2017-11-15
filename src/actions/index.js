import axios from 'axios';

import * as types from '../constants/actiontypes';


const URL = 'http://127.0.0.1:5000/v1/';

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
export function submitDetails(details, callback, route) {
	return (dispatch) => {
		dispatch(startSubmitting);
		return axios.post(`${URL}${route}`, {
			'email': details['email'],
			'name': details['username'],
			'password': details['password']
		}
		).then((data) => {
			console.log('Success', data.data.message);
			callback();
			dispatch(submissionSuccessful(data.data.message));
			// resolve(data);
		}).catch((error) => {
			// console.log('error here', error.response.data.message);
			console.log('error', error.response);
			dispatch(submissionFailed(error.response));
		});

	};
}