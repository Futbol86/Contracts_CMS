import {httpClient, httpClient2, utils} from '../../services';
import {
    API_SUB_URL,
    API_SUB_URL_REPORT,
    API_SUB_URL_CONTRACT,
    API_SUB_URL_NEW_HOP_DONG,
    API_SUB_URL_REQUEST_TNMT_LAND_DATA_REPORT,
    API_SUB_URL_REQUEST_LAND_DATA_OF_TNMT_REPORT
} from './constants';

/**
 * REPORT
 */
 export const apiLoadReportList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_REPORT)(newPayload);
};

export const apiLoadRequestTNMTLandDataReportList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_REQUEST_TNMT_LAND_DATA_REPORT)(newPayload);
};

export const apiRequestLandDataReportOfTNMTList = (payload) => {
    return httpClient2.post(`${API_SUB_URL_REQUEST_LAND_DATA_OF_TNMT_REPORT}`, payload);
};

// export const apiLoadHopDongList = (payload) => {
//     let newPayload;
//     let {sortBy, filter} = payload;
//     if (!sortBy)
//         sortBy = 'updatedAt';
//     newPayload = { ...payload, sortBy };
//     return utils.callAPIListFor2(API_SUB_URL_CONTRACT)(newPayload);
// };

export const apiLoadNewHopDongList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;

    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_NEW_HOP_DONG)(newPayload);
};

export const apiExportArchiveBookToEXCEL = (payload) => {
    if (payload)
        return httpClient2.post(`/exportArchiveBookExcelFile`, payload, {responseType: 'blob'});
    else
        return null;
};

export const apiExportTNMTLandDataToEXCEL = (payload) => {
    if (payload)
        return httpClient2.post(`/exportTNMTLandDataExcelFile`, payload, {responseType: 'blob'});
    else
        return null;
};