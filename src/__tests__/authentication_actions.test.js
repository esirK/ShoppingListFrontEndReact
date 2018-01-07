import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import * as actions from '../actions';
import * as types from '../constants/actiontypes';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

global.window = {};
import localStorage from 'mock-local-storage';
window.localStorage = global.localStorage;

const store = mockStore();

beforeEach( () => {
	moxios.install();
});

afterEach( () => {
	moxios.uninstall();
});

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