import * as types from '../constants/actiontypes';

const initState = {
	data: [],
	isSubmitting: false,
	submittingFinished: false,
	error: false
};
export default function(state = initState, action) {
	switch (action.type){
	case types.SUBMITTING_STARTED:
		return{
			...state, isSubmitting:true
		};
	case types.SUBMISSION_SUCCESSFUL:
		return{
			...state, isSubmitting:false,
			data:action.data,
			error: false
		};
	case types.SUBMISSION_ERROR:
		return{
			...state, error: action.error,
			isSubmitting:false
		};
	case types.CLEAR_ERRORS:
		return{
			...state, error:''
		};
	default:
	    return state;
	}
}