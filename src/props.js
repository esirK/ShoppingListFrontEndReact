export const shoppinglist_props = {
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
export const shoppinglist_item_props = {
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