import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewShoppingList } from '../actions/index';
import { Card, CardHeader, CardText, CardActions, FlatButton } from 'material-ui';

class ShoppingListItems extends Component{
	constructor(props){
		super(props);
		console.log('Hey.. ', this.props);
	}
	componentDidMount(){
		console.log('am at the Items Component');
		this.props.viewShoppingList(this.props.match.params.id);
	}
	render(){
		let cards = [];
		if(this.props.isLoading){
			return(
				<div>
					<p>Loading...</p>
				</div>
			);
		}
		if(this.props.items.length === 0){
			return(
				<Card key='1'>
					<CardHeader
						title="No Items"
					/>
					<CardText>
						You currently Have No Items on this Shoppinglist
					</CardText>
				</Card>
			);
		}
		else{
			this.props.items.map((item)=>
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
								'font-style': 'italic',
								'font-weight': 'bold',
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
				<div id="cards">
                	{cards}
				</div>
			);
		}
	}
}
function mapStateToProps(state){
	return {
		items: state.shoppinglist_items.items,
		isLoading: state.shoppinglist_items.isLoading
	};
}
export default connect(mapStateToProps, {viewShoppingList})(ShoppingListItems);