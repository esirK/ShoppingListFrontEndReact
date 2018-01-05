import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {NewShoppingListItem} from '../../components/new_shoppinglist_item';

describe('Render Shopping List items',()=>{
	const props = {
		activateAddItem:jest.fn(),
		activateUpdateItem:jest.fn(),
		deleteShoppinglistItem:jest.fn(),
		hideSnackBar:jest.fn(),
		error:false,
		addFab:false,
		isOpenUpdateItem:false,
		data:{
			items:[]
		},
		message:'',
		openAddItem:'',
		openSb:false,
		openAddItem:true,
		isLoading: false,
		resetErrors: jest.fn(),
		viewShoppingList: jest.fn(),
	};
	const newShoppinglistItems = shallow(<NewShoppingListItem {...props}/>);
	it('Renders newShoppingListItems component', ()=>{
		expect(shallowToJson(newShoppinglistItems)).toMatchSnapshot();
	});
});