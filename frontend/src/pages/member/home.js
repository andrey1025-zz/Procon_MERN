import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadingSelector } from '../../store/selectors';
import { Form, FormField, SubmitButton, FormTextarea } from '../../components/form';
import { NotStart, Inprogress, Completed } from '../../enums/taskStatus';
import ForgeViewer from 'react-forge-viewer';
import queryString from 'query-string'
import { 
    getProjectDetail, 
    getViewerForgeToken, 
    getTaskDetail,
    startTask,
    cancelTask,
    submitForCheckingTask,
    getTaskMessages,
    getTaskMembers,
    postMessage
} 
from '../../store/actions/projectActions';
import $ from 'jquery'; 

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
const MemberHome = (props) => {
    const loading = useSelector(state => loadingSelector(['EDIT_TASK'])(state));
    var projectId = props.match.params.id;
    const user = JSON.parse(window.localStorage.getItem('user'));
    window.localStorage.setItem("projectId", projectId);
    if(projectId == '')
        projectId = window.localStorage.getItem("projectId");
    const dispatch = useDispatch();
    
    const handleSubmit = (data, { setErrors, setSubmitting }) => {
        data.projectId = projectId;
        data.taskId = taskId;
        // dispatch(startTask(data, setErrors, setSubmitting));
        $(".member-panel").show();
    }

    const handleStart = () => {
        console.log("started");
        let data = {
            projectId: projectId,
            taskId: taskId
        };

        dispatch(startTask(data));
    };

    const handleSubmitforChecking = () => {
        let data = {
            projectId: projectId,
            taskId: taskId
        };

        dispatch(submitForCheckingTask(data));
    };

    const handleCancel = () => {
        let data = {
            projectId: projectId,
            taskId: taskId
        };

        dispatch(cancelTask(data));
    };

    const values = queryString.parse(props.location.search)
    const taskId = values.task_id;
    const task = useSelector(state => state.project.task);
    const taskEngineers = useSelector(state => state.project.taskEngineers);
    const taskMembers = useSelector(state => state.project.taskMembers);
    const taskMessages = useSelector(state => state.project.taskMessages);

    const project = useSelector(state => state.project.project);
    const forgeToken = useSelector(state => state.project.forgeToken);

    const [urn, setUrn] = useState("");
    const [view, setView] = useState(null);

    var scrollbar_class = '';
    var mystatus = '';
    var i = 0;
    if(taskMessages.length > 0)
        scrollbar_class = 'scrollbar';

    $(".task-info").show();

    useEffect(() => {
        if(project){
            setUrn(project.model);
        }
        if(taskId){
            $(".task-info").show();
        }
    }, [project]);
     
    useEffect(() => {
        dispatch(getViewerForgeToken());
    }, []);

    useEffect(() => {
        dispatch(getProjectDetail(projectId));
    }, []);
    useEffect(() => {
        $(".Forhome").hide();
        $("#side-menu").show();
    });
    useEffect(() => {
        if(taskId){
            let data = {
                projectId: projectId,
                taskId: taskId
            }
            dispatch(getTaskDetail(data));
        }
        if(task.length > 0){
            $(".task-info").show();
        }
    }, []);     
    useEffect(() => {
        let data = {
            projectId: projectId,
            taskId: taskId
        }
        dispatch(getTaskMembers(data));
    }, []);

    // get my status
    for(i = 0 ; i < taskMembers.length; i++){
        if(taskMembers[i].id == user.id){
            mystatus = taskMembers[i].status;
        }
    }

    console.log("aaaaaaaaaaaa", mystatus);
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

    const handleShowBlog = () => {
        $(".show-blog").hide();
        $(".chat-info").show();
        $(".post-container").show();
        let data = {
            projectId: projectId,
            taskId: taskId
        }
        dispatch(getTaskMessages(data));
    }

    const handlePostMessage = () => {
        var message = $("#message").val();
        if(taskId && message != ''){
            let data = {
                projectId: projectId,
                taskId: taskId,
                message: message
            };
            dispatch(postMessage(data));
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
                        </div>
                    </div>
                </div>
                {
                    task.length > 0 ? 
                    <div className="task-info">
                        <div className="scrollbar" id="style-2">
                            <Form
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
                                    mystatus == NotStart ? <button type="button" className="btn btn-info btn-lg task-btn mr-20 mb-20" onClick={handleCancel}>Cancel</button>
                                    : ''
                                }
                                {
                                    mystatus == NotStart ? <button title='Confirm and Start' className="btn btn-info btn-lg task-btn mr-20 mb-20" loading={loading} disabled={loading} onClick={handleStart}>Confirm and Start</button>
                                    : <button title='Submit for checking' className="btn btn-info btn-lg task-btn mr-20 mb-20" loading={loading} disabled={loading} onClick={handleSubmitforChecking}>Submit for Checking</button>
                                }
                            </Form>
                        </div>
                    </div> : ''  
                }
                {
                    taskId ? <button type="button" className="btn btn-info btn-lg task-btn mr-20 mb-20 show-blog" onClick={handleShowBlog}>Show Blog</button> : ''
                }
                <div className="chat-info" style={{display: 'none'}}>
                    <div className={scrollbar_class} id="style-2">
                        { 
                            taskMessages != [] > 0 ? 
                                taskMessages.map((value, index) => {
                                    {
                                        var class_name = 'chat-item';
                                        value.myId == value.from ? class_name = 'chat-item right' : class_name = 'chat-item';
                                    }
                                    return (
                                        <div className={class_name} key={index}>
                                            <div className="user-info inline-block">
                                                <img src={!value.photo ? require('../../images/users/user.jpg') : value.photo} alt="" className="roundedImg thumb-md"/>
                                                <p className="user-name" >{value.firstName} {value.lastName}</p>
                                            </div>
                                            <div className="inline-block">
                                                <p className="chat-content" >{value.message}</p>
                                                <p class="text-muted text-time">{value.createdOn}</p>
                                            </div>
                                        </div>
                                    ) 
                                })
                            : ''
                        }
                        {/* <div className='chat-item'>
                            <div className="user-info inline-block">
                            <img src={require('../../images/users/user-5.jpg')} alt="" className="roundedImg thumb-md"/>
                            <p className="user-name" >Aaron Kim</p>
                            </div>
                            <div className="inline-block">
                                <p className="chat-content" >Aaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdfAaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdf</p>
                                
                                <p class="text-muted text-time">aaaaaaaa</p>
                            </div>
                        </div>
                        <div className='chat-item'>
                            <div className="user-info inline-block">
                            <img src={require('../../images/users/user-5.jpg')} alt="" className="roundedImg thumb-md"/>
                            <p className="user-name" >Aaron Kim</p>
                            </div>
                            <div className="inline-block">
                                <p className="chat-content" >Aaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdf</p>
                                <p class="text-muted text-time">aaaaaaaa</p>
                            </div>
                        </div>
                        <div className='chat-item right'>
                            <div className="user-info inline-block">
                            <img src={require('../../images/users/user-5.jpg')} alt="" className="roundedImg thumb-md"/>
                            <p className="user-name" >Aaron Kim</p>
                            </div>
                            <div className="inline-block">
                                <p className="chat-content" >Aaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdf</p>
                                <p class="text-muted text-time">aaaaaaaa</p>
                            </div>
                        </div>
                        <div className='chat-item right'>
                            <div className="user-info inline-block">
                            <img src={require('../../images/users/user-5.jpg')} alt="" className="roundedImg thumb-md"/>
                            <p className="user-name" >Aaron Kim</p>
                            </div>
                            <div className="inline-block">
                                <p className="chat-content" >Aaron Kimfdsafdsfadsfada fdsafdsfads fdsafdsfasdfsdf</p>
                                <p class="text-muted text-time">aaaaaaaa</p>
                            </div>
                        </div> */}
                    </div>
                </div>
                {
                    user ?
                    <div className="post-container" style={{background: '#252529', display: 'none'}}>
                        <div className="" id="style-2">
                            <div className='chat-item right'>
                                <div className="user-info inline-block">
                                    <img src={!user.photo ? require('../../images/users/user.jpg') : user.photo} alt="" className="roundedImg thumb-md"/>
                                    <p className="user-name" >{user.firstName} {user.lastName}</p>
                                </div>
                                <div className="edit-message">
                                    <textarea name="message" id="message" className="message-content"></textarea>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-info btn-lg task-btn mr-20 mb-20" onClick={handlePostMessage}>Post</button>
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
                                            <a href="#" className="friends-suggestions-list" key={index}>
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
                                                            <div className="task-status complete">complete</div>
                                                        : ''
                                                    }
                                                    <div className="desc">
                                                        <h5 className="font-14 mb-1 pt-2">{value.email}</h5>
                                                        <p className="text-muted">{!value.mobile ? '' : value.mobile}</p>
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
        </div>
        </React.Fragment>

        )
}
export default MemberHome;