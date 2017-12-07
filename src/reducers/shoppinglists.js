import * as types from '../constants/actiontypes';

const initState = {
	isLoading: false,
	isCreatingNewShoppingList: false,
	shoppinglistCreated: false,
	isUpdatingShoppingList: false,
	shoppinglists: [],
	error: false,
	message: '',
	openSb: false,
	addFab: false,
	openUpdate: false
};

export default function(state = initState, action){
	switch(action.type){
	case types.GETTING_SHOPPINGLISTS_STARTED:
		return{
			...state, isLoading:true, openSb: false,
		};
	case types.SHOPPINGLISTS_LOADED_SUCCESSFULLY:
		return{
			...state, shoppinglists:action.response,
			isLoading:false
		};
	case types.ACTIVATE_FAB:
		return{
			...state, addFab:true,
		};
	case types.DEACTIVATE_FAB:
		return{
			...state, addFab:false,
		};
	case types.OPEN_UPDATE_DIALOG:
		return{
			...state, openUpdate:true,
		};
	case types.CLOSE_UPDATE_DIALOG:
		return{
			...state, openUpdate:false,
		};
	case types.CREATING_SHOPPINGLISTS_STARTED:
	    return {
			...state, isCreatingNewShoppingList:true,
		};
	case types.SHOPPINGLISTS_CREATED_SUCCESSFULY:
		return {
			...state, shoppinglists:action.response, shoppinglistCreated: true,
			isCreatingNewShoppingList:false, openSb: true, 
			message: action.message, addFab: false
		};
	case types.SHOPPINGLISTS_DELETED_SUCCESSFULY:
		return {
			...state, shoppinglists:action.response, message: action.message, openSb: true,
		};
	case types.UPDATING_SHOPPINGLIST_STARTED:
		return{
			...state, isUpdatingShoppingList:true
		};
	case types.SHOPPINGLISTS_UPDATED_SUCCESSFULY:
		return {
			...state, shoppinglists:action.response,
			message: action.message, openSb: true,isUpdatingShoppingList:false
		};
	case types.ERROR_ENCOUNTERED:
		return{
			...state, isLoading:false, isCreatingNewShoppingList:false, isUpdatingShoppingList:false, error: action.error, openSb: true,
		};
	case types.CLEAR_ERRORS:
		return{
			...state, error:false, message: '', openSb: false, shoppinglistCreated: false,
		};
	case types.HIDE_SNACK_BAR:
		return{
			...state,  openSb: false,
		};

	default:
		return state;
	}
}