import * as types from '../constants/actiontypes';

const initState = {
	data: {
		items: []
	},
	isLoading: false,
	isAdding: false,
	isDeleting: false,
	id:-1,
	message: '',
	error: false,
	openAddItem: false,
	openSb: false,	
	isOpenUpdateItem: false,	
	item:{},
};

export default (state= initState, action)=>{
	switch(action.type){
	case types.ACTIVATE_ADD_ITEM:
		//Add new Item FAB has been clicked
		return{
			...state, openAddItem: true
		};
	case types.DEACTIVATE_ADD_ITEM:
		//Add new Item FAB has been clicked
		return{
			...state, openAddItem: false
		};
	case types.ACTIVATE_UPDATE_ITEM:
		//Change state to show the Update Item dialog
		return{
			...state, isOpenUpdateItem: true, item: action.item
		};
	case types.DEACTIVATE_UPDATE_ITEM:
		//Change state to remove the Update Item dialog
		return{
			...state, isOpenUpdateItem: false, isUpdating: false
		};
	case types.ADDING_SHOPPINGLIST_ITEM_STARTED:
		return{
			...state, isAdding: true
		};
	case types.SHOPPINGLIST_ITEM_ADDED:
		return{
			...state, isAdding: false, openAddItem: false, openSb:true,message: action.message,
		};
	case types.DELETING_ITEM_STARTED:
		return{
			...state, isDeleting: true
		};
	case types.ITEM_DELETED_SUCCESSFULLY:
		return{
			...state, isDeleting: false, message: action.message, openSb:true,
		};
	case types.SHOPPINGLIST_ITEMS_LOADED_SUCCESSFULLY:
		return{
			...state, data: action.data, id:action.id, isLoading: false
		};
	case types.SHOPPINGLIST_ITEMS_LOADING:
		return{
			...state, isLoading: true
		};
	case types.SHOPPINGLIST_ITEMS_FAILED:
		return{
			...state, isLoading: false, error: action.error
		};
	case types.ERROR_ENCOUNTERED:
		return{
			...state, error: action.error
		};
	case types.CLEAR_ERRORS:
		return{
			...state, error: false, openSb: false
		};
	case types.HIDE_SNACK_BAR:
		return{
			...state,openSb: false
		};
	default:
		return state;
	}
};