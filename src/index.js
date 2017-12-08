import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';


import reducers from './reducers';
import RegisterForm from './components/register';
import LoginForm from './components/login_form';
import ShoppingLists from './components/shoppinglists';
import ShoppingListItems from './components/shoppinglist_items';

import NotFound from './components/not_found';
import {setAuthStatusOfUser} from './actions';
import jwt from 'jsonwebtoken';
import {checkAuthenticationToken} from './utils';

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

console.log('getting JWT Token', checkAuthenticationToken(), this.props);
if(checkAuthenticationToken()){
	//If Token is valid
	store.dispatch(setAuthStatusOfUser(jwt.decode(localStorage.getItem('jwt'))));
}else{
	store.dispatch(setAuthStatusOfUser({}));
}

const requireLogin = (props)=>{
	if(checkAuthenticationToken()){
		return <ShoppingLists {...props}/>;
	}
	else {
		return <Redirect
			to={{pathname: '/login'}}
		/>;
	}
};
const itemsRequireLogin = (props)=>{
	if(checkAuthenticationToken()){
		return <ShoppingListItems {...props}/>;
	}
	else {
		return <Redirect
			to={{pathname: '/login'}}
		/>;
	}
};
const isLoggedIn = (props)=>{
	if(checkAuthenticationToken()){
		return <Redirect
			to={{pathname: '/'}}
		/>;
	}else {
		return <LoginForm{...props}/>;
	}
};

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
				<AppBar title="Shopping List App" showMenuIconButton={false}/>
				<div className="container">
					<Switch>
						<Route exact path="/" render={requireLogin}/>
						<Route path="/login" render={isLoggedIn}/>
						<Route path="/register" component={RegisterForm}/>
						<Route path="/shoppinglists" render={requireLogin}/>
						<Route path="/:id/shoppinglist_items" render={itemsRequireLogin}/>
						<Route component={NotFound}/>
					</Switch>
				</div>
			</MuiThemeProvider>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));