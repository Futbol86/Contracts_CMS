import {httpClient, httpClient2, utils} from '../../services';
import {
    API_SUB_URL,
    API_SUB_URL_DON_VI_HANH_CHINH,
    API_SUB_URL_DOI_TUONG,
    API_SUB_URL_TAI_SAN,
    API_SUB_URL_TAI_SAN_HISTORY,
    API_SUB_URL_CONG_CHUNG_VIEN,
    API_SUB_URL_SUB_ASSET_TYPE,
    API_SUB_URL_CONTRACT_TYPE,
    API_SUB_URL_LOAI_HOP_DONG,
    API_SUB_URL_LOAI_SO_LUU_TRU,
    API_SUB_URL_SO_LUU_TRU,
    API_SUB_URL_OWNER_TYPE,
    API_SUB_URL_SUB_OWNER_TYPE,
    API_SUB_URL_LAND_PURPOSE,
    API_SUB_URL_BANK,
    API_SUB_URL_DISTRICT,
    API_SUB_URL_WARD,
} from './constants';

/**
 * DOI TUONG
 */

export const apiLoadDoiTuongList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_DOI_TUONG)(newPayload);
};

export const apiLoadADoiTuong= ({id}) => {
    var apiUrl = `${API_SUB_URL_DOI_TUONG}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiQueryADoiTuong= ({license_no}) => {
    var apiUrl = `${API_SUB_URL_DOI_TUONG}?license_no=${license_no}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateADoiTuong = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_DOI_TUONG}`, payload);
};

export const apiUpdateADoiTuong = (payload = {}) => {
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_DOI_TUONG}/${payload.id}`, payload);
};

export const apiDeleteADoiTuong = (id) => {
    return httpClient2.delete(`${API_SUB_URL_DOI_TUONG}/${id}`);
};

/**
 * TAI SAN
 */

export const apiLoadTaiSanList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_TAI_SAN)(newPayload);
};

export const apiLoadATaiSan = ({id}) => {
    var apiUrl = `${API_SUB_URL_TAI_SAN}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiLoadATaiSanHistory = ({id}) => {
    var apiUrl = `${API_SUB_URL_TAI_SAN_HISTORY}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiQueryATaiSan= ({license_number}) => {
    var apiUrl = `${API_SUB_URL_TAI_SAN}?license_number=${license_number}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateATaiSan = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_TAI_SAN}`, payload);
};

export const apiUpdateATaiSan = (payload = {}) => {
    // delete payload.createdAt;
    // delete payload.updatedAt;
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_TAI_SAN}/${payload.id}`, payload);
};

export const apiDeleteATaiSan = (id) => {
    return httpClient2.delete(`${API_SUB_URL_TAI_SAN}/${id}`);
};

export const apiDeleteAOwnerAssetRelation = (payload = {}) => {
    return httpClient2.delete(`${API_SUB_URL_TAI_SAN}/owner-asset-relations/${payload.asset_id}/${payload.owner_id}`);
};

export const apiDeleteALandPurposeRelation = (payload = {}) => {
    return httpClient2.delete(`${API_SUB_URL_TAI_SAN}/land-purpose-relations/${payload.id}`);
};

export const apiExportPhieuTraCuuToWORD = (payload) => {
    if (payload)
        return httpClient2.post(`/export-phieu-tra-cuu-word-file`, payload);
    else
        return null;
};

/**
 * CONTRACT TYPE
 */

 export const apiLoadContractTypeList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_CONTRACT_TYPE)(newPayload);
};

export const apiLoadAContractType= ({id}) => {
    var apiUrl = `${API_SUB_URL_CONTRACT_TYPE}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateAContractType = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_CONTRACT_TYPE}`, payload);
};

export const apiUpdateAContractType = (payload = {}) => {
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_CONTRACT_TYPE}/${payload.id}`, payload);
};

export const apiDeleteAContractType = (id) => {
    return httpClient2.delete(`${API_SUB_URL_CONTRACT_TYPE}/${id}`);
};

/**
 * SUB CONTRACT TYPE
 */

