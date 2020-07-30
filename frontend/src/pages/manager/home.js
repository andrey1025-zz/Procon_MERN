import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectManagerRole } from '../../enums/roles';

import $ from 'jquery'; 

const ManagerHome = (props) => {
    const user = useSelector(state => state.auth.user);

    console.log(props);

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
export default ManagerHome;