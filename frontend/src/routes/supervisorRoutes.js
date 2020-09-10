import SupervisorWelcome from '../pages/supervisor';
import SupervisorHome from '../pages/supervisor/home';
import SupervisorTaskManage from '../pages/supervisor/taskManage';
import SupervisorTaskHistory from '../pages/supervisor/taskHistory';
import SupervisorTaskDetail from '../pages/supervisor/taskDetail';
import SupervisorMembers from '../pages/supervisor/members';
import ChangePassword from '../pages/changePassword';
import Account from '../pages/account';
import SupervisorNotification from '../pages/supervisor/notification';

const supervisorRoutes = [
    {
        path: '/supervisor/welcome',
        component: SupervisorWelcome
    },
    {
        path: '/supervisor/home/:id',
        component: SupervisorHome
    },
    {
        path: '/supervisor/task_manage',
        component: SupervisorTaskManage
    },
    {
        path: '/supervisor/task_history',
        component: SupervisorTaskHistory
    },
    {
        path: '/supervisor/task_detail/:id',
        component: SupervisorTaskDetail
    },
    {
        path: '/supervisor/notification',
        component: SupervisorNotification
    },
    // {
    //     path: '/supervisor/members',
    //     component: SupervisorMembers
    // },
    {
        path: '/supervisor/change-password',
        component: ChangePassword
    },
    {
        path: '/supervisor/account',
        component: Account
    }
];
export default supervisorRoutes;