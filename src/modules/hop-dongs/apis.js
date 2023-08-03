import {httpClient, httpClient2, utils} from '../../services';
import {
    API_SUB_URL,
    API_SUB_URL_NGAN_CHAN,
    API_SUB_URL_GIAI_TOA,
    API_SUB_URL_TNMT_LAND_DATA,
    API_SUB_URL_TNMT_TONG_TIEN_NAP,
    API_SUB_URL_NEW_HOP_DONG,
    API_SUB_URL_THU_HOI_GCN,
    API_SUB_URL_NEW_DONG_A_HOP_DONG
} from './constants';

/**
 * HOP DONG
 */
export const apiLoadHopDongList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL)(newPayload);
};

export const apiLoadAContract = ({id}) => {
    var apiUrl = `${API_SUB_URL}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateAHopDong = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL}`, payload);
};

export const apiUpdateAHopDong = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
       return httpClient2.patch(`${API_SUB_URL}/${payload.id}`, payload);
};

export const apiUpdateAHopDongStatus = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
       return httpClient2.patch(`${API_SUB_URL}/status/${payload.id}`, payload);
};

export const apiDeleteAHopDong = (id) => {
    return httpClient2.delete(`${API_SUB_URL}/${id}`);
};

export const apiExportContractToPDF = (payload) => {
    if (payload)
        return httpClient2.post(`${API_SUB_URL}/pdf`, payload, {responseType: 'blob'});
    else
        return null;
};

export const apiExportTestimonialToPDF = (payload) => {
    if (payload)
        return httpClient2.post(`${API_SUB_URL}/testimonial/pdf`, payload, {responseType: 'blob'});
    else
        return null;
};

export const apiExportContractToWORD = (payload) => {
    if (payload)
        return httpClient2.post(`/exportHopDongWordFile`, payload);
    else
        return null;
};

export const apiExportTestimonialToWORD = (payload) => {
    if (payload)
        return httpClient2.post(`/exportLoiChungWordFile`, payload);
    else
        return null;
};
/**
 * Ngan Chan
 */

 export const apiLoadNganChanList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_NGAN_CHAN)(newPayload);
};

export const apiLoadAnAssetPrevention = ({id}) => {
    var apiUrl = `${API_SUB_URL_NGAN_CHAN}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiLoadAnAssetPreventionSelected = ({id}) => {
    var apiUrl = `${API_SUB_URL_NGAN_CHAN}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateANganChan = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_NGAN_CHAN}`, payload);
};

export const apiUpdateANganChan = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_NGAN_CHAN}/${payload.id}`, payload);
};

export const apiDeleteANganChan = (id) => {
    return httpClient2.delete(`${API_SUB_URL_NGAN_CHAN}/${id}`);
};

export const apiDeleteAnAssetPreventionDetail = (payload = {}) => {
    return httpClient2.delete(`${API_SUB_URL_NGAN_CHAN}/asset-prevention-detail/${payload.prevention_id}/${payload.asset_id}`);
};

export const apiDeleteAnOwnerPreventionDetail = (payload = {}) => {
    return httpClient2.delete(`${API_SUB_URL_NGAN_CHAN}/owner-prevention-detail/${payload.prevention_id}/${payload.owner_id}`);
};

/**
 * Giai Toa
 */

 export const apiLoadGiaiToaList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_GIAI_TOA)(newPayload);
};

export const apiLoadAnAssetRelease = ({id}) => {
    var apiUrl = `${API_SUB_URL_GIAI_TOA}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateAGiaiToa = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_GIAI_TOA}`, payload);
};

export const apiUpdateAGiaiToa = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_GIAI_TOA}/${payload.id}`, payload);
};

export const apiDeleteAGiaiToa = (id) => {
    return httpClient2.delete(`${API_SUB_URL_GIAI_TOA}/${id}`);
};

/** Request TNMT */
export const apiRequestTNMTLandData = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_TNMT_LAND_DATA}`, payload);
};

export const apiRequestTNMTTongTienNap = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_TNMT_TONG_TIEN_NAP}`, payload);
};

//********* New Hop Dong
export const apiLoadNewHopDongList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    // if(payload.search)
    //     filter.search = payload.search;

    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_NEW_HOP_DONG)(newPayload);
};

export const apiLoadANewContract = ({id}) => {
    var apiUrl = `${API_SUB_URL_NEW_HOP_DONG}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiNewHopDongSearchList = (payload) => {
    return httpClient2.post(`${API_SUB_URL_NEW_HOP_DONG}/search`, payload);
};

export const apiCreateANewHopDong = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_NEW_HOP_DONG}`, payload);
};

export const apiUpdateANewHopDong = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
       return httpClient2.patch(`${API_SUB_URL_NEW_HOP_DONG}/${payload.id}`, payload);
};

export const apiExportNewContractListToEXCEL = (payload) => {
    if (payload)
        return httpClient2.post(`/exportNewContractListExcelFile`, payload, {responseType: 'blob'});
    else
        return null;
};

export const apiExportNganChanListToEXCEL = (payload) => {
    if (payload)
        return httpClient2.post(`/exportNganChanListExcelFile`, payload, {responseType: 'blob'});
    else
        return null;
};


export const apiExportGiaiToaListToEXCEL = (payload) => {
    if (payload)
        return httpClient2.post(`/exportGiaiToaListExcelFile`, payload, {responseType: 'blob'});
    else
        return null;
};


export const apiExportThuHoiGCNListToEXCEL = (payload) => {
    if (payload)
        return httpClient2.post(`/exportThuHoiGCNListExcelFile`, payload, {responseType: 'blob'});
    else
        return null;
};

/**
 * Giai Toa
 */

 export const apiLoadThuHoiGCNList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_THU_HOI_GCN)(newPayload);
};

export const apiLoadAThuHoiGCN = ({id}) => {
    var apiUrl = `${API_SUB_URL_THU_HOI_GCN}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateAThuHoiGCN = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_THU_HOI_GCN}`, payload);
};

export const apiUpdateAThuHoiGCN = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_THU_HOI_GCN}/${payload.id}`, payload);
};

export const apiDeleteAThuHoiGCN = (id) => {
    return httpClient2.delete(`${API_SUB_URL_THU_HOI_GCN}/${id}`);
};

//********* New Dong A Hop Dong
export const apiLoadNewDongAHopDongList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    // if(payload.search)
    //     filter.search = payload.search;

    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_NEW_DONG_A_HOP_DONG)(newPayload);
};