import React, { Component } from 'react';
import RegisterForm from '../containers/register_form'

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <RegisterForm />
      </div>
    );
  }
}