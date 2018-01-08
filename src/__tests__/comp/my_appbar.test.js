import React from 'react';
import {shallow} from 'enzyme';
import {MyAppBar} from '../../components/my_appbar';

describe('MyAppBAr component', ()=>{
	const myAppBar = shallow(<MyAppBar />);
	it('renders MyAppBar without crashing', ()=>{
		expect(myAppBar.find('AppBar').length).toBe(1);
	});
});