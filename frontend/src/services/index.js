import { TeamLeadRole, TeamMemberRole, SupervisorRole, ProjectManagerRole } from '../enums/roles';

export const getSimpleRoleName = (role) => {
    if (role === SupervisorRole)
        return 'supervisor';
    else if (role === TeamLeadRole)
        return 'lead'
    else if (role === TeamMemberRole)
        return 'member'
    else if (role === ProjectManagerRole)
        return 'manager'
}