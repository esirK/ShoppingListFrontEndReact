import _ from 'lodash';
import {SWITCH_USER_AUTH_STATUS, SHOW_SNACK_BAR, HIDE_SNACK_BAR} from '../constants/actiontypes';
const initialState = {
	isAuthenticated: false,
	user: {},
	openSb: false,
	message: ''
};

export default function (state = initialState, action){
	switch (action.type){
	    case SWITCH_USER_AUTH_STATUS:
	        return{
	            isAuthenticated: !_.isEmpty(action.user),
			    user: action.user
		};
	case SHOW_SNACK_BAR:
		return{
			...state, openSb: true, message: action.message
		};
	case HIDE_SNACK_BAR:
	    return{
			...state, openSb: false, message: ''
		};
	default:
		return state;
	}

}