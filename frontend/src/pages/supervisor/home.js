import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FormField, SubmitButton } from '../../components/form';
import { loadingSelector } from '../../store/selectors';
import { ProjectManagerRole, SupervisorRole, EngineerRole, MemberRole } from '../../enums/roles';
import { addTask, getProjectDetail, getViewerForgeToken, getUsers, getSuperintendents, getEngineers, getMembers } from '../../store/actions/projectActions';
import ForgeViewer from 'react-forge-viewer';

import * as Yup from 'yup';
import $ from 'jquery'; 

const validationSchema = Yup.object().shape({
    name: Yup.string().max(100).required().label("name"),
    startTime: Yup.string().max(100).required().label("startTime"),
    endTime: Yup.string().max(255).required().label("endTime"),
    equipTools: Yup.string().max(255).required().label("equipTools"),
    components: Yup.string().max(255).required().label("components"),
    materials: Yup.string().max(255).required().label("materials"),
    workingArea: Yup.string().max(255).required().label("workingArea"),
    weather: Yup.string().max(255).required().label("weather"),
    siteCondition: Yup.string().max(255).required().label("siteCondition"),
    nearbyIrrelevantObjects: Yup.string().max(255).required().label("nearbyIrrelevantObjects"),
    cultural_legal_constraints: Yup.string().max(255).required().label("cultural_legal_constraints"),
    technical_safety_specifications: Yup.string().max(255).required().label("technical_safety_specifications"),
    publicRelationRequirements: Yup.string().max(255).required().label("publicRelationRequirements"),
});

const initialValues = {
    name: "",
    startTime: "",
    endTime: "",
    equipTools: "",
    components: "",
    materials: "",
    workingArea: "",
    weather: "",
    siteCondition:"",
    nearbyIrrelevantObjects:"",
    cultural_legal_constraints:"",
    technical_safety_specifications:"",
    publicRelationRequirements:""
};

const SupervisorHome = (props) => {
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => loadingSelector(['ADD_TASK'])(state));
    const [showAddTask, setShowAddTask] = useState(false);

    const projectId = props.match.params.id;
    const dispatch = useDispatch();
    const handleSubmit = (data, { setErrors, setSubmitting }) => {
        data.projectId = projectId;
        dispatch(addTask(data, setErrors, setSubmitting));
    }
    const show_newTaskForm = () => setShowAddTask(true);
    const hide_newTaskForm = () => setShowAddTask(false);
    
    const project = useSelector(state => state.project.project);
    const forgeToken = useSelector(state => state.project.forgeToken);
    const superintendents = useSelector(state => state.project.superintendents);
    const engineers = useSelector(state => state.project.engineers);
    const members = useSelector(state => state.project.members);
    const [urn, setUrn] = useState("");
    const [view, setView] = useState(null);
    const [role, setRole] = useState(null);
    let inviteList = [];

    useEffect(() => {
        if(project){
            setUrn(project.model);
        }
    }, [project]);
     
    useEffect(() => {
        dispatch(getViewerForgeToken());
    }, []);

    useEffect(() => {
        dispatch(getProjectDetail(projectId));
    }, []);

    const handleOpenMembersDialog = () => {
        setRole(SupervisorRole);
        dispatch(getSuperintendents());
        inviteList = superintendents;
    }

    useEffect(() => {
        $(".Forhome").hide();
        $("#side-menu").show();

        $(".role-dropdown > .dropdown-item").click(function(){
            let inviteRole = $(this).text();
            setRole(inviteRole);
            $('.selected-role').html(inviteRole + "<i class='fa fa-sort-down'></i>");
            switch(inviteRole.trim()){
                case SupervisorRole:
                    dispatch(getSuperintendents());
                    inviteList = superintendents;
                    break;
                case EngineerRole:
                    dispatch(getEngineers());
                    inviteList = engineers;
                    break;
                case MemberRole:
                    dispatch(getMembers());
                    inviteList = members;
            }
        });
    });

    useEffect(() => {
        console.log("Effect changed", role);
        // switch(role){
        //     case SupervisorRole:
        //         dispatch(getSuperintendents());
        //         inviteList = superintendents;
        //         break;
        //     case EngineerRole:
        //         dispatch(getEngineers());
        //         inviteList = engineers;
        //         break;
        //     case MemberRole:
        //         dispatch(getMembers());
        //         inviteList = members;
        // }
    })

    const handleViewerError = (error) => {
        console.log('Error loading viewer.');
    }

    const handleTokenRequested = (onAccessToken) => {
        console.log('Token requested by the viewer.');
        if(forgeToken){
            if(onAccessToken){
                onAccessToken(forgeToken.access_token, forgeToken.expires_in);
            }
        }    
    }
    const handleDocumentError = (viewer, error) => {
        console.log('Error loading a document');
    }
    
    const handleDocumentLoaded = (doc, viewables) => {
        if (viewables.length === 0) {
          console.error('Document contains no viewables.');
        }
        else{
          //Select the first viewable in the list to use in our viewer component
          setView(viewables[0]);
        }
    }
    
    const handleModelLoaded = (viewer, model) => {
        console.log('Loaded model:', model);
    }
    
    const handleModelError = (viewer, error) => {
        console.log('Error loading the model.');
    }
       
    // useEffect(() => {
    // }, [superintendents]);

    // useEffect(() => {
    // }, [engineers]);

    // useEffect(() => {
    // }, [members]);

    return (
        <React.Fragment>
            <div className="col-sm-9 col-xl-9 col-md-9 project-detail">
                <div className="card viewer-wrapper">
                    <div className="card-heading">
                        <div className="threed-effect">
                            <ForgeViewer
                                version="6.0"
                                urn={urn}
                                view={view}
                                headless={false}
                                onViewerError={handleViewerError}
                                onTokenRequest={handleTokenRequested}
                                onDocumentLoad={handleDocumentLoaded}
                                onDocumentError={handleDocumentError}
                                onModelLoad={handleModelLoaded}
                                onModelError={handleModelError}
                            />
                            <button className="btn btn-info btn-lg task-btn2 btn-add-task" onClick={show_newTaskForm}>Add a new task</button>
                        </div>
                    </div>
                </div>
                <div className="progress mt-4 mb-4">
                    <div className="progress-bar bg-primary" role="progressbar" style={{width: '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="endTask">
                            <p>Project End Time : 2020.06.27</p>
                            <div className="endTaskBrief">
                                <p></p>
                                <div></div>
                            </div>
                        </div>
                        {
                            showAddTask ? (
                                <div className="task-info">
                                    <div className="scrollbar" id="style-2">
                                        <Form
                                            onSubmit={handleSubmit}
                                            validationSchema={validationSchema}
                                            initialValues={initialValues}
                                        >
                                            <div className="force-overflow">
                                                <div className="form-group-task">
                                                    <label>Task name:</label>
                                                    <div>
                                                        <FormField className="form-control-task" name="name"/>
                                                    </div>
                                                </div>
                                                <div className="form-group-task">
                                                    <label>Task expected start time:</label>
                                                    <div>
                                                        <FormField className="form-control-task" type="time" name="startTime"/>
                                                    </div>
                                                </div>
                                                <div className="form-group-task">
                                                    <label>Task expected end time:</label>
                                                    <div>
                                                        <FormField className="form-control-task" type="time" name="endTime"/>
                                                    </div>
                                                </div>
                                                <div className="form-group-task">
                                                    <label>Equipment and tools:</label>
                                                    <div>
                                                        <FormField className="form-control-task" name="equipTools"/>
                                                    </div>
                                                </div>
        
                                                <div className="form-group-task">
                                                    <label>Components:</label>
                                                    <div>
                                                        <FormField className="form-control-task" name="components"/>
                                                    </div>
                                                </div>
                                                <div className="form-group-task">
                                                    <label>Materials:</label>
                                                    <div>
                                                        <FormField className="form-control-task" name="materials"/>
                                                    </div>
                                                </div>
                                                <div className="form-group-task">
                                                    <label>Working area:</label>
                                                    <div>
                                                        <FormField className="form-control-task" name="workingArea"/>
                                                    </div>
                                                </div>
        
                                                <div className="form-group-task">
                                                    <label>Weather:</label>
                                                    <div>
                                                        <FormField className="form-control-task" name="weather"/>
                                                    </div>
                                                </div>
        
                                                <div className="form-group-task">
                                                    <label>Site condition:</label>
                                                    <div>
                                                        <FormField className="form-control-task" name="siteCondition"/>
                                                    </div>
                                                </div>
        
                                                <div className="form-group-task">
                                                    <label>Nearby irrelevant objects:</label>
                                                    <div>
                                                        <FormField className="form-control-task" name="nearbyIrrelevantObjects"/>
                                                    </div>
                                                </div>
        
                                                <div className="form-group-task">
                                                    <label>Cultural and legal constraints:</label>
                                                    <div>
                                                        <FormField className="form-control-task" name="cultural_legal_constraints"/>
                                                    </div>
                                                </div>
        
                                                <div className="form-group-task">
                                                    <label>Technical and safety specifications:</label>
                                                    <div>
                                                        <FormField className="form-control-task" name="technical_safety_specifications"/>
                                                    </div>
                                                </div>
                                                <div className="form-group-task">
                                                    <label>Public relation requirements:</label>
                                                    <div>
                                                        <FormField className="form-control-task" name="publicRelationRequirements"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-info btn-lg task-btn mr-20" onClick={hide_newTaskForm}>Cancel</button>
                                            <SubmitButton title='Publish' className="btn btn-info btn-lg task-btn mr-20" loading={loading} disabled={loading} />
                                        </Form>
                                    </div>
                                </div>  
                            ) : null
                        }                
                </div>
            <div className="col-sm-3 col-xl-3 col-md-3">
                <div className="row tasks-wrapper" style={{marginBottom:"20px"}}>
                    <div className="card-body">
                        <div className="friends-suggestions">
                            <a href="#" className="friends-suggestions-list">
                                <div className="border-bottom position-relative">
                                    <div className="float-left mb-0 mr-3">
                                        <img src={require('../../images/users/user-2.jpg')} alt="" className="roundedImg thumb-md"/>
                                        <p>Josephine</p>
                                    </div>
                                    <div className="suggestion-icon float-right mt-2 pt-1"> Engineer </div>
                                    <div className="desc">
                                        <h5 className="font-14 mb-1 pt-2">Ralph Ramirez</h5>
                                        <p className="text-muted">14365748543</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="friends-suggestions-list">
                                <div className="border-bottom position-relative">
                                    <div className="float-left mb-0 mr-3">
                                        <img src={require('../../images/users/user-3.jpg')} alt="" className="roundedImg thumb-md"/>
                                        <p>Josephine</p>
                                    </div>
                                    <div className="suggestion-icon float-right mt-2 pt-1"> Engineer </div>
                                    <div className="desc">
                                        <h5 className="font-14 mb-1 pt-2">Patrick Beeler</h5>
                                        <p className="text-muted">14365748543</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="friends-suggestions-list">
                                <div className="border-bottom position-relative">
                                    <div className="float-left mb-0 mr-3">
                                        <img src={require('../../images/users/user-4.jpg')} alt="" className="roundedImg thumb-md"/>
                                        <p>Josephine</p>
                                    </div>
                                    <div className="suggestion-icon float-right mt-2 pt-1"> Engineer </div>
                                    <div className="desc">
                                        <h5 className="font-14 mb-1 pt-2">Victor Zamora</h5>
                                        <p className="text-muted">14365748543</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="friends-suggestions-list">
                                <div className="border-bottom position-relative">
                                    <div className="float-left mb-0 mr-3">
                                        <img src={require('../../images/users/user-5.jpg')} alt="" className="roundedImg thumb-md"/>
                                        <p>Josephine</p>
                                    </div>
                                    <div className="suggestion-icon float-right mt-2 pt-1"> Engineer </div>
                                    <div className="desc">
                                        <h5 className="font-14 mb-1 pt-2">vasuk@uk.mh</h5>
                                        <p className="text-muted">14365748543</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="friends-suggestions-list">
                                <div className="position-relative">
                                    <div className="float-left mb-0 mr-3">
                                        <img src={require('../../images/users/user-6.jpg')} alt="" className="roundedImg thumb-md"/>
                                        <p>Connor Silva</p>
                                    </div>
                                    <div className="suggestion-icon float-right mt-2 pt-1"> Supervisor </div>
                                    <div className="desc">
                                        <h5 className="font-14 mb-1 pt-2">seziz@razof.tl</h5>
                                        <p className="text-muted mb-1">17667560574</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row text-center add-member custom-rounded">
                    <a onClick={handleOpenMembersDialog} className="md-plus" data-toggle="modal" data-target="#addMemberModal"><i className="fas fa-plus"></i></a>
                </div>
                <div className="col-sm-12 col-xl-12 col-md-12">
                    <div className="modal fade" id="addMemberModal" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header row">
                                    <div className="col-md-6 col-sm-6 text-left">
                                        <span className="text-black">Select members</span>
                                        <a className="dropdown-toggle ml-3 arrow-none nav-user selected-role" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        Superintendent <i className="fa fa-sort-down"></i>                                        
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right role-dropdown">
                                            <a className="dropdown-item"> Superintendent</a>
                                            <a className="dropdown-item d-block"> Engineer</a>
                                            <a className="dropdown-item " href="#"> Member</a>
                                        </div>                                    
                                    </div>
                                    <div className="col-md-6 col-sm-6 text-right task-status">
                                        <span className="text-black mr-2">Complete</span>
                                        <div className="circle-light light-green mr-3"></div>
                                        <span className="text-black mr-2">In progress</span>
                                        <div className="circle-light light-red mr-3"></div>
                                        <span className="text-black mr-2">Not start</span>
                                        <div className="circle-light light-yellow"></div>
                                    </div>
                                </div>
                                <div className="modal-body row">
                                    {/* <div className="col-sm-3 col-xl-3 col-md-3">
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-5.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-green mt-3"></div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-5.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-green mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-5.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-green mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-5.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-red mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-5.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-red mt-3">
                                            </div>
                                        </div>  
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-5.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-yellow mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-5.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-yellow mt-3">
                                            </div>
                                        </div>  
                                    </div>
                                    <div className="col-sm-3 col-xl-3 col-md-3">
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-2.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-red mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-2.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-red mt-3">
                                            </div>
                                        </div>  
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-2.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-green mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-2.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-green mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-2.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-green mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-2.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-yellow mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-2.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-yellow mt-3">
                                            </div>
                                        </div>  
                                    </div>
                                    <div className="col-sm-3 col-xl-3 col-md-3">
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-3.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-red mt-3">
                                            </div>
                                        </div>  
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-3.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-yellow mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-3.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-green mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-3.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-green mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-3.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-green mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-3.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-red mt-3">
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-sm-3 col-xl-3 col-md-3">
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-4.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-green mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-4.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-green mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-4.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-green mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-4.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-red mt-3">
                                            </div>
                                        </div>
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-4.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-red mt-3">
                                            </div>
                                        </div>  
                                        <div className="member-status custom-rounded mb-2">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={require('../../images/users/user-4.jpg')} alt="" className="roundedImg thumb-md"/>
                                            </div>
                                            <div className="suggestion-icon float-left mt-3"> Belle Edwards </div>
                                            <div className="circle-light float-right light-yellow mt-3">
                                            </div>
                                        </div>
                                    </div>                                                                                                             */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </React.Fragment>
    )
}
export default SupervisorHome;