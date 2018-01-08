import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {UpdateShoppingList} from '../../components/update_shoppinglist';

describe('Update Shopping List',()=>{
	const props = {
		closeUpdateDialog:jest.fn(),
		conf_delete:false,
		description:'I am an Evil Morty',
		email:'',
		error:false,
		id:'78',
		isUpdatingShoppingList:false,
		limit:4,
		message:'',
		name:'Evil morty',
		openUpdate:true,
		page:1,
		resetErrors:jest.fn(),
		searchTerm:'',
		shareDialog:false,
		updateShoppingList:jest.fn(),
		openUpdateItem:true
	};
	const updatedShoppinglist = shallow(<UpdateShoppingList {...props}/>);
	it('Renders updateShoppinglist component', ()=>{
		expect(shallowToJson(updatedShoppinglist)).toMatchSnapshot();
	});
});