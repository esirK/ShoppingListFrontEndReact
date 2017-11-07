import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route } from 'react-router-dom'



import reducers from './reducers';
import RegisterForm from "./components/register_form";
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
                    <Route path="/register" component={RegisterForm}/>
                </div>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
