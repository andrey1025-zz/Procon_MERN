import { useEffect, useState } from 'react';
import React from 'react';

import Logout from '../../components/Logout';
import { $CombinedState } from 'redux';
import $ from 'jquery'; 

const SupervisorHome = () => {
    useEffect(() => {
        // Update the document title using the browser API
        $("#side-menu").hide();
    });

    return (
        <div> Welcome to Supervisor Home, More features coming soon.</div>
    )
}
export default SupervisorHome;