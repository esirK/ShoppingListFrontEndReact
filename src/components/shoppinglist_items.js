import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShoppingListItems extends Component{
	constructor(props){
		super(props);
		console.log('Hey.. ', this.props);
	}
	componentDidMount(){
		console.log('am at the Items Component');
	}
	render(){
		return(
			<div>
                Items {this.props.match.params.id}
			</div>
		);
	}
}
function mapStateToProps(state){
	return {
		items: state.shoppinglist_items.items,
	};
}
export default connect(mapStateToProps, null)(ShoppingListItems);