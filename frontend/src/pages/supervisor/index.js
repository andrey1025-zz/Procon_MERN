import { useEffect, useState } from 'react';
import React from 'react';

import Logout from '../../components/Logout';
import { $CombinedState } from 'redux';
import $ from 'jquery'; 

const SupervisorHome = () => {
    useEffect(() => {
        $("#side-menu").hide();
    });

    return (
        <React.Fragment>
            <div className="col-sm-4 col-xl-4 col-md-4">
                <div className="popup" data-toggle="modal" data-target="#myModal">
                    <img src={require('../../images/plus.png')} alt="user" class="menu-logo1"/>
                    <p className="addNewProject">Add a new project</p>
                </div>
            </div>
            <div class="col-sm-4 col-xl-4 col-md-4">
                <div class="card">
                    <div class="card-heading">
                        <div class="mini-stat-icon float-right">
                            <nav class="navbar-custom">
                                <ul class="navbar-right list-inline float-right mb-0">
                                    <li class="dropdown notification-list list-inline-item">
                                        <div class="dropdown notification-list nav-pro-img">
                                            <a class="dropdown-toggle nav-link arrow-none nav-user"
                                                data-toggle="dropdown" href="#" role="button"
                                                aria-haspopup="false" aria-expanded="false">
                                                <i class="mdi mdi-menu"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                                                <a class="dropdown-item" href="taskdata.html"> Display Task</a>
                                                <a class="dropdown-item d-block" href="addtask.html"> Edit Task</a>
                                                <a class="dropdown-item " href="#"> End Task</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div class="p-20">
                            <h5 class="font-16">Project name</h5>
                            <p>Project location</p>
                        </div>
                        <div class="pro-image">
                            <img src={require('../../images/project.jpg')} alt="user" class="menu-logo1"/>
                        </div>
                    </div>
                </div>
            </div>            
        </React.Fragment>
    )
}
export default SupervisorHome;