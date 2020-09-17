import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, getTaskHistory, deleteTask } from '../../store/actions/projectActions';

import { getSimpleRoleName } from '../../services';
import $ from 'jquery';

const ManagerTaskHistory = () => {
    const user = useSelector(state => state.auth.user);
    var projectId = window.localStorage.getItem("projectId");
    useEffect(() => {
        $("#side-menu").show();
        $(".Forhome").hide();
    });
    useEffect(() => {
        dispatch(getProjects());
    }, []);

    useEffect(() => {
        let data = {
            projectId: projectId
        };
        dispatch(getTaskHistory(data));
    }, []);

    const handleDeleteTask = (taskId) => {
        var data = {
            projectId: projectId,
            taskId: taskId,
        };
        
        dispatch(deleteTask(data));
    }

    const projects = useSelector(state => state.project.projects);
    const taskHistories = useSelector(state => state.project.taskHistories);
    const dispatch = useDispatch();

    useEffect(() => {
    }, [projects]);
    return (
        <React.Fragment>

            <div className="history-tasks col-md-12">
                {
                    taskHistories.map((value, index) => {
                        return (
                            <div className="each-task-history" key={index}>
                                <div className="row">
                                    <div className="col-sm-8 col-xl-8 col-md-8">
                                        <div className="row">
                                            <div className="col-sm-12 col-xl-12 col-md-12">
                                                <a className="dropdown-toggle arrow-none nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-v"></i>                                        
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-left task-history-dropdown">
                                                    <a className="dropdown-item" href={`/${getSimpleRoleName(user.role)}/home/` + projectId + "?task_id=" + value.id}> Enter Task</a>
                                                    <a className="dropdown-item d-block" onClick={() => handleDeleteTask(value.id)}> Delete Task</a>
                                                </div>  
                                            </div>
                                            <div className="col-sm-12 col-xl-12 col-md-12">
                                                <div className="float-left padding15">
                                                    <p>Task start time:</p>
                                                    <div className="text-white middle-font mb-30">
                                                        {/* <span>2020-06-27</span><br/><span>13:50:46</span>  */}
                                                        <span>{value.startTime.split('T')[0]}</span> 
                                                    </div>
                                                    <p>Task end time:</p>
                                                    <div className="text-white middle-font">
                                                        <span>{value.endTime.split('T')[0]}</span> 
                                                    </div>
                                                </div>
                                                <div className="team-members-history-task row">
                                                    <div className="col-sm-12 col-xl-2 col-md-12">
                                                        <span className="text-white middle-font">Team</span>
                                                    </div>
                                                    <div className="col-sm-12 col-xl-10 col-md-12 row">
                                                        {                                                       
                                                            value.members && value.members.length > 0 ?
                                                                value.members.map((member, index) => {
                                                                    return (
                                                                        <div className="col-sm-12 col-xl-3 col-md-6" key={index}>
                                                                            <div className="member-status custom-rounded mb-2">
                                                                                <img src={!member.photo ? require('../../images/users/user.jpg') : member.photo} alt="" className="custom-rounded mr-5 member-image"/>
                                                                                <span className="suggestion-icon mt-3"> {member.firstName} {member.lastName} </span>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            : ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-xl-4 col-md-4">
                                        <div className="card no-margin">
                                            <div className="card-heading">
                                                {
                                                    value.superintendent ?
                                                        <div className="float-left padding10">
                                                            <img src={!value.superintendent.photo ? require('../../images/users/user.jpg') : value.superintendent.photo} alt="user" className="custom-rounded mr-5 mr-20 member-image"/>
                                                            <span>{value.superintendent.firstName} {value.superintendent.lastName}</span>
                                                        </div>
                                                    : ''
                                                }
                                                <div className="mini-stat-icon float-right padding10">
                                                    <p className="text-white no-margin middle-font">{value.taskName}</p>
                                                    <div>DUE BY: {value.endTime.split('T')[0]}</div>
                                                </div>
                                                <div className="pro-image">
                                                    <img src={value.coverImage ? value.coverImage : require('../../images/project.jpg')} alt="cover-image" className="menu-logo1 project-img"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                })}
                {/* <div className="each-task-history">
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
                </div> */}
           </div>                                
        </React.Fragment>
    )
}
export default ManagerTaskHistory;