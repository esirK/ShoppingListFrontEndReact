import React, {Component} from 'react';

import {connect} from 'react-redux';

import {deactivateUpdateItem, viewShoppingList, updateShoppingListItem} from '../actions';
import Dialog from 'material-ui/Dialog';
import {FlatButton} from 'material-ui';
import TextField from 'material-ui/TextField';

class UpdateShoppingListItem extends Component{
	constructor(props){
		super(props);
		console.log('You here Now ', props);
		this.state = {
			name: props.name,
			price: props.price,
			quantity: props.quantity,
			nameError: '',
			priceError: '',
			quantityError: '',
			error:''
		};
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleQuantityChange = this.handleQuantityChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleNameChange(e){
		this.setState({ name: e.target.value });
		//Update the name field
		if ((e.target.value).trim().length===0){
			this.setState({
				nameError: 'Name is Empty'
			});
		}
		else if(!isNaN(this.state.name)){
			this.setState({nameError: 'Only Strings allowed For shoppinglist names'});
		}
		else{
			this.setState({
				nameError: ''
			});
		}
	}
	handlePriceChange(e){
		//Update the Price field
		this.setState({ price: e.target.value });
		if ((e.target.value).trim().length===0){
			this.setState({
				priceError: 'Price is Empty'
			});
		}
		else if(isNaN(this.state.price)){
			this.setState({priceError: 'Only Numbers allowed For shoppinglist price'});
		}
		else{
			console.log('WWWW', parseFloat(this.state.price));
			this.setState({
				priceError: ''
			});
		}
	}
	handleQuantityChange(e){
		//Update the Quantity field
		this.setState({ quantity: e.target.value });
		if ((e.target.value).trim().length===0){
			this.setState({
				quantityError: 'Quantity is Empty'
			});
		}
		else if(isNaN(this.state.quantity)){
			this.setState({quantityError: 'Only Numbers allowed For shoppinglist quantity'});
		}
		else{
			this.setState({
				quantityError: ''
			});
		}
	}
	handleClose(){
		//Invoked when the cancle button is clicked
		//Sets the openAddItem props to false
		this.props.deactivateUpdateItem();
	}
	handleSubmit(){
		//Invoked When a User presses the create new shoppinglist item button
		//submit details Supplied
		if(this.state.nameError !==''&&this.state.priceError!==''&& this.state.quantityError!==''){
			this.setState({error:'Nothing Provided to Update'});
		}
		if(this.state.nameError ===''&&this.state.priceError===''&& this.state.quantityError==='')
		{
			this.props.updateShoppingListItem({
				'name': this.state.name,
				'price': this.state.price,
				'quantity': this.state.quantity,
				'item_id': this.props.id
			});
		}
	}
	render(){
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
			  disabled={this.props.isUpdating}
			/>,
		];
		const children = [
			<TextField
			  hintText="New Item Name"
			  errorText={this.state.nameError}
			  value={this.state.name}
			  fullWidth={true}
			  onChange={this.handleNameChange}
			  key='name'
			/>,
			<TextField
			  hintText="New Price of the Item"
			  multiLine={true}
			  fullWidth={true}
			  errorText={this.state.priceError}
			  value={this.state.price}
			  onChange={this.handlePriceChange}
			  key='price'
			/>,
			<TextField
			  hintText="Quantity of the Item"
			  multiLine={true}
			  fullWidth={true}
			  errorText={this.state.quantityError}
			  value={this.state.quantity}
			  onChange={this.handleQuantityChange}
			  key='quantity'
			/>,
			<p key='error' className='alert alert-danger'>{this.state.error}</p>
		];
		return(
			<div>
				<Dialog open={this.props.openUpdateItem}
					title="Update Shoppinglist Item"
					actions={actions}
					children={children}
				>
				</Dialog>
			</div>
		);
	}
}
function mapStateToProps(state){
	return{
		openUpdateItem: state.shoppinglist_items.isOpenUpdateItem,
		isUpdating: state.shoppinglist_items.isUpdating,
		error: state.shoppinglist_items.error,
	};
}
export default connect(mapStateToProps, {deactivateUpdateItem, viewShoppingList, updateShoppingListItem})(UpdateShoppingListItem);