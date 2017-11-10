import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom'



import reducers from './reducers';
import RegisterForm from "./components/register";
import LoginForm from "./components/login_form";
import Navigation from './components/navigation';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <nav className="navbar navbar-default">
                    <Navigation />
                </nav>
                <div className="container">
                    <Switch>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/register" component={RegisterForm}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
