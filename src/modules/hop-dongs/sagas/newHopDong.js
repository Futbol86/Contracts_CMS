import { call, put, takeLatest } from 'redux-saga/effects';
import utils from '../../../services/utils';
import { 
    LOAD_LIST_NEW_HOP_DONG, LOAD_A_NEW_HOP_DONG_INFO, ADD_A_NEW_HOP_DONG_ACTION, 
    UPLOAD_NEW_HOP_DONG_FILES_ACTION, DELETE_A_NEW_HOP_DONG_FILE_ACTION, 
    DOC_EXPORT_NEW_CONTRACT_LIST_TO_EXCEL, DOC_EXPORT_NGAN_CHAN_LIST_TO_EXCEL, DOC_EXPORT_GIAI_TOA_LIST_TO_EXCEL,
    DOC_EXPORT_THU_HOI_GCN_LIST_TO_EXCEL
} from '../actions';
import {
    NEW_HOP_DONG_LIST_FILTER_FORM_NAME_SUBMIT,
    NEW_HOP_DONG_LIST_FILTER_FORM_NAME_SUCCESS,
    NEW_HOP_DONG_LIST_FILTER_FORM_NAME_FAILURE,
    NEW_HOP_DONG_IN_LIST_FILTER_FORM_NAME_SUBMIT,
    NEW_HOP_DONG_IN_LIST_FILTER_FORM_NAME_SUCCESS,
    NEW_HOP_DONG_IN_LIST_FILTER_FORM_NAME_FAILURE,
} from '../constants';
import * as api from '../apis';
import {NEW_HOP_DONG_FORM_NAME, NEW_HOP_DONG_FORM_NAME_SUBMIT, NEW_HOP_DONG_FORM_NAME_SUCCESS, NEW_HOP_DONG_FORM_NAME_FAILURE} from "../constants";
import {isEmpty} from "lodash";
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadNewHopDongList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_NEW_HOP_DONG.LOADING });
        const data = yield call(api.apiLoadNewHopDongList, payload);
        yield put({ type: LOAD_LIST_NEW_HOP_DONG.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_NEW_HOP_DONG.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadANewContract ({ payload }) {
    try {
        yield put({ type: LOAD_A_NEW_HOP_DONG_INFO.LOADING });
        const data = yield call(api.apiLoadANewContract, payload);
        yield put({ type: LOAD_A_NEW_HOP_DONG_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_NEW_HOP_DONG_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitHopDong({ payload }) {
    try {
        let data = payload.id ? yield call(api.apiUpdateANewHopDong, payload) : yield call(api.apiCreateANewHopDong, payload);

        if(data && data.data && data.data.status === 0) {
            yield put({ type: NEW_HOP_DONG_FORM_NAME_FAILURE, payload: {error: data.data.msg} });
        }

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Hợp đồng "id: ${payload.id ?? data.data.data.id}"`
        });
        yield put({ type: NEW_HOP_DONG_FORM_NAME_SUCCESS, payload: data });
        if(!payload.id)
            yield put({ type: ADD_A_NEW_HOP_DONG_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: NEW_HOP_DONG_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doLoadNewHopDongListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_NEW_HOP_DONG.LOADING });
        const data = yield call(api.apiNewHopDongSearchList, payload);
        yield put({ type: NEW_HOP_DONG_LIST_FILTER_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: NEW_HOP_DONG_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doLoadNewHopDongInListFilter({ payload }) {
    try {
        let filter = {};
        if(payload.group_id) 
            filter.group_id = payload.group_id;
        else 
            filter.group_id = payload.userData && payload.userData.group_id
        if(payload.isAdmin) 
            filter.isAdmin = payload.isAdmin;
        if(payload.search) 
            filter.search = payload.search;
        if(payload.fromDate)
            filter.fromDate = payload.fromDate;
        if(payload.toDate)
            filter.toDate = payload.toDate;

        payload.filter = filter;

        yield put({ type: LOAD_LIST_NEW_HOP_DONG.LOADING });
        const data = yield call(api.apiLoadNewHopDongList, payload);
        yield put({ type: LOAD_LIST_NEW_HOP_DONG.SUCCESS, payload: data });
        yield put({ type: NEW_HOP_DONG_IN_LIST_FILTER_FORM_NAME_SUCCESS, payload: filter });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_NEW_HOP_DONG.FAILURE, payload: {errors: error} });
    }
}

function* douploadNewHopDongFiles({ payload }) {
    try {
        yield put({ type: UPLOAD_NEW_HOP_DONG_FILES_ACTION.LOADING });
        const data = yield call(utils.uploadFile, payload, 'contracts');
        yield put({ type: UPLOAD_NEW_HOP_DONG_FILES_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPLOAD_NEW_HOP_DONG_FILES_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteANewHopDongFile({ payload }) {
    try {
        yield put({ type: DELETE_A_NEW_HOP_DONG_FILE_ACTION.LOADING });
        const data = yield call(utils.deleteFile, {...payload, subPath: 'contracts'});
        yield put({ type: DELETE_A_NEW_HOP_DONG_FILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_NEW_HOP_DONG_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doExportNewContractListToEXCEL({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_NEW_CONTRACT_LIST_TO_EXCEL.LOADING });
        const data = yield call(api.apiExportNewContractListToEXCEL, payload);
        yield put({ type: DOC_EXPORT_NEW_CONTRACT_LIST_TO_EXCEL.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_NEW_CONTRACT_LIST_TO_EXCEL.FAILURE, payload: {errors: error} });
    }
}

export function* doExportNganChanListToEXCEL({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_NGAN_CHAN_LIST_TO_EXCEL.LOADING });
        const data = yield call(api.apiExportNganChanListToEXCEL, payload);
        yield put({ type: DOC_EXPORT_NGAN_CHAN_LIST_TO_EXCEL.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_NGAN_CHAN_LIST_TO_EXCEL.FAILURE, payload: {errors: error} });
    }
}

export function* doExportGiaiToaListToEXCEL({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_GIAI_TOA_LIST_TO_EXCEL.LOADING });
        const data = yield call(api.apiExportGiaiToaListToEXCEL, payload);
        yield put({ type: DOC_EXPORT_GIAI_TOA_LIST_TO_EXCEL.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_GIAI_TOA_LIST_TO_EXCEL.FAILURE, payload: {errors: error} });
    }
}

export function* doExportThuHoiGCNListToEXCEL({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_THU_HOI_GCN_LIST_TO_EXCEL.LOADING });
        const data = yield call(api.apiExportThuHoiGCNListToEXCEL, payload);
        yield put({ type: DOC_EXPORT_THU_HOI_GCN_LIST_TO_EXCEL.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_THU_HOI_GCN_LIST_TO_EXCEL.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_NEW_HOP_DONG.ACTION,                   doLoadNewHopDongList),
    takeLatest(LOAD_A_NEW_HOP_DONG_INFO.ACTION,                 doLoadANewContract),
    takeLatest(NEW_HOP_DONG_FORM_NAME_SUBMIT,                   doSubmitHopDong),
    takeLatest(NEW_HOP_DONG_LIST_FILTER_FORM_NAME_SUBMIT,       doLoadNewHopDongListFilter),
    takeLatest(NEW_HOP_DONG_IN_LIST_FILTER_FORM_NAME_SUBMIT,    doLoadNewHopDongInListFilter),

    takeLatest(UPLOAD_NEW_HOP_DONG_FILES_ACTION.ACTION,         douploadNewHopDongFiles),
    takeLatest(DELETE_A_NEW_HOP_DONG_FILE_ACTION.ACTION,        doDeleteANewHopDongFile),

    takeLatest(DOC_EXPORT_NEW_CONTRACT_LIST_TO_EXCEL.ACTION,    doExportNewContractListToEXCEL),
    takeLatest(DOC_EXPORT_NGAN_CHAN_LIST_TO_EXCEL.ACTION,       doExportNganChanListToEXCEL),
    takeLatest(DOC_EXPORT_GIAI_TOA_LIST_TO_EXCEL.ACTION,        doExportGiaiToaListToEXCEL),
    takeLatest(DOC_EXPORT_THU_HOI_GCN_LIST_TO_EXCEL.ACTION,     doExportThuHoiGCNListToEXCEL),
];