import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText, FlatButton} from 'material-ui';
import axios from 'axios/index';

let URL = 'http://127.0.0.1:5000/v1/';
export default class ShoppingLists extends Component{
	componentDidMount(){
		var self = this;
		axios({
			method: 'get',
			url: `${URL}${'shoppinglists'}`,
			auth: {
				username: localStorage.getItem('jwt'),
				password: ''
			}
		})
			.then(function (response) {
				console.log('The Status Is',response);
				self.setState({
					shoppinglists:response.data
				});
			})
			.catch(function (error) {
				console.log(error);
				return false;
			});
	}
	constructor(){
		super();
		this.state = {
			shoppinglists: [],
		};
	}

	render(){
		let cards = [];
		this.state.shoppinglists.map((shoppinglist, x)=>
			cards.push(
				<Card key={x} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
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
						<FlatButton label="Expand" />
						<FlatButton label="Reduce" />
					</CardActions>
				</Card>
			)
		);
		return(
			<div id="cards">
			    {cards}
			</div>
		);
	}
}