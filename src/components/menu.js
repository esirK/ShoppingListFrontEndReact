import React, {Component} from 'react';
import {connect} from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import {FlatButton} from 'material-ui';

import Dialog from 'material-ui/Dialog';


import {checkAuthenticationToken} from '../utils';
import {Logout} from '../actions';

class Menu extends Component{
	constructor(props){
		super(props);
		this.state ={
			conf_logout: false,
		};
		this.logout = this.logout.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}
	logout(){
		this.setState({conf_logout: true});
	}
	handleLogout(){
		this.props.Logout();
		this.setState({conf_logout: false});
		//reload page on Logout
		window.location.reload();
    	}
	handleClose(){
		this.setState({conf_logout: false});
	}
	render(){
		let actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.handleClose}
			/>,
			<FlatButton
				label="OK"
				primary={true}
				onClick={this.handleLogout}
			/>,
		];
		if(checkAuthenticationToken()){
			return(
				<div>
					<MenuItem primaryText="Logout" onClick={this.logout} style={{color: '#ffffff'}}/>
					<Dialog
						actions={actions}
						modal={false}
						open={this.state.conf_logout}
						onRequestClose={this.handleClose}
					>
         			Confirm Logout?
					</Dialog>
				</div>
			);
		}
		else{
			return(null);
		}
	}
}
export default connect(null, {Logout})(Menu);