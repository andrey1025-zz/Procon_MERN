import MemberWelcome from '../pages/member';
import MemberHome from '../pages/member/home';
import ChangePassword from '../pages/changePassword';
import Account from '../pages/account';
import MemberNotification from '../pages/member/notification';

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