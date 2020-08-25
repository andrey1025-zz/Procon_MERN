import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProjects } from '../../store/actions/projectActions';

import { getSimpleRoleName } from '../../services';

import $ from 'jquery'; 

const SupervisorWelcome = () => {
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        $("#side-menu").hide();
    });
    useEffect(() => {
        $("#side-menu").hide();
        dispatch(getProjects());
      }, []);

    const projects = useSelector(state => state.project.projects);
    const dispatch = useDispatch();
    useEffect(() => {
    }, [projects]);      
    return (
        <React.Fragment>
            {projects.map((value, index) => {
              return (
                <div className="col-sm-4 col-xl-4 col-md-4" key={index}>
                  <div className="project-wrapper">
                      <div className="project-title">
                          <div className="mini-stat-icon float-right">
                              <nav className="navbar-custom">
                                  <ul className="navbar-right list-inline float-right mb-0">
                                      <li className="dropdown notification-list list-inline-item">
                                          <div className="dropdown notification-list nav-pro-img">
                                              <a className="dropdown-toggle nav-link arrow-none nav-user"
                                                  data-toggle="dropdown" role="button"
                                                  aria-haspopup="false" aria-expanded="false">
                                                  <i className="mdi mdi-menu"></i>
                                              </a>
                                              <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                                  <a className="dropdown-item"> End Project</a>
                                              </div>
                                          </div>
                                      </li>
                                  </ul>
                              </nav>
                          </div>
                          <div className="p-20">
                              <h5 className="font-16">{value.name}</h5>
                              <p className="text-overflow">{value.location}</p>
                          </div>
                      </div>
                      <div className="project-body">
                        <div className="pro-image">
                            <Link to={`/${getSimpleRoleName(user.role)}/home/` + value._id}><img src={value.coverImage ? value.coverImage : require('../../images/project.jpg')} alt="cover-image" className="menu-logo1"/></Link>
                        </div>
                      </div>
                  </div>
              </div>   
              )
            })}
        </React.Fragment>
    )
}
export default SupervisorWelcome;