import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Logout from '../../components/Logout';
import { $CombinedState } from 'redux';
import { getSimpleRoleName } from '../../services';

import $ from 'jquery'; 

const SupervisorHome = () => {
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        $(".Forhome").hide();
        $("#side-menu").show();
    });

    return (
        <React.Fragment>
            <div className="col-sm-4 col-xl-4 col-md-4">
                <div className="popup" data-toggle="modal" data-target="#myModal">
                    <img src={require('../../images/plus.png')} alt="user" className="menu-logo1"/>
                    <p className="addNewProject">Add a new project</p>
                </div>
            </div>
            <div className="col-sm-4 col-xl-4 col-md-4">
                <div className="card">
                    <div className="card-heading">
                        <div className="mini-stat-icon float-right">
                            <nav className="navbar-custom">
                                <ul className="navbar-right list-inline float-right mb-0">
                                    <li className="dropdown notification-list list-inline-item">
                                        <div className="dropdown notification-list nav-pro-img">
                                            <a className="dropdown-toggle nav-link arrow-none nav-user" data-toggle="dropdown" role="button"
                                                aria-haspopup="false" aria-expanded="false">
                                                <i className="mdi mdi-menu"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                                <a className="dropdown-item"> Display Task</a>
                                                <a className="dropdown-item d-block"> Edit Task</a>
                                                <a className="dropdown-item"> End Task</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="p-20">
                            <h5 className="font-16">Project name</h5>
                            <p>Project location</p>
                        </div>
                        <div className="pro-image">
                            <Link to={`/${getSimpleRoleName(user.role)}/home`}><img src={require('../../images/project.jpg')} alt="user" className="menu-logo1"/></Link>
                        </div>
                    </div>
                </div>
            </div>            
        </React.Fragment>
    )
}
export default SupervisorHome;