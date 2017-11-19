import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText, FlatButton} from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {connect} from 'react-redux';
import {addNewShoppingList, getShoppingLists} from '../actions';

class ShoppingLists extends Component{
	componentDidMount(){
		console.log(this.props);
		this.props.getShoppingLists();
	}

	render(){
		let cards = [];
		if(this.props.error){
			return(
				<div id="cards">
					<p>Got a {this.props.error} while Loading </p>
				</div>
			);
		}
		if(this.props.isLoading){
			return(
				<div id="cards">
					<p>Loading...</p>
				</div>
			);
		}
		else{
			this.props.shoppinglists.map((shoppinglist)=>
				cards.push(
					<Card key={shoppinglist.id}  onExpandChange={this.handleExpandChange}>
						<CardHeader
							title={shoppinglist.name}
							subtitle={shoppinglist.items.length+' Items Available'}
							actAsExpander={true}
							showExpandableButton={true}
						/>
						<CardText expandable={true}>
        				{shoppinglist.description}
						</CardText>
						<CardActions>
							<FlatButton label="View" primary={true}/>
							<FlatButton label="Delete" secondary={true}/>
						</CardActions>
					</Card>
				)
			);
			return(
				<div id="cards">
			    {cards}
					<div id="fab">
						<FloatingActionButton secondary={true} onClick={this.props.addNewShoppingList}>
							<ContentAdd />
						</FloatingActionButton>
					</div>
				</div>
			);
		}
	}
}
function mapStateToProps(state){
	return {
		isLoading: state.shoppinglists.isLoading,
		shoppinglists: state.shoppinglists.shoppinglists,
		error: state.shoppinglists.error
	};
}
export default connect(mapStateToProps, {addNewShoppingList, getShoppingLists}) (ShoppingLists);