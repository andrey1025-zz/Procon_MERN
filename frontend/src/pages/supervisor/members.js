import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSimpleRoleName } from '../../services';

import $ from 'jquery';

const SupervisorMembers = () => {
    const user = useSelector(state => state.auth.user);
    const projectId = window.localStorage.getItem("projectId");
    const tasks = useSelector(state => state.project.tasks);
    useEffect(() => {
        $("#side-menu").show();
        $(".Forhome").hide();
    });

    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <div className="members-wrapper col-md-12">
                <div>
                    <div className="row">
                        <div className="col-sm-9 col-xl-9 col-md-9">
                            <div className="scrollbar row" id="style-2">
                                    <div className="col-sm-12 col-xl-12 col-md-12">Procon Team</div>
                                    <div className="col-sm-4 col-xl-4 col-md-4">
                                        <a href="#" className="friends-suggestions-list">
                                            <div className="position-relative p-50">
                                                <div className="float-left mb-0 mr-3">
                                                    <img src="assets/images/users/user-2.jpg" alt="" className="rounded-circle11 thumb-md"/>
                                                </div>
                                                <div className="suggestion-icon float-right mt-30">
                                                    <p>2020.06.26 22:36:24</p>
                                                </div>

                                                <div className="desc1">
                                                    <h5 className="font-14 mb-1 pt-2">Raymond Olson</h5>
                                                    <p className="text-muted">Name task complete</p>
                                                </div>
                                            </div>
                                        </a>                                        
                                    </div>
                                    <div className="col-sm-4 col-xl-4 col-md-4">
                                        <a href="#" className="friends-suggestions-list">
                                            <div className="position-relative p-50">
                                                <div className="float-left mb-0 mr-3">
                                                    <img src="assets/images/users/user-2.jpg" alt="" className="rounded-circle11 thumb-md"/>
                                                </div>
                                                <div className="suggestion-icon float-right mt-30">
                                                    <p>2020.06.26 22:36:24</p>
                                                </div>

                                                <div className="desc1">
                                                    <h5 className="font-14 mb-1 pt-2">Raymond Olson</h5>
                                                    <p className="text-muted">Name task complete</p>
                                                </div>
                                            </div>
                                        </a>                                        
                                    </div>
                                    <div className="col-sm-4 col-xl-4 col-md-4">
                                        <a href="#" className="friends-suggestions-list">
                                            <div className="position-relative p-50">
                                                <div className="float-left mb-0 mr-3">
                                                    <img src="assets/images/users/user-2.jpg" alt="" className="rounded-circle11 thumb-md"/>
                                                </div>
                                                <div className="suggestion-icon float-right mt-30">
                                                    <p>2020.06.26 22:36:24</p>
                                                </div>

                                                <div className="desc1">
                                                    <h5 className="font-14 mb-1 pt-2">Raymond Olson</h5>
                                                    <p className="text-muted">Name task complete</p>
                                                </div>
                                            </div>
                                        </a>                                        
                                    </div>
                                    <div className="col-sm-4 col-xl-4 col-md-4">
                                        <a href="#" className="friends-suggestions-list">
                                            <div className="position-relative p-50">
                                                <div className="float-left mb-0 mr-3">
                                                    <img src="assets/images/users/user-2.jpg" alt="" className="rounded-circle11 thumb-md"/>
                                                </div>
                                                <div className="suggestion-icon float-right mt-30">
                                                    <p>2020.06.26 22:36:24</p>
                                                </div>

                                                <div className="desc1">
                                                    <h5 className="font-14 mb-1 pt-2">Raymond Olson</h5>
                                                    <p className="text-muted">Name task complete</p>
                                                </div>
                                            </div>
                                        </a>                                        
                                    </div>                                                                        
                            </div>
                        </div>
                        <div class="col-sm-3 col-xl-3 col-md-3">
                            <div class="card card-member">
                                <div class="info-member mrg-space">
                                    <p> <i class="far fa-calendar-alt"></i> 2020.06.27</p>
                                    <p> <i class="fas fa-envelope"></i> seziz@razof.tl</p>
                                    <p> <i class="fas fa-mobile-alt"></i> 17667560574</p>
                                    <p> <i class="far fa-address-card"></i>  Address</p>
                                    <p> <i class="fas fa-user-alt"></i>  Experiences</p>
                                </div>
                                <div class="card">
                                    <div class="card-heading">
                                        <div class="mini-stat-icon float-right">
                                            <nav class="navbar-custom">
                                                <ul class="navbar-right list-inline float-right mb-0">
                                                    <li class="dropdown notification-list list-inline-item">
                                                        <div class="dropdown notification-list nav-pro-img">
                                                            <a class="dropdown-toggle nav-link arrow-none nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
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
                                            <img src="assets/images/project.jpg" alt="user" class="menu-logo1"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default SupervisorMembers;