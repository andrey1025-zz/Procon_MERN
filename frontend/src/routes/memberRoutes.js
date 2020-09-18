import MemberWelcome from '../pages/member';
import MemberHome from '../pages/member/home';
import ChangePassword from '../pages/changePassword';
import Account from '../pages/account';
import MemberNotification from '../pages/member/notification';
import MemberTaskManage from '../pages/member/taskManage';
import MemberTaskHistory from '../pages/member/taskHistory';

const memberRoutes = [
    {
        path: '/member/welcome',
        component: MemberWelcome
    },
    {
        path: '/member/notification',
        component: MemberNotification
    },
    {
        path: '/member/task_manage',
        component: MemberTaskManage
    },
    {
        path: '/member/task_history',
        component: MemberTaskHistory
    },    
    {
        path: '/member/home/:id',
        component: MemberHome
    },    
    {
        path: '/member/change-password',
        component: ChangePassword
    },
    {
        path: '/member/account',
        component: Account
    }
];
export default memberRoutes;