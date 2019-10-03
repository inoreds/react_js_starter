import React, { Component } from 'react';
import { connect} from "remx";

import broker from '../utils/broker';
import authStore from '../stores/auth';

import img_15 from '../assets/img/img15.png';

import '../assets/css/dashforge.auth.css';

class LoginLayout extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          login_message: '',
          password:'',
          username:'',
          message: ''
        }
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onChangeusername(e) {
        this.setState({ username: e.target.value, message: '' });
    }
    
    onChangePassword(e) {
        this.setState({ password: e.target.value, message: '' });
    }
    
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.onSubmitLogin();
        }
    }
    
    onSubmitLogin() {
        this.setState({ 
          loading: true,
          message: '',
        });
    
        broker.fetch.post('/auth/login', {
            username: this.state.username,
            password: this.state.password,
            password_confirmation: this.state.password
        }).then(res => {
            const { data } = res;
            if (data.status === true) {
                const { user, token } = data.data;
                broker.setToken(token);
                authStore.setters.setUser(user);
                // window.location.reload();
            } else {
                const { message } = data;
                this.setState({
                    loading: false,
                    message: message
                });
            }
        }).catch(err => {
            this.setState({
                loading: false,
                message: 'username Dan Password Tidak Sesuai'
            })
        });
    
    }

    render(){
        // const { from } = this.props.location.state || { from: { pathname: '/' } };
        // if (this.props.user !== null) {
        //   return <Redirect to={(from == '/' ? '/' : from)} />
        // }
        return(
            <div className="App">
                <header className="navbar navbar-header navbar-header-fixed">
                <a href="!#" id="mainMenuOpen" className="burger-menu"><i data-feather="menu"></i></a>
                <div className="navbar-brand">
                    <a href="!#" className="df-logo">inabroker<span>panel</span></a>
                </div>
                </header>
                
                <div className="content content-fixed content-auth">
                    <div className="container">
                        <div className="media align-items-stretch justify-content-center ht-100p pos-relative">
                            <div className="media-body align-items-center d-none d-lg-flex">
                                <div className="mx-wd-600">
                                    <img src={img_15} className="img-fluid" alt="" />
                                </div>
                            </div>
                            <div className="sign-wrapper mg-lg-l-50 mg-xl-l-60">
                                <div className="wd-100p">
                                    <h3 className="tx-color-01 mg-b-5">Sign In</h3>
                                    <p className="tx-color-03 tx-16 mg-b-40">Welcome back! Please signin to continue.</p>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" className="form-control" placeholder="yourusername"  
                                            value={this.state.username}  
                                            onChange={this.onChangeusername} 
                                            onKeyPress={this.handleKeyPress}>
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <div className="d-flex justify-content-between mg-b-5">
                                            <label className="mg-b-0-f">Password</label>
                                            {/* <a href="!#" className="tx-13">Forgot password?</a> */}
                                        </div>
                                        <input type="password" className="form-control" placeholder="Enter your password"
                                            value={this.state.password} 
                                            onChange={this.onChangePassword} 
                                            onKeyPress={this.handleKeyPress}>  
                                        </input>
                                    </div>
                                    <a href="!#" className="tx-13 text-danger">{this.state.message}</a>
                                    <button className="btn btn-brand-02 btn-block mg-t-10" onClick={() => this.onSubmitLogin()}>Sign In</button>
                                    {/* <div className="divider-text">or</div> */}
                                    {/* <button className="btn btn-outline-facebook btn-block">Forgot Password</button> */}
                                    {/* <button className="btn btn-outline-twitter btn-block">Sign In With Twitter</button> */}
                                    {/* <div className="tx-13 mg-t-20 tx-center">Don't have an account? <a href="page-signup.html">Create an Account</a></div> */}
                                </div>
                            </div>
                        </div>
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
  export default connect(mapStateToProps)(LoginLayout);