import * as types from '../constants/actiontypes';

const initState = {
    data: [],
    isRegisteringUser: false,
    userRegistrationFinished: false,
    error: false
};
export default function(state = initState, action) {
    switch (action.type){
        case types.REGISTRATION_SUCCESSFUL:
		console.log("nanana too ", action);
		return{
            ...state, isRegisteringUser:false,
            data:action.data
        };
    case types.REGISTRATION_ERROR:
        console.log("here too ", action);
	}
	return state;
}