import React, {Component} from 'react';
import {connect} from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {FlatButton} from 'material-ui';

import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import {Logout, update_profile, hideSnackBar} from '../actions';

export class Menu extends Component{
	constructor(props){
		super(props);
		this.state ={
			conf_logout: false,
			open_profile: false,
			username: '',
			password: '',
			old_password: '',
			openSb: false
		};
		this.logout = this.logout.bind(this);
		this.profile = this.profile.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
	}
	logout(){
		this.setState({conf_logout: true});
	}
	profile(){
		this.setState({open_profile: true});
		this.props.hideSnackBar();
	}
	handleLogout(){
		this.props.Logout();
		this.setState({conf_logout: false});
		//reload page on Logout
		window.location.reload();
	}
	handlePasswordChange(e){
		this.setState({password: e.target.value});
	}
	handleUsernameChange(e){
		this.setState({username: e.target.value});
	}
	handleProfileUpdate(){
		this.props.update_profile({username:this.state.username, password:this.state.password});
		this.setState({open_profile: false});
		this.setState({'username':''});
		this.setState({'password':''});
		this.setState({'old_password':''});
	}
	handleClose(){
		this.setState({conf_logout: false});
		this.setState({open_profile: false});
		this.setState({'username':''});
		this.setState({'password':''});
		this.setState({'old_password':''});
		this.props.hideSnackBar();
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
		let profile_actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.handleClose}
			/>,
			<FlatButton
				label="Update"
				primary={true}
				onClick={this.handleProfileUpdate}
			/>,
		];
		const profile_children = [
			<TextField
			  hintText="New Username"
			  value={this.state.username}
			  fullWidth={true}
			  key='name'
			  onChange={this.handleUsernameChange}
			/>,
			<TextField
			  hintText="Old Password"
			  multiLine={true}
			  fullWidth={true}
			  value={this.state.password}
			  key='old_p'
			  onChange={this.handlePasswordChange}
			  type={'password'}
			/>,
			<TextField
			  hintText="New Password"
			  multiLine={true}
			  fullWidth={true}
			  key='new_p'
			  onChange={this.handlePasswordChange}
			  type="password"
			>
			</TextField>
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
					<MenuItem primaryText="Profile" onClick={this.profile} />
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
				<Dialog open={this.state.open_profile}
					title="Update Personal details"
					actions={profile_actions}
					children={profile_children}
					onRequestClose={this.handleClose}
				>
				</Dialog>
				<Snackbar
					open={this.props.openSb}
					message={this.props.message}
					autoHideDuration={3000}
					onRequestClose={this.handleRequestClose}
				/>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return{
		message: state.authentication.message,
		openSb: state.authentication.openSb,
	};
}
export default connect(mapStateToProps, {Logout, update_profile, hideSnackBar})(Menu);