import React, {Component} from 'react';
import {FlatButton} from 'material-ui';
import {connect} from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import ShoppingLists from './shoppinglists';
import {updateShoppingList, resetErrors, closeUpdateDialog} from '../actions';


class UpdateShoppingList extends Component{
	constructor(props){
		super(props);
		/*The update shoppinglist dialog will 
		be open by default once this component is rendered */
		
		this.state = {
			name: this.props.name,
			'description': this.props.description,
		};
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	handleTitleChange(e){
		//Updates title field as the user types
		this.setState({ name: e.target.value });
	}

	handleDescChange(e){
		// Updates description as user types
		this.setState({ description: e.target.value });
	}
    
	handleUpdate(){
		//Sends the update request to the API with the supplied data
		this.props.updateShoppingList(this.props.id, {
			'new_name': this.state.name.trim(),
			'description': this.state.description.trim()
		});
		this.setState({ name: '' });
		this.setState({ description: ''});
	}

	handleClose(){
		//reset openUpdate state on close of update dialog
		this.props.closeUpdateDialog();
		this.props.resetErrors();
	}
	render(){
		if(!this.props.openUpdate){
			return(
				<ShoppingLists/>
			);
		}
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.handleClose}
			/>,
			<FlatButton
				label="Update"
				primary={true}
				onClick={this.handleUpdate}
			/>,
		];
		if(this.props.isUpdatingShoppingList)
		{
			//add a circular progress bar bettween the 2 buttons
			actions.splice(1, 0, <CircularProgress/>);
		}
		const children = [
			<TextField
			  hintText="New Shoppinglist Name"
			  errorText={this.props.error}
			  value={this.state.name}
			  fullWidth={true}
			  key='name'
			  onChange={this.handleTitleChange}
			/>,
			<TextField
			  hintText="New Description of the shopping list"
			  multiLine={true}
			  rows={2}
			  rowsMax={4}
			  fullWidth={true}
			  value={this.state.description}
			  key='desc'
			  onChange={this.handleDescChange}
			/>
		];
		return(
			<Dialog open={this.props.openUpdate}
				title="Update Shoppinglist"
				actions={actions}
				children={children}
			>
			</Dialog>
		);
	}
}
function mapStateToProps(state){
	return{
		isUpdatingShoppingList: state.shoppinglists.isUpdatingShoppingList,
		error: state.shoppinglists.error,
		openUpdate: state.shoppinglists.openUpdate,
	};
}
export default connect(mapStateToProps, {updateShoppingList, closeUpdateDialog,
	resetErrors}) (UpdateShoppingList);