import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSuperintendents, inviteSuperintendent, getViewerForgeToken, getProjectDetail, getProjectSuperintendents, removeMember } from '../../store/actions/projectActions';
import ForgeViewer from 'react-forge-viewer';

import $ from 'jquery'; 
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

const ManagerHome = (props) => {
    const dispatch = useDispatch();
    const superintendents = useSelector(state => state.project.superintendents);
    const projectId = props.match.params.id;
    var index = 0;
    const forgeToken = useSelector(state => state.project.forgeToken);
    const project = useSelector(state => state.project.project);
    const projectSuperintendent = useSelector(state => state.project.projectSuperintendent);
    const [urn, setUrn] = useState("");
    const [view, setView] = useState(null);

    useEffect(() => {
        $(".Forhome").hide();
        $("#side-menu").show();

        $(".member-link").click(function(){
            if($(this).hasClass('clicked')){
                $(this).removeClass('clicked');
                $(".btn-invite").parent().hide();
            }
            else{
                $(".member-link").removeClass('clicked');
                $(this).addClass('clicked');
                $(".btn-invite").parent().show();
            }
        });

    });

    $("body").on("click", ".member-item", function(){
        $(".check-task").hide();
        $(this).find('.check-task').show();
    });
    
    useEffect(() => {
        dispatch(getProjectDetail(projectId));
    }, []);

    useEffect(() => {
        dispatch(getProjectSuperintendents(projectId));
    }, []);

    useEffect(() => {
        dispatch(getViewerForgeToken());
    }, []);
    useEffect(() => {
        if(project){
            setUrn(project.model);
        }
    }, [project]);
    const handleOpenMembersDialog = () => {
        dispatch(getSuperintendents());
    }

    const handleSuperintendentClicked = (index) => {
        index = index;
    }

    const handleInviteSuperintendent = () => {
        let data = {
            projectId: projectId,
            superintendentId: superintendents[index].id
        }
        dispatch(inviteSuperintendent(data)).then(() => {
            window.$("#addMemberModal").modal('hide');
            dispatch(getProjectSuperintendents(projectId));
            store.addNotification({
                ...notification,
                title: "Success!",
                message: "You have invited superintendent into your project."
            })

        });
    }

    const handleRemoveMember = (memberId) => {
        let data = {
            projectId: projectId,
            taskId: null,
            memberId: memberId
        };
        dispatch(removeMember(data)).then(() => { 
            dispatch(getProjectSuperintendents());
            store.addNotification({
                ...notification,
                title: "Success!",
                message: "You have removed member successfully."
            })
        });
    }

    useEffect(() => {
    }, [superintendents]);

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
        }
        else{
          setView(viewables[0]);
        }
    }
    const handleModelLoaded = (viewer, model) => {
        console.log('Loaded model:', model);
        console.log(viewer.listeners.selection);
    }
    
    const handleModelError = (viewer, error) => {
        console.log('Error loading the model.');
    }
    const handleNodeSelected = (viewer, model) => {
    }
    return (
        <React.Fragment>
        <ReactNotification />
            <div className="col-sm-9 col-xl-9 col-md-9 project-detail">
                <div className="card viewer-wrapper">
                    <div className="card-heading">
                        <div className="threed-effect">
                        {
                                forgeToken ? 
                                <ForgeViewer
                                version="6.0"
                                urn={urn}
                                view={view}
                                headless={false}
                                onViewerError={handleViewerError}
                                onTokenRequest={handleTokenRequested}
                                onDocumentLoad={handleDocumentLoaded}
                                onDocumentError={() => handleDocumentError}
                                onModelLoad={handleModelLoaded}
                                onModelError={() => handleModelError}
                            />
                                : ""
                            }
                        </div>
                        {/* <div className="progress mt-4 mb-4" style={{height: '8px'}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div> */}
                        <div className="endTask">
                            <p>Cut Off Task : 2020.06.27</p>
                            <div className="endTaskBrief">
                                <p></p>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-3 col-xl-3 col-md-3">
                {
                    ( projectSuperintendent != [] > 0 && projectSuperintendent != undefined ) ?
                    <div className="row tasks-wrapper" style={{marginBottom:"20px"}}>
                        <div className="card-body">
                            <div className="friends-suggestions">
                                { 
                                    projectSuperintendent != [] > 0 ? 
                                        <a href="#" className="friends-suggestions-list member-item">
                                            <div className="border-bottom position-relative">
                                                <div className="float-left mb-0 mr-3">
                                                    <img src={!projectSuperintendent.photo ? require('../../images/users/user.jpg') : projectSuperintendent.photo} alt="" className="roundedImg thumb-md"/>
                                                    <p className="user-name" >{projectSuperintendent.firstName} {projectSuperintendent.lastName}</p>
                                                </div>
                                                <div className="suggestion-icon float-right mt-2 pt-1"> {projectSuperintendent.role} </div>
                                                <div className="desc">
                                                    <h5 className="font-14 mb-1 pt-2">{projectSuperintendent.email}</h5>
                                                    <p className="text-muted">{!projectSuperintendent.mobile ? '' : projectSuperintendent.mobile}</p>
                                                </div>
                                                <div className="check-task" data-id={projectSuperintendent.id}>
                                                    <span className="remove-member" onClick={() => handleRemoveMember(projectSuperintendent.id)}>Remove Member</span>
                                                </div>
                                            </div>
                                        </a> 
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                    : ''
                }
                <div className="row text-center add-member custom-rounded">
                    <a onClick={handleOpenMembersDialog} className="md-plus" data-toggle="modal" data-target="#addMemberModal"><i className="fas fa-plus"></i></a>
                </div>
                <div className="col-sm-12 col-xl-12 col-md-12">
                    <div className="modal fade" id="addMemberModal" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header row">
                                    <div className="col-md-6 col-sm-6 text-left">
                                        <span className="text-black">Select Superintendent</span>
                                    </div>
                                    <div className="col-md-6 col-sm-6 text-right task-status">
                                        <span className="text-black mr-2">Available</span>
                                        <div className="circle-light light-green mr-3"></div>
                                        <span className="text-black mr-2">In progress</span>
                                        <div className="circle-light light-red mr-3"></div>
                                        <span className="text-black mr-2">Not start</span>
                                        <div className="circle-light light-yellow"></div>
                                    </div>
                                </div>
                                <div className="modal-body row">
                                    { 
                                        superintendents.map((value, index) => {
                                            return (
                                                <div className="col-sm-3 col-xl-3 col-md-3" key={index}>
                                                    <div key={index} className="member-status custom-rounded mb-2 member-link" onClick={() => handleSuperintendentClicked(index)}>
                                                    {/* <div key={index} className="member-status custom-rounded mb-2 member-link"> */}
                                                        <div className="float-left mb-0 mr-3">
                                                        <img src={!value.photo ? require('../../images/users/user.jpg') : value.photo} className="roundedImg    thumb-md" />
                                                        </div>
                                                        <div className="suggestion-icon float-left mt-3"> {value.lastName} </div>
                                                        <div className="circle-light float-right light-green mt-3">
                                                        </div>
                                                    </div>
                                                </div>   
                                            ) 
                                        })
                                    }
                                    <div className="col-sm-12 col-xl-12 col-md-12" style={{textAlign: 'right', display: 'none'}}>
                                        <button className="btn btn-info btn-lg task-btn2 btn-invite" onClick={handleInviteSuperintendent}>Invite Superintendent</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </React.Fragment>
    )
}
export default ManagerHome;