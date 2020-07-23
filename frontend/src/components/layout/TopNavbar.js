import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { titleCase } from "title-case";

import { getSimpleRoleName } from '../../services';
import { logout } from '../../store/actions/authActions';

const TopNavbar = () => {

    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    }

    return (
        <div className="topbar">
            <div className="topbar-left">
                <Link to={`/${getSimpleRoleName(user.role)}/home`} className="logo">
                    <span className="logo-light">
                        Welcome
                        <br/>
                        {user.firstName} {user.lastName}
                    </span>
                    <span className="logo-sm">
                        <i className="mdi mdi-camera-control"></i>
                    </span>
                </Link>
            </div>
            <nav className="navbar-custom">
                <ul className="navbar-right list-inline float-right mb-0">
                    <li className="float-right">
                        <button className="button-menu-mobile open-left waves-effect">
                            <i className="mdi mdi-menu"></i>
                        </button>
                    </li>

                    <li className="dropdown notification-list list-inline-item">
                        <div className="dropdown notification-list nav-pro-img">
                            <a className="dropdown-toggle nav-link arrow-none nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                {titleCase(user.lastName)}&nbsp;
                                <img src={user && user.photo ? user.photo : require('../../images/users/user-4.jpg')} alt="user" className="rounded-circle1" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                <Link className="dropdown-item" to={`/${getSimpleRoleName(user.role)}/account`}><i className="mdi mdi-account-circle"></i> Your account</Link>
                                <a className="dropdown-item d-block" href="#"><i className="mdi mdi-settings"></i> Settings</a>
                                <div className="dropdown-divider"></div>
                                <a href onClick={() => onLogout()} className="dropdown-item text-danger"><i className="mdi mdi-power text-danger"></i> Sign out</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div >
    )
};
export default TopNavbar;