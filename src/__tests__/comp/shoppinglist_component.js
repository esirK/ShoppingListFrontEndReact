import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {ShoppingLists} from '../../components/shoppinglists';


describe('Shoppinglist component', ()=>{
	const props = {
		activateFab:jest.fn(),
		addFab:false,
		isLoading: false,
		shoppinglists: [],
		all_shoppinglists: [],
		error: '',
		message: '',
		openSb: false,
		addFab: false,
		openUpdate: false,
		resetErrors: jest.fn(),
		getShoppingLists: jest.fn(),
	};
	const myAppBar = shallow(<ShoppingLists {...props}/>);
	it('renders Shoppinglist without crashing', ()=>{
		expect(shallowToJson(myAppBar)).toMatchSnapshot();
	});
});
