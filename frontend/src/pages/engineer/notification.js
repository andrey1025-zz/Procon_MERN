import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotifications } from '../../store/actions/projectActions';


import $ from 'jquery';

const EngineerNotification = () => {
    const projectId = window.localStorage.getItem("projectId");
    const notifications = useSelector(state => state.project.notifications);
    useEffect(() => {
        $("#side-menu").show();
        $(".Forhome").hide();
    });
    useEffect(() => {
        dispatch(getNotifications(projectId));  
    }, []);

    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <div className="progress mt-4 mb-4">
                <div className="progress-bar bg-primary" role="progressbar" style={{width: '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div>
                <div className="row">
                    {notifications && notifications.length > 0 ? 
                        (
                            notifications.map((value, index) => {
                                return (
                                <div className="col-sm-12 col-xl-4 col-md-6" key={index}>
                                    <div className="card no-margin">
                                        <div className="card-heading">
                                            <div className="row col-md-12">
                                                <div className="float-left padding10 col-md-5">
                                                    <img src={!value.photo ? require('../../images/users/user.jpg') : value.photo} alt="user" className="custom-rounded mr-5 mr-20"/>
                                                    <span>{value.firstName}</span>
                                                </div>
                                                <div className="float-right padding10 col-md-7">
                                                    <div className="text-white no-margin middle-font text-right">
                                                        {value.taskName}
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
                                                    <div className="text-right">DUE BY: {value.createdOn}</div>
                                                </div>
                                            </div>
                                            <div className="row col-md-12">
                                                <span className="badge badge-danger notific-badge">{value.count}</span>
                                            </div>
                                            <div className="notific-text">
                                            <span></span>
                                            <span style={{float:'right'}}></span>
                                            <p>{value.message}</p>
                                            </div>
                                            <div className="pro-image">
                                                <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        ) : null
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
export default EngineerNotification;