import axios from 'axios';
import jwt from 'jsonwebtoken';

import * as types from '../constants/actiontypes';


const URL = 'http://127.0.0.1:5000/v1/';

export function resetErrors() {
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
/**
 * ShoppingLists
 */
export function activateFab(){
	return(dispatch)=>{
		dispatch(
		 {type: types.ACTIVATE_FAB}
		);
	};
}
export function closeFab(){
	return(dispatch)=>{
		dispatch(
		 {type: types.DEACTIVATE_FAB}
		);
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

export function shoppinglistCreated(response, message){
	return {
		type: types.SHOPPINGLISTS_CREATED_SUCCESSFULY,
		response, message
	};
}
export function shoppinglistDeleted(message, response){
	return {
		type: types.SHOPPINGLISTS_DELETED_SUCCESSFULY,
		message, response
	};
}
export function shoppinglistUpdated(message, response){
	return {
		type: types.SHOPPINGLISTS_UPDATED_SUCCESSFULY,
		message, response
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
				console.log('wahhh', error);
				dispatch(errorEncountered(error.message));
			});

	};
}
//Add a new shopping list function
export function addNewShoppingList(details){
	console.log('Got ShoppingList You wanna create');
	return (dispatch) =>{
		//clear all errors first
		dispatch(resetErrors());
		//Notify that adding a shopping list action has been dispatched
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
				console.log('Got response when adding', response.data);
				dispatch(shoppinglistCreated(response.data.data, response.data.message));
			})
			.catch(function (error){
				//Dispatch shoppinglist creation failed
				console.log(error);
				if(error.message){
					dispatch(errorEncountered(error.message));
				}
				if(error.response.data.message !== 'undefined'){
					console.log('Got errorx', error );
				    dispatch(errorEncountered(error.response.data.message));
				}
			});
	};
}
//Delete an existing shoppinglist function
export function deleteShoppingList(id){
	return (dispatch)=>{
		//clear all errors first
		dispatch(resetErrors());
		dispatch(startSubmitting);
		return axios({
			method: 'delete',
			url: `${URL}${'shoppinglists/'}${id}`,
			auth: {
				username: localStorage.getItem('jwt'),
				password: ''
			}
		}).then((response)=>{
			//Dispatch shoppinglist DELETION Successfully
			dispatch(shoppinglistDeleted(response.data.message, response.data.data));
			console.log('Got response', response.data.message);
		}).catch((error)=>{
			//Dispatch shoppinglist DELETION Failed
			dispatch(errorEncountered(error.message));
		});
	};
}

export function updateShoppingList(id, details){
	//Updates an existing shoppinglist
	return (dispatch) =>{
		//clear all errors first
		dispatch(resetErrors());
		return axios({
			method: 'put',
			url: `${URL}${'shoppinglists/'}${id}`,
			data: {
				new_name: details['new_name'],
				description: details['description']
			  },
			auth: {
				username: localStorage.getItem('jwt'),
				password: ''
			}
		}).then((response)=>{
			if((response.data.message).includes('Nothing was provided')){
				dispatch(errorEncountered(response.data.message));
			}else{
				dispatch(shoppinglistUpdated(response.data.message, response.data.data));
			}
		}).catch((error)=>{
			console.log('Got Meso', error);
			dispatch(errorEncountered(error.message));
		});
	};
}

/**
 * ShoppingList items
 */

//View Selected Shoppinglist
export function viewShoppingList(id){
	console.log('Looking for the shoppinglist ', id);
	return (dispatch) =>{
		//clear all errors first
		dispatch(resetErrors());
		dispatch(loadingShoppingListItems());
		return axios({
			method: 'get',
			url: `${URL}${'shoppinglists/'}${id}`,
			auth: {
				username: localStorage.getItem('jwt'),
				password: ''
			}
		}).then((response)=>{
			console.log('Got catcha ', response, response.data);
			dispatch(shoppinglistItemsRecieved(response.data));
		}).catch(error=>{
			console.log('Got f** error ', error.response.data.message);
			dispatch(loadingShoppingListItemsFailed(error.response.data.message));
			dispatch(errorEncountered(error.response.data.message));
		});
	};
}
export function loadingShoppingListItems(){
	console.log('Loading items dispatched');
	return {
		type: types.SHOPPINGLIST_ITEMS_LOADING,
	};
}
function loadingShoppingListItemsFailed(error){
	return {
		type: types.SHOPPINGLIST_ITEMS_FAILED,
		error
	};
}
export function shoppinglistItemsRecieved(data){
	return {
		type: types.SHOPPINGLIST_ITEMS_LOADED_SUCCESSFULLY,
		data
	};
}