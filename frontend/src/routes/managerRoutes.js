import ManagerWelcome from '../pages/manager';
import ManagerHome from '../pages/manager/home';
import ChangePassword from '../pages/changePassword';
import Account from '../pages/account';
import ManagerNotification from '../pages/manager/notification';
import ManagerMembers from '../pages/manager/members';
import ManagerTaskManage from '../pages/manager/taskManage';
import ManagerTaskHistory from '../pages/manager/taskHistory';

const mangerRoutes = [
    {
        path: '/manager/welcome',
        component: ManagerWelcome
    },
    {
        path: '/manager/home/:id',
        component: ManagerHome
    },
    {
        path: '/manager/notification',
        component: ManagerNotification
    },
    {
        path: '/manager/change-password',
        component: ChangePassword
    },
    {
        path: '/manager/account',
        component: Account
    },
    {
        path: '/manager/members',
        component: ManagerMembers
    },
    {
        path: '/manager/task_manage',
        component: ManagerTaskManage
    },
    {
        path: '/manager/task_history',
        component: ManagerTaskHistory
    },
];
export default mangerRoutes;