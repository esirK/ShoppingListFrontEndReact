import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {ShoppingListItems} from '../../components/shoppinglist_items';

describe('Render Shopping List items',()=>{
	const props = {
		activateAddItem:jest.fn(),
		activateUpdateItem:jest.fn(),
		deleteShoppinglistItem:jest.fn(),
		hideSnackBar:jest.fn(),
		error:false,
		addFab:false,
		isOpenUpdateItem:false,
		match:{
			isExact: true,
			params:{id:166},
			path:'/:id/shoppinglist_items',
			url:'/166/shoppinglist_items',
		},
		data:{
			items:[]
		},
		message:'',
		openAddItem:'',
		openSb:false,
		isLoading: false,
		resetErrors: jest.fn(),
		viewShoppingList: jest.fn(),
	};
    
	const shoppinglistItems = shallow(<ShoppingListItems {...props}/>);
	it('Renders ShoppingListItems component', ()=>{
		expect(shallowToJson(shoppinglistItems)).toMatchSnapshot();
	});
});