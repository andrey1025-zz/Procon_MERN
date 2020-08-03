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
                            <div className="row">
                                <div className="col-sm-12 col-xl-12 col-md-12">
                                    <a className="dropdown-toggle arrow-none nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        <i className="fa fa-ellipsis-v"></i>                                        
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-left task-history-dropdown">
                                        <a className="dropdown-item"> Enter Task</a>
                                        <a className="dropdown-item d-block"> Delete Task</a>
                                    </div>  
                                </div>
                                <div className="col-sm-12 col-xl-12 col-md-12">
                                    <div className="float-left padding15">
                                        <p>Task start time:</p>
                                        <div className="text-white middle-font mb-30">
                                            <span>2020-06-27</span><br/><span>13:50:46</span>    
                                        </div>
                                        <p>Task start time:</p>
                                        <div className="text-white middle-font">
                                            <span>2020-06-27</span><br/><span>13:50:46</span>    
                                        </div>
                                    </div>
                                    <div className="team-members-history-task row">
                                        <div className="col-sm-2 col-xl-2 col-md-2">
                                            <span className="text-white middle-font">Team</span>
                                        </div>
                                        <div className="col-sm-10 col-xl-10 col-md-10 row">
                                            <div className="col-sm-3 col-xl-3 col-md-3">
                                                <div className="member-status custom-rounded mb-2">
                                                    <img src={require('../../images/users/user-5.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>
                                                <div className="member-status custom-rounded mb-2">
                                                    <img src={require('../../images/users/user-7.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>
                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-8.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>
                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-5.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>
                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-9.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>  
                                            </div>
                                            <div className="col-sm-3 col-xl-3 col-md-3">
                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-2.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>
                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-9.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>  
                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-11.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>

                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-12.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>
                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-2.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>  
                                            </div>
                                            <div className="col-sm-3 col-xl-3 col-md-3">
                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-3.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>  
                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-7.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>

                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-8.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>

                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-12.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>

                                            </div>
                                            <div className="col-sm-3 col-xl-3 col-md-3">
                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-4.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>
                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-8.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>
                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-9.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>

                                                <div className="member-status custom-rounded mb-2">
                                                        <img src={require('../../images/users/user-11.jpg')} alt="" className="custom-rounded mr-5"/>
                                                    <span className="suggestion-icon mt-3"> Belle Edwards </span>
                                                </div>  

                                            </div>                                                                                                            

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-xl-4 col-md-4">
                            <div className="card no-margin">
                                <div className="card-heading">
                                    <div className="float-left padding10">
                                        <img src={require('../../images/users/user-7.jpg')} alt="user" className="custom-rounded mr-5 mr-20"/>
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