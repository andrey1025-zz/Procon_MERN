import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Logout from '../../components/Logout';
import { $CombinedState } from 'redux';
import { getSimpleRoleName } from '../../services';

import $ from 'jquery'; 

const SupervisorHome = () => {
    const user = useSelector(state => state.auth.user);

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
                        </div>
                        <div className="progress mt-4 mb-4" style={{height: '8px'}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="task-info">
                            <div className="scrollbar" id="style-2">
                                <div className="force-overflow">
                                    <div className="form-group-task">
                                        <label>Task name:</label>
                                        <div>
                                            <input className="form-control-task" type="text" id="example-text-input"/>
                                        </div>
                                    </div>
                                    <div className="form-group-task">
                                        <label>Task expected start time:</label>
                                        <div>
                                            <input className="form-control-task" type="time" id="example-time-input"/>
                                        </div>
                                    </div>
                                    <div className="form-group-task">
                                        <label>Task expected end time:</label>
                                        <div>
                                            <input className="form-control-task" type="time" id="example-time-input"/>
                                        </div>
                                    </div>
                                    <div className="form-group-task">
                                        <label>Equipment and tools:</label>
                                        <div>
                                            <input className="form-control-task" type="text" id="example-text-input"/>
                                        </div>
                                    </div>

                                    <div className="form-group-task">
                                        <label>Components:</label>
                                        <div>
                                            <input className="form-control-task" type="text" id="example-text-input"/>
                                        </div>
                                    </div>
                                    <div className="form-group-task">
                                        <label>Materials:</label>
                                        <div>
                                            <input className="form-control-task" type="text" id="example-text-input"/>
                                        </div>
                                    </div>
                                    <div className="form-group-task">
                                        <label>Working area:</label>
                                        <div>
                                            <input className="form-control-task" type="text" id="example-text-input"/>
                                        </div>
                                    </div>

                                    <div className="form-group-task">
                                        <label>Weather:</label>
                                        <div>
                                            <input className="form-control-task" type="text" id="example-text-input"/>
                                        </div>
                                    </div>

                                    <div className="form-group-task">
                                        <label>Site condition:</label>
                                        <div>
                                            <input className="form-control-task" type="text" id="example-text-input"/>
                                        </div>
                                    </div>

                                    <div className="form-group-task">
                                        <label>Nearby irrelevant objects:</label>
                                        <div>
                                            <input className="form-control-task" type="text" id="example-text-input"/>
                                        </div>
                                    </div>

                                    <div className="form-group-task">
                                        <label>Cultural and legal constraints:</label>
                                        <div>
                                            <input className="form-control-task" type="text" id="example-text-input"/>
                                        </div>
                                    </div>

                                    <div className="form-group-task">
                                        <label>Technical and safety specifications:</label>
                                        <div>
                                            <input className="form-control-task" type="text" id="example-text-input"/>
                                        </div>
                                    </div>
                                    <div className="form-group-task">
                                        <label>Public relation requirements:</label>
                                        <div>
                                            <input className="form-control-task" type="text" id="example-text-input"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-info btn-lg waves-effect waves-light task-btn">Publish</button>
                        <button type="button" className="btn btn-info btn-lg waves-effect waves-light task-btn">Review</button>
                        <div className="published">
                            <button type="button" className="btn btn-info btn-lg waves-effect waves-light task-btn">Edit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-3 col-xl-3 col-md-3">
                <div className="card m-b-30">
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
            </div>        
        </React.Fragment>
    )
}
export default SupervisorHome;