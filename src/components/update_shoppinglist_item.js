import React, {Component} from 'react';

import {connect} from 'react-redux';

import {deactivateUpdateItem, viewShoppingList, updateShoppingListItem, resetErrors} from '../actions';
import {itemActions, updateChildren} from './helpers';

import Dialog from 'material-ui/Dialog';

class UpdateShoppingListItem extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: props.item.name,
			price: props.item.price,
			quantity: props.item.quantity,
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
		this.props.resetErrors();
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
				'item_id': this.props.item.id
			});
		}
	}
	render(){
		const actions = itemActions(this);
		const children = updateChildren(this);
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
export default connect(mapStateToProps, {deactivateUpdateItem, viewShoppingList, updateShoppingListItem, resetErrors})(UpdateShoppingListItem);