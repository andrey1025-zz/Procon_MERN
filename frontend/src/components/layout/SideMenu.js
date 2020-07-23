import React from 'react';
import { NavLink } from 'react-router-dom';

import { getSimpleRoleName } from '../../services';
import { useSelector } from 'react-redux';

const SideMenu = () => {

    const user = useSelector(state => state.auth.user);

    return (
        <div className="left side-menu">
            <div className="slimscroll-menu" id="remove-scroll">
                <div id="sidebar-menu">
                    <ul className="metismenu icon-image-menu" id="side-menu">
                        {/* <li>
                            <a href className="waves-effect"><span> Procon team <span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span> </span></a>
                            <ul className="submenu">
                                <li><a href="members.html">Team 1</a></li>
                                <li><a href="#">Team 2</a></li>
                                <li><a href="#">Team 3</a></li>
                                <li><a href="#">Add Team +</a></li>
                            </ul>
                        </li> */}
                        <li>
                            <NavLink to={`/${getSimpleRoleName(user.role)}/home`} className="waves-effect">
                                <img src={require('../../images/home.png')} /> <span> Homepage </span>
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