import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText, FlatButton} from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';



import {addNewShoppingList, getShoppingLists, deleteShoppingList, updateShoppingList, resetErrors} from '../actions';

class ShoppingLists extends Component{
	constructor(props){
		super(props);
		console.log('starting again');
		this.state = {
			addOpen: false,
			name: '',
			description: '',
			error: props.error,
			open: false,
			message: '',
			openUpdate: false
		};
		this.handleFabClick = this.handleFabClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleUpdateShoppingList = this.handleUpdateShoppingList.bind(this);
	}
	componentDidMount(){
		console.log('state ',this.state);
		this.props.getShoppingLists();
	}
	handleFabClick(){
		console.log('Clicked Fab', this.state.addOpen);
		this.setState({ addOpen: true });
	}
	handleClose(){
		this.setState({ name: '' });
		this.setState({ description: ''});
		this.setState({ addOpen: false });
		this.setState({openUpdate: false});
		this.props.resetErrors();
	}
	handleSubmit(){
		this.props.addNewShoppingList({
			'name': this.state.name,
			'description': this.state.description
		});
		this.setState({ open: true});
		this.setState({ name: '' });
		this.setState({ description: ''});
	}

	handleTitleChange(e){
		this.setState({ name: e.target.value });
	}
	handleDescChange(e){
		this.setState({ description: e.target.value });
	}
	deleteList(id){
		console.log('deleting...', id);
		this.props.deleteShoppingList(id, this.setState({open: true}));
	}
	handleUpdateShoppingList(id){
		this.setState({ openUpdate: true, id});
	}
	handleUpdate(){
		this.props.updateShoppingList(this.state.id, {
			'new_name': this.state.name,
			'description': this.state.description
		}, this.setState({open: true}));
		this.setState({ name: '' });
		this.setState({ description: ''});
		// this.setState({ openUpdate: false});
	}
	handleRequestClose(){
		this.setState({open: false});
	}
	render(){
		let cards = [];
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
			/>,
		  ];	
		  const children = [
			  <TextField
      			hintText="Shoppinglist Name"
				errorText={this.props.error}
				value={this.state.name}
				fullWidth={true}
				key='name'
				onChange={this.handleTitleChange}
			/>,
			<TextField
				hintText="Description of the shopping list"
				multiLine={true}
				rows={2}
				rowsMax={4}
				fullWidth={true}
				value={this.state.description}
				key='desc'
				onChange={this.handleDescChange}
			/>
		  ];
		  const update_actions = [
			<FlatButton
			  label="Cancel"
			  primary={true}
			  onClick={this.handleClose}
			/>,
			<FlatButton
			  label="Update"
			  primary={true}
			  onClick={this.handleUpdate}
			/>,
		  ];	
		  const update_children = [
			  <TextField
      			hintText="New Shoppinglist Name"
				errorText={this.props.error}
				value={this.state.name}
				fullWidth={true}
				key='name'
				onChange={this.handleTitleChange}
			/>,
			<TextField
				hintText="New Description of the shopping list"
				multiLine={true}
				rows={2}
				rowsMax={4}
				fullWidth={true}
				value={this.state.description}
				key='desc'
				onChange={this.handleDescChange}
			/>
		  ];
		if(this.props.error && !this.state.addOpen){
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
							<FlatButton label="Update" onClick={()=>this.handleUpdateShoppingList(shoppinglist.id)}/>
							<FlatButton name='delete' label="Delete" secondary={true} onClick={()=> this.deleteList(shoppinglist.id)}/>
						</CardActions>
					</Card>
				)
			);
			return(
				<div id="cards">
					<Dialog open={this.state.addOpen}
						title="Add Shoppinglist"
						actions={actions}
						children={children}
					>
					</Dialog>
					<Dialog open={this.state.openUpdate}
						title="Update Shoppinglist"
						actions={update_actions}
						children={update_children}
					>
					</Dialog>
			    {cards}
					<div id="fab">
						<FloatingActionButton secondary={true} onClick={this.handleFabClick}>
							<ContentAdd />
						</FloatingActionButton>
					</div>
					<Snackbar
						open={this.state.open}
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
	};
}
export default connect(mapStateToProps, {addNewShoppingList, getShoppingLists, deleteShoppingList, updateShoppingList, resetErrors}) (ShoppingLists);