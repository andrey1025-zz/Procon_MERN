import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { getSimpleRoleName } from '../../services';
import { addProject, getProjects, getProjectDetail, deleteProject, updateProject } from '../../store/actions/projectActions';
import { loadingSelector, errorSelector } from '../../store/selectors';
import { Form, SubmitButton, FormField, ErrorMessage } from '../../components/form';
import CoverUpload from '../../components/CoverUpload';
import ModelUpload from '../../components/ModelUpload';
import $ from 'jquery'; 
import { setNestedObjectValues } from 'formik';
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';

var notification = {
    title: "Wonderful!",
    message: "Configurable",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
        duration: 2000,
        onScreen: true
    }
};

const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required().label("name"),
    location: Yup.string().required().max(255).label("location"),
});
const initialValues = {
    name: "",
    location : ""
};

const updateValues = {
    name: "",
    location: ""
};

const ManagerWelcome = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const cover_path = useSelector(state => state.project.cover_path);
    const model_path = useSelector(state => state.project.model_path);
    const errors = useSelector(state => errorSelector(['ADD_PROJECT'])(state));
    const loading = useSelector(state => loadingSelector(['ADD_PROJECT'])(state));
    const projects = useSelector(state => state.project.projects);
    const project = useSelector(state => state.project.project);

    useEffect(() => {
        $("#side-menu").hide();
        dispatch(getProjects());
    }, []);

    if(cover_path == null)
        errors['coverImage'] = "Cover Image is a required field";
    if(model_path == null)
        errors['model'] = "Model is a required field";

    const handleSubmit = (data, { setErrors, setSubmitting }) => {
        data.coverImage = cover_path;
        data.model = model_path;
        if(cover_path != null && model_path != null){
            dispatch(addProject(data, setErrors, setSubmitting)).then((response) => {
                window.$("#addProjectModal").modal('hide');
                store.addNotification({
                    ...notification,
                    title: "Success!",
                    message: "You have created new project."
                })
            });
        }
    }

    const handleUpdateProject = (data, { setErrors, setSubmitting }) => {
        data.coverImage = cover_path;
        data.model = model_path;
        data.projectId = $("#projectId").val();
        if(cover_path != null && model_path != null){
            dispatch(updateProject(data, setErrors, setSubmitting)).then((response) => {
                window.$("#updateProjectModal").modal('hide');
                store.addNotification({
                    ...notification,
                    title: "Success!",
                    message: "You have updated project."
                });
            });
        }
    }

    const handleDisplayProject = (projectId) => {
        dispatch(getProjectDetail(projectId));
        window.$("#displayProjectModal").modal();
    }

    const handleEditProject = (projectId) => {
        dispatch(getProjectDetail(projectId)).then(() => {
            updateValues.location = project.location;
            updateValues.name = project.name;
            window.$("#updateProjectModal").modal();
        });
    }

    const handleDeleteProject = (projectId) => {
        dispatch(deleteProject(projectId)).then((response) => {
            store.addNotification({
                ...notification,
                title: "Success!",
                message: "You have deleted project."
            })
        });
    }
    
    return (
        <React.Fragment>
            <ReactNotification />
            <div className="col-sm-6 col-xl-4 col-md-6 project-item">
                <div className="popup" data-toggle="modal" data-target="#addProjectModal">
                    <img src={require('../../images/plus.png')} alt="user" className="menu-logo1 plus-project"/>
                    <p className="addNewProject">Add a new project</p>
                </div>
            </div>
            {projects.map((value, index) => {
              return (
                <div className="col-sm-6 col-xl-4 col-md-6 project-item" key={index}>
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
                                                  <a className="dropdown-item" onClick={() => handleDisplayProject(value._id)}> Display Project</a>
                                                  <a className="dropdown-item d-block" onClick={() => handleEditProject(value._id)}> Edit Project</a>
                                                  <a className="dropdown-item"> End Project</a>
                                                  <a className="dropdown-item" onClick={() => handleDeleteProject(value._id)}> Delete Project</a>
                                              </div>
                                          </div>
                                      </li>
                                  </ul>
                              </nav>
                          </div>
                          <div className="p-20">
                              <label className="font-16">{value.name}</label>
                              <p className="text-overflow">{value.location}</p>
                          </div>
                      </div>
                      <div className="project-body">
                            <Link to={`/${getSimpleRoleName(user.role)}/home/` + value._id} params={{ projectInfo: value }}><img src={value.coverImage ? value.coverImage : require('../../images/project.jpg')} alt="cover-image" className="menu-logo1"/></Link>
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
                <div className="modal fade" id="displayProjectModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p>Project Detail</p>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label text-left">Project name</label>
                                    <label className="col-sm-9 col-form-label value-label">
                                        {project.name}
                                    </label>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label text-left">Project location</label>
                                    <label className="col-sm-9 col-form-label value-label">
                                        {project.location}
                                    </label>
                                </div>
                                <div className="form-group row" style={{padding: '10px'}}>
                                    <img src={project.coverImage ? project.coverImage : require('../../images/project.jpg')} alt="cover-image" className="menu-logo1"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    project ? 
                    <div className="modal fade" id="updateProjectModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                          <Form className="form-horizontal m-t-30"
                            onSubmit={handleUpdateProject}
                            initialValues={updateValues}
                            >
                            <div className="modal-header">
                                <p>Update Project</p>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <FormField type="hidden" value={project._id || ''} id="projectId" name="projectId"/>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Project name</label>
                                    <div className="col-sm-9">
                                        <FormField name="name" type="text" id="updatedName" defaultValue={project.name}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Project location</label>
                                    <div className="col-sm-9">
                                        {project.name} {project.location}
                                        <FormField name="location" type="text" id="updatedLocation" defaultValue={project.location}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">3D model file</label>
                                    <div className="col-sm-9">
                                        <ModelUpload url={ null } name="model_file"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Cover page</label>
                                    <div className="col-sm-9">
                                        <CoverUpload url={ null } name="cover_file"/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer text-center">
                                <p><SubmitButton title='Update' loading={loading} disabled={loading} className="btn btn-info btn-lg waves-effect waves-light task-btn3"/></p>
                            </div>
                          </Form>
                        </div>
                    </div>
                </div> : ''
                }

            </div>
        </React.Fragment>
    )
}
export default ManagerWelcome;