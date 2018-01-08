import reducer from '../reducers/register_reducer';

import * as types from '../constants/actiontypes';

describe('Register reducer ', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			{
				data: [],
				isSubmitting: false,
				submittingFinished: false,
				error: false
			}
		);
	});
	it('should disable register dialog by setting isSubmitting to true', () => {
		expect(reducer([], {
			type: types.SUBMITTING_STARTED
		})).toEqual(
			{
				isSubmitting: true,
			}
		);
	});
	it('should return registration successful message on registration', () => {
		expect(reducer([], {
			type: types.SUBMISSION_SUCCESSFUL,
			data:'User x has been successfully registered'
		})).toEqual(
			{
				isSubmitting: false,
				data:'User x has been successfully registered',
				error: false
			}
		);
	});
	it('should return registration error message on registration error', () => {
		expect(reducer([], {
			type: types.SUBMISSION_ERROR,
			error:'User already exist'
		})).toEqual(
			{
				isSubmitting: false,
				error:'User already exist',
			}
		);
	});
	it('should return no errors on reseting error', () => {
		expect(reducer([], {
			type: types.CLEAR_ERRORS,
		})).toEqual(
			{
				error:'',
			}
		);
	});
});