import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewShoppingList } from '../actions/index';
import { Card, CardHeader, CardText, CardActions, FlatButton } from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import NewShoopingListItem from './new_shoppinglist_item';
import {activateAddItem, hideSnackBar, resetErrors} from '../actions';
class ShoppingListItems extends Component{
	constructor(props){
		super(props);
		this.handleFabClick = this.handleFabClick.bind();
	}
	componentDidMount(){
		console.log('am at the Items Component');
		this.props.viewShoppingList(this.props.match.params.id);
	}
	handleFabClick(){
		//Open a Dialog to add a new shoppinglist Item
		//Sets the openAddItem props to true
		this.props.activateAddItem();
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
							<FlatButton label="Update" primary={true}/>
							<FlatButton name='delete' label="Delete" secondary={true} />
						</CardActions>
					</Card>
				));
			return(
				<div>
					<div>
					    Shoppinglist '{this.props.data.name}'
					</div>
					{fab}
				</div>
			);
		}
	}
}
function mapStateToProps(state){
	return {
		data: state.shoppinglist_items.data,
		isLoading: state.shoppinglist_items.isLoading,
		openAddItem: state.shoppinglist_items.openAddItem,
		openSb: state.shoppinglist_items.openSb,
	};
}
export default connect(mapStateToProps, {viewShoppingList})(ShoppingListItems);