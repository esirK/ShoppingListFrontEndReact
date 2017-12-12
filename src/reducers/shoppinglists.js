import * as types from '../constants/actiontypes';

const initState = {
	isLoading: false,
	isCreatingNewShoppingList: false,
	shoppinglistCreated: false,
	isUpdatingShoppingList: false,
	shoppinglists: [],
	all_shoppinglists: [],
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
	case types.ALL_SHOPPINGLISTS_LOADED:
		return{
			...state, all_shoppinglists:action.response
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
	   if(state.shoppinglists.length!== 4){
		   //add that item to this shoppinglists
		   state.shoppinglists.push(action.response[action.response.length-1]);
	   }
	   return {
			...state, shoppinglistCreated: true, shoppinglists: state.shoppinglists, all_shoppinglists:action.response,
			isCreatingNewShoppingList:false, openSb: true, 
			message: action.message, addFab: false
		};
	case types.SHOPPINGLISTS_DELETED_SUCCESSFULY:
		for(var shoppinglist=0; shoppinglist<state.shoppinglists.length; shoppinglist++){
			if(state.shoppinglists[shoppinglist].id === action.id){
				state.shoppinglists.splice(shoppinglist, 1);
			}
		}
		return {
			...state, shoppinglists:state.shoppinglists, all_shoppinglists:action.response ,message: action.message, openSb: true,
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