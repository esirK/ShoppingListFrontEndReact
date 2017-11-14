import * as types from '../constants/actiontypes';

const initState = {
    data: [],
    isRegisteringUser: false,
    userRegistrationFinished: false,
    error: false
};
export default function(state = initState, action) {
    switch (action.type){
        case types.SUBMISSION_SUCCESSFUL:
            console.log("Success", action.data);
		return{
            ...state, isRegisteringUser:false,
            data:action.data
        };
        case types.SUBMISSION_ERROR:
        console.log("current state before", state);
        return{
            ...state, error: action.error.data.message
        }
	}
	return state;
}