import React from 'react';
import thunk from 'redux-thunk';

import * as types from '../constants/actiontypes';
import * as actions from '../actions';

import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const store = mockStore();

global.window = {};
import localStorage from 'mock-local-storage';
window.localStorage = global.localStorage;

describe('shoppinglists actions', ()=>{
	beforeEach(()=>{
		//Login this User before each test
		return store.dispatch(actions.submitDetails({
			'email': 'kimani@andela.com',
			'password': 'Andela1'
		},() =>{},'user')).then(()=>{
		});
	});
	it('Returns all Shoppinglists when all parameter in getShoppingLists is set to true',()=>{
		store.clearActions();//Remove the login actions
		return store.dispatch(
			actions.getShoppingLists(1,4,true)).then(()=>{
			expect(store.getActions()).toMatchSnapshot();
		});
	});
	it('Returns only specified number in limit of Shoppinglists when all parameter in getShoppingLists is set to false',()=>{
		store.clearActions();//Remove the login actions
		return store.dispatch(
			actions.getShoppingLists(1,4,false)).then(()=>{
			expect(store.getActions()).toMatchSnapshot();
		});
	});
	it('Returns 404 if page specified is not found ', ()=>{
		store.clearActions();//Remove the previous actions
		return store.dispatch(
			actions.getShoppingLists(10,4,false)).then(()=>{
			expect(store.getActions()).toMatchSnapshot();
		});
	});
});