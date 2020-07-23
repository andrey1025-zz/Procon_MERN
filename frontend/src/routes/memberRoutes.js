import MemberHome from '../pages/member';
import ChangePassword from '../pages/changePassword';
import Account from '../pages/account';

const memberRoutes = [
    {
        path: '/member/home',
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