import reducer from '../reducers/shoppinglists';
import * as types from '../constants/actiontypes';

describe('shoppinglists reducers',()=>{
	const initialState = {
		isLoading: false,
		isCreatingNewShoppingList: false,
		isShoppinglistSharing: false,
		shoppinglistCreated: false,
		isUpdatingShoppingList: false,
		shoppinglists: [],
		all_shoppinglists: [],
		error: false,
		message: '',
		openSb: false,
		addFab: false,
		openUpdate: false
	};
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			initialState
		);
	});
	it('should show shoppinglists are being loaded ',()=>{
		expect(reducer([], {
			type: types.GETTING_SHOPPINGLISTS_STARTED
		})).toEqual(
			{
				isLoading: true,
				openSb: false,
			}
		);
	});
	it('should show shoppinglists loaded ',()=>{
		expect(reducer([], {
			type: types.SHOPPINGLISTS_LOADED_SUCCESSFULLY,
			response:{
				'name': 'Ring of Lords',
				'description': 'Sir God forbid Ufala',
				'shared': 'False',
				'shared_by': 'nobody',
				'items': [],
				'id': '233'
			}
		})).toEqual(
			{
				isLoading: false,
				shoppinglists:{
					'name': 'Ring of Lords',
					'description': 'Sir God forbid Ufala',
					'shared': 'False',
					'shared_by': 'nobody',
					'items': [],
					'id': '233'
				}
			}
		);
	});
	it('should show a FAB for adding new shoppinglists', ()=>{
		expect(reducer([], {
			type: types.ACTIVATE_FAB,
		})).toEqual({
			addFab:true
		});
	});
	it('should show all shoppinglists created', ()=>{
		const all_shoppinglists = [
			{
				'name': 'Tiny Rick',
				'description': 'Buy Tiny rick artirel',
				'shared': 'True',
				'shared_by': 'kimani@andela.com',
				'items': [],
				'id': '336'
			},
			{
				'name': 'New',
				'description': 'Djikista',
				'shared': 'False',
				'shared_by': 'nobody',
				'items': [
					{
						'name': 'Sababa',
						'price': '9.0',
						'quantity': '6.0',
						'id': '77'
					}
				],
				'id': '330'
			},
			{
				'name': 'God forbid',
				'description': 'Sir God forbid Ufala',
				'shared': 'False',
				'shared_by': 'nobody',
				'items': [],
				'id': '233'
			}
		];
		expect(reducer(initialState, {
			type: types.SHOPPINGLISTS_CREATED_SUCCESSFULY,
			message: 'Shoppinglist back to school Created Successfully',
			response:all_shoppinglists
		})).toEqual({
			isLoading: false,
			isCreatingNewShoppingList: false,
			isShoppinglistSharing: false,
			shoppinglistCreated: true,
			isUpdatingShoppingList: false,
			shoppinglists: initialState.shoppinglists,
			all_shoppinglists:all_shoppinglists,
			error: false,
			message: 'Shoppinglist back to school Created Successfully',
			openSb: true,
			addFab: false,
			openUpdate: false
		});
	});
});