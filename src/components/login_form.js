import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {validate} from './helpers'
import {submitDetails} from "../actions";


class LoginForm extends Component{

    onFormSubmit(values) {
        this.props.submitDetails(values,() => {
            this.props.history.push("/")
        },"user");
    }

    render(){
        console.log("hiiii", this.state);
        const {error, handleSubmit} = this.props;
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
                            <button type="submit" className="btn btn-primary">Login</button>
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
            <label>{field.label}</label>
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
function mapStateToProps(state) {
    return {
        error: state.register.error
    }
}
export default reduxForm({
   form: 'LoginForm',
    validate
})(
    connect(mapStateToProps, {submitDetails},)(LoginForm)
);