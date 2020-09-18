import EngineerWelcome from '../pages/engineer';
import EngineerHome from '../pages/engineer/home';
import EngineerNotification from '../pages/engineer/notification';
import EngineerTaskManage from '../pages/engineer/taskManage';
import EngineerTaskHistory from '../pages/engineer/taskHistory';
import ChangePassword from '../pages/changePassword';
import Account from '../pages/account';

const leadRoutes = [
    {
        path: '/engineer/welcome',
        component: EngineerWelcome
    },
    {
        path: '/engineer/home/:id',
        component: EngineerHome
    },
    {
        path: '/engineer/notification',
        component: EngineerNotification
    },
    {
        path: '/engineer/task_manage',
        component: EngineerTaskManage
    },
    {
        path: '/engineer/task_history',
        component: EngineerTaskHistory
    },
    {
        path: '/engineer/change-password',
        component: ChangePassword
    },
    {
        path: '/engineer/account',
        component: Account
    }
];
export default leadRoutes;