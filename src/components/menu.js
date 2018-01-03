import React, {Component} from 'react';
import {connect} from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import {FlatButton} from 'material-ui';

import Dialog from 'material-ui/Dialog';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
		return(
			<div>
				<IconMenu
					iconButtonElement={
						<IconButton><MoreVertIcon /></IconButton>
					}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				>
					<MenuItem primaryText="Refresh" />
					<MenuItem primaryText="Help" />
					<MenuItem primaryText="Sign out" onClick={this.logout}/>
				</IconMenu>
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
}
export default connect(null, {Logout})(Menu);