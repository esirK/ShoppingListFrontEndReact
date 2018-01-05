import React, {Component} from 'react';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';


import {itemActions, newShoppinglistChildren} from './helpers';
import {addNewShoppingList, resetErrors, closeFab} from '../actions';

import ShoppingLists from './shoppinglists';
export class AddShoppingList extends Component{

	constructor(props){
		super(props);
		this.state = {
			name: '',
			description: '',
			exit: false,
			open: true,
		};
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);
	}
	handleClose(){
		// resets state on closeing of Add shoppinglist dialog
		this.setState({ name: '' });
		this.setState({ description: ''});
		this.setState({ exit: true });
		this.props.closeFab();
		this.props.resetErrors();
	}
	handleSubmit(){
		/*Submits user request to create 
		a new shoppinglist with the required parameters*/
		let limit = this.props.limit;
		this.props.addNewShoppingList({
			'name': this.state.name,
			'description': this.state.description
		}, limit);
		this.setState({ name: '' });
		this.setState({ description: ''});
	}
	handleTitleChange(e){
		// Updates title field as user types
		this.setState({ name: e.target.value });
	}
	handleDescChange(e){
		// Updates description as user types
		this.setState({ description: e.target.value });
	}
	render()
	{
		const actions = itemActions(this);

		if(this.props.isCreatingNewShoppingList)
		{
			//add a circular progress bar bettween the 2 buttons
			actions.splice(1, 0, <CircularProgress/>);
		}
		const children = newShoppinglistChildren(this);
		//if the shoppinglist has been created then return to parent
		if(this.props.shoppinglistCreated | this.state.exit){
			return(
				<ShoppingLists/>
			);  
		}
		return(
			<Dialog open={this.state.open}
				title="Add Shoppinglist"
				actions={actions}
				children={children}
			>
			</Dialog>
		);
	};
}
function mapStateToProps(state){
	return {
		isCreatingNewShoppingList: state.shoppinglists.isCreatingNewShoppingList,
		error: state.shoppinglists.error,
		message: state.shoppinglists.message,
		shoppinglistCreated: state.shoppinglists.shoppinglistCreated,
	};
}
export default connect(mapStateToProps, {addNewShoppingList, closeFab,
	resetErrors}) (AddShoppingList);