import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';
import {connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



import {submitDetails, resetErrors} from '../actions';
import {validate} from './helpers';
class RegisterForm extends Component {
	constructor(props){
		super(props);
		this.renderField = this.renderField.bind(this);
		this.props.resetErrors();
	}

	onFormSubmit(values) {
		this.props.submitDetails(values,() => {
			this.props.history.replace('/');
		}, 'register');
	}

	render() {
		const {error, handleSubmit} = this.props;
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
						<form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
							<Field
								name="username"
								label="Username"
								type="text"
								component={this.renderField}
							/>
							<Field
								name="email"
								type="email"
								label="Email"
								component={this.renderField}
							/>
							<span className= "text-danger">{error}</span>
							<Field
								name="password"
								type="password"
								label="Password"
								component={this.renderField}
							/>
							<Field
								name="confirm_password"
								type="password"
								label="Confirm Password"
								component={this.renderField}
							/>
							<br/>
							<RaisedButton label="Register" disabled={this.props.isSubmitting} type="submit" />
							<Link className="btn btn-danger" to="/login">Cancel</Link>
						</form>
					</div>
				</div>
			</div>
		);
	}

	renderField(field){
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
}

function mapStateToProps(state){
	return {
		error: state.register.error,
		isSubmitting: state.form.isSubmitting
	};
}
export default reduxForm({ validate, form: 'registrationform' })(connect(mapStateToProps, {submitDetails, resetErrors})(RegisterForm));