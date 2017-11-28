import * as types from '../constants/actiontypes';

const initState = {
	isLoading: false,
	isCreatingNewShoppingList: false,
	shoppinglists: [],
	error: false,
	message: '',
	openSb: false
};

export default function(state = initState, action){
	switch(action.type){
	case types.GETTING_SHOPPINGLISTS_STARTED:
		console.log('getting shoppinglist started');
		return{
			...state, isLoading:true
		};
	case types.SHOPPINGLISTS_LOADED_SUCCESSFULLY:
		return{
			...state, shoppinglists:action.response,
			isLoading:false
		};
	case types.CREATING_SHOPPINGLISTS_STARTED:
	    console.log('Creation of a new shoppinglist started');
		return {
			...state, isCreatingNewShoppingList:true,
			open: true
		};
	case types.SHOPPINGLISTS_CREATED_SUCCESSFULY:
		return {
			...state, shoppinglists:action.response,
			isCreatingNewShoppingList:false, open: false
		};
	case types.SHOPPINGLISTS_DELETED_SUCCESSFULY:
		return {
			...state, message: action.message
		};
	case types.SHOPPINGLISTS_UPDATED_SUCCESSFULY:
		return {
			...state, shoppinglists:action.response,
			message: action.message
		};
	case types.ERROR_ENCOUNTERED:
		return{
			...state, isLoading:false, error: action.error
		};
	case types.CLEAR_ERRORS:
		console.log('Clearing errors', state);
		return{
			...state, error:false, message: '', openSb: false
		};

	default:
		return state;
	}
}