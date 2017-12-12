import axios from 'axios';


import * as types from '../constants/actiontypes';
import {errorEncountered, URL, resetErrors, startSubmitting} from './index';
/**
 * ShoppingLists
 */

export function getShoppingLists(page, limit, all=false){
	console.log('Get shoppinglist ', limit);
	let url;
	if(!all){
		//If it is the first time to call the shoppinglists, load all of them for accurate pagination
		url = `${URL}${'shoppinglists?'}${'page='}${page}${'&'}${'limit='}${limit}`;
	}else{
		url = `${URL}${'shoppinglists'}`;
	}
	return (dispatch) => {
		dispatch(getShoppingListStarted());
		return axios({
			method: 'get',
			//http://127.0.0.1:5000/v1/shoppinglists?page=1&limit=2
			url: url,
			auth: {
				username: localStorage.getItem('jwt'),
				password: ''
			}
		})
			.then(function (response) {
				console.log('Shoppinglists recieved as',response);
				dispatch(shoppinglistsRecieved(response.data));
				if(all){
					dispatch(allShoppinglistsRecieved(response.data));	
				}
			})
			.catch(function (error) {
				console.log('wahhh', error);
				dispatch(errorEncountered(error.message));
			});

	};
}
//Add a new shopping list function
export function addNewShoppingList(details, limit){
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
				dispatch(shoppinglistCreated(response.data.data, response.data.message), limit);
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
			dispatch(shoppinglistDeleted(response.data.message, response.data.data, id));
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
		dispatch(updatingShoppinglistStarted());
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
				dispatch(closeUpdateDialog());
				dispatch(shoppinglistUpdated(response.data.message, response.data.data));
			}
		}).catch((error)=>{
			console.log('Got Meso', error);
			dispatch(errorEncountered(error.message));
		});
	};
}
function getShoppingListStarted(){
	console.log('Getting started');
	return{
		type: types.GETTING_SHOPPINGLISTS_STARTED
	};
}
function shoppinglistsRecieved(response){
	return{
		type: types.SHOPPINGLISTS_LOADED_SUCCESSFULLY,
		response
	};
}
function allShoppinglistsRecieved(response){
	return{
		type: types.ALL_SHOPPINGLISTS_LOADED,
		response
	};
}

function addingShoppinglistStarted(){
	return {
		type: types.CREATING_SHOPPINGLISTS_STARTED,
	};
}

function shoppinglistCreated(response, message, limit){
	//Limit is for the number of shoppinglists per page 
	return {
		type: types.SHOPPINGLISTS_CREATED_SUCCESSFULY,
		response, message, limit
	};
}
function shoppinglistDeleted(message, response, id){
	return {
		type: types.SHOPPINGLISTS_DELETED_SUCCESSFULY,
		message, response, id
	};
}
function updatingShoppinglistStarted(){
	return {
		type: types.UPDATING_SHOPPINGLIST_STARTED,
	};
}
function shoppinglistUpdated(message, response){
	return {
		type: types.SHOPPINGLISTS_UPDATED_SUCCESSFULY,
		message, response
	};
}
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
export function openUpdateDialog(){
	return(dispatch)=>{
		dispatch({type: types.OPEN_UPDATE_DIALOG});
	};
}
export function closeUpdateDialog(){
	resetErrors();
	return(dispatch)=>{
		dispatch(
			{type: types.CLOSE_UPDATE_DIALOG}
		   );
	};
}