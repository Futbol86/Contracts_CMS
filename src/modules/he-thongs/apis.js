import {httpClient, httpClient2, utils} from '../../services';
import {
    API_SUB_URL,
    API_SUB_URL_ACCOUNT,
    API_SUB_URL_ACCOUNT_CHANGE_PASSWORD,
    API_SUB_URL_USER_LOG,
    API_SUB_URL_PRINT_SEARCH_TICKET,
    API_SUB_URL_USER_GROUP,
    API_SUB_URL_PERMISSION,
    API_SUB_URL_SYSTEM_CONFIG
} from './constants';

/**
 * ACCOUNT
 */

export const apiLoadAccountList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_ACCOUNT)(newPayload);
};

export const apiLoadAnAccount= ({id}) => {
    var apiUrl = `${API_SUB_URL_ACCOUNT}?id=${id}`
    return httpClient2.get(apiUrl);
};

export const apiCreateAnAccount = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_ACCOUNT}`, payload);
};

export const apiUpdateAnAccount = (payload = {}) => {
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_ACCOUNT}/${payload.id}`, payload);
};

export const apiAccountChangePassword = (payload = {}) => {
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_ACCOUNT_CHANGE_PASSWORD}/${payload.id}`, payload);
};

export const apiDeleteAnAccount = (id) => {
    return httpClient2.delete(`${API_SUB_URL_ACCOUNT}/${id}`);
};

/**
 * USER_GROUP
 */

 export const apiLoadUserGroupList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_USER_GROUP)(newPayload);
};

export const apiLoadAUserGroup= ({id}) => {
    var apiUrl = `${API_SUB_URL_USER_GROUP}?id=${id}`
    return httpClient2.get(apiUrl);
};

export const apiCreateAUserGroup = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_USER_GROUP}`, payload);
};

export const apiUpdateAUserGroup = (payload = {}) => {
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_USER_GROUP}/${payload.id}`, payload);
};

export const apiDeleteAUserGroup = (id) => {
    return httpClient2.delete(`${API_SUB_URL_USER_GROUP}/${id}`);
};

/**
 * USER_LOG
 */

 export const apiLoadUserLogList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_USER_LOG)(newPayload);
};

export const apiLoadAUserLog= ({id}) => {
    var apiUrl = `${API_SUB_URL_USER_LOG}?id=${id}`
    return httpClient2.get(apiUrl);
};

export const apiCreateAUserLog = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_USER_LOG}`, payload);
};

export const apiUpdateAUserLog = (payload = {}) => {
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_USER_LOG}/${payload.id}`, payload);
};

export const apiDeleteAUserLog = (id) => {
    return httpClient2.delete(`${API_SUB_URL_USER_LOG}/${id}`);
};

/**
 * PRINT_SEARCH_TICKET
 */

 export const apiLoadPrintSearchTicketList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_PRINT_SEARCH_TICKET)(newPayload);
};

export const apiLoadAPrintSearchTicket= ({id}) => {
    var apiUrl = `${API_SUB_URL_PRINT_SEARCH_TICKET}?id=${id}`
    return httpClient2.get(apiUrl);
};

export const apiCreateAPrintSearchTicket = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_PRINT_SEARCH_TICKET}`, payload);
};

export const apiUpdateAPrintSearchTicket = (payload = {}) => {
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_PRINT_SEARCH_TICKET}/${payload.id}`, payload);
};


/**
 * PERMISSION
 */

export const apiLoadPermissionList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_PERMISSION)(newPayload);
};

export const apiLoadAPermission= ({id}) => {
    var apiUrl = `${API_SUB_URL_PERMISSION}?id=${id}`
    return httpClient2.get(apiUrl);
};

export const apiCreateAPermission = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_PERMISSION}`, payload);
};

export const apiUpdateAPermission = (payload = {}) => {
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_PERMISSION}/${payload.id}`, payload);
};

export const apiDeleteAPermission = (id) => {
    return httpClient2.delete(`${API_SUB_URL_PERMISSION}/${id}`);
};

/**
 * SYSTEM CONFIG
 */

 export const apiLoadSystemConfigList= (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_SYSTEM_CONFIG)(newPayload);
};

export const apiUpdateASystemConfig = (payload = {}) => {
    return httpClient2.patch(`${API_SUB_URL_SYSTEM_CONFIG}`, payload);
};