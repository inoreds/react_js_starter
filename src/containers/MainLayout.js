import React, { Component } from 'react';
import { connect} from "remx";

import authStore from '../stores/auth'

import '../assets/css/dashforge.landing.css';

import Topbar from './_layout/Topbar';
import {Routes} from '../helpers/routes';
import LoginLayout from './LoginLayout';
import NavbarRight from './_layout/NavbarRight';


class MainLayout extends Component {

    constructor(props) {
        super(props);

        this.options = {
            
        }
        this.state = {
            user: this.props.user,
            page : '',
            scriptLoaded : null,
            scriptKey : 0,
            key : Math.random(),
        }
        // preserve the initial state in a new object
        this.baseState = this.state;
    }

    UNSAFE_componentWillReceiveProps (newProps) {
        if(newProps.user) {
            this.setState({
              user: newProps.user
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.user !== prevProps.user){
            this.setState({user : this.props.user})
            if (this.props.user) {
                var addScript = document.createElement('script');
                addScript.setAttribute('src', '/assets/js/dashforge.js');
                document.body.appendChild(addScript);
            } 
        }
    }

    render(){
        const token = window.localStorage.getItem('token');
        if (!this.state.user && !token) {
            return (<LoginLayout />)
        } else {
            if (this.state.user) {
                return(
                    <div className="App">
                        <header className="navbar navbar-header navbar-header-fixed">
                            <Topbar />
                            <NavbarRight />
                        </header>
        
                        <Routes user={this.state.user}/>                    
                    </div>
                );    
            } else {
                return null
            }
        }
        
    }

}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
    }
}

export default connect(mapStateToProps)(MainLayout);
