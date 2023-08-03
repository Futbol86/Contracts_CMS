import { call, put, takeLatest } from 'redux-saga/effects';
import utils from '../../../services/utils';
import { LOAD_LIST_THU_HOI_GCN,
         LOAD_A_THU_HOI_GCN_INFO,
         ADD_A_THU_HOI_GCN_ACTION,
         DELETE_A_THU_HOI_GCN_ACTION,
         UPLOAD_THU_HOI_GCN_FILES_ACTION,
         DELETE_A_THU_HOI_GCN_FILE_ACTION
} from '../actions';
import {
    THU_HOI_GCN_LIST_FILTER_FORM_NAME_SUBMIT,
    THU_HOI_GCN_LIST_FILTER_FORM_NAME_SUCCESS,
    THU_HOI_GCN_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';
import {THU_HOI_GCN_FORM_NAME, THU_HOI_GCN_FORM_NAME_SUBMIT, THU_HOI_GCN_FORM_NAME_SUCCESS, THU_HOI_GCN_FORM_NAME_FAILURE} from "../constants";
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadThuHoiGCNList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_THU_HOI_GCN.LOADING });
        const data = yield call(api.apiLoadThuHoiGCNList, payload);
        yield put({ type: LOAD_LIST_THU_HOI_GCN.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_THU_HOI_GCN.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAnAssetRelease ({ payload }) {
    try {
        yield put({ type: LOAD_A_THU_HOI_GCN_INFO.LOADING });
        const data = yield call(api.apiLoadAThuHoiGCN, payload);
        yield put({ type: LOAD_A_THU_HOI_GCN_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_THU_HOI_GCN_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitThuHoiGCN({ payload }) {
    try {
        let data = payload.id ? yield call(api.apiUpdateAThuHoiGCN, payload) 
                                : yield call(api.apiCreateAThuHoiGCN, payload);

        // Add user log
        if(data.data.status === 1) {
            const userData = auth.getUserFromStorage();
            yield call(userApi.apiAddAUserLog, {
                username: userData.username,
                method: payload.id ? "UPDATE" : "CREATE",
                message: `Thu hồi GCN "id: ${payload.id ?? data.data.data.id}"`
            });
        
            yield put({ type: THU_HOI_GCN_FORM_NAME_SUCCESS, payload: data });
            if(!payload.id)
                yield put({ type: ADD_A_THU_HOI_GCN_ACTION.SUCCESS, payload: data });
        } else {
            yield put({ type: THU_HOI_GCN_FORM_NAME_FAILURE, payload: {_error: "Lỗi: " + data.data.msg} });
        }
    }
    catch (error) {
        yield put({ type: THU_HOI_GCN_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAThuHoiGCN({ payload }) {
    try {
        yield put({ type: DELETE_A_THU_HOI_GCN_ACTION.LOADING });
        let data = yield call(api.apiDeleteAThuHoiGCN, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, { 
            username: userData.username, 
            method: "DELETE",
            message: `Thu hồi GCN "id: ${payload}"`
        });
        yield put({ type: DELETE_A_THU_HOI_GCN_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_THU_HOI_GCN_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadThuHoiGCNListFilter({ payload }) {
    try {
        let filter = {};
        if(payload.group_id) 
            filter.group_id = payload.group_id;
        if(payload.search) 
            filter.search = payload.search;
        if(payload.fromDate)
            filter.fromDate = payload.fromDate;
        if(payload.toDate)
            filter.toDate = payload.toDate;

        payload.filter = filter;

        yield put({ type: LOAD_LIST_THU_HOI_GCN.LOADING });
        const data = yield call(api.apiLoadThuHoiGCNList, {filter: payload});
        yield put({ type: LOAD_LIST_THU_HOI_GCN.SUCCESS, payload: data });
        yield put({ type: THU_HOI_GCN_LIST_FILTER_FORM_NAME_SUCCESS, payload: filter });
    }
    catch (error) {
        yield put({ type: THU_HOI_GCN_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* douploadThuHoiGCNFiles({ payload }) {
    try {
        yield put({ type: UPLOAD_THU_HOI_GCN_FILES_ACTION.LOADING });
        const data = yield call(utils.uploadFile, payload, 'thu_hoi_gcns');
        yield put({ type: UPLOAD_THU_HOI_GCN_FILES_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPLOAD_THU_HOI_GCN_FILES_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAThuHoiGCNFile({ payload }) {
    try {
        yield put({ type: DELETE_A_THU_HOI_GCN_FILE_ACTION.LOADING });
        const data = yield call(utils.deleteFile, {...payload, subPath: 'thu_hoi_gcns'});
        yield put({ type: DELETE_A_THU_HOI_GCN_FILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_THU_HOI_GCN_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_THU_HOI_GCN.ACTION,                    doLoadThuHoiGCNList),
    takeLatest(LOAD_A_THU_HOI_GCN_INFO.ACTION,                  doLoadAnAssetRelease),
    takeLatest(THU_HOI_GCN_FORM_NAME_SUBMIT,                    doSubmitThuHoiGCN),
    takeLatest(DELETE_A_THU_HOI_GCN_ACTION.ACTION,              doDeleteAThuHoiGCN),
    takeLatest(THU_HOI_GCN_LIST_FILTER_FORM_NAME_SUBMIT,        doLoadThuHoiGCNListFilter),
    takeLatest(UPLOAD_THU_HOI_GCN_FILES_ACTION.ACTION,          douploadThuHoiGCNFiles),
    takeLatest(DELETE_A_THU_HOI_GCN_FILE_ACTION.ACTION,         doDeleteAThuHoiGCNFile),
];