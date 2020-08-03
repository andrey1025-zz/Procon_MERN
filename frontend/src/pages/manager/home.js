import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProjectManagerRole } from '../../enums/roles';
import { getSuperintendents, inviteSuperintendent } from '../../store/actions/projectActions';

import $ from 'jquery'; 

const ManagerHome = (props) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const superintendents = useSelector(state => state.project.superintendents);
    const projectId = props.match.params.id;

    useEffect(() => {
        $(".Forhome").hide();
        $("#side-menu").show();
    });
    
    const handleOpenMembersDialog = () => {
        dispatch(getSuperintendents());
    }

    const handleIniviteSuperintendent = (index) => {
        let data = {
            projectId: projectId,
            superintendentId: superintendents[index].id
        }
        dispatch(inviteSuperintendent(data));
    }

    useEffect(() => {
    }, [superintendents]);

    return (
        <React.Fragment>
            <div className="col-sm-9 col-xl-9 col-md-9">
                <div className="card">
                    <div className="card-heading p-4">
                        <div className="threed-effect" style={{position:'relative'}}>
                            <img src={require('../../images/3d.jpg')}/>
                        </div>
                        <div className="progress mt-4 mb-4" style={{height: '8px'}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
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
                <div className="text-center add-member custom-rounded">
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
                                        <span className="text-black mr-2">Complete</span>
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
                                                    <div key={index} className="member-status custom-rounded mb-2 member-link" onClick={() => handleIniviteSuperintendent(index)}>
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
                                    {/* <div className="col-sm-3 col-xl-3 col-md-3">
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
export default ManagerHome;