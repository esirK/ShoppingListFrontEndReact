import * as types from '../constants/actiontypes';

const initState = {
	items: [],
};

export default (state= initState, action)=>{
	switch(action.type){
	case types.SHOPPINGLIST_ITEMS_LOADED_SUCCESSFULLY:
		return{
			...state, items: action.items
		};
	default:
		return state;
	}
};