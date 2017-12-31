import React from 'react';
import thunk from 'redux-thunk';

import * as types from '../constants/actiontypes';
import * as actions from '../actions';

import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let mockCallback = ()=>{
	return 'just a mock function';
};

const store = mockStore();

global.window = {};
import localStorage from 'mock-local-storage';
window.localStorage = global.localStorage;

describe('shoppinglists actions', ()=>{
	afterEach(()=>{
		fetchMock.reset();
		fetchMock.restore();
	});
	beforeEach(()=>{
		//Login this User before each test
		return store.dispatch(actions.submitDetails({
			'email': 'ngs@gmail.com',
			'password': 'Andela1'
		},mockCallback,'user')).then(()=>{
		});
	});
	it('Returns all Shoppinglists when all parameter in getShoppingLists is set to true',()=>{
		store.clearActions();//Remove the login actions
		return store.dispatch(
			actions.getShoppingLists(1,4,true)).then(()=>{
			expect(store.getActions()).toMatchSnapshot();
		});
	});
});