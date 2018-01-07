import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {ShoppingLists} from '../../components/shoppinglists';
import {shoppinglist_props} from '../../props';

describe('Shoppinglist component', ()=>{
	const myAppBar = shallow(<ShoppingLists {...shoppinglist_props}/>);
	it('renders Shoppinglist without crashing', ()=>{
		expect(shallowToJson(myAppBar)).toMatchSnapshot();
	});
});
