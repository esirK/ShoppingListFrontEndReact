import React, { Component } from 'react';


import {Card, CardActions, CardHeader, CardText, FlatButton} from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {connect} from 'react-redux';


import Dialog from 'material-ui/Dialog';
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
			id: false,
			conf_delete: false
		};
		//Bind methods to this class
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.viewShoppingList = this.viewShoppingList.bind(this);
		this.handleFabClick = this.handleFabClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}
	componentDidMount(){
		this.setState({conf_delete: false});
		this.props.getShoppingLists();
	}
	handleFabClick(){
		this.props.activateFab();
	}
	handleDelete(){
		this.props.deleteShoppingList(this.state.id);
		this.setState({conf_delete: false});
	}
	handleClose(){
		this.setState({conf_delete: false});
	}
	viewShoppingList(shoppinglist){
		//Moves to selected shoppinglist items
		this.props.history.push({
			pathname:`${shoppinglist.id}/shoppinglist_items`
		});
	}
	deleteList(id){
		this.setState({conf_delete: true});
		this.setState({id});
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
				/*Return an adding shoppinglist component*/
				<AddShoppingList {...this.props}/>
			);
		}
		if(this.props.openUpdate){
			//if the user has pressed the shoppinglist update button
			return(
				/*Return a component where Updating
				 a new shaoppinglist will happen*/
				<UpdateShoppingList {...this.state}/>
			);
		}
		//if errors exist and no dialog is floating then show this paragraph
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
			/** */
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
						autoHideDuration={3000}
						onRequestClose={this.handleRequestClose}
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