export const apiLoadLoaiHopDongList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_LOAI_HOP_DONG)(newPayload);
};

export const apiLoadALoaiHopDong= ({id}) => {
    var apiUrl = `${API_SUB_URL_LOAI_HOP_DONG}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateALoaiHopDong = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_LOAI_HOP_DONG}`, payload);
};

export const apiUpdateALoaiHopDong = (payload = {}) => {
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_LOAI_HOP_DONG}/${payload.id}`, payload);
};

export const apiDeleteALoaiHopDong = (id) => {
    return httpClient2.delete(`${API_SUB_URL_LOAI_HOP_DONG}/${id}`);
};

/**
 * ARCHIVE BOOK TYPE
 */

export const apiLoadLoaiSoLuuTruList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_LOAI_SO_LUU_TRU)(newPayload);
};

export const apiLoadALoaiSoLuuTru= ({id}) => {
    var apiUrl = `${API_SUB_URL_LOAI_SO_LUU_TRU}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateALoaiSoLuuTru = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_LOAI_SO_LUU_TRU}`, payload);
};

export const apiUpdateALoaiSoLuuTru = (payload = {}) => {
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_LOAI_SO_LUU_TRU}/${payload.id}`, payload);
};

export const apiDeleteALoaiSoLuuTru = (id) => {
    return httpClient2.delete(`${API_SUB_URL_LOAI_SO_LUU_TRU}/${id}`);
};

/**
 * ARCHIVE BOOK
 */

export const apiLoadSoLuuTruList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_SO_LUU_TRU)(newPayload);
};

export const apiLoadASoLuuTru= ({id}) => {
    var apiUrl = `${API_SUB_URL_SO_LUU_TRU}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateASoLuuTru = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_SO_LUU_TRU}`, payload);
};

export const apiUpdateASoLuuTru = (payload = {}) => {
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_SO_LUU_TRU}/${payload.id}`, payload);
};

export const apiDeleteASoLuuTru = (id) => {
    return httpClient2.delete(`${API_SUB_URL_SO_LUU_TRU}/${id}`);
};

/**
 * Sub Asset Type
 */

 export const apiLoadSubAssetTypeList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_SUB_ASSET_TYPE)(newPayload);
};

export const apiLoadASubAssetType= ({id}) => {
    var apiUrl = `${API_SUB_URL_SUB_ASSET_TYPE}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateASubAssetType = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_SUB_ASSET_TYPE}`, payload);
};

export const apiUpdateASubAssetType = (payload = {}) => {
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_SUB_ASSET_TYPE}/${payload.id}`, payload);
};

export const apiDeleteASubAssetType = (id) => {
    return httpClient2.delete(`${API_SUB_URL_SUB_ASSET_TYPE}/${id}`);
};

/**
 * OWNER TYPE
 */

export const apiLoadOwnerTypeList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_OWNER_TYPE)(newPayload);
};

/**
 * SUB OWNER TYPE
 */

 export const apiLoadSubOwnerTypeList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_SUB_OWNER_TYPE)(newPayload);
};

/**
 * LAND PURPOSES
 */

 export const apiLoadLandPurposeList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_LAND_PURPOSE)(newPayload);
};

export const apiLoadALandPurpose= ({id}) => {
    var apiUrl = `${API_SUB_URL_LAND_PURPOSE}?id=${id}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateALandPurpose = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_LAND_PURPOSE}`, payload);
};

export const apiUpdateALandPurpose = (payload = {}) => {
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_LAND_PURPOSE}/${payload.id}`, payload);
};

export const apiDeleteALandPurpose = (id) => {
    return httpClient2.delete(`${API_SUB_URL_LAND_PURPOSE}/${id}`);
};

/**
 * BANK
 */

 export const apiLoadBankList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_BANK)(newPayload);
};

/**
 * DISTRICT
 */

 export const apiLoadDistrictList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_DISTRICT)(newPayload);
};

/**
 * WARD
 */

 export const apiLoadWardList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_WARD)(newPayload);
};