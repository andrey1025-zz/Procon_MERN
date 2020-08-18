import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FormField, SubmitButton, FormTextarea } from '../../components/form';
import { loadingSelector } from '../../store/selectors';
import { SupervisorRole, EngineerRole, MemberRole } from '../../enums/roles';
import { NotStart, Inprogress, Completed, Reviewed } from '../../enums/taskStatus';
import { 
    addTask,
    reviewTask,
    getProjectDetail, 
    getViewerForgeToken, 
    getSuperintendents, 
    getEngineers, 
    getMembers,
    inviteSuperintendent,
    inviteMember,
    inviteEngineer,
    getTaskEngineers,
    getTaskMembers,
    getTaskDetail,
    checkTask,
    reworkTask,
    removeMember
} 
from '../../store/actions/projectActions';
import ForgeViewer from 'react-forge-viewer';
import queryString from 'query-string'

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
    const loading = useSelector(state => loadingSelector(['REVIEW_TASK'])(state));
    const values = queryString.parse(props.location.search)
    const task_id = values.task_id;
    var index = 0;
    var projectId = props.match.params.id;
    window.localStorage.setItem("projectId", projectId);
    if(projectId == '')
        projectId = window.localStorage.getItem("projectId");
    const dispatch = useDispatch();

    const handleSubmit = (data, { setErrors, setSubmitting }) => {
        data.projectId = projectId;
        data.taskId = task_id;
        dispatch(reviewTask(data, setErrors, setSubmitting));
    }

    const handleReviewTask = () => {
        var data = {
            projectId: projectId,
            taskId: task_id,
        };
        
        dispatch(reviewTask(data));
    }

    const handleCheck = (memberId) => {
        let data = {
            projectId: projectId,
            taskId: task_id,
            memberId: memberId
        };
        
        dispatch(checkTask(data));
    }

    const handleRework = (memberId) => {
        let data = {
            projectId: projectId,
            taskId: task_id,
            memberId: memberId
        };
        
        dispatch(reworkTask(data));
    }

    const handleRemoveMember = (memberId) => {
        let data = {
            projectId: projectId,
            taskId: taskId,
            memberId: memberId
        };
        dispatch(removeMember(data));
        $("a[data-id='" + memberId + "']").remove();
    }

    const handleAddTask = () => {
        let data = {
            projectId: projectId,
            components: "Test Component",
            componentId: "componet id"
        }
        dispatch(addTask(data));
        $(".add-member").show();
    }
    
    const project = useSelector(state => state.project.project);
    const forgeToken = useSelector(state => state.project.forgeToken);
    const superintendents = useSelector(state => state.project.superintendents);
    const engineers = useSelector(state => state.project.engineers);
    const members = useSelector(state => state.project.members);
    const taskId = useSelector(state => state.project.taskId);
    const task = useSelector(state => state.project.task);
    const taskEngineers = useSelector(state => state.project.taskEngineers);
    const taskMembers = useSelector(state => state.project.taskMembers);

    const [urn, setUrn] = useState("");
    const [view, setView] = useState(null);
    const [role, setRole] = useState(null);
    let inviteList = [];
    let roleType = EngineerRole;

    useEffect(() => {
        if(project){
            setUrn(project.model);
        }
    }, [project]);
     
    useEffect(() => {
        if(task_id){
            let data = {
                projectId: projectId,
                taskId: task_id
            }
            dispatch(getTaskEngineers(data));
        }
    }, []);

    useEffect(() => {
        if(task_id){
            let data = {
                projectId: projectId,
                taskId: task_id
            }
            dispatch(getTaskMembers(data));
        }
    }, []);
    
    useEffect(() => {
        if(task_id){
            let data = {
                projectId: projectId,
                taskId: task_id
            }
            dispatch(getTaskDetail(data));
        }
        if(task.length > 0){
            $(".task-info").show();
        }
    }, []);
    
    useEffect(() => {
        dispatch(getViewerForgeToken());
    }, []);

    useEffect(() => {
        dispatch(getProjectDetail(projectId));
    }, []);

    const handleOpenMembersDialog = () => {
        setRole(EngineerRole);
        $('.selected-role').html(EngineerRole + "<i class='fa fa-sort-down'></i>");
        dispatch(getEngineers());
    }

    useEffect(() => {
        $(".Forhome").hide();
        $("#side-menu").show();

        $(".member-link").click(function(){
            if($(this).hasClass('clicked')){
                $(this).removeClass('clicked');
            }
            else{
                if(role != MemberRole)
                    $(".member-link").removeClass('clicked');
                $(this).addClass('clicked');
                $(".btn-invite").parent().show();
            }
            var count = 0;
            $(".member-link.clicked").each(function(){
                count++;
            });
            if(count == 0)
                $(".btn-invite").parent().hide();
        });

        $("body").on("click", ".member-item", function(){
            $(".check-task").hide();
            $(this).find('.check-task').show();
        });
    });

    const handleRoleSelected = (role_text) => {
        roleType = role_text.trim();
        setRole(roleType);
        switch(roleType){
            case SupervisorRole:
                dispatch(getSuperintendents());
                break;
            case EngineerRole:
                dispatch(getEngineers());
                break;
            case MemberRole:
                dispatch(getMembers());
        }
        $('.selected-role').html(roleType + "<i class='fa fa-sort-down'></i>");
        $(".btn-invite").parent().hide();
    }

    const handleUserClicked = (index) => {
        index = index;
    }

    const handleInvite = () => {
        let data = {};
        switch(role){
            case SupervisorRole:
                data.projectId = projectId;
                data.superintendentId = inviteList[index].id;
                dispatch(inviteSuperintendent(data));
                break;
            case EngineerRole:
                data.projectId = projectId;
                data.engineerId = inviteList[index].id;
                data.taskId = taskId;
                dispatch(inviteEngineer(data));
                window.$("#addMemberModal").modal('hide');
                break;
            case MemberRole:
                if(data.taskId != 0){
                    data.projectId = projectId;
                    data.memberIds = [];
                    $(".member-link.clicked[data-type="+role+"]").each(function(){
                        var selected_index = $(this).data('index');
                        data.memberIds.push(inviteList[selected_index]._id);
                    });
                    data.taskId = taskId;
                    dispatch(inviteMember(data));
                    window.$("#addMemberModal").modal('hide');
                } else {
                    alert("You can only invite members in task.");
                }
        }
        $(".member-link").removeClass('clicked');
    }

    switch(role){
        case SupervisorRole:
            if(superintendents && superintendents.length > 0)
                inviteList = superintendents;
            else
                inviteList = [];
            break;
        case EngineerRole:
            if(engineers && engineers.length > 0)
                inviteList = engineers;
            else
                inviteList = [];
            break;
        case MemberRole:
            if(members && members.length > 0)
                inviteList = members;
            else
                inviteList = [];
    }

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
          //Select the first viewable in the list to use in our viewer component
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
                                onSelectionEvent={() => handleNodeSelected}
                            />
                            { !task_id ? <button className="btn btn-info btn-lg task-btn2 btn-add-task" onClick={handleAddTask}>Add a new task</button> : ''}
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
                    task.length > 0 && task_id != null ? 
                    <div className="task-info" style={{display: 'block'}}>
                        <div className="scrollbar" id="style-2">
                            <Form
                                onSubmit={handleReviewTask}
                                initialValues={initialValues}
                            >
                                <div className="force-overflow">
                                    <div className="form-group-task">
                                        <label>Task name:</label>
                                        <div>
                                            <FormTextarea className="form-control-task" name="name" value={task[0].tasks[0].name}/>
                                        </div>
                                    </div>
                                    <div className="form-group-task">
                                        <label>Task expected start time:</label>
                                        <div>
                                            <FormField className="form-control-task" type="time" name="startTime" value={task[0].tasks[0].startTime}/>
                                        </div>
                                    </div>
                                    <div className="form-group-task">
                                        <label>Task expected end time:</label>
                                        <div>
                                            <FormField className="form-control-task" type="time" name="endTime" value={task[0].tasks[0].endTime}/>
                                        </div>
                                    </div>
                                    <div className="form-group-task">
                                        <label>Equipment and tools:</label>
                                        <div>
                                            <FormTextarea className="form-control-task" name="equipTools" value={task[0].tasks[0].equipTools}/>
                                        </div>
                                    </div>

                                    <div className="form-group-task">
                                        <label>Components:</label>
                                        <div>
                                            <FormTextarea className="form-control-task" name="components" value={task[0].tasks[0].components}/>
                                        </div>
                                    </div>
                                    <div className="form-group-task">
                                        <label>Materials:</label>
                                        <div>
                                            <FormTextarea className="form-control-task" name="materials" value={task[0].tasks[0].materials}/>
                                        </div>
                                    </div>
                                    <div className="form-group-task">
                                        <label>Working area:</label>
                                        <div>
                                            <FormTextarea className="form-control-task" name="workingArea" value={task[0].tasks[0].workingArea}/>
                                        </div>
                                    </div>

                                    <div className="form-group-task">
                                        <label>Weather:</label>
                                        <div>
                                            <FormTextarea className="form-control-task" name="weather" value={task[0].tasks[0].weather}/>
                                        </div>
                                    </div>

                                    <div className="form-group-task">
                                        <label>Site condition:</label>
                                        <div>
                                            <FormTextarea className="form-control-task" name="siteCondition" value={task[0].tasks[0].siteCondition}/>
                                        </div>
                                    </div>

                                    <div className="form-group-task">
                                        <label>Nearby irrelevant objects:</label>
                                        <div>
                                            <FormTextarea className="form-control-task" name="nearbyIrrelevantObjects" value={task[0].tasks[0].nearbyIrrelevantObjects}/>
                                        </div>
                                    </div>

                                    <div className="form-group-task">
                                        <label>Cultural and legal constraints:</label>
                                        <div>
                                            <FormTextarea className="form-control-task" name="cultural_legal_constraints" value={task[0].tasks[0].cultural_legal_constraints}/>
                                        </div>
                                    </div>

                                    <div className="form-group-task">
                                        <label>Technical and safety specifications:</label>
                                        <div>
                                            <FormTextarea className="form-control-task" name="technical_safety_specifications" value={task[0].tasks[0].technical_safety_specifications}/>
                                        </div>
                                    </div>
                                    <div className="form-group-task">
                                        <label>Public relation requirements:</label>
                                        <div>
                                            <FormTextarea className="form-control-task" name="publicRelationRequirements" value={task[0].tasks[0].publicRelationRequirements}/>
                                        </div>
                                    </div>
                                </div>
                                {
                                    task[0].tasks[0].status == Reviewed ?
                                    <button type="button" className="btn btn-info btn-lg task-btn mr-20 mb-20">Cancel</button>
                                    : ''
                                }
                                {
                                    task[0].tasks[0].status == Reviewed ?
                                    <SubmitButton title='Publish' className="btn btn-info btn-lg task-btn mr-20 mb-20" loading={loading} disabled={loading} />
                                    : ''
                                }
                            </Form>
                        </div>
                    </div> : ''  
                }                                       
            </div>

            <div className="col-sm-3 col-xl-3 col-md-3 member-panel">
            {
                (taskEngineers != [] > 0 || taskMembers != [] > 0 ) ?
                <div className="row tasks-wrapper" style={{marginBottom:"20px"}}>
                    <div className="card-body">
                        <div className="friends-suggestions">
                            { 
                                taskEngineers != [] > 0 ? 
                                    <a href="#" className="friends-suggestions-list" >
                                        <div className="border-bottom position-relative">
                                            <div className="float-left mb-0 mr-3">
                                                <img src={!taskEngineers.photo ? require('../../images/users/user.jpg') : taskEngineers.photo} alt="" className="roundedImg thumb-md"/>
                                                <p className="user-name" >{taskEngineers.firstName} {taskEngineers.lastName}</p>
                                            </div>
                                            <div className="suggestion-icon float-right mt-2 pt-1"> {taskEngineers.role} </div>
                                            <div className="desc">
                                                <h5 className="font-14 mb-1 pt-2">{taskEngineers.email}</h5>
                                                <p className="text-muted">{!taskEngineers.mobile ? '' : taskEngineers.mobile}</p>
                                            </div>
                                        </div>
                                    </a> 
                                : ''
                            }
                            { 
                                taskMembers != [] > 0 ? 
                                    taskMembers.map((value, index) => {
                                        return (
                                            <a href="#" className="friends-suggestions-list member-item" key={index} data-id={value.id}>
                                                <div className="border-bottom position-relative">
                                                    <div className="float-left mb-0 mr-3">
                                                        <img src={!value.photo ? require('../../images/users/user.jpg') : value.photo} alt="" className="roundedImg thumb-md"/>
                                                        <p className="user-name" >{value.firstName} {value.lastName}</p>
                                                    </div>
                                                    <div className="suggestion-icon float-right mt-2 pt-1"> {value.role} </div>
                                                    {
                                                        value.status == NotStart ? 
                                                            <div className="task-status notstart">not start</div>
                                                        : ''
                                                    }
                                                    {
                                                        value.status == Inprogress ? 
                                                            <div className="task-status inprogress">in progress</div>
                                                        : ''
                                                    }
                                                    {
                                                        value.status == Completed ? 
                                                            <div className="task-status complete">available</div>
                                                        : ''
                                                    }
                                                    <div className="desc">
                                                        <h5 className="font-14 mb-1 pt-2">{value.email}</h5>
                                                        <p className="text-muted">{!value.mobile ? '' : value.mobile}</p>
                                                    </div>
                                                    <div className="check-task" data-id={value.id}>
                                                        <button className="btn btn-info btn-lg waves-effect waves-light task-btn3 mt-0 ml-0" onClick={() => handleCheck(value.id)}>Check</button>
                                                        <button className="btn btn-info btn-lg waves-effect waves-light task-btn3 ml-0 mt-10 btn-rework" onClick={() => handleRework(value.id)}>Rework</button>
                                                        <a className="remove-member" onClick={() => handleRemoveMember(value.id)}>Remove Member</a>
                                                    </div>
                                                </div>
                                            </a> 
                                        ) 
                                    })
                                : ''
                            }
                        </div>
                    </div>
                </div>
                 : ''
            }

                <div className="row text-center add-member custom-rounded"  style={{display: 'none'}}>
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
                                        Engineer <i className="fa fa-sort-down"></i>                                        
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right role-dropdown">
                                            <a className="dropdown-item" onClick={() => handleRoleSelected(EngineerRole)}> Engineer</a>
                                            <a className="dropdown-item" onClick={() => handleRoleSelected(MemberRole)}> Member</a>
                                        </div>                                    
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
                                        inviteList.map((value, index) => {
                                            return (
                                                <div className="col-sm-3 col-xl-3 col-md-3" key={index}>
                                                    <div data-index={index} className="member-status custom-rounded mb-2 member-link" data-type={role} onClick={() => handleUserClicked(index)}>
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
                                        <button className="btn btn-info btn-lg task-btn2 btn-invite" onClick={handleInvite}>Invite {role}</button>
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
export default SupervisorHome;