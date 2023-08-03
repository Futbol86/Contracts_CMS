import {httpClient, httpClient2, utils} from '../../services';
import {API_SUB_URL_LOAD_NEW_REPORTS} from './constants';

export const apiDashboardClients = (payload = {}) => {
    // const newPayload = {...payload, limit: 5, sortBy: "updatedAt", sortDir: -1};
    // return apiLoadClientList(newPayload);
};

export const apiDashboardQuotes = (payload = {}) => {
    // const newPayload = {...payload, limit: 5, sortBy: "updatedDate", sortDir: -1};
    // return apiLoadQuoteList(newPayload);
};

export const apiDashboardDeleteAQuote = (payload = {}) => {
    // return apiDeleteAQuote(payload);
};

export const apiExportPhieuTraCuuToWORD = (payload) => {
    if (payload)
        return httpClient2.post(`/export-phieu-tra-cuu-2-word-file`, payload);
    else
        return null;
};

export const apiLoadNewReportsList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;

    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_LOAD_NEW_REPORTS)(newPayload);
};
