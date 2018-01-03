import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import {Card, CardActions, CardHeader, CardText, FlatButton} from 'material-ui';
import TextField from 'material-ui/TextField';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {connect} from 'react-redux';


import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

import {itemActions, shareShoppinglistChildren} from './helpers';

import {addNewShoppingList, getShoppingLists, deleteShoppingList, searchShoppinglist, shareShoppingList,
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
			conf_delete: false,
			page: 1,
			limit: 4,
			searchTerm: '',
			shareDialog: false,
			email:''
		};
		this.props.resetErrors();
		//Bind methods to this class
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.viewShoppingList = this.viewShoppingList.bind(this);
		this.handleFabClick = this.handleFabClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.shareShoppingList = this.shareShoppingList.bind(this);
		this.search = this.search.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount(){
		this.setState({conf_delete: false});
		this.props.getShoppingLists(this.state.page, this.state.limit, true);
		this.props.getShoppingLists(this.state.page, this.state.limit, false);
	}
	componentWillReceiveProps(nextprops){
		const queryString = require('query-string');
		const parsed = queryString.parse(nextprops.location.search);
		if(parsed.limit !== undefined){
			this.setState({page: parsed.page, limit: parsed.limit});
			if((parsed.limit && parsed.page) !== (this.state.limit&&this.state.page)){
				this.props.getShoppingLists(parsed.page, parsed.limit, false);
			}
		}
	}
	handleFabClick(){
		this.props.activateFab();
	}
	handleDelete(){
		this.props.deleteShoppingList(this.state.id);
		this.setState({conf_delete: false});
		if(this.props.shoppinglists.length ===1){
			//this is to prevent the page not found error.
			this.props.history.push({
				pathname: '/'
			}
			);
		}
		if(this.props.all_shoppinglists.length===1){
			//Reload the whole page if all shoppinglsists have been deleted
			window.location.reload();
		}
	}
	handleClose(){
		this.setState({conf_delete: false});
		this.setState({shareDialog: false});
		this.setState({email:''});
		this.props.resetErrors();
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
	handleUpdateShoppingList(id, name, description){
		this.setState({id});
		this.setState({name});
		this.setState({description});
		this.props.openUpdateDialog();
	}
	shareShoppingList(id){
		this.setState({
			shareDialog:true, id,
		});
	}
	handleEmailChange(event){
		//Email chache for the share shoppinglist dialog
		this.setState({email:event.target.value});
	}
	handleSubmit(){
		//Handles submission of email to share shoppinglist with
		this.props.shareShoppingList(this.state.email, this.state.id, ()=>{this.setState({shareDialog:false, email:''});});
	}
	handleRequestClose(){
		// Call resetErrors to remove a any error or message available 
		//and reset the SnackBar too
		this.props.closeUpdateDialog();
		this.props.hideSnackBar();
	}
	handleSearch(){
		this.props.searchShoppinglist(this.state.searchTerm);
	}
	search(event){
		//Do not search for empty string
		if(event.target.value.trim() !== ''){
			this.setState({searchTerm: event.target.value}, this.handleSearch);			
		}
		else{
			//Reload shoppinglists inorder to maintain pagination
			this.props.getShoppingLists(1,4,true);
			this.props.getShoppingLists(1,4,false);
		}
	}
	render(){
		let cards = [];
		let pages = [];
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
		if(this.props.error && !this.props.addFab && !this.state.shareDialog){
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
							<CardText color='#E040FB'
								style={{
									float: 'right'}}
							>
								{shoppinglist.shared!=='False' ? `${'Shared By '}${shoppinglist.shared_by}` :''}
							</CardText>
							<CardText expandable={true}>
        				{shoppinglist.description}
							</CardText>
							<CardActions>
								<FlatButton label="View" primary={true} onClick={()=>{this.viewShoppingList(shoppinglist);}}
									rippleColor='#00C853'
								/>

								<FlatButton label="Update" onClick={()=>this.handleUpdateShoppingList(shoppinglist.id, shoppinglist.name, shoppinglist.description)}
									style={{color:'#FFC107'}} rippleColor='#1B5E20'
								/>
								
								<FlatButton name='delete' label="Delete" secondary={true} onClick={()=> this.deleteList(shoppinglist.id)}
									rippleColor='#C62828'
								/>
								
								<FlatButton name='share' label="Share" primary={true} onClick={()=> this.shareShoppingList(shoppinglist.id)}
									rippleColor='#AA00FF' style={{color:'#64DD17', margin:'75dp'}}
								/>
							</CardActions>
						</Card>
					)
				);
				//Generate the page numbers
				let spLists = Math.floor(((this.props.all_shoppinglists).length)/this.state.limit);
				let rem = (this.props.all_shoppinglists).length % this.state.limit;
				let total =0;
				if(rem > 0){
					total = spLists+1;
				}else{
					total = spLists; 
				}
				for(var x=0; x<total; x++){
					pages.push(
						<li key={x}><NavLink to={`/shoppinglists?page=${x+1}&limit=${this.state.limit}`} activeClassName="active">{x+1}</NavLink></li>
					);
				}
			};
			
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
			const shareActions = itemActions(this);			
			const children = shareShoppinglistChildren(this);
			/** */
			return(
				<div id="cards">
					<TextField
						hintText="Shoppinglist Name"
						floatingLabelText="Search"
						fullWidth={true}
						onChange={this.search}
					/><br />
			    {cards}
					<ul className="pagination pagination-lg pagination-centered">
						{pages}
					</ul>
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
					<Dialog
						actions={shareActions}
						children={children}
						modal={true}
						open={this.state.shareDialog}
						onRequestClose={this.handleClose}
						title="Share with"
					>
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
		all_shoppinglists: state.shoppinglists.all_shoppinglists,
		error: state.shoppinglists.error,
		message: state.shoppinglists.message,
		openSb: state.shoppinglists.openSb,
		addFab: state.shoppinglists.addFab,
		openUpdate: state.shoppinglists.openUpdate,
	};
}
export default connect(mapStateToProps, {addNewShoppingList, getShoppingLists, searchShoppinglist, shareShoppingList,
	deleteShoppingList, updateShoppingList, activateFab, openUpdateDialog, closeUpdateDialog, hideSnackBar, resetErrors}) (ShoppingLists);