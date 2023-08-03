import { call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import utils from '../../../services/utils';
import { LOAD_LIST_HOP_DONG,
         LOAD_A_HOP_DONG_INFO,
         ADD_A_HOP_DONG_ACTION,
         UPDATE_A_HOP_DONG_STATUS_ACTION,
         DELETE_A_HOP_DONG_ACTION,
         UPLOAD_HOP_DONG_FILES_ACTION,
         DELETE_A_HOP_DONG_FILE_ACTION,

         REQUEST_TNMT_LAND_DATA_ACTION,
         REQUEST_TNMT_TONG_TIEN_NAP_ACTION,

         DOC_EXPORT_CONTRACT_TO_PDF,
         DOC_EXPORT_TESTIMONIAL_TO_PDF,
         DOC_EXPORT_CONTRACT_TO_WORD,
         DOC_EXPORT_TESTIMONIAL_TO_WORD,
    } from '../actions';
import {
    HOP_DONG_LIST_FILTER_FORM_NAME_SUBMIT,
    HOP_DONG_LIST_FILTER_FORM_NAME_SUCCESS,
    HOP_DONG_LIST_FILTER_FORM_NAME_FAILURE,
} from '../constants';
import * as api from '../apis';
import {HOP_DONG_FORM_NAME, HOP_DONG_FORM_NAME_SUBMIT, HOP_DONG_FORM_NAME_SUCCESS, HOP_DONG_FORM_NAME_FAILURE} from "../constants";
import {isEmpty} from "lodash";
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadHopDongList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_HOP_DONG.LOADING });
        const data = yield call(api.apiLoadHopDongList, payload);
        yield put({ type: LOAD_LIST_HOP_DONG.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_HOP_DONG.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAContract ({ payload }) {
    try {
        yield put({ type: LOAD_A_HOP_DONG_INFO.LOADING });
        const data = yield call(api.apiLoadAContract, payload);
        yield put({ type: LOAD_A_HOP_DONG_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_HOP_DONG_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitHopDong({ payload }) {
    if(payload.contract_date) {
        if(!payload.id) {
            payload.contract_date = moment(payload.contract_date).add(1, "day");
        }
    }

    try {
        if(!payload.assets || payload.assets && payload.assets.length === 0) {
            yield put({ type: HOP_DONG_FORM_NAME_FAILURE, payload: {_error: "Vui lòng chọn thông tin 'Tài sản'"} });
            return;
        } else {
            let hasAssetFillInfo = false; 

            payload.assets.map(item => {
                if(!isEmpty(item)) {
                    hasAssetFillInfo = true;
                }
            })

            if(hasAssetFillInfo === false) {
                yield put({ type: HOP_DONG_FORM_NAME_FAILURE, payload: {_error: "Vui lòng chọn thông tin 'Tài sản'"} });
                return;
            }

            // Tìm xem có tài sản nào bị ngăn chặn ko
            for(let i = 0; i < payload.assets.length; i++) {
                if(!isEmpty(payload.assets[i])) {
                    if(payload.assets[i].asset_status_id === 2) {
                        yield put({ type: HOP_DONG_FORM_NAME_FAILURE, payload: {_error: "Tài sản '" + payload.assets[i].license_number + "' đang bị NGĂN CHẶN"} });
                        return;              
                    } 
                    // else if(payload.assets[i].asset_status_id === 3) {
                    //     yield put({ type: HOP_DONG_FORM_NAME_FAILURE, payload: {_error: "Tài sản '" + payload.assets[i].license_number + "' đang THẾ CHẤP"} });
                    //     return;
                    // } 
                    // else if(payload.assets[i].asset_status_id === 4) {
                    //     // Trong trường hợp update
                    //     if(payload.assetDetails) {
                    //         let findOneAssetDetail = payload.assetDetails.find(item => item.id === payload.assets[i].id);
                    //         if(!findOneAssetDetail) {
                    //             yield put({ type: HOP_DONG_FORM_NAME_FAILURE, payload: {_error: "Tài sản '" + payload.assets[i].license_number + "' đang TRONG GIAO DỊCH KHÁC"} });
                    //             return;
                    //         }
                    //     } else {
                    //         yield put({ type: HOP_DONG_FORM_NAME_FAILURE, payload: {_error: "Tài sản '" + payload.assets[i].license_number + "' đang TRONG GIAO DỊCH KHÁC"} });
                    //         return;
                    //     }
                    // }
                }
            }
        }
        
        if(!payload.from_owners || payload.from_owners && payload.from_owners.length === 0) {
            yield put({ type: HOP_DONG_FORM_NAME_FAILURE, payload: {_error: "Vui lòng chọn thông tin 'Bên A'"} });
            return;
        } else {
            let hasFromOwnerFillInfo = false; 

            payload.from_owners.map(item => {
                if(!isEmpty(item)) {
                    hasFromOwnerFillInfo = true;
                }
            })

            if(hasFromOwnerFillInfo === false) {
                yield put({ type: HOP_DONG_FORM_NAME_FAILURE, payload: {_error: "Vui lòng chọn thông tin 'Bên A'"} });
                return;
            }

            // Tìm xem có bên A có bị ngăn chặn ko
            for(let i = 0; i < payload.from_owners.length; i++) {
                if(!isEmpty(payload.from_owners[i])) {
                    if(payload.from_owners[i].status === 3) {
                        yield put({ type: HOP_DONG_FORM_NAME_FAILURE, payload: {_error: "Đối Tượng Bên A '" + payload.from_owners[i].fullname + "' đang bị NGĂN CHẶN"} });
                        return;
                    }
                }
            }
        }
        
        if(!payload.to_owners || payload.to_owners && payload.to_owners.length === 0) {
            yield put({ type: HOP_DONG_FORM_NAME_FAILURE, payload: {_error: "Vui lòng chọn thông tin 'Bên B'"} });
            return;
        } else {
            let hasToOwnerFillInfo = false; 

            payload.to_owners.map(item => {
                if(!isEmpty(item)) {
                    hasToOwnerFillInfo = true;
                }
            })

            if(hasToOwnerFillInfo === false) {
                yield put({ type: HOP_DONG_FORM_NAME_FAILURE, payload: {_error: "Vui lòng chọn thông tin 'Bên B'"} });
                return;
            }

            // Tìm xem có bên B có bị ngăn chặn ko
            for(let i = 0; i < payload.to_owners.length; i++) {
                if(!isEmpty(payload.to_owners[i])) {
                    if(payload.to_owners[i].status === 3) {
                        yield put({ type: HOP_DONG_FORM_NAME_FAILURE, payload: {_error: "Đối Tượng Bên B '" + payload.to_owners[i].fullname + "' đang bị NGĂN CHẶN"} });
                        return;
                    }
                }
            }
        }

        let data = payload.id ? yield call(api.apiUpdateAHopDong, payload) : yield call(api.apiCreateAHopDong, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Hợp đồng "id: ${payload.id ?? data.data.data.id}"`
        });
        yield put({ type: HOP_DONG_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: HOP_DONG_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doUpdateAHopDongStatus({ payload }) {
    try {
        yield put({ type: UPDATE_A_HOP_DONG_STATUS_ACTION.LOADING });
        let data = yield call(api.apiUpdateAHopDongStatus, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: 'Thác tác hoàn thành Hợp đồng "' + payload.name + "'"
        });
        yield put({ type: UPDATE_A_HOP_DONG_STATUS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPDATE_A_HOP_DONG_STATUS_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAHopDong({ payload }) {
    try {
        yield put({ type: DELETE_A_HOP_DONG_ACTION.LOADING });
        let data = yield call(api.apiDeleteAHopDong, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, { 
            username: userData.username, 
            method: "DELETE",
            message: `Hợp đồng "id: ${payload}"`
        });
        yield put({ type: DELETE_A_HOP_DONG_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_HOP_DONG_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadHopDongListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_HOP_DONG.LOADING });
        const data = yield call(api.apiLoadHopDongList, {filter: payload});
        yield put({ type: LOAD_LIST_HOP_DONG.SUCCESS, payload: data });
        yield put({ type: HOP_DONG_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: HOP_DONG_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export function* doRequestTNMTLandData({ payload }) {
    try {
        yield put({ type: REQUEST_TNMT_LAND_DATA_ACTION.LOADING });
        const data = yield call(api.apiRequestTNMTLandData, payload);
        yield put({ type: REQUEST_TNMT_LAND_DATA_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: REQUEST_TNMT_LAND_DATA_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doRequestTNMTTongTienNap({ payload }) {
    try {
        yield put({ type: REQUEST_TNMT_TONG_TIEN_NAP_ACTION.LOADING });
        const data = yield call(api.apiRequestTNMTTongTienNap, payload);
        yield put({ type: REQUEST_TNMT_TONG_TIEN_NAP_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: REQUEST_TNMT_TONG_TIEN_NAP_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* douploadHopDongFiles({ payload }) {
    try {
        yield put({ type: UPLOAD_HOP_DONG_FILES_ACTION.LOADING });
        const data = yield call(utils.uploadFile, payload, 'contracts');
        yield put({ type: UPLOAD_HOP_DONG_FILES_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPLOAD_HOP_DONG_FILES_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAHopDongFile({ payload }) {
    try {
        yield put({ type: DELETE_A_HOP_DONG_FILE_ACTION.LOADING });
        const data = yield call(utils.deleteFile, {...payload, subPath: 'contracts'});
        yield put({ type: DELETE_A_HOP_DONG_FILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_HOP_DONG_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doExportContractToPDF({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_CONTRACT_TO_PDF.LOADING });
        const data = yield call(api.apiExportContractToPDF, payload);
        yield put({ type: DOC_EXPORT_CONTRACT_TO_PDF.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_CONTRACT_TO_PDF.FAILURE, payload: {errors: error} });
    }
}

export function* doExportTestimonialToPDF({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_CONTRACT_TO_PDF.LOADING });
        const data = yield call(api.apiExportTestimonialToPDF, payload);
        yield put({ type: DOC_EXPORT_CONTRACT_TO_PDF.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_CONTRACT_TO_PDF.FAILURE, payload: {errors: error} });
    }
}

export function* doExportContractToWORD({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_CONTRACT_TO_WORD.LOADING });
        const data = yield call(api.apiExportContractToWORD, payload);
        yield put({ type: DOC_EXPORT_CONTRACT_TO_WORD.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_CONTRACT_TO_WORD.FAILURE, payload: {errors: error} });
    }
}

export function* doExportTestimonialToWORD({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_TESTIMONIAL_TO_WORD.LOADING });
        const data = yield call(api.apiExportTestimonialToWORD, payload);
        yield put({ type: DOC_EXPORT_TESTIMONIAL_TO_WORD.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_TESTIMONIAL_TO_WORD.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_HOP_DONG.ACTION,                    doLoadHopDongList),
    takeLatest(LOAD_A_HOP_DONG_INFO.ACTION,                  doLoadAContract),
    takeLatest(HOP_DONG_FORM_NAME_SUBMIT,                    doSubmitHopDong),
    takeLatest(UPDATE_A_HOP_DONG_STATUS_ACTION.ACTION,       doUpdateAHopDongStatus),
    takeLatest(DELETE_A_HOP_DONG_ACTION.ACTION,              doDeleteAHopDong),
    takeLatest(HOP_DONG_LIST_FILTER_FORM_NAME_SUBMIT,        doLoadHopDongListFilter),
    takeLatest(UPLOAD_HOP_DONG_FILES_ACTION.ACTION,          douploadHopDongFiles),
    takeLatest(DELETE_A_HOP_DONG_FILE_ACTION.ACTION,         doDeleteAHopDongFile),

    takeLatest(REQUEST_TNMT_LAND_DATA_ACTION.ACTION,         doRequestTNMTLandData),
    takeLatest(REQUEST_TNMT_TONG_TIEN_NAP_ACTION.ACTION,     doRequestTNMTTongTienNap),

    takeLatest(DOC_EXPORT_CONTRACT_TO_PDF.ACTION,            doExportContractToPDF),
    takeLatest(DOC_EXPORT_TESTIMONIAL_TO_PDF.ACTION,         doExportTestimonialToPDF),
    takeLatest(DOC_EXPORT_CONTRACT_TO_WORD.ACTION,           doExportContractToWORD),
    takeLatest(DOC_EXPORT_TESTIMONIAL_TO_WORD.ACTION,        doExportTestimonialToWORD),
];