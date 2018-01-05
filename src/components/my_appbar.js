import React, { Component } from 'react';

import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';

import Menu from './menu';

export class MyAppBar extends Component{
	render(){
		return(
			<AppBar title="Shopping List App" showMenuIconButton={false}
				iconElementRight={this.props.isAuthenticated?<Menu />:null}
			/>
		);
	};
}
function mapStateToProps(state, ownProps) {
	return{
		isAuthenticated: state.authentication.isAuthenticated,
	};
}
export default connect(mapStateToProps, null)( MyAppBar);