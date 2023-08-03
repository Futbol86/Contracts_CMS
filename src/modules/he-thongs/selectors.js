import {MODULE_ID} from "./constants";
import {utils} from "../../services";
import {SCHEMA_CONTRUCTION_NOTES} from "./constants";

export const getAccountList = (state) => state[MODULE_ID].account.accounts;
export const getAccountInfo = (state) => state[MODULE_ID].account.accountDetail;
export const getAccountPaginationInfo = (state) => state[MODULE_ID].account.pagination;
export const getAccountFilterInfo     = (state) => state[MODULE_ID].account.filter;

export const getUserLogList = (state) => state[MODULE_ID].userLog.userLogs;
export const getUserLogInfo = (state) => state[MODULE_ID].userLog.userLogDetail;
export const getUserLogPaginationInfo = (state) => state[MODULE_ID].userLog.pagination;
export const getUserLogFilterInfo     = (state) => state[MODULE_ID].userLog.filter;

export const getPrintSearchTicketList = (state) => state[MODULE_ID].printSearchTicket.printSearchTickets;
export const getPrintSearchTicketPaginationInfo = (state) => state[MODULE_ID].printSearchTicket.pagination;
export const getPrintSearchTicketFilterInfo     = (state) => state[MODULE_ID].printSearchTicket.filter;

export const getUserGroupList = (state) => state[MODULE_ID].userGroup.userGroups;
export const getUserGroupInfo = (state) => state[MODULE_ID].userGroup.userGroupDetail;
export const getUserGroupPaginationInfo = (state) => state[MODULE_ID].userGroup.pagination;
export const getUserGroupFilterInfo     = (state) => state[MODULE_ID].userGroup.filter;

export const getPermissionList = (state) => state[MODULE_ID].permission.permissions;
export const getPermissionInfo = (state) => state[MODULE_ID].permission.permissionDetail;
export const getPermissionPaginationInfo = (state) => state[MODULE_ID].permission.pagination;
export const getPermissionFilterInfo     = (state) => state[MODULE_ID].permission.filter;

export const getSystemConfigList = (state) => state[MODULE_ID].systemConfig.systemConfigs;

export const getHDSDFile     = (state) => state[MODULE_ID].systemConfig.file_name;