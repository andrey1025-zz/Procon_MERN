import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProjects } from '../../store/actions/projectActions';

import { getSimpleRoleName } from '../../services';

import $ from 'jquery'; 

const EngineerWelcome = () => {
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
                <div className="col-sm-6 col-xl-4 col-md-6 project-item" key={index}>
                  <div className="project-wrapper">
                      <div className="project-title">
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
export default EngineerWelcome;