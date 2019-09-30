import React, { Component } from 'react';
import { Link } from "react-router-dom";

import img_20 from '../../assets/img/img20.png';
import home_2 from '../../assets/img/home-2.png';

class UnathorizedPage extends Component {

    render(){
        return(
            <div class="content content-fixed content-auth-alt">
            <div class="container ht-100p tx-center">
              <div class="ht-100p d-flex flex-column align-items-center justify-content-center">
                <div class="wd-70p wd-sm-250 wd-lg-300 mg-b-15"><img src={img_20} class="img-fluid" alt="" /></div>
                <h1 class="tx-color-01 tx-24 tx-sm-32 tx-lg-36 mg-xl-b-5">401 Unathorized Page</h1>
                <h5 class="tx-16 tx-sm-18 tx-lg-20 tx-normal mg-b-20">Oopps. You Are Not Authorized To Access This Page</h5>
                <p class="tx-color-03 mg-b-30">Please Contact Our Administrator To Solve This Problem</p>
                <div class="mg-b-40"><Link to='/home' class="btn btn-white pd-x-30">Back to Home</Link></div>      
              </div>
            </div>
          </div>
        );
    }

}

export default (UnathorizedPage);