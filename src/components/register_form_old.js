import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {registerUser} from '../actions/index';


class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			conf_password: '',
			pwd_match:false
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(e){
		var newState = {};
		newState[e.target.name] = e.target.value;
		if (typeof e.target.name !== 'undefined' && e.target.name === 'conf_password') {
			if (this.state.password === this.state.conf_password) {
				newState[this.state.pwd_match] = true;
			}
		}
		this.setState(newState);
	}
	render() {
		return (
			<div className="row">
				<div className="col-sm-6 col-sm-offset-3">
					<div className="shoppinglist-dialog">
						<h1>Shopping List </h1>
						<div className="dialog-body">
							<p>
                                Enter your details as asked below in order to join the Shopping list app.
							</p>
						</div>
						<form onSubmit={this.onFormSubmit}>
							<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-addon">
										<span className="icon-mail"></span>
									</div>
									<input
										type="text"
										placeholder="Username"
										className="form-control"
										id='inputUsername'
										name="username"
										onChange={this.onInputChange}
										value={this.state.username}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-addon">
										<span className="icon-mail"></span>
									</div>
									<input
										className="form-control"
										placeholder="example@example.com"
										name="email"
										onChange={this.onInputChange}
										value={this.state.email}
										type="email"
										id='inputEmail'
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-addon">
										<span className="icon-dots"/>
									</div>
									<input
										placeholder="Password"
										name="password"
										value={this.state.password}
										onChange={this.onInputChange}
										type="password"
										className="form-control"
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-addon">
										<span className="icon-dots"/>
									</div>
									<input
										name="conf_password"
										placeholder="Confirm Password"
										type="password"
										value={this.state.conf_password}
										onChange={this.onInputChange}
										className="form-control"
									/>
								</div>
								<label ref="message" style={{display: this.state.pwd_match ?'none': 'block'}} className="clearflex alert alert-warning" >Passwords Don't Match</label>
							</div>
							<div className="clearfix">
								<button type="submit" className="btn btn-lg btn-primary pull-right"> Submit </button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.registerUser(this.state);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({registerUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(RegisterForm);