import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {UpdateShoppingListItem} from '../../components/update_shoppinglist_item';

describe('Render Update Shopping List items',()=>{
	const props = {
		item:{
			id:'32',
			name:'Monster',
			price:'200.0',
			quantity:'2.5'
		},
		openUpdateItem:true
	};
    
	const shoppinglistItems = shallow(<UpdateShoppingListItem {...props}/>);
	it('Renders UpdateShoppingListItem component', ()=>{
		expect(shallowToJson(shoppinglistItems)).toMatchSnapshot();
	});
});