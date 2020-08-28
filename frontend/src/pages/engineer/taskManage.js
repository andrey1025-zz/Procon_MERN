import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, getTaskDetail, getTaskMembers } from '../../store/actions/projectActions';
import { getSimpleRoleName } from '../../services';
import { NotStart, Inprogress, Completed, Reviewed, Checked } from '../../enums/taskStatus';

import $ from 'jquery';

const EngineerTaskManage = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const user = useSelector(state => state.auth.user);
    const projectId = window.localStorage.getItem("projectId");
    const tasks = useSelector(state => state.project.tasks);
    const task = useSelector(state => state.project.task);
    const taskMembers = useSelector(state => state.project.taskMembers);
    useEffect(() => {
        $("#side-menu").show();
        $(".Forhome").hide();
    });
    useEffect(() => {
        dispatch(getTasks(projectId));
    }, []);

    const dispatch = useDispatch();

    const handleDisplayTask = (taskId) => {
        if(taskId){
            let data = {
                projectId: projectId,
                taskId: taskId
            }
            dispatch(getTaskDetail(data));
            dispatch(getTaskMembers(data));
        }

        if(task.length > 0){
            $(".selected-task-info").show();
        }
    };


    $(".btn-extend").click(function(){
        $(this).closest('.row').find('.task-item').show();
    });

    $(".btn-hide").click(function(){
        $(this).closest('.row').find('.task-item').hide();
    });

    var diffDays = -1;
    var percent = 0;
    var task_id = 0;

    if(task.length > 0){
        if(task[0].tasks.length > 0){
            task_id = task[0].tasks[0]._id;
            var startTime = new Date(task[0].tasks[0].startTime);
            var endTime = new Date(task[0].tasks[0].endTime);
            
            const diffTime = Math.abs(endTime - startTime);
            diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

            var members = task[0].tasks[0].members;
            var total_members = 0;
            var completed_members = 0;
            var percent = 0;
            if(members.length > 0){
                total_members = members.length;
                var i = 0;
                for(i = 0 ; i < members.length; i++){
                    if(members[i].status == Checked)
                        completed_members++;
                }
                percent = completed_members * 100 / total_members;
                percent = percent.toFixed(2);
            }
        }
    }

    var today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();

    return (
        <React.Fragment>
            {
                task.length > 0 ?
                <div className="selected-task-info col-md-12 row">
                    <div className="col-sm-12 col-xl-4 col-md-6">
                        <div className="card card1">
                            <div className="card-heading p-4">
                                <div className="mini-stat-icon float-right">
                                    <div className="date-box">
                                        <h1>{date}</h1>
                                        <p>Day</p>
                                    </div>
                                </div>
                                <div className="june-20">
                                    <h1>{year} <br /> {monthNames[month]}</h1>
                                </div>
                                {
                                    diffDays != -1 ? <p className="days-20">{diffDays} days <br />till completion</p> : ''
                                }
                                <p className="text-muted1 mt-2 mb-0">Progress <span>{percent}%</span></p>
                                <div className="btn-task">
                                    <a href={`/${getSimpleRoleName(user.role)}/home/` + projectId + "?task_id=" + task_id} className="float-right">Enter task</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xl-3 col-md-6">
                        <div className="scrollbar scrollbar1" id="style-2">
                            <div className="force-overflow">
                                <div className="card m-b-30">
                                    <div className="card-body">
                                        <h4 className="mt-0 header-title mb-4">Member List</h4>
                                        <div className="friends-suggestions">
                                        { 
                                            taskMembers != [] > 0 ? 
                                                taskMembers.map((value, index) => {
                                                    return (
                                                        <a href="#" className="friends-suggestions-list" key={index}>
                                                            <div className="border-bottom position-relative">
                                                                <div className="float-left mb-0 mr-3">
                                                                    <img src={!value.photo ? require('../../images/users/user.jpg') : value.photo} alt="" className="rounded-circle11 thumb-md"/>
                                                                </div>
                                                                <div className="suggestion-icon float-right">
                                                                    <p>2020.06.26 22:36:24</p>
                                                                </div>
                                                                {
                                                                    value.status == NotStart ? 
                                                                        <div className="task-status notstart">not start</div>
                                                                    : ''
                                                                }
                                                                {
                                                                    value.status == Inprogress ? 
                                                                        <div className="task-status inprogress">in progress</div>
                                                                    : ''
                                                                }
                                                                {
                                                                    value.status == Completed ? 
                                                                        <div className="task-status complete">complete</div>
                                                                    : ''
                                                                }
                                                                <div className="desc1">
                                                                    <h5 className="font-14 mb-1 pt-2">{value.firstName} {value.lastName}</h5>
                                                                    <p className="text-muted">{ task.length > 0 ? task[0].tasks[0].name : ''}</p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    ) 
                                                })
                                            : ''
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xl-5 col-md-12">
                        <div className="card card1">
                        </div>
                    </div>                
                </div>
                : ''
            }
            {tasks.completedTasks && tasks.completedTasks.length > 0 ? 
                 (
                    <div className="progress-tasks col-md-12">
                        <div>
                            <div className="row">
                                <div className="col-sm-8 col-xl-6 col-md-8 tasks-title">
                                    Completed Tasks
                                </div>
                                <div className="col-sm-4 col-xl-6 col-md-4">
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
                                                            <a className="dropdown-item btn-extend" href="#"> Extend List</a>
                                                            <a className="dropdown-item btn-hide" href="#"> Hide List</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                {tasks.completedTasks.map((value, index) => {
                                    return (
                                        <div className="col-sm-12 col-xl-4 col-md-6 task-item" key={index}>
                                            <div className="card">
                                                <div className="card-heading">
                                                    <div className="float-left padding10">
                                                        <img src={require('../../images/users/user-7.jpg')} alt="user" className="custom-rounded mr-5 mr-20"/>
                                                        <span>Supervisor</span>
                                                    </div>
                                                    <div className="float-right padding10">
                                                        <div className="text-white no-margin middle-font text-right">
                                                            {value.name}
                                                            <div className="dropdown nav-pro-img inline">
                                                                <a className="dropdown-toggle arrow-none nav-user padding10"
                                                                    data-toggle="dropdown" role="button"
                                                                    aria-haspopup="false" aria-expanded="false">
                                                                    <i className="mdi mdi-menu"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right task-history-dropdown">
                                                                    <a className="dropdown-item" onClick={() => handleDisplayTask(value._id)}> Display Task</a>
                                                                    <a className="dropdown-item d-block" href={`/${getSimpleRoleName(user.role)}/home/` + projectId + "?task_id=" + value._id}> Edit Task</a>
                                                                    <a className="dropdown-item"> End Task</a>
                                                                </div>
                                                            </div>  
                                                        </div>
                                                        <div>DUE BY: {value.startTime.split('T')[0]}</div>
                                                    </div>
                                                    <div className="pro-image">
                                                        <a href={`/${getSimpleRoleName(user.role)}/home/` + projectId + "?task_id=" + value._id}>
                                                            <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1 project-img"/>
                                                        </a>
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
                                <div className="col-sm-8 col-xl-6 col-md-8 tasks-title">
                                    In progress Tasks
                                </div>
                                <div className="col-sm-4 col-xl-6 col-md-4">
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
                                                            <a className="dropdown-item btn-extend" href="#"> Extend List</a>
                                                            <a className="dropdown-item btn-hide" href="#"> Hide List</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                {tasks.inprogressTasks.map((value, index) => {
                                    return (
                                        <div className="col-sm-12 col-xl-4 col-md-6 task-item" key={index}>
                                            <div className="card">
                                                <div className="card-heading">
                                                    <div className="float-left padding10">
                                                        <img src={require('../../images/users/user-7.jpg')} alt="user" className="custom-rounded mr-5 mr-20"/>
                                                        <span>Supervisor</span>
                                                    </div>
                                                    <div className="float-right padding10">
                                                        <div className="text-white no-margin middle-font text-right">
                                                            {value.name}
                                                            <div className="dropdown nav-pro-img inline">
                                                                <a className="dropdown-toggle arrow-none nav-user padding10"
                                                                    data-toggle="dropdown" role="button"
                                                                    aria-haspopup="false" aria-expanded="false">
                                                                    <i className="mdi mdi-menu"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right task-history-dropdown">
                                                                    <a className="dropdown-item" onClick={() => handleDisplayTask(value._id)}> Display Task</a>
                                                                    <a className="dropdown-item d-block" href={`/${getSimpleRoleName(user.role)}/home/` + projectId + "?task_id=" + value._id}> Edit Task</a>
                                                                    <a className="dropdown-item"> End Task</a>
                                                                </div>
                                                            </div>  
                                                        </div>
                                                        <div>DUE BY: {value.startTime.split('T')[0]}</div>
                                                    </div>
                                                    <div className="pro-image">
                                                        <a href={`/${getSimpleRoleName(user.role)}/home/` + projectId + "?task_id=" + value._id}>
                                                            <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1 project-img"/>
                                                        </a>
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
                                <div className="col-sm-8 col-xl-6 col-md-8 tasks-title">
                                    Not started Tasks
                                </div>
                                <div className="col-sm-4 col-xl-6 col-md-4">
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
                                                            <a className="dropdown-item btn-extend" href="#"> Extend List</a>
                                                            <a className="dropdown-item btn-hide" href="#"> Hide List</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                {tasks.notStartedTasks.map((value, index) => {
                                    return (
                                        <div className="col-sm-12 col-xl-4 col-md-6 task-item" key={index}>
                                            <div className="card">
                                                <div className="card-heading">
                                                    <div className="float-left padding10">
                                                        <img src={require('../../images/users/user-7.jpg')} alt="user" className="custom-rounded mr-5 mr-20"/>
                                                        <span>Supervisor</span>
                                                    </div>
                                                    <div className="float-right padding10">
                                                        <div className="text-white no-margin middle-font text-right">
                                                            {value.name}
                                                            <div className="dropdown nav-pro-img inline">
                                                                <a className="dropdown-toggle arrow-none nav-user padding10"
                                                                    data-toggle="dropdown" role="button"
                                                                    aria-haspopup="false" aria-expanded="false">
                                                                    <i className="mdi mdi-menu"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right task-history-dropdown">
                                                                    <a className="dropdown-item" onClick={() => handleDisplayTask(value._id)}> Display Task</a>
                                                                    <a className="dropdown-item d-block" href={`/${getSimpleRoleName(user.role)}/home/` + projectId + "?task_id=" + value._id}> Edit Task</a>
                                                                    <a className="dropdown-item"> End Task</a>
                                                                </div>
                                                            </div>  
                                                        </div>
                                                        <div>DUE BY: {value.startTime.split('T')[0]}</div>
                                                    </div>
                                                    <div className="pro-image">
                                                        <a href={`/${getSimpleRoleName(user.role)}/home/` + projectId + "?task_id=" + value._id}>
                                                            <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1 project-img"/>
                                                        </a>
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
export default EngineerTaskManage;