import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import RegisterReducer from './register_reducer';
import authentication from './authentication';
import shoppinglists from './shoppinglists';

const rootReducer = combineReducers({
	register: RegisterReducer,
	authentication,
	shoppinglists,
	form: formReducer
});

export default rootReducer;
