import _ from 'lodash';
import {SWITCH_USER_AUTH_STATUS} from '../constants/actiontypes';
const initialState = {
	isAuthenticated: false,
	user: {}
};

export default function (state = initialState, action){
	switch (action.type){
	    case SWITCH_USER_AUTH_STATUS:
	        return{
	            isAuthenticated: !_.isEmpty(action.user),
			    user: action.user
	        };
	default:
		return state;
	}

}