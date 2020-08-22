import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSimpleRoleName } from '../../services';
import { Switch } from '../../components/form';
import {SupervisorRole, EngineerRole, MemberRole} from '../../enums/roles';
import { NotStart, Inprogress, Completed } from '../../enums/taskStatus';
import { 
    getSuperintendents, 
    getEngineers, 
    getMembers,
    removeMember,
    getMemberProfile
} 
from '../../store/actions/projectActions';

import $ from 'jquery';

const SupervisorMembers = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const projectId = window.localStorage.getItem("projectId");
    const tasks = useSelector(state => state.project.tasks);
    const superintendents = useSelector(state => state.project.superintendents);
    const engineers = useSelector(state => state.project.engineers);
    const members = useSelector(state => state.project.members);
    const selectedMember = useSelector(state => state.project.selectedMember);

    useEffect(() => {
        $("#side-menu").show();
        $(".Forhome").hide();
    });
    useEffect(() => {
        dispatch(getSuperintendents());
        dispatch(getEngineers());
        dispatch(getMembers());
    }, []);

    const handleSelectUser = (userId) => {
        var data = {
            memberId: userId
        };
        
        dispatch(getMemberProfile(data));
    }

    console.log(selectedMember);

    return (
        <React.Fragment>
            <div className="members-wrapper col-md-12">
                <div>
                    <div className="row">
                        <div className="col-sm-9 col-xl-9 col-md-9">
                            <div className="scrollbar-members row" id="style-2">
                                <div className="row col-md-12" style={{padding: '15px'}}>
                                    <div className="col-md-6 col-sm-6 text-left">
                                        <a className="dropdown-toggle arrow-none nav-user selected-team" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        Procon Team <i className="fa fa-sort-down"></i>                                        
                                        </a>
                                    </div>
                                    <div className="col-md-6 col-sm-6 text-right" style={{paddingTop: '10px'}}>
                                        <span>Manage Team&nbsp;&nbsp;</span>
                                        <Switch />
                                        <a className="btn-invite-member">
                                            &nbsp;&nbsp;<span> Invite Member </span><i className="fa fa-user-plus"></i>
                                        </a>
                                        <a className="btn-invite-member">
                                            &nbsp;&nbsp;<span> Remove Member </span><i className="fa fa-user-minus"></i>
                                        </a>
                                    </div>
                                </div>
                                { 
                                    superintendents.map((value, index) => {
                                        return (
                                            <div className="col-sm-4 col-xl-4 col-md-4" key={index}>
                                                <a onClick={() => handleSelectUser(value.id)} className="friends-suggestions-list team-member-list">
                                                    <div className="border-bottom position-relative">
                                                        <div className="float-left mb-0 mr-3">
                                                            <img src={!value.photo ? require('../../images/users/user.jpg') : value.photo} alt="" className="roundedImg thumb-md"/>
                                                            <p className="user-name" >{value.firstName} {value.lastName}</p>
                                                        </div>
                                                        <a className="dropdown-toggle ml-3 arrow-none nav-user user-role" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                                        {value.role} <i className="fa fa-sort-down"></i>                                        
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right role-dropdown">
                                                            <a className="dropdown-item"> {SupervisorRole}</a>
                                                            <a className="dropdown-item"> {EngineerRole}</a>
                                                            <a className="dropdown-item"> {MemberRole}</a>
                                                        </div>
                                                        <div className="desc">
                                                            <h5 className="font-14 mb-1 pt-2">{value.email}</h5>
                                                            <p className="text-muted">{value.mobile}</p>
                                                        </div>
                                                    </div>
                                                </a>                                      
                                            </div>
                                        ) 
                                    })
                                }
                                { 
                                    engineers.map((value, index) => {
                                        return (
                                            <div className="col-sm-4 col-xl-4 col-md-4" key={index}>
                                                <a onClick={() => handleSelectUser(value.id)} className="friends-suggestions-list team-member-list">
                                                    <div className="border-bottom position-relative">
                                                        <div className="float-left mb-0 mr-3">
                                                            <img src={!value.photo ? require('../../images/users/user.jpg') : value.photo} alt="" className="roundedImg thumb-md"/>
                                                            <p className="user-name" >{value.firstName} {value.lastName}</p>
                                                        </div>
                                                        <a className="dropdown-toggle ml-3 arrow-none nav-user user-role" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                                        {value.role} <i className="fa fa-sort-down"></i>                                        
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right role-dropdown">
                                                            <a className="dropdown-item"> {SupervisorRole}</a>
                                                            <a className="dropdown-item"> {EngineerRole}</a>
                                                            <a className="dropdown-item"> {MemberRole}</a>
                                                        </div>
                                                        <div className="desc">
                                                            <h5 className="font-14 mb-1 pt-2">{value.email}</h5>
                                                            <p className="text-muted">{value.mobile}</p>
                                                        </div>
                                                    </div>
                                                </a>                                      
                                            </div>
                                        ) 
                                    })
                                }
                                { 
                                    members.map((value, index) => {
                                        return (
                                            <div className="col-sm-4 col-xl-4 col-md-4" key={index}>
                                                <a onClick={() => handleSelectUser(value.id)} className="friends-suggestions-list team-member-list">
                                                    <div className="border-bottom position-relative">
                                                        <div className="float-left mb-0 mr-3">
                                                            <img src={!value.photo ? require('../../images/users/user.jpg') : value.photo} alt="" className="roundedImg thumb-md"/>
                                                            <p className="user-name" >{value.firstName} {value.lastName}</p>
                                                        </div>
                                                        {
                                                            value.status == NotStart ? 
                                                                <div className="circle-light light-red mr-3"></div>
                                                            : ''
                                                        }
                                                        {
                                                            value.status == Inprogress ? 
                                                                <div className="circle-light light-yellow mr-3"></div>
                                                            : ''
                                                        }
                                                        {
                                                            value.status == Completed ? 
                                                                <div className="circle-light light-green mr-3"></div>
                                                            : ''
                                                        }
                                                        <a className="dropdown-toggle ml-3 arrow-none nav-user user-role" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                                        {value.role} <i className="fa fa-sort-down"></i>                                        
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right role-dropdown">
                                                            <a className="dropdown-item"> {SupervisorRole}</a>
                                                            <a className="dropdown-item"> {EngineerRole}</a>
                                                            <a className="dropdown-item"> {MemberRole}</a>
                                                        </div>
                                                        <div className="desc">
                                                            <h5 className="font-14 mb-1 pt-2">{value.email}</h5>
                                                            <p className="text-muted">{value.mobile}</p>
                                                        </div>
                                                    </div>
                                                </a>                                      
                                            </div>
                                        ) 
                                    })
                                }
                                {/* <div className="col-sm-4 col-xl-4 col-md-4">
                                    <a href="#" className="friends-suggestions-list team-member-list">
                                        <div className="border-bottom position-relative">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user.jpg')} alt="" className="roundedImg thumb-md"/>
                                                <p className="user-name" >John Franklin</p>
                                            </div>
                                            <div className="circle-light light-green mr-3"></div>
                                            <div className="user-role float-right mt-2 pt-1"> Engineer </div>
                                            <div className="desc">
                                                <h5 className="font-14 mb-1 pt-2">engineer@gmail.com</h5>
                                                <p className="text-muted">1958552578</p>
                                            </div>
                                        </div>
                                    </a>                                     
                                </div>                                                                         */}
                            </div>
                        </div>
                        <div className="col-sm-3 col-xl-3 col-md-3">
                            <div className="card card-member">
                                {
                                    selectedMember != [] ? <>
                                        <h5 className="font-14 mb-1 pt-2">Personal Information</h5>
                                        <div className="border-bottom position-relative personal-info">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={selectedMember && !selectedMember.photo ? require('../../images/users/user.jpg') : selectedMember.photo} alt="" className="roundedImg thumb-md"/>
                                                <p className="user-name" >{selectedMember.firstName} {selectedMember.lastName}</p>
                                            </div>
                                            <div className="user-role float-right mt-2 pt-1"> {selectedMember.role} </div>
                                        </div>
                                        <div className="info-member mrg-space">
                                            {selectedMember && selectedMember.dob && <p><i className="fa fa-birthday-cake icons-pro" /> {new Date(selectedMember.dob).toLocaleDateString()}</p>}
                                            {selectedMember && selectedMember.email && <p><i className="fa fa-envelope icons-pro" /> {selectedMember.email}</p>}
                                            {selectedMember && selectedMember.mobile && <p><i className="fa fa-mobile-alt icons-pro" /> {selectedMember.mobile}</p>}
                                            {selectedMember && selectedMember.address && <p><i className="fa fa-map-marker-alt icons-pro" /> {selectedMember.address}</p>}
                                            {selectedMember && selectedMember.experience && <p><i className="fa fa-file-alt icons-pro" /> {selectedMember.experience}</p>}
                                        </div>
                                    </>
                                    : ''
                                }
                                
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
                                                            <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                                                <a className="dropdown-item" href="taskdata.html"> Display Task</a>  
                                                                <a className="dropdown-item d-block" href="addtask.html"> Edit Task</a>
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
                                            <img src={require('../../images/project.jpg')} alt="user" className="menu-logo1" style={{width: '100%'}}/>
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