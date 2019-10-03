import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import Home from '../views/home/Home';
import User from '../views/user/User';
import MasterUser from '../views/Master/User/User';
import UnathorizedPage from '../views/other/UnathorizedPage';


export class Routes extends Component  {
    constructor(props) {
        super(props);

        this.options = {
            
        }
        this.state = {
            user: this.props.user
        }
     
    }

    checkAuthorized(role){
        let return_value = false;
        let user_role = this.props.user.role;
        for (let index = 0; index < role.length; index++) {
            if (role[index] == user_role){
                return_value = true;
            }
        }

        return return_value;
    }

    render(){
        return(
            <Switch>
                <Route exact path ='/' component={(this.checkAuthorized(['root','admin', 'user']) === true) ? Home : UnathorizedPage} />
                <Route exact path ='/dashboard/dashboard_1' component={(this.checkAuthorized(['root','admin', 'user']) === true) ? Home : UnathorizedPage} />
                <Route exact path ='/dashboard/dashboard_2' component={(this.checkAuthorized(['user']) === true) ? User : UnathorizedPage} />
                <Route exact path ='/master/user' component={(this.checkAuthorized(['root', 'admin','user']) === true) ? MasterUser : UnathorizedPage} />
            </Switch>
        );
    }

}
