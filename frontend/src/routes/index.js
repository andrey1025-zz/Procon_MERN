import React from 'react'
import { Redirect } from 'react-router-dom';

import LeadContainer from '../containers/LeadContainer';
import MemberContainer from '../containers/MemberContainer';
import SupervisorContainer from '../containers/SupervisorContainer';

import AuthenticationContainer from "../containers/AuthenticationContainer";

const indexRoutes = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to={`/authentication/sign-in`} />
    },
    {
        path: '/authentication',
        component: AuthenticationContainer
    },
    {
        path: '/lead',
        component: LeadContainer
    },
    {
        path: '/member',
        component: MemberContainer
    },
    {
        path: '/supervisor',
        component: SupervisorContainer
    }
];
export default indexRoutes;