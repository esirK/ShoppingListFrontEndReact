import React, {Component} from 'react';
import {FlatButton} from 'material-ui';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';



import {addNewShoppingList, resetErrors, closeFab} from '../actions';

import ShoppingLists from './shoppinglists';
class AddShoppingList extends Component{

	constructor(props){
		super(props);
		console.log('You got me', props);
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
		this.props.addNewShoppingList({
			'name': this.state.name,
			'description': this.state.description
		});
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
		const actions = [
			<FlatButton
			  label="Cancel"
			  primary={true}
			  onClick={this.handleClose}
			/>,
			<FlatButton
			  label="Submit"
			  primary={true}
			  onClick={this.handleSubmit}
			/>,
		];
		if(this.props.isCreatingNewShoppingList)
		{
			//add a circular progress bar bettween the 2 buttons
			actions.splice(1, 0, <CircularProgress/>);
		}
		const children = [
			<TextField
			  hintText="Shoppinglist Name"
			  errorText={this.props.error}
			  value={this.state.name}
			  fullWidth={true}
			  key='name'
			  onChange={this.handleTitleChange}
			/>,
			<TextField
			  hintText="Description of the shopping list"
			  multiLine={true}
			  rows={2}
			  rowsMax={4}
			  fullWidth={true}
			  value={this.state.description}
			  key='desc'
			  onChange={this.handleDescChange}
			/>
		];
		//if the shoppinglist has been created then return to parent
		console.log('Here.......=>', this.props.shoppinglistCreated);
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