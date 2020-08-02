import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../../store/actions/projectActions';


import $ from 'jquery';

const SupervisorTaskHistory = () => {
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

    useEffect(() => {
    }, [projects]);
    return (
        <React.Fragment>

            <div className="history-tasks col-md-12">
                <div className="each-task-history">
                    <div className="row">
                        <div className="col-sm-8 col-xl-8 col-md-8">
                        </div>
                        <div className="col-sm-4 col-xl-4 col-md-4">
                            <div className="card">
                                <div className="card-heading">
                                    <div className="float-left padding10">
                                        <img src={require('../../images/users/user-7.jpg')} alt="user" className="custom-rounded mr-20"/>
                                        <span>Supervisor</span>
                                    </div>
                                    <div className="mini-stat-icon float-right padding10">
                                        <p className="text-white no-margin middle-font">Task Name</p>
                                        <div>DUE BY: TIME</div>
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
export default SupervisorTaskHistory;