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
		console.log('submission started');
		return{
			...state, isSubmitting:true
		};
	case types.SUBMISSION_SUCCESSFUL:
		console.log('Success', action.data);
		return{
			...state, isSubmitting:false,
			data:action.data,
			error: false
		};
	case types.SUBMISSION_ERROR:
		console.log('current state before', state);
		console.log(action);
		return{
			// ...state, error: action.error.data.message,
			...state, error: action.error,
			isSubmitting:false
		};
	default:
	    return state;
	}
}