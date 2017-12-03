import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {validate} from './helpers';
import {submitDetails, resetErrors} from '../actions';


class LoginForm extends Component{
	componentWillMount() {
		resetErrors();
		if(this.props.isAuthenticated){
		  	return () =>{
				console.log('executing');
			};
		}
	}
	onFormSubmit(values) {
		this.props.submitDetails(values,() => {
			this.props.history.replace('/');
		},'user');
	}

	render(){
		const {error, handleSubmit, isSubmitting} = this.props;
		return(
			<div className="row">
				<div className="col-sm-6 col-sm-offset-3">
					<div className="shoppinglist-dialog">
						<h1>Shopping List </h1>
						<div className="dialog-body">
							<p>
                                Enter your details to login to Shopping list app.
							</p>
						</div>
						<form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
							<Field
								name="email"
								type="email"
								label="Email"
								component={ renderField }
							/>
							<Field
								name="password"
								label="Password"
								type="password"
								component={ renderField }
							/>
							<div className={`alert alert-danger ${error ? 'visible': 'invisible'}`}>
								{error ? <strong>{error}</strong>: ''}
							</div>
							<RaisedButton label="Login" disabled={isSubmitting} type="submit" />
							<Link className="btn btn-danger" to="/register">Cancel</Link>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
function renderField(field){
	const { meta: { touched, error } } = field;
	const className = `form-group ${touched && error ? 'has-danger': ''}`;
	return(
		<div className={className}>
			<TextField
				type={field.type}
				floatingLabelText={field.label}
				{...field.input}
				fullWidth={true}
			/>
			<div className="text-help">
				{touched ? error: ''}
			</div>
		</div>
	);
}
function mapStateToProps(state) {
	return {
		error: state.register.error,
		isSubmitting: state.register.isSubmitting,
		isAuthenticated: state.authentication.isAuthenticated,
	};
}
export default reduxForm({
	form: 'LoginForm',
	validate
})(
	connect(mapStateToProps, {submitDetails})(LoginForm)
);