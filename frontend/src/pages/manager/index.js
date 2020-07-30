import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { getSimpleRoleName } from '../../services';
import { addProject, getProjects } from '../../store/actions/projectActions';
import { loadingSelector, errorSelector } from '../../store/selectors';
import { Form, SubmitButton, FormField, ErrorMessage, FormTextarea } from '../../components/form';
import CoverUpload from '../../components/CoverUpload';
import ModelUpload from '../../components/ModelUpload';
import $ from 'jquery'; 

const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required().label("name"),
    location: Yup.string().required().max(255).label("location"),
});
const initialValues = {
    name: "",
    location : ""
};

const ManagerWelcome = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const cover_path = useSelector(state => state.project.cover_path);
    const model_path = useSelector(state => state.project.model_path);
    const errors = useSelector(state => errorSelector(['ADD_PROJECT'])(state));
    const loading = useSelector(state => loadingSelector(['ADD_PROJECT'])(state));
    const projects = useSelector(state => state.project.projects);

    useEffect(() => {
      $("#side-menu").hide();
      dispatch(getProjects());
    }, []);

    useEffect(() => {
    }, [projects]);
    if(cover_path == null)
        errors['coverImage'] = "Cover Image is a required field";
    if(model_path == null)
        errors['model'] = "Model is a required field";

    const handleSubmit = (data, { setErrors, setSubmitting }) => {
      data.coverImage = cover_path;
      data.model = model_path;
      if(cover_path != null && model_path != null)
        dispatch(addProject(data, setErrors, setSubmitting));
    }
    
    return (
        <React.Fragment>
            <div className="col-sm-4 col-xl-4 col-md-4">
                <div className="popup" data-toggle="modal" data-target="#addProjectModal">
                    <img src={require('../../images/plus.png')} alt="user" className="menu-logo1"/>
                    <p className="addNewProject">Add a new project</p>
                </div>
            </div>
            {projects.map((value, index) => {
              return (
                <div className="col-sm-4 col-xl-4 col-md-4" key={index}>
                  <div className="card">
                      <div className="card-heading">
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
                                                  <a className="dropdown-item"> Display Task</a>
                                                  <a className="dropdown-item d-block"> Edit Task</a>
                                                  <a className="dropdown-item"> End Task</a>
                                              </div>
                                          </div>
                                      </li>
                                  </ul>
                              </nav>
                          </div>
                          <div className="p-20">
                              <h5 className="font-16">{value.name}</h5>
                              <p>{value.location}</p>
                          </div>
                          <div className="pro-image">
                              <Link to={`/${getSimpleRoleName(user.role)}/home`}><img src={value.coverImage ? value.coverImage : require('../../images/project.jpg')} alt="cover-image" className="menu-logo1"/></Link>
                          </div>
                      </div>
                  </div>
              </div>   
              )
            })}

            <div className="col-sm-12 col-xl-12 col-md-12">
                <div className="modal fade" id="addProjectModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                          <Form className="form-horizontal m-t-30"
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                            enableReinitialize={true}
                            initialValues={initialValues}
                            >
                            <div className="modal-header">
                                <p>Add a new project</p>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Project name</label>
                                    <div className="col-sm-9">
                                        <FormField name="name" type="text"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Project location</label>
                                    <div className="col-sm-9">
                                        <FormField name="location" type="text"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">3D model file</label>
                                    <div className="col-sm-9">
                                        <ModelUpload url={ null } name="model_file"/>
                                        {errors && errors['model'] ? <ErrorMessage error={errors['model']} visible={errors && errors['model'] ? true: false} /> : null}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Cover page</label>
                                    <div className="col-sm-9">
                                        <CoverUpload url={ null } name="cover_file"/>
                                        {errors && errors['coverImage'] ? <ErrorMessage error={errors['coverImage']} visible={errors && errors['coverImage'] ? true: false} /> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer text-center">
                                <p><SubmitButton title='Create' loading={loading} disabled={loading} className="btn btn-info btn-lg waves-effect waves-light task-btn3"/></p>
                            </div>
                          </Form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default ManagerWelcome;