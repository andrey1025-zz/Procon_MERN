import React from 'react';
import { NavLink } from 'react-router-dom';

import { getSimpleRoleName } from '../../services';
import { useSelector } from 'react-redux';

const SideMenu = () => {
    const user = useSelector(state => state.auth.user);
    const getClassName = (path) => {
        return window.location.href.indexOf(path) > -1 ? "waves-effect mm-active" : "waves-effect";
    };
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
                            <NavLink to={`/${getSimpleRoleName(user.role)}/home/:id`} className={getClassName('home')}  >
                                <img src={require('../../images/home.png')} /> <span> Homepage </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/${getSimpleRoleName(user.role)}/home`} className={getClassName('notification')}  >
                                <img src={require('../../images/notification.png')} /> <span> Notification </span>
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
                        <li>
                            <NavLink to={`/${getSimpleRoleName(user.role)}/home`} className={getClassName('member')}  >
                                <img src={require('../../images/member.png')} /> <span> Member </span>
                            </NavLink>
                        </li>                                                
                    </ul>
                </div>
            </div>
            <div className="clearfix"></div>
        </div>
    )
}
export default SideMenu;