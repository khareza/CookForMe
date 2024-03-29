﻿import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthMethods from '../Helpers/AuthMethods';

const PrivateRoute = ({ component: Component, ...rest}) => {
    
    this.Auth = new AuthMethods();

    return (
        <Route {...rest}
            render={(props) =>
                this.Auth.loggedIn()
                    ? <Component {...rest}/>
                 : <Redirect to='/start/login'  />
            }
        />
    )
}

export default PrivateRoute