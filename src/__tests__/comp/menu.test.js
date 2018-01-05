import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {Menu} from '../../components/menu';

describe('Render Menu frou Update profile and Logout',()=>{
	const props = {
		openSb:false,
		message:''
	};
    
	const menu = shallow(<Menu {...props}/>);
	it('Renders Menu component', ()=>{
		expect(shallowToJson(menu)).toMatchSnapshot();
	});
});