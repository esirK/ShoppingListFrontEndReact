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
		console.log('Success', action.data);
		return{
			...state, isSubmitting:false,
			data:action.data
		};
	case types.SUBMISSION_ERROR:
		console.log('current state before', state);
		return{
			...state, error: action.error.data.message,
			isSubmitting:false
		};
	default:
	    return state;
	}
}