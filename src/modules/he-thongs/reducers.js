import {combineReducers} from 'redux';
import accountReducer from './reducers/accounts';
import userLogReducer from './reducers/userLogs';
import printSearchTicketReducer from './reducers/printSearchTickets';
import userGroupReducer from './reducers/userGroups';
import permissionReducer from './reducers/permissions';
import systemConfigReducer from './reducers/systemConfigs';

let allHeThongReducer = {
    account: 		   accountReducer,
    userLog:           userLogReducer,
    printSearchTicket: printSearchTicketReducer,
    userGroup:         userGroupReducer,
    permission:        permissionReducer,
    systemConfig:      systemConfigReducer
};

export default combineReducers(allHeThongReducer);