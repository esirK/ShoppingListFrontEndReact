import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser } from '../actions/index';


class RegisterForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    render(){
        return(
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
                            value={this.state.username}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group input-group-lg">
                    <label>Email</label>
                    <input
                        className="form-control"
                        placeholder="example@example.com"
                        value={this.state.email}
                        type="email"
                        id='inputEmail'
                    />
                    </div>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        placeholder="Password"
                        value={this.state.password}
                        type="password"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        placeholder="Confirm Password"
                        type="password"
                        className="form-control"
                    />
                </div>
                <label></label>
                <span className="input-group-btn">
					<button type="submit" className="btn btn-secondary"> Submit </button>
				</span>
            </form>
        );
    }
    onFormSubmit(event){
        event.preventDefault();
        this.props.registerUser(this.state);
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ registerUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(RegisterForm);