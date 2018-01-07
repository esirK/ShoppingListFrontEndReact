import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import reducer from '../reducers/shoppinglist_items';
import * as types from '../constants/actiontypes';
import {ShoppingListItems} from '../components/shoppinglist_items';
import {shoppinglist_item_props} from '../props';

describe('shoppinglists_items reducers',()=>{
	const initState = {
		data: {
			items: []
		},
		isLoading: false,
		isAdding: false,
		isDeleting: false,
		id:-1,
		message: '',
		error: false,
		openAddItem: false,
		openSb: false,	
		isOpenUpdateItem: false,	
		item:{},
		isUpdating: false
	};
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			initState
		);
	});
	it('Should show new shoppinglist item dialog if openAddItem is true', ()=>{
		expect(reducer([], {
			type: types.ACTIVATE_ADD_ITEM
		})).toEqual(
			{
				openAddItem: true,
			}
		);
	});
	//If the openAddItem is true then the snapshot
	// produced should be an addItem dialog
	shoppinglist_item_props['openAddItem'] = true;
	const addItem = shallow(<ShoppingListItems {...shoppinglist_item_props}/>);
	it('Renders add new ShoppingListItem dialog component', ()=>{
		expect(shallowToJson(addItem)).toMatchSnapshot();
	});
    
	it('Should show an update item dialog if ACTIVATE_UPDATE_ITEM is dispatched', () => {
		expect(reducer([], {
			type: types.ACTIVATE_UPDATE_ITEM,
			item:[]
		})).toEqual(
			{
				isOpenUpdateItem: true, 
				item: []
			}
		);
	});
});