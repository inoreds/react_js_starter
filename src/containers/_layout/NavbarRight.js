import React, { Component } from 'react';
import { connect} from "remx";

import authStore from "../../stores/auth";

import avatar_img from '../../assets/img/img1.png';

class NavbarRight extends Component {

    signOut(){
        window.localStorage.clear();
        authStore.setters.setUser(null);
    }

    render(){
        return(
            <div className="navbar-right">
                <div className="dropdown dropdown-profile">
                <a href="!#" className="dropdown-link" data-toggle="dropdown" data-display="static">
                    <div className="avatar avatar-sm"><img src={avatar_img} className="rounded-circle" alt="" /></div>
                </a>
                <div className="dropdown-menu dropdown-menu-right tx-13">
                    <div className="avatar avatar-lg mg-b-15"><img src={avatar_img} className="rounded-circle" alt="" /></div>
                    <h6 className="tx-semibold mg-b-5">User Profile</h6>
                    <p className="mg-b-25 tx-12 tx-color-03">Administrator</p>

                    <a href="#" className="dropdown-item"><i data-feather="edit-3"></i> Edit Profile</a>
                    <a href="page-profile-view.html" className="dropdown-item"><i data-feather="user"></i> View Profile</a>
                    <div className="dropdown-divider"></div>
                    <a href="#" className="dropdown-item" onClick={()=> this.signOut()}><i data-feather="log-out"></i>Sign Out</a>
                </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
    }
}

export default connect(mapStateToProps)(NavbarRight);