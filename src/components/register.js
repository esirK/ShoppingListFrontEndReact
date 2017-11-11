import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {registerUser} from '../actions'

class RegisterForm extends Component {
    renderField(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger': ''}`;
        return(
            <div className={className}>
                <label>{field.lable}</label>
                <input
                    className="form-control"
                    type={field.type}
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error: ''}
                </div>
            </div>
        );
    }
    onFormSubmit(values){
        this.props.registerUser(values
            ,() =>{
            this.props.history.push("/login");
            }
        );
    }
    render(){
        const {handleSubmit, submitting} = this.props;
        return(
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
                                lable="Username"
                                type="text"
                                component={ this.renderField }
                            />
                            <Field
                                name="email"
                                type="email"
                                lable="Email"
                                component={ this.renderField }
                            />
                            <Field
                                name="password"
                                type="password"
                                lable="Password"
                                component={ this.renderField }
                            />
                            <Field
                                name="confirm_password"
                                type="password"
                                lable="Confirm Password"
                                component={ this.renderField }
                            />
                            <button type="submit" className="btn btn-primary">Register</button>
                            <Link className="btn btn-danger" to="/login">Cancel</Link>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
function validate(values){
    const errors = {};
    if (!values.username){
        errors.username = "Username Required";
    }
    if (!values.email){
        errors.email = "Email Required"
    }
    if (!values.password){
        errors.password = "Password Required"
    }
    if (values.password && values.password.length < 6){
        errors.password = "Passwords must be at least 6 Characters Long"
    }
    if (!values.confirm_password){
        errors.confirm_password = "Enter confirmation Password"
    }
    if(values.password !== values.confirm_password){
        console.log(values.password);
        console.log("Look at me ",values.confirm_password);
        errors.confirm_password = "Passwords do not match"
    }
    return errors;
}
export default reduxForm({
    validate,
    form: 'registrationform'
})
(
    connect(null, {registerUser})(RegisterForm)
)