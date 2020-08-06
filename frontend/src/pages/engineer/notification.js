import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../../store/actions/projectActions';


import $ from 'jquery';

const EngineerNotification = () => {
    const projectId = window.localStorage.getItem("projectId");
    const tasks = useSelector(state => state.project.tasks);
    useEffect(() => {
        $("#side-menu").show();
        $(".Forhome").hide();
    });
    useEffect(() => {
        // dispatch(getTasks(projectId));  
    }, []);

    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <div className="progress mt-4 mb-4">
                <div className="progress-bar bg-primary" role="progressbar" style={{width: '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div>
                <div className="row">
                    <div className="col-sm-12 col-xl-4 col-md-6">
                        <div className="card no-margin">
                            <div className="card-heading">
                                <div className="float-left padding10">
                                    <img src={require('../../images/users/user-7.jpg')} alt="user" className="custom-rounded mr-5 mr-20"/>
                                    <span>Supervisor</span>
                                    <span className="badge badge-danger notific-badge">12</span>
                                </div>
                                <div className="float-right padding10">
                                    <div className="text-white no-margin middle-font">
                                        fdsafdsafdsf
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
                                    <div>DUE BY: fdsafdsf</div>
                                </div>
                                <div className="notific-text">
                                  <span>fdsafdsafd</span>
                                  <span style={{float:'right'}}>fdsafdsafd</span>
                                  <p>fdsfdsafdsafdsafdsafdsafdsafdsafdsafdsf</p>
                                  </div>
                                <div className="pro-image">
                                    <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default EngineerNotification;