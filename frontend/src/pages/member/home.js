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
    getTaskDetail
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
    window.localStorage.setItem("projectId", projectId);
    if(projectId == '')
        projectId = window.localStorage.getItem("projectId");
    const dispatch = useDispatch();
    const handleSubmit = (data, { setErrors, setSubmitting }) => {
        data.projectId = projectId;
        data.taskId = taskId;
        console.log(data);
        // dispatch(startTask(data, setErrors, setSubmitting));
        $(".member-panel").show();
    }
    const values = queryString.parse(props.location.search)
    const taskId = values.task_id;
    const task = useSelector(state => state.project.task);
    const taskEngineers = useSelector(state => state.project.taskEngineers);
    const taskMembers = useSelector(state => state.project.taskMembers);

    const project = useSelector(state => state.project.project);
    const forgeToken = useSelector(state => state.project.forgeToken);

    const [urn, setUrn] = useState("");
    const [view, setView] = useState(null);

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
                                onSubmit={handleSubmit}
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
                                <button type="button" className="btn btn-info btn-lg task-btn mr-20 mb-20">Cancel</button>
                                <SubmitButton title='Confirm and Start' className="btn btn-info btn-lg task-btn mr-20 mb-20" loading={loading} disabled={loading} />
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
                                                <p>{taskEngineers.firstName} {taskEngineers.lastName}</p>
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
                                                        <p>{value.firstName} {value.lastName}</p>
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