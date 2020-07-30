import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Form, FormField, SubmitButton } from '../../components/form';
import { loadingSelector } from '../../store/selectors';
import * as Yup from 'yup';
import $ from 'jquery'; 

const validationSchema = Yup.object().shape({
    name: Yup.string().max(100).required().label("name"),
    startTime: Yup.string().max(100).required().label("startTime"),
    endTime: Yup.string().max(255).required().label("endTime"),
    equip_tools: Yup.string().max(255).required().label("equip_tools"),
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
    equip_tools: "",
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

const SupervisorHome = () => {
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => loadingSelector(['ADD_TASK'])(state));
    const [showAddTask, setShowAddTask] = useState(false);
    const handleSubmit = (data, { setErrors, setSubmitting }) => {
        // dispatch(register(data, setErrors, setSubmitting));
    }
    const show_newTaskForm = () => setShowAddTask(true);
    const hide_newTaskForm = () => setShowAddTask(false);
    useEffect(() => {
        $(".Forhome").hide();
        $("#side-menu").show();
    });

    return (
        <React.Fragment>
            <div className="col-sm-9 col-xl-9 col-md-9">
                <div className="card">
                    <div className="card-heading p-4">
                        <div className="threed-effect">
                            <img src={require('../../images/3d.jpg')}/>
                            <button className="btn btn-info btn-lg task-btn2 btn-add-task" onClick={show_newTaskForm}>Add a new task</button>
                        </div>
                        <div className="progress mt-4 mb-4" style={{height: '8px'}}>
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
                                                        <FormField className="form-control-task" name="equip_tools"/>
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
                </div>
            </div>
            <div className="col-sm-3 col-xl-3 col-md-3">
                <div className="card" style={{marginBottom:"20px"}}>
                    <div className="card-body">
                        <h4 className="mt-0 header-title mb-4"></h4>
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
                <div className="text-center add-member custom-rounded">
                    <a className="md-plus" data-toggle="modal" data-target="#addMemberModal"><i className="fas fa-plus"></i></a>
                </div>
                <div className="col-sm-12 col-xl-12 col-md-12">
                    <div className="modal fade" id="addMemberModal" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <p></p>
                                </div>
                                <div className="modal-body row">
                                    <div className="col-sm-3 col-xl-3 col-md-3">
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