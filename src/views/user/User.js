import React, { Component } from 'react';

import home_1 from '../../assets/img/home-1.png';
import home_2 from '../../assets/img/home-2.png';

class User extends Component {

    render(){
        return(
            <div className="home-slider">
                <div className="home-lead">
                <div className="df-logo-initial mg-b-15"><p>df</p></div>
                <p className="home-text">Responsive Bootstrap 4 Dashboard Template</p>

                <h6 className="home-headline">Make your dashboard app more professional with this <span>super awesome</span> and <span>premium quality</span> dashboard design template.</h6>

                <div className="d-flex wd-lg-350">
                <a href="https://themeforest.net/item/dashforge-responsive-admin-dashboard-template/23725961" className="btn btn-brand-01 btn-uppercase flex-fill">Buy Now - $20</a>
                <a href="template/classic/dashboard-one.html" className="btn btn-white btn-uppercase flex-fill mg-l-10">Explore Demo</a>
                </div>

                <div className="d-flex tx-20 mg-t-40">
                <div className="tx-purple"><i className="fab fa-bootstrap"></i></div>
                <div className="tx-orange pd-l-10"><i className="fab fa-html5"></i></div>
                <div className="tx-primary pd-l-10"><i className="fab fa-css3-alt"></i></div>
                <div className="tx-pink pd-l-10"><i className="fab fa-sass"></i></div>
                <div className="tx-warning pd-l-10"><i className="fab fa-js"></i></div>
                <div className="tx-danger pd-l-10"><i className="fab fa-npm"></i></div>
                <div className="tx-danger pd-l-10"><i className="fab fa-gulp"></i></div>
                <div className="bd-l mg-l-10 mg-sm-l-20 pd-l-10 pd-sm-l-20"></div>
                <div className="tx-color-03" data-toggle="tooltip" data-title="Ongoing development"><i className="fab fa-angular"></i></div>
                <div className="tx-color-03 pd-l-10" data-toggle="tooltip" data-title="Coming soon"><i className="fab fa-react"></i></div>
                <div className="tx-color-03 pd-l-10" data-toggle="tooltip" data-title="Coming soon"><i className="fab fa-vuejs"></i></div>
                </div>

                <div className="tx-12 mg-t-40">
                <a href="docs.html" className="link-03">Doc<span className="d-none d-sm-inline">umentation</span><span className="d-sm-none">s</span></a>
                <a href="!#" className="link-03 mg-l-10 mg-sm-l-20">Changelog</a>
                <a href="!#" target="_blank" className="link-03 mg-l-10 mg-sm-l-20">Licenses</a>
                <a href="!#" target="_blank" className="link-03 mg-l-10 mg-sm-l-20">Refund Policy</a>
                </div>
            </div>
            <div className="home-slider-img">
                <div><img src={home_1} alt="" />></div>
                <div><img src={home_2} alt="" />></div>
                <div><img src={home_2} alt="" />></div>
            </div>
            <div className="home-slider-bg-one"></div>
            </div>
        );
    }

}

export default (User);