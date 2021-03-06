import axios from 'axios';

import * as types from '../constants/actiontypes';

export * from './shoppinglist_actions';
export * from './authentication_actions';
export * from './shoppinglistitems_actions';

export const URL = 'https://andela-shopping-list-api.herokuapp.com/v1/';


export function resetErrors() {
	return{
		type: types.CLEAR_ERRORS
	};
}
export function startSubmitting(){
	return {
		type: types.SUBMITTING_STARTED
	};
}
export function errorEncountered(error){
	return{
		type: types.ERROR_ENCOUNTERED,
		error
	};
}
/**
 * ShoppingList items
 */

//View Selected Shoppinglist
export function viewShoppingList(id){
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
			dispatch(shoppinglistItemsRecieved(response.data, id));
		}).catch(error=>{
			dispatch(loadingShoppingListItemsFailed(error.response.data.message));
			dispatch(errorEncountered(error.response.data.message));
		});
	};
}
export function loadingShoppingListItems(){
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
export function shoppinglistItemsRecieved(data, id){
	return {
		type: types.SHOPPINGLIST_ITEMS_LOADED_SUCCESSFULLY,
		data, id
	};
}