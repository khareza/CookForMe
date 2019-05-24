import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../ComponentsStyles/SideMenu.css';

export class SideMenu extends Component {

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header className="header" role="banner">
                <h1 className="logo">
                    <a href="/profile">Cook for <span>Me</span></a>
                </h1>
                <div className="nav-wrap">
                    <nav className="main-nav">
                        <ul className="unstyled list-hover-slide">
                            <li><NavLink to="/profile">My profile</NavLink></li>
                            <li><NavLink to="/orders">Orders</NavLink></li>
                            <li><NavLink to="/responses">Responses</NavLink></li>
                        </ul>
                    </nav>
                    
                </div>
                <button className="btn btn-danger logOutBtn" onClick={this.props.logOut}>LogOut</button>
            </header>
        );
    }
}