import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewShoppingList } from '../actions/index';
import { Card, CardHeader, CardText, CardActions, FlatButton } from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';


import NewShoopingListItem from './new_shoppinglist_item';
import UpdateShoppingListItem from './update_shoppinglist_item';
import {activateAddItem, activateUpdateItem, hideSnackBar, deleteShoppinglistItem, resetErrors} from '../actions';

class ShoppingListItems extends Component{
	constructor(props){
		super(props);
		this.state={
			conf_delete: false,
			id: -1
		};
		this.handleFabClick = this.handleFabClick.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	componentDidMount(){
		//send request to shoppinglist api for shoppinglist 
		// whose id apear in url
		this.props.viewShoppingList(this.props.match.params.id);
	}
	handleFabClick(){
		//Open a Dialog to add a new shoppinglist Item
		//Sets the openAddItem props to true
		this.props.activateAddItem();
	}
	confirmDelete(id){
		this.setState({
			conf_delete: true,
			id
		});
	}
	handleDelete(id){
		console.log('Delete Item ', this.state.id);
		this.props.deleteShoppinglistItem(this.state.id);
		this.setState({
			conf_delete: false,
			id:-1
		});
		//Reload 
		this.props.viewShoppingList(this.props.match.params.id);
	}
	handleClose(){
		this.setState({
			conf_delete: false,
		});
	}
	render(){
		if(this.props.openAddItem){
			return(
				<NewShoopingListItem {...this.props}/>
			);
		}
		//Initialize empty cards to hold the shoppinglist items
		let cards = [];
		let fab = (
			<div id="cards">
				{cards}
				<div id="fab">
					<FloatingActionButton secondary={true} onClick={this.handleFabClick}>
						<ContentAdd />
					</FloatingActionButton>
				</div>
			</div>
		);
		if(this.props.isLoading){
			return(
				<div>
					<p>Loading...</p>
				</div>
			);
		}
		/*
		If the Redux error state has changed(Default: false)
		Then Api returned response with an error 
		*/
		if(this.props.error !== false){
			console.log('You Got ',this.props.error);
			return (
				<Card key='1'>
					<CardHeader
						title="No Shoppinglist Items"
					/>
					<CardText>
						{this.props.error}
					</CardText>
					{fab}
				</Card>
			);
		}
		if(this.props.data.items.length === 0){
			return(
				<Card key='1'>
					<CardHeader
						title="No Items"
					/>
					<CardText>
						You currently Have No Items in Shoppinglist '{this.props.data.name}'
					</CardText>
					{fab}
				</Card>
			);
		}
		else{
			if(this.props.isOpenUpdateItem){
				return(
					<UpdateShoppingListItem {...this.props}/>
				);
			}
			this.props.data.items.map((item)=>
				cards.push(
					<Card key={item.id}
						style={{
							margin: '1% auto',
						}}
					>
						<CardHeader
							title={item.name}
							style={{
								textAlign: 'center',
								'fontStyle': 'italic',
								'fontWeight': 'bold',
							}}
						/>
						<CardText>
							Price KSH: {item.price} /=
						</CardText>
						<CardText>
							Quantity: {item.quantity}
						</CardText>
						<CardActions>
							<FlatButton label="Update" primary={true} onClick={()=>{this.props.activateUpdateItem(item);}}/>
							<FlatButton name='delete' label="Delete" secondary={true} onClick={()=>{this.confirmDelete(item.id);}}/>
						</CardActions>
					</Card>
				));
			/**
			 * Shoppinglist Delete confirmation
			 */
			let actions = [
				<FlatButton
					label="Cancel"
					primary={true}
					onClick={this.handleClose}
				/>,
				<FlatButton
					label="OK"
					primary={true}
					onClick={this.handleDelete}
				/>,
			];
			return(
				<div>
					<div>
					    Shoppinglist '{this.props.data.name}'
					</div>
					{fab}
					<Snackbar
						open={this.props.openSb}
						message={this.props.message}
						autoHideDuration={3000}
						onRequestClose={this.props.hideSnackBar}
					/>
					<Dialog
						actions={actions}
						modal={false}
						open={this.state.conf_delete}
						onRequestClose={this.handleClose}
					>
         			Confirm Delete?
					</Dialog>
				</div>
			);
		} 	
	}
}
function mapStateToProps(state){
	return {
		data: state.shoppinglist_items.data,
		isLoading: state.shoppinglist_items.isLoading,
		error: state.shoppinglist_items.error,
		openAddItem: state.shoppinglist_items.openAddItem,
		openSb: state.shoppinglist_items.openSb,
		isOpenUpdateItem: state.shoppinglist_items.isOpenUpdateItem,
		message: state.shoppinglist_items.message,
		item: state.shoppinglist_items.item,
	};
}
export default connect(mapStateToProps, {viewShoppingList, activateAddItem, activateUpdateItem, hideSnackBar, deleteShoppinglistItem, resetErrors})(ShoppingListItems);