import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../../store/actions/projectActions';


import $ from 'jquery';

const SupervisorTaskManage = () => {
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        $("#side-menu").show();
        $(".Forhome").hide();
    });
    useEffect(() => {
        dispatch(getProjects());
    }, []);

    const projects = useSelector(state => state.project.projects);
    const dispatch = useDispatch();

    // const projectId = useSelector(state => state.projectId);
    // console.log("task management project id", projectId);

    useEffect(() => {
    }, [projects]);
    return (
        <React.Fragment>
            <div className="selected-task-info col-md-12 row">
                <div className="col-sm-4 col-xl-4 col-md-4">
                    <div className="card card1">
                        <div className="card-heading p-4">
                            <div className="mini-stat-icon float-right">
                                <div className="date-box">
                                    <h1>26</h1>
                                    <p>Day</p>
                                </div>
                            </div>
                            <div className="june-20">
                                <h1>2020 <br /> June</h1>
                            </div>
                            <p className="days-20">20 days <br />till completion</p>

                            <p className="text-muted1 mt-2 mb-0">Progress <span>12%</span></p>
                            <div className="btn-task">
                                <a href="#" className="float-right">Enter task</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 col-xl-3 col-md-3">
                    <div className="scrollbar scrollbar1" id="style-2">
                        <div className="force-overflow">
                            <div className="card m-b-30">
                                <div className="card-body">
                                    <h4 className="mt-0 header-title mb-4">Member List</h4>
                                    <div className="friends-suggestions">
                                        <a href="#" className="friends-suggestions-list">
                                            <div className="border-bottom position-relative p-50">
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

                                        <a href="#" className="friends-suggestions-list">
                                            <div className="border-bottom position-relative p-50">
                                                <div className="float-left mb-0 mr-3">
                                                    <img src="assets/images/users/user-3.jpg" alt="" className="rounded-circle1 thumb-md"/>
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

                                        <a href="#" className="friends-suggestions-list">
                                            <div className="border-bottom position-relative p-50">
                                                <div className="float-left mb-0 mr-3">
                                                    <img src="assets/images/users/user-4.jpg" alt="" className="rounded-circle1 thumb-md"/>
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

                                        <a href="#" className="friends-suggestions-list">
                                            <div className="border-bottom position-relative p-50">
                                                <div className="float-left mb-0 mr-3">
                                                    <img src="assets/images/users/user-5.jpg" alt="" className="rounded-circle1 thumb-md"/>
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

                                        <a href="#" className="friends-suggestions-list">
                                            <div className="position-relative p-50">
                                                <div className="float-left mb-0 mr-3">
                                                    <img src="assets/images/users/user-6.jpg" alt="" className="rounded-circle1 thumb-md"/>
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
                        </div>
                    </div>
                </div>
                <div className="col-sm-5 col-xl-5 col-md-5">
                    <div className="card card1">
                    </div>
                </div>                
            </div>

            <div className="progress-tasks col-md-12">
                <div>
                    <div className="row">
                        <div className="col-sm-6 col-xl-6 col-md-6 tasks-title">
                            Tasks in progress
                        </div>
                        <div className="col-sm-6 col-xl-6 col-md-6">
                            <div className="mini-stat-icon float-right">
                                <nav className="navbar-custom">
                                    <ul className="navbar-right list-inline float-right mb-0">
                                        <li className="dropdown notification-list list-inline-item">
                                            <div className="dropdown notification-list nav-pro-img">
                                                <a className="dropdown-toggle nav-link arrow-none nav-user"
                                                    data-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                                                    aria-expanded="false">
                                                    <i className="mdi mdi-menu"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                                    <a className="dropdown-item" href="supervisor-panel.html"> Create
                                                        Task</a>
                                                    <a className="dropdown-item d-block" href="addtask.html"> Task
                                                        Management</a>
                                                    <a className="dropdown-item " href="#"> Extend List</a>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </nav>
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
                                                        <a className="dropdown-toggle nav-link arrow-none nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                                            <i className="mdi mdi-menu"></i>
                                                        </a>
                                                        <div
                                                            className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                                            <a className="dropdown-item" href="taskdata.html"> Display
                                                                Task</a>
                                                            <a className="dropdown-item d-block" href="addtask.html"> Edit
                                                                Task</a>
                                                            <a className="dropdown-item " href="#"> End Task</a>
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
                                        <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1"/>
                                    </div>
                                </div>
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
                                                        <a className="dropdown-toggle nav-link arrow-none nav-user"
                                                            data-toggle="dropdown" href="#" role="button"
                                                            aria-haspopup="false" aria-expanded="false">
                                                            <i className="mdi mdi-menu"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                                            <a className="dropdown-item" href="taskdata.html"> Display
                                                                Task</a>
                                                            <a className="dropdown-item d-block" href="addtask.html"> Edit
                                                                Task</a>
                                                            <a className="dropdown-item " href="#"> End Task</a>
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
                                        <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1"/>
                                    </div>
                                </div>
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
                                                        <a className="dropdown-toggle nav-link arrow-none nav-user"
                                                            data-toggle="dropdown" href="#" role="button"
                                                            aria-haspopup="false" aria-expanded="false">
                                                            <i className="mdi mdi-menu"></i>
                                                        </a>
                                                        <div
                                                            className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                                            <a className="dropdown-item" href="taskdata.html"> Display
                                                                Task</a>
                                                            <a className="dropdown-item d-block" href="addtask.html"> Edit
                                                                Task</a>
                                                            <a className="dropdown-item " href="#"> End Task</a>
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
                                        <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="completed-tasks col-md-12">
                <div>
                    <div className="row">
                        <div className="col-sm-6 col-xl-6 col-md-6 tasks-title">
                            Completed Tasks
                        </div>
                        <div className="col-sm-6 col-xl-6 col-md-6">
                            <div className="mini-stat-icon float-right">
                                <nav className="navbar-custom">
                                    <ul className="navbar-right list-inline float-right mb-0">
                                        <li className="dropdown notification-list list-inline-item">
                                            <div className="dropdown notification-list nav-pro-img">
                                                <a className="dropdown-toggle nav-link arrow-none nav-user"
                                                    data-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                                                    aria-expanded="false">
                                                    <i className="mdi mdi-menu"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                                    <a className="dropdown-item" href="supervisor-panel.html"> Create
                                                        Task</a>
                                                    <a className="dropdown-item d-block" href="addtask.html"> Task
                                                        Management</a>
                                                    <a className="dropdown-item " href="#"> Extend List</a>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </nav>
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
                                                        <a className="dropdown-toggle nav-link arrow-none nav-user"
                                                            data-toggle="dropdown" href="#" role="button"
                                                            aria-haspopup="false" aria-expanded="false">
                                                            <i className="mdi mdi-menu"></i>
                                                        </a>
                                                        <div
                                                            className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                                            <a className="dropdown-item" href="taskdata.html"> Display
                                                                Task</a>
                                                            <a className="dropdown-item d-block" href="addtask.html"> Edit
                                                                Task</a>
                                                            <a className="dropdown-item " href="#"> End Task</a>
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
                                        <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1"/>
                                    </div>
                                </div>
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
                                                        <a className="dropdown-toggle nav-link arrow-none nav-user"
                                                            data-toggle="dropdown" href="#" role="button"
                                                            aria-haspopup="false" aria-expanded="false">
                                                            <i className="mdi mdi-menu"></i>
                                                        </a>
                                                        <div
                                                            className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                                            <a className="dropdown-item" href="taskdata.html"> Display
                                                                Task</a>
                                                            <a className="dropdown-item d-block" href="addtask.html"> Edit
                                                                Task</a>
                                                            <a className="dropdown-item " href="#"> End Task</a>
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
                                        <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1"/>
                                    </div>
                                </div>
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
                                                        <a className="dropdown-toggle nav-link arrow-none nav-user"
                                                            data-toggle="dropdown" href="#" role="button"
                                                            aria-haspopup="false" aria-expanded="false">
                                                            <i className="mdi mdi-menu"></i>
                                                        </a>
                                                        <div
                                                            className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                                            <a className="dropdown-item" href="taskdata.html"> Display
                                                                Task</a>
                                                            <a className="dropdown-item d-block" href="addtask.html"> Edit
                                                                Task</a>
                                                            <a className="dropdown-item " href="#"> End Task</a>
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
                                        <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1"/>
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
export default SupervisorTaskManage;