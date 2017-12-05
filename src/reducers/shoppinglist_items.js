import * as types from '../constants/actiontypes';

const initState = {
	data: {
		items: []
	},
	isLoading: false,
	error: false
};

export default (state= initState, action)=>{
	switch(action.type){
	case types.SHOPPINGLIST_ITEMS_LOADED_SUCCESSFULLY:
		return{
			...state, data: action.data, isLoading: false
		};
	case types.SHOPPINGLIST_ITEMS_LOADING:
		return{
			...state, isLoading: true
		};
	case types.SHOPPINGLIST_ITEMS_FAILED:
		return{
			...state, isLoading: false, error: action.error
		};
	default:
		return state;
	}
};