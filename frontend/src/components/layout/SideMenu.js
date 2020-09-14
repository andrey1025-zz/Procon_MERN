import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getNotificationCount } from '../../store/actions/projectActions';
import { getSimpleRoleName } from '../../services';
import { ProjectManagerRole } from '../../enums/roles';

const SideMenu = () => {
    const user = useSelector(state => state.auth.user);
    const notificCount = useSelector(state => state.project.notificCount);
    const dispatch = useDispatch();
    const getClassName = (path) => {
        return window.location.href.indexOf(path) > -1 ? "waves-effect mm-active" : "waves-effect";
    };
    const projectId = window.localStorage.getItem("projectId");

    useEffect(() => {
        dispatch(getNotificationCount(projectId));
    }, []);

    return (
        <div className="left side-menu">
            <div className="slimscroll-menu" id="remove-scroll">
                <div id="sidebar-menu">
                    <img src={require('../../images/side-logo.png')} className="Forhome"/>
                    <ul className="metismenu icon-image-menu" id="side-menu">
                        <li>
                            <a className="waves-effect" aria-expanded="false">
                                <span> Procon team <span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span></span>
                            </a>
                            <ul className="submenu mm-collapse">
                                <li><a>Team 1</a></li>
                                <li><a>Team 2</a></li>
                                <li><a>Team 3</a></li>
                                <li><a>Add Team +</a></li>
                            </ul>
                        </li>
                        <li>
                            <NavLink to={`/${getSimpleRoleName(user.role)}/home/` + projectId} className={getClassName('home')}  >
                                <img src={require('../../images/home.png')} /> <span> Homepage </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/${getSimpleRoleName(user.role)}/notification`} className={getClassName('notification')}  >
                                <img src={require('../../images/notification.png')} /> <span> Notification </span><span className="badge badge-danger notification-badge" style={{borderRadius:'50%', float:'right', width: '15px'}}>{notificCount > 0 ? notificCount : null}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/${getSimpleRoleName(user.role)}/task_manage`} className={getClassName('task_manage')}  >
                                <img src={require('../../images/tm.png')} /> <span> Task Management </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/${getSimpleRoleName(user.role)}/task_history`} className={getClassName('task_history')}  >
                                <img src={require('../../images/th.png')} /> <span> Task History </span>
                            </NavLink>
                        </li>
                        {
                            user.role == ProjectManagerRole ? 
                            <li>
                                <NavLink to={`/${getSimpleRoleName(user.role)}/members`} className={getClassName('members')}  >
                                    <img src={require('../../images/member.png')} /> <span> Member </span>
                                </NavLink>
                            </li> : ''
                        }                                             
                    </ul>
                </div>
            </div>
            <div className="clearfix"></div>
        </div>
    )
}
export default SideMenu;