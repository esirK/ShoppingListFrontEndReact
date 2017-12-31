import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

import * as actions from '../actions';
import * as types from '../constants/actiontypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

global.window = {};
import localStorage from 'mock-local-storage';
window.localStorage = global.localStorage;

describe('authentication actions', ()=>{
	it('should create an action to start loggin ', ()=>{
		const expectedAction = {
			type: types.SUBMITTING_STARTED
		};
		expect(actions.startSubmitting()).toEqual(expectedAction);
	});

	it('should return success message on successful submission', ()=>{
		const message = 'Details Submitted successfully';
		const expectedAction = {
			type: types.SUBMISSION_SUCCESSFUL, 
			message
		};
		expect(actions.submissionSuccessful('Details Submitted successfully')).toEqual(expectedAction);
	});
	it('should return error message on failure to submit', ()=>{
		const error = 'Network error while submitting';
		const expectedAction = {
			type: types.SUBMISSION_ERROR, 
			error
		};
		expect(actions.submissionFailed('Network error while submitting')).toEqual(expectedAction);
	});
});
let mockCallback = ()=>{
	return 'just a mock function';
};
describe('submitDetails actions', () => {
	afterEach(() => {
	  fetchMock.reset();
	  fetchMock.restore();
	});
	it('Returns user details when login is successful', ()=>{
			  const store = mockStore({});
		  
			  return store.dispatch(actions.submitDetails({
			'email': 'ngs@gmail.com',
			'password': 'Andela1'
			  },mockCallback,'user')).then(() => {
			// return of async actions
			expect(store.getActions()).toMatchSnapshot();
			  });
	});
});