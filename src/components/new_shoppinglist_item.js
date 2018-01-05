import React, {Component} from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import {connect} from 'react-redux';

import {deactivateAddItem, viewShoppingList, addNewShoppingListItem} from '../actions';
import {itemActions} from './helpers';


export class NewShoppingListItem extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			price: '',
			quantity: '',
			shoppinglist_id: -1
		};
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleQuantityChange = this.handleQuantityChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleNameChange(e){
		//Update the name field
		this.setState({ name: e.target.value });
	}
	handlePriceChange(e){
		//Update the Price field
		this.setState({ price: e.target.value });
	}
	handleQuantityChange(e){
		//Update the Quantity field
		this.setState({ quantity: e.target.value });
	}
	
	handleClose(){
		//Invoked when the cancle button is clicked
		//Sets the openAddItem props to false
		this.props.deactivateAddItem();
	}
	handleSubmit(){
		//Invoked When a User presses the create new shoppinglist item button
		//submit details Supplied
		this.props.addNewShoppingListItem({
			'name': this.state.name,
			'price': this.state.price,
			'quantity': this.state.quantity,
			'shoppinglist_id': this.props.id
		});
		//reload the new shoppinglists
		//Update API to return all shoppinglist items on addition 
		//of a new one
		this.props.viewShoppingList(this.props.match.params.id);
	}
	render(){
		const actions = itemActions(this);
		let nameError = '';
		let priceError = '';
		let quantityError = '';
		let serverError='';
		if(this.props.error.name !== undefined){
			nameError=this.props.error.name[0].message;
		}
		if(this.props.error.price !== undefined){
			priceError=this.props.error.price[0].errors.Price;
		}
		if(this.props.error.quantity !== undefined){
			quantityError=this.props.error.quantity[0].errors.Quantity;
		}
		//server error
		if(this.props.error !== undefined){
			serverError=this.props.error;
		}
		let error = '';
		if(nameError){
			error=nameError;
		}else if(typeof(serverError) !== 'object'){
			error=serverError;
		}
		const children = [
			<TextField
			  hintText="Shoppinglist Item Name"
			  value={this.state.name}
			  fullWidth={true}
			  errorText={error}
			  onChange={this.handleNameChange}
			  key='name'
			/>,
			<TextField
			  hintText="Price of the Item"
			  multiLine={true}
			  fullWidth={true}
			  errorText={priceError}
			  value={this.state.price}
			  onChange={this.handlePriceChange}
			  key='price'
			/>,
			<TextField
			  hintText="Quantity of the Item"
			  multiLine={true}
			  fullWidth={true}
			  errorText={quantityError}
			  value={this.state.quantity}
			  onChange={this.handleQuantityChange}
			  key='quantity'
			/>
		];
		return(
			<Dialog open={this.props.openAddItem}
				title="Add Shoppinglist Item"
				actions={actions}
				children={children}
			>
			</Dialog>
		);
	}
}
function mapStateToProps(state){
	return{
		openAddItem: state.shoppinglist_items.openAddItem,
		id: state.shoppinglist_items.id,
	};
}
export default connect(mapStateToProps, {deactivateAddItem, viewShoppingList, addNewShoppingListItem})(NewShoppingListItem);