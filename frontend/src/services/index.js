import { EngineerRole, MemberRole, SupervisorRole, ProjectManagerRole } from '../enums/roles';

export const getSimpleRoleName = (role) => {
    if (role === SupervisorRole)
        return 'supervisor';
    else if (role === EngineerRole)
        return 'engineer'
    else if (role === MemberRole)
        return 'member'
    else if (role === ProjectManagerRole)
        return 'manager'
}