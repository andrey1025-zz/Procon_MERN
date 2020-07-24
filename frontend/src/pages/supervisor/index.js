import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSimpleRoleName } from '../../services';

import $ from 'jquery'; 

const SupervisorWelcome = () => {
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        $("#side-menu").hide();
    });

    return (
        <React.Fragment>
            <div className="col-sm-4 col-xl-4 col-md-4">
                <div className="card">
                    <div className="card-heading">
                        <div className="mini-stat-icon float-right">
                            <nav className="navbar-custom">
                                <ul className="navbar-right list-inline float-right mb-0">
                                    <li className="dropdown notification-list list-inline-item">
                                        <div className="dropdown notification-list nav-pro-img">
                                            <a className="dropdown-toggle nav-link arrow-none nav-user"
                                                data-toggle="dropdown" role="button"
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
            <div className="col-sm-12 col-xl-12 col-md-12">
                <div className="modal fade" id="addProjectModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p>Add a new project</p>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group row">
                                    <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Project name</label>
                                    <div className="col-sm-9">
                                        <input className="form-control-pop" type="text"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Project lcoation</label>
                                    <div className="col-sm-9">
                                        <input className="form-control-pop" type="text"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="example-text-input" className="col-sm-3 col-form-label">3D model file</label>
                                    <div className="col-sm-9">
                                        <input type="file" name="fileToUpload"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Cover page</label>
                                    <div className="col-sm-9">
                                        <input type="file" name="fileToUpload"/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer text-center">
                                <p><button type="button" className="btn btn-info btn-lg waves-effect waves-light task-btn3">Create</button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default SupervisorWelcome;