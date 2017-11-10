import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ReducerRegister from './reducer_register';

const rootReducer = combineReducers({
	register: ReducerRegister,
	form: formReducer
});

export default rootReducer;
