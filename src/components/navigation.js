import React, { Component } from 'react';


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
                        <li><a href="/">Home</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}