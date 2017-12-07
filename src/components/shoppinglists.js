import React, { Component } from 'react';


import {Card, CardActions, CardHeader, CardText, FlatButton} from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {connect} from 'react-redux';

import Snackbar from 'material-ui/Snackbar';


import {addNewShoppingList, getShoppingLists, deleteShoppingList,
	 updateShoppingList, activateFab, openUpdateDialog, closeUpdateDialog, hideSnackBar, resetErrors} from '../actions';

import AddShoppingList from './new_shoppinglist';
import UpdateShoppingList from './update_shoppinglist';

class ShoppingLists extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			description: '',
			error: props.error,
			message: '',
			id: false
		};
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.viewShoppingList = this.viewShoppingList.bind(this);
		this.handleFabClick = this.handleFabClick.bind(this);
	}
	componentDidMount(){
		this.props.getShoppingLists();
	}
	handleFabClick(){
		this.props.activateFab();
	}
	viewShoppingList(shoppinglist){
		//Moves to selected shoppinglist items passing the shoppinglist as a state
		console.log('Waht..', this.props.shoppinglists);
		this.props.history.push({
			pathname:`${shoppinglist.id}/shoppinglist_items`,
			state:{shoppinglist: shoppinglist}
		});
	}
	deleteList(id){
		this.props.deleteShoppingList(id);
	}
	handleUpdateShoppingList(id){
		this.setState({id});
		this.props.openUpdateDialog();
	}
	handleRequestClose(){
		// Call resetErrors to remove a any error or message available 
		//and reset the SnackBar too
		this.props.closeUpdateDialog();
		this.props.hideSnackBar();
	}
	render(){
		let cards = [];
		//Read fab status from react state
		if(this.props.addFab){
			return(
				/*Return an adding shoppinglist*/
				<AddShoppingList {...this.props}/>
			);
		}
		if(this.props.openUpdate){
			return(
				/*Return a component where Updating
				 a new shaoppinglist will happen*/
				<UpdateShoppingList {...this.state}/>
			);
		}
		if(this.props.error && !this.props.addFab){
			return(
				<div id="cards">
					<p>Got a {this.props.error} while Loading Your Shoppinglists</p>
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
			if(this.props.shoppinglists.message !== undefined){
				console.log('Wabudabu is', (this.props.shoppinglists.message));
				cards.push(
					<Card key='1'>
						<CardText>
							{this.props.shoppinglists.message}
						</CardText>
					</Card>
				);
			}else{
				/**
				 * Loop through shoppinglists while adding them to display cards
				 */
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
								<FlatButton label="View" primary={true} onClick={()=>{this.viewShoppingList(shoppinglist);}}/>
								<FlatButton label="Update" onClick={()=>this.handleUpdateShoppingList(shoppinglist.id)}/>
								<FlatButton name='delete' label="Delete" secondary={true} onClick={()=> this.deleteList(shoppinglist.id)}/>
							</CardActions>
						</Card>
					)
				);};
			return(
				<div id="cards">
			    {cards}
					<div id="fab">
						<FloatingActionButton secondary={true} onClick={this.handleFabClick}>
							<ContentAdd />
						</FloatingActionButton>
					</div>
					<Snackbar
						open={this.props.openSb}
						message={this.props.message||this.props.error }
						autoHideDuration={4000}
						onRequestClose={this.handleRequestClose}
					/>
				</div>
			);
		}
	}
}
function mapStateToProps(state){
	return {
		isLoading: state.shoppinglists.isLoading,
		shoppinglists: state.shoppinglists.shoppinglists,
		error: state.shoppinglists.error,
		message: state.shoppinglists.message,
		openSb: state.shoppinglists.openSb,
		addFab: state.shoppinglists.addFab,
		openUpdate: state.shoppinglists.openUpdate,
	};
}
export default connect(mapStateToProps, {addNewShoppingList, getShoppingLists, 
	deleteShoppingList, updateShoppingList, activateFab, openUpdateDialog, closeUpdateDialog, hideSnackBar, resetErrors}) (ShoppingLists);