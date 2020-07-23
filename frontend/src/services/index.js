import { TeamLeadRole, TeamMemberRole, SupervisorRole } from '../enums/roles';

export const getSimpleRoleName = (role) => {
    if (role === SupervisorRole)
        return 'supervisor';
    else if (role === TeamLeadRole)
        return 'lead'
    else if (role === TeamMemberRole)
        return 'member'
}