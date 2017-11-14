import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';


import reducers from './reducers';
import RegisterForm from "./components/register";
import LoginForm from "./components/login_form";
import Navigation from './components/navigation';
import ShoppingLists from './components/shoppinglists';

const createStoreWithMiddleware = applyMiddleware(reduxPromise, thunk)(createStore);

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#9C27B0',
    },
    appBar: {
        height: 100,
    },
});
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
                <AppBar title="Shopping List App" showMenuIconButton={false}/>
                <nav className="navbar navbar-default">
                    <Navigation />
                </nav>
                <div className="container">
                    <Switch>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/shoppinglists" component={ShoppingLists}/>
                    </Switch>
                </div>
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
