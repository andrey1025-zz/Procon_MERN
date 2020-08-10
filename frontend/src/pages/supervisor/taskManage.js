import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../../store/actions/projectActions';
import { getSimpleRoleName } from '../../services';

import $ from 'jquery';

const SupervisorTaskManage = () => {
    const user = useSelector(state => state.auth.user);
    const projectId = window.localStorage.getItem("projectId");
    const tasks = useSelector(state => state.project.tasks);
    useEffect(() => {
        $("#side-menu").show();
        $(".Forhome").hide();
    });
    useEffect(() => {
        dispatch(getTasks(projectId));
    }, []);

    const dispatch = useDispatch();

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
            {tasks.completedTasks && tasks.completedTasks.length > 0 ? 
                 (
                    <div className="progress-tasks col-md-12">
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
                                                            <a className="dropdown-item" href="supervisor-panel.html"> Create Task</a>
                                                            <a className="dropdown-item d-block" href="addtask.html"> Task Management</a>
                                                            <a className="dropdown-item " href="#"> Extend List</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                {tasks.completedTasks.map((value, index) => {
                                    return (
                                        <div className="col-sm-4 col-xl-4 col-md-4" key={index}>
                                            <div className="card no-margin">
                                                <div className="card-heading">
                                                    <div className="float-left padding10">
                                                        <img src={require('../../images/users/user-7.jpg')} alt="user" className="custom-rounded mr-5 mr-20"/>
                                                        <span>Supervisor</span>
                                                    </div>
                                                    <div className="float-right padding10">
                                                        <div className="text-white no-margin middle-font">
                                                            {value.name}
                                                            <div className="dropdown nav-pro-img inline">
                                                                <a className="dropdown-toggle arrow-none nav-user padding10"
                                                                    data-toggle="dropdown" role="button"
                                                                    aria-haspopup="false" aria-expanded="false">
                                                                    <i className="mdi mdi-menu"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right task-history-dropdown">
                                                                    <a className="dropdown-item"> Display Task</a>
                                                                    <a className="dropdown-item d-block"> Edit Task</a>
                                                                    <a className="dropdown-item"> End Task</a>
                                                                </div>
                                                            </div>  
                                                        </div>
                                                        <div>DUE BY: {value.startTime}</div>
                                                    </div>
                                                    <div className="pro-image">
                                                        <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
    
                ) : null
            }
            {tasks.inprogressTasks && tasks.inprogressTasks.length > 0 ? 
                 (
                    <div className="progress-tasks col-md-12">
                        <div>
                            <div className="row">
                                <div className="col-sm-6 col-xl-6 col-md-6 tasks-title">
                                    In progress Tasks
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
                                                            <a className="dropdown-item" href="supervisor-panel.html"> Create Task</a>
                                                            <a className="dropdown-item d-block" href="addtask.html"> Task Management</a>
                                                            <a className="dropdown-item " href="#"> Extend List</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                {tasks.inprogressTasks.map((value, index) => {
                                    return (
                                        <div className="col-sm-4 col-xl-4 col-md-4" key={index}>
                                            <div className="card no-margin">
                                                <div className="card-heading">
                                                    <div className="float-left padding10">
                                                        <img src={require('../../images/users/user-7.jpg')} alt="user" className="custom-rounded mr-5 mr-20"/>
                                                        <span>Supervisor</span>
                                                    </div>
                                                    <div className="float-right padding10">
                                                        <div className="text-white no-margin middle-font">
                                                            {value.name}
                                                            <div className="dropdown nav-pro-img inline">
                                                                <a className="dropdown-toggle arrow-none nav-user padding10"
                                                                    data-toggle="dropdown" role="button"
                                                                    aria-haspopup="false" aria-expanded="false">
                                                                    <i className="mdi mdi-menu"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right task-history-dropdown">
                                                                    <a className="dropdown-item"> Display Task</a>
                                                                    <a className="dropdown-item d-block"> Edit Task</a>
                                                                    <a className="dropdown-item"> End Task</a>
                                                                </div>
                                                            </div>  
                                                        </div>
                                                        <div>DUE BY: {value.startTime}</div>
                                                    </div>
                                                    <div className="pro-image">
                                                        <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
    
                ) : null
            }
            {tasks.notStartedTasks && tasks.notStartedTasks.length > 0 ? 
                 (
                    <div className="progress-tasks col-md-12">
                        <div>
                            <div className="row">
                                <div className="col-sm-6 col-xl-6 col-md-6 tasks-title">
                                    Not started Tasks
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
                                                            <a className="dropdown-item" href="supervisor-panel.html"> Create Task</a>
                                                            <a className="dropdown-item d-block" href="addtask.html"> Task Management</a>
                                                            <a className="dropdown-item " href="#"> Extend List</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                {tasks.notStartedTasks.map((value, index) => {
                                    return (
                                        <div className="col-sm-4 col-xl-4 col-md-4" key={index}>
                                            <div className="card no-margin">
                                                <div className="card-heading">
                                                    <div className="float-left padding10">
                                                        <img src={require('../../images/users/user-7.jpg')} alt="user" className="custom-rounded mr-5 mr-20"/>
                                                        <span>Supervisor</span>
                                                    </div>
                                                    <div className="float-right padding10">
                                                        <div className="text-white no-margin middle-font">
                                                            {value.name}
                                                            <div className="dropdown nav-pro-img inline">
                                                                <a className="dropdown-toggle arrow-none nav-user padding10"
                                                                    data-toggle="dropdown" role="button"
                                                                    aria-haspopup="false" aria-expanded="false">
                                                                    <i className="mdi mdi-menu"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right task-history-dropdown">
                                                                    <a className="dropdown-item" href={`/${getSimpleRoleName(user.role)}/task_detail/` + value._id}> Display Task</a>
                                                                    <a className="dropdown-item d-block"> Edit Task</a>
                                                                    <a className="dropdown-item"> End Task</a>
                                                                </div>
                                                            </div>  
                                                        </div>
                                                        <div>DUE BY: {value.startTime}</div>
                                                    </div>
                                                    <div className="pro-image">
                                                        <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
    
                ) : null
            }

        </React.Fragment>
    )
}
export default SupervisorTaskManage;