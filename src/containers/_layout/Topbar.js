import React, { Component } from 'react';
import { Link } from "react-router-dom";

import navigation from "../../utils/nav";

class Topbar extends Component {

    render(){
        return(
            <React.Fragment>
                <a href="!#" id="mainMenuOpen" className="burger-menu"><i data-feather="menu"></i></a>
                <div className="navbar-brand">
                    <Link to="/home" className="df-logo">reactjs<span>starter</span></Link>
                    {/* <a href="!#" className="df-logo">reactjs<span>starter</span></a> */}
                </div>
                <div id="navbarMenu" className="navbar-menu-wrapper">
                   <ul className="nav navbar-menu">
                        <li className="nav-label pd-l-15 pd-lg-l-25 d-lg-none">Main Navigation</li>
                        
                        {navigation.items.map((nav_item, i) => {   
                            return  <li className={"nav-item " + ((nav_item.children) ? "with-sub" : "")} key={i}>
                                        <Link to={(nav_item.children) ? '!#' : nav_item.url} className="nav-link">
                                        <i className={"pd-r-5 " + nav_item.icon}></i> {nav_item.name}</Link>
                                        {(nav_item.children && nav_item.children_type === 'normal') &&
                                            <ul className="navbar-menu-sub">
                                                {nav_item.children.map((children, j) => {
                                                    return <li className="nav-sub-item" key={j}>
                                                                    <Link to={children.url} className="nav-sub-link">
                                                                        <i data-feather={children.icon}></i>{children.name}
                                                                    </Link>
                                                            </li>
                                                })}
                                            </ul>
                                        }
                                        {(nav_item.children && nav_item.children_type === 'd-lg-flex') &&
                                            <div className="navbar-menu-sub">
                                                <div className={nav_item.children_type}>
                                                    {nav_item.children.map((children, j) => {
                                                    return  <ul key ={j}>
                                                                <li className="nav-label">{children.name}</li>
                                                                {children.flex.map((flex, k) => {
                                                                return  <li className="nav-sub-item" key={k}>
                                                                                <Link to={flex.url} className="nav-sub-link">
                                                                                    <i data-feather={flex.icon}></i>{flex.name}
                                                                                </Link>
                                                                        </li>
                                                                })}
                                                           </ul>
                                                    })}
                                                </div>
                                            </div>
                                        }

                                    </li>

                        })}

                    </ul>
                </div>
            </React.Fragment>
            
        );
    }

}

export default (Topbar);