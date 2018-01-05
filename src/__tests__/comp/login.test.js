import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {LoginForm} from '../../components/login_form';

describe('Render Login Form',()=>{
	const props ={
		resetErrors: jest.fn(),
		handleSubmit: jest.fn(),
	};

	const loginform = shallow(<LoginForm {...props}/>);
	it('Renders LoginForm component', ()=>{
		expect(shallowToJson(loginform)).toMatchSnapshot();
	});
});