import React, { Component } from 'react';
import { connect} from "remx";

import { HashRouter, Route, Switch } from 'react-router-dom';

import broker from './utils/broker';
import authStore from './stores/auth';

import './assets/css/dashforge.css';
import './assets/css/app.css';
import "sweetalert/dist/sweetalert.css";

import MainLayout from './containers/MainLayout';


class App extends Component {
  componentDidMount(){
    const token = window.localStorage.getItem('token');
    if (token) {
      // console.log(token)
      broker.checkUserIdentity().then(res => {
        if (res.status) {
          authStore.setters.setUser(res.user);
         } else {
          window.localStorage.clear();
          window.location.reload();
        }
      });
    }
  }

  render(){
    return (<HashRouter>
      <Switch>
        {/* <Route exact path="/login" name="Login Page" component={LoginLayout} /> */}
        <Route path="" name="Home" component={MainLayout} />
      </Switch>
      
    </HashRouter>);
  }

}

function mapStateToProps(props) {
  return {
      user: authStore.getters.getUser(),
  }
}

export default connect(mapStateToProps)(App);
