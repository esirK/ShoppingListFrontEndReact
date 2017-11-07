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
            password: ''
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
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
                                        value={this.state.password}
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
                                        placeholder="Confirm Password"
                                        type="password"
                                        className="form-control"
                                    />
                                </div>
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