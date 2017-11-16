import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';


import reducers from './reducers';
import RegisterForm from './components/register';
import LoginForm from './components/login_form';
import ShoppingLists from './components/shoppinglists';

import NotFound from './components/not_found';
import {setAthorizationToken} from './components/helpers';
import {setAuthStatusOfUser} from './actions';
import jwt from 'jsonwebtoken';

const createStoreWithMiddleware = applyMiddleware(reduxPromise, thunk)(createStore);

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: '#9C27B0',
	},
	appBar: {
		height: 100,
	},
});
const store = createStoreWithMiddleware(reducers);
if(localStorage.getItem('jwt')){
	setAthorizationToken(localStorage.getItem('jwt'));
	store.dispatch(setAuthStatusOfUser(jwt.decode(localStorage.getItem('jwt'))));
}
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
				<AppBar title="Shopping List App" showMenuIconButton={false}/>
				<div className="container">
					<Switch>
						<Route exact path="/" component={ShoppingLists}/>
						<Route path="/login" component={LoginForm}/>
						<Route path="/register" component={RegisterForm}/>
						<Route path="/shoppinglists" component={ShoppingLists}/>
						<Route component={NotFound}/>
					</Switch>
				</div>
			</MuiThemeProvider>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));
