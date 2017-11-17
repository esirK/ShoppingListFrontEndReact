import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import RegisterReducer from './register_reducer';
import authentication from './authentication';

const rootReducer = combineReducers({
	register: RegisterReducer,
	authentication,
	form: formReducer
});

export default rootReducer;
