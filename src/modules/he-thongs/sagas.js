import accountSaga from './sagas/accounts';
import userLogSaga from './sagas/userLogs';
import printSearchTicketSaga from './sagas/printSearchTickets';
import userGroupSaga from './sagas/userGroups';
import permissionSaga from './sagas/permissions';
import systemConfigSaga from './sagas/systemConfigs';

export default
[
    ...accountSaga,
    ...userLogSaga,
    ...printSearchTicketSaga,
    ...userGroupSaga,
    ...permissionSaga,
    ...systemConfigSaga
];