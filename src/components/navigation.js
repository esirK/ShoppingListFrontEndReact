import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navigation extends Component{
	render(){
		return(
			<div className="container">
				<div className="navbar-header">
					<a className="navbar-brand" href="/" title="Awesome Shopping list app">

					</a>
				</div>
				<div className="navbar-collapse ">
					<ul>
						<li>
							<Link to="/">
                                Home
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}