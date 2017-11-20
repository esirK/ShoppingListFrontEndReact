import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from '../constants/actiontypes';


const URL = 'http://127.0.0.1:5000/v1/';

export function resetErrors() {
	console.log('Clearing...');
	return{
		type: types.CLEAR_ERRORS
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

export function getShoppingListStarted(){
	console.log('Getting started');
	return{
		type: types.GETTING_SHOPPINGLISTS_STARTED
	};
}
export function shoppinglistsRecieved(response){
	return{
		type: types.SHOPPINGLISTS_LOADED_SUCCESSFULLY,
		response
	};
}

export function addingShoppinglistStarted(){
	return {
		type: types.CREATING_SHOPPINGLISTS_STARTED,
	};
}

export function shoppinglistCreated(response){
	return {
		type: types.SHOPPINGLISTS_CREATED_SUCCESSFULY,
		response
	};
}
export function errorEncountered(error){
	return{
		type: types.ERROR_ENCOUNTERED,
		error
	};
}
export function getShoppingLists(){
	return (dispatch) => {
		dispatch(resetErrors());
		dispatch(getShoppingListStarted());
		return axios({
			method: 'get',
			url: `${URL}${'shoppinglists'}`,
			auth: {
				username: localStorage.getItem('jwt'),
				password: ''
			}
		})
			.then(function (response) {
				console.log('Shoppinglists recieved as',response);
				dispatch(shoppinglistsRecieved(response.data));
			})
			.catch(function (error) {
				console.log(error.message);
				dispatch(errorEncountered(error.message));
			});

	};
}

//Add a new shopping list function
export function addNewShoppingList(details){
	console.log('Got ShoppingList You wanna create');
	return (dispatch) =>{
		//Notify that adding a shopping list action has been dispatched
		dispatch(resetErrors());
		dispatch(addingShoppinglistStarted());
		return axios({
			method: 'post',
			url: `${URL}${'shoppinglists'}`,
			data: {
				name: details['name'],
				description: details['description']
			  },
			auth: {
				username: localStorage.getItem('jwt'),
				password: ''
			}
		})
			.then(function (response){
				//Dispatch shoppinglist created successfully
				console.log('Got response', response.data);
				dispatch(shoppinglistCreated(response.data.data));
			})
			.catch(function (error){
			    //Dispatch shoppinglist creation failed
				if(error.response.data.message !== 'undefined'){
					console.log('Got errorx', error.response.data.message);
				    dispatch(errorEncountered(error.response.data.message));
				}else{
					dispatch(errorEncountered(error.message));	
				}
			});
	};
}