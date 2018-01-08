import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {ShoppingListItems} from '../../components/shoppinglist_items';
import {shoppinglist_item_props} from '../../props';

describe('Render Shopping List items',()=>{
	const shoppinglistItems = shallow(<ShoppingListItems {...shoppinglist_item_props}/>);
	it('Renders No ShoppingListItems when items prop is empty', ()=>{
		expect(shallowToJson(shoppinglistItems)).toMatchSnapshot();
	});
});