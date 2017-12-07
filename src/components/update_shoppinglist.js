import React, {Component} from 'react';
import {FlatButton} from 'material-ui';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import ShoppingLists from './shoppinglists';
import {updateShoppingList, resetErrors} from '../actions';


class UpdateShoppingList extends Component{
	constructor(props){
		super(props);
		/*The update shoppinglist dialog will 
        be open by default once this component is rendered */
		this.state = {
			name: '',
			'description': '',
			open: true,
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
			'new_name': this.state.name,
			'description': this.state.description
		}, this.setState({open: true}));
		this.setState({ name: '' });
		this.setState({ description: ''});
		// this.setState({ openUpdate: false});
	}

	handleClose(){
		//Resetes state on close of update dialog
		this.setState({open: false});
	}
	render(){
		if(!this.state.open){
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
			<Dialog open={this.state.open}
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
	};
}
export default connect(mapStateToProps, {updateShoppingList, 
	resetErrors}) (UpdateShoppingList);