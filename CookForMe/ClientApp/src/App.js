import React, { Component } from 'react';
import { LoginWrapper } from './components/LoginWrapper';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import AuthMethods from './Helpers/AuthMethods';
import PrivateComponent from './components/PrivateComponent'
import { UserProfile } from './components/UserProfile';

class App extends Component {

    Auth = new AuthMethods();

    handleLogout = () => {
        this.Auth.logout();
        this.props.history.push('/start/login');
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exac path="/start" component={LoginWrapper} />
                    <PrivateComponent path="/" component={UserProfile} logOut={this.handleLogout} />
                </Switch>
            </Router>
        );
    }
}
export default withRouter(App);