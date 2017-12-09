import axios from 'axios';

import * as types from '../constants/actiontypes';

import {errorEncountered, URL, resetErrors} from './index';

export function activateAddItem(){
	//Sets state of add item dialog to true
	return(dispatch)=>{
		dispatch(
			{type: types.ACTIVATE_ADD_ITEM}
		);
	};
}
export function deactivateAddItem(){
	//Sets state of add item dialog to false
	return(dispatch)=>{
		dispatch(resetErrors());
		dispatch(
			{type: types.DEACTIVATE_ADD_ITEM}
		);
	};
}
export function addNewShoppingListItem(details){
	return (dispatch) => {
		console.log('see whst you doing ', details);
		//clear all errors first
		dispatch(resetErrors());
		dispatch(addingShoppinglistItemStarted());
		return axios({
			method: 'post',
			url: `${URL}${'shoppinglist_items'}`,
			data:{
				name: details['name'].trim(),
				price: details['price'].trim(),
				quantity: details['quantity'].trim(),
				shoppinglist_id: details['shoppinglist_id']
			},
			auth: {
				username: localStorage.getItem('jwt'),
				password: ''
			}
		})
			.then(function (response) {
				console.log('Here is response of adding a shoppinglist item ', response.data);
				dispatch(shoppinglistItemCreated(response.data.message));
			})
			.catch(function (error) {
				console.log('wahhh', error.response);
				if(error.response.data.error === undefined){
					dispatch(errorEncountered(error.response.data.message));
				}else{
					dispatch(errorEncountered(error.response.data.error));
				}
			});

	};
}
export function deleteShoppinglistItem(id){
	return(dispatch)=>{
		dispatch(deletingItemStarted());
		return axios(
			{
				method: 'delete',
				url: `${URL}${'shoppinglist_items/'}${id}`,
				auth: {
					username: localStorage.getItem('jwt'),
					password: ''
				}
			}
		).then(function(response)
		{
			console.log('Got this response on deleting an item', response);
			dispatch(itemDeletedSuccessfully(response.data.message));
		}
		).catch(function(error){
			console.log('Error while trying to delete ', error);
		});
	};
}
function addingShoppinglistItemStarted(){
	return{
		type: types.ADDING_SHOPPINGLIST_ITEM_STARTED
	};
}
function shoppinglistItemCreated(message){
	return{
		type: types.SHOPPINGLIST_ITEM_ADDED, message
	};
}
function deletingItemStarted(){
	return{
		type: types.DELETING_ITEM_STARTED,
	};
}
function itemDeletedSuccessfully(message){
	return{
		type: types.ITEM_DELETED_SUCCESSFULLY,
		message
	};
}