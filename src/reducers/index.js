import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import RegisterReducer from './register_reducer';
import authentication from './authentication';
import shoppinglists from './shoppinglists';
import shoppinglist_items from './shoppinglist_items';

//Combines all reducers available
const rootReducer = combineReducers({
	register: RegisterReducer,
	authentication,
	shoppinglists,
	shoppinglist_items,
	form: formReducer
});

export default rootReducer;
