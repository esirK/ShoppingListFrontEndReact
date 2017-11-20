import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText, FlatButton} from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';


import {addNewShoppingList, getShoppingLists} from '../actions';

class ShoppingLists extends Component{
	constructor(props){
		super(props);
		console.log('starting again');
		this.state = {
			addOpen: false,
			name: '',
			description: '',
			error: props.error
		};
		this.handleFabClick = this.handleFabClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
	}
	handleSubmit(){
		this.props.addNewShoppingList({
			'name': this.state.name,
			'description': this.state.description
		});
		this.setState({ name: '' });
		this.setState({ description: ''});
	}
	handleTitleChange(e){
		this.setState({ name: e.target.value });
	}
	handleDescChange(e){
		this.setState({ description: e.target.value });
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
				key='name'
				onChange={this.handleTitleChange}
			/>,
			<TextField
				hintText="Description of the shopping list"
				multiLine={true}
				rowsMax={4}
				value={this.state.description}
				key='desc'
				onChange={this.handleDescChange}
			/>
		  ];  
		if(this.state.error && !this.state.addOpen){
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
							<FlatButton label="Delete" secondary={true}/>
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
						autoDetectWindowHeight
					>
					</Dialog>
			    {cards}
					<div id="fab">
						<FloatingActionButton secondary={true} onClick={this.handleFabClick}>
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
		error: state.shoppinglists.error,
	};
}
export default connect(mapStateToProps, {addNewShoppingList, getShoppingLists}) (ShoppingLists);