import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';


import RegisterForm from '../../components/register';

describe('Register Form Component', ()=>{
	const props ={
	};
	const wrapper = shallow(<RegisterForm {...props}/>);
	it('Renders Register form without clashing',()=>{
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});