import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {AddShoppingList} from '../../components/new_shoppinglist';

describe('Add new Shopping List',()=>{
	const newShoppinglist = shallow(<AddShoppingList />);
	it('Renders newShoppinglist component', ()=>{
		expect(shallowToJson(newShoppinglist)).toMatchSnapshot();
	});
});