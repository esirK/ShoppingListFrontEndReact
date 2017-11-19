import * as types from '../constants/actiontypes';

const initState = {
	isLoading: false,
	shoppinglists: [],
	error: false
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
	case types.ERROR_ENCOUNTERED:
		return{
			...state, isLoading:false, error: action.error
		};
	default:
		return state;
	}
}