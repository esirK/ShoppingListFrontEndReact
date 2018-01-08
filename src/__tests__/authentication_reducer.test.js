import reducer from '../reducers/authentication';
import * as types from '../constants/actiontypes';

describe('authentication reducers',()=>{
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			{
				isAuthenticated: false,
				user: {},
				openSb: false,
				message: ''
			}
		);
	});
    
	it('should handle SWITCH_USER_AUTH_STATUS', () => {
		expect(reducer([], {
			type:types.SWITCH_USER_AUTH_STATUS,
			user:{
				'expires_at': 1514794203165,
				'id': 27,
				'username': 'esir',
			}
		})).toEqual(
			{'isAuthenticated': true, 'user': {'expires_at': 1514794203165, 'id': 27, 'username': 'esir'}}
		);
	});
	it('should handle SHOW_SNACK_BAR', () => {
		expect(reducer([], {
			type:types.SHOW_SNACK_BAR,
			message: 'Logged in successfully'
		})).toEqual(
			{openSb:true, message:'Logged in successfully'}
		);
	});
});