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
                    <img src={require('../../images/side-logo.png')} className="Forhome"/>
                    <ul className="metismenu icon-image-menu" id="side-menu">
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