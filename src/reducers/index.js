import { combineReducers } from 'redux';
import ReducerRegister from './reducer_register';

const rootReducer = combineReducers({
	register: ReducerRegister
});

export default rootReducer;
