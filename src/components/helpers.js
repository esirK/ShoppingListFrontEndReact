import React from 'react';
import {FlatButton} from 'material-ui';
import TextField from 'material-ui/TextField';


export function validate(values){
	const errors = {};
	if (!values.username){
		errors.username = 'Username Required';
	}
	if (!values.email){
		errors.email = 'Email Required';
	}
	if (!values.password){
		errors.password = 'Password Required';
	}
	if (values.password && values.password.length < 6){
		errors.password = 'Passwords must be at least 6 Characters Long';
	}
	if (!values.confirm_password){
		errors.confirm_password = 'Enter confirmation Password';
	}
	if(values.password !== values.confirm_password){
		errors.confirm_password = 'Passwords do not match';
	}
	return errors;
}

export function itemActions(context){
	let actions = [
		<FlatButton
		  label="Cancel"
		  primary={true}
		  onClick={context.handleClose}
		/>,
		<FlatButton
		  label="Submit"
		  primary={true}
		  onClick={context.handleSubmit}
		  disabled={context.props.isUpdating||context.props.isCreatingNewShoppingList||context.props.isShareling}
		/>,
	];
	return actions;
}

export function newShoppinglistChildren(context){
	let children = [
		<TextField
		  hintText="Shoppinglist Name"
		  errorText={context.props.error}
		  value={context.state.name}
		  fullWidth={true}
		  key='name'
		  onChange={context.handleTitleChange}
		/>,
		<TextField
		  hintText="Description of the shopping list"
		  multiLine={true}
		  rows={2}
		  rowsMax={4}
		  fullWidth={true}
		  value={context.state.description}
		  key='desc'
		  onChange={context.handleDescChange}
		/>
	];
	return children;
}
export function updateChildren(context){
	let children = [
		<TextField
		  hintText="New Item Name"
		  errorText={context.props.error}
		  value={context.state.name}
		  fullWidth={true}
		  onChange={context.handleNameChange}
		  key='name'
		/>,
		<TextField
		  hintText="New Price of the Item"
		  multiLine={true}
		  fullWidth={true}
		  errorText={context.state.priceError}
		  value={context.state.price}
		  onChange={context.handlePriceChange}
		  key='price'
		/>,
		<TextField
		  hintText="Quantity of the Item"
		  multiLine={true}
		  fullWidth={true}
		  errorText={context.state.quantityError}
		  value={context.state.quantity}
		  onChange={context.handleQuantityChange}
		  key='quantity'
		/>,
		<p key='error' className='alert alert-danger'>{context.state.error}</p>
	];
	return children;
}
export function shareShoppinglistChildren(context){
	let children = [
		<TextField
		  hintText="Email address to share with"
		  errorText={context.props.error}
		  value={context.state.email}
		  fullWidth={true}
		  onChange={context.handleEmailChange}
		  key='email'
		/>,
	];
	return children;
}
