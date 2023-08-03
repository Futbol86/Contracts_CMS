import { call, put, takeLatest } from 'redux-saga/effects';
import utils from '../../../services/utils';
import { LOAD_LIST_GIAI_TOA,
         LOAD_A_GIAI_TOA_INFO,
         ADD_A_GIAI_TOA_ACTION,
         UPDATE_A_GIAI_TOA_ACTION,
         DELETE_A_GIAI_TOA_ACTION,
         UPLOAD_GIAI_TOA_FILES_ACTION,
         DELETE_A_GIAI_TOA_FILE_ACTION
} from '../actions';
import {
    GIAI_TOA_LIST_FILTER_FORM_NAME_SUBMIT,
    GIAI_TOA_LIST_FILTER_FORM_NAME_SUCCESS,
    GIAI_TOA_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';
import {GIAI_TOA_FORM_NAME, GIAI_TOA_FORM_NAME_SUBMIT, GIAI_TOA_FORM_NAME_SUCCESS, GIAI_TOA_FORM_NAME_FAILURE} from "../constants";
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadGiaiToaList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_GIAI_TOA.LOADING });
        const data = yield call(api.apiLoadGiaiToaList, payload);
        yield put({ type: LOAD_LIST_GIAI_TOA.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_GIAI_TOA.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAnAssetRelease ({ payload }) {
    try {
        yield put({ type: LOAD_A_GIAI_TOA_INFO.LOADING });
        const data = yield call(api.apiLoadAnAssetRelease, payload);
        yield put({ type: LOAD_A_GIAI_TOA_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_GIAI_TOA_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitGiaiToa({ payload }) {
    try {
        if(payload.prevention_id) {
            let data = payload.id ? yield call(api.apiUpdateAGiaiToa, payload) : yield call(api.apiCreateAGiaiToa, payload);

            // Add user log
            if(data.data.status === 1) {
                const userData = auth.getUserFromStorage();
                yield call(userApi.apiAddAUserLog, {
                    username: userData.username,
                    method: payload.id ? "UPDATE" : "CREATE",
                    message: `Giải toả "id: ${payload.id ?? data.data.data.id}"`
                });
            
                yield put({ type: GIAI_TOA_FORM_NAME_SUCCESS, payload: data });
                if(!payload.id)
                    yield put({ type: ADD_A_GIAI_TOA_ACTION.SUCCESS, payload: data });
            } else {
                yield put({ type: GIAI_TOA_FORM_NAME_FAILURE, payload: {_error: "Lỗi: " + data.data.msg} });
            }
        } else {
            yield put({ type: GIAI_TOA_FORM_NAME_FAILURE, payload: {_error: "Lỗi: Vui lòng chọn 'Quyết định ngăn chặn'!"} });
        }
    }
    catch (error) {
        yield put({ type: GIAI_TOA_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAGiaiToa({ payload }) {
    try {
        yield put({ type: DELETE_A_GIAI_TOA_ACTION.LOADING });
        let data = yield call(api.apiDeleteAGiaiToa, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, { 
            username: userData.username, 
            method: "DELETE",
            message: `Giải toả "id: ${payload}"`
        });
        yield put({ type: DELETE_A_GIAI_TOA_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_GIAI_TOA_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadGiaiToaListFilter({ payload }) {
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

        yield put({ type: LOAD_LIST_GIAI_TOA.LOADING });
        const data = yield call(api.apiLoadGiaiToaList, {filter: payload});
        yield put({ type: LOAD_LIST_GIAI_TOA.SUCCESS, payload: data });
        yield put({ type: GIAI_TOA_LIST_FILTER_FORM_NAME_SUCCESS, payload: filter });
    }
    catch (error) {
        yield put({ type: GIAI_TOA_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* douploadGiaiToaFiles({ payload }) {
    try {
        yield put({ type: UPLOAD_GIAI_TOA_FILES_ACTION.LOADING });
        const data = yield call(utils.uploadFile, payload, 'asset_releases');
        yield put({ type: UPLOAD_GIAI_TOA_FILES_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPLOAD_GIAI_TOA_FILES_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAGiaiToaFile({ payload }) {
    try {
        yield put({ type: DELETE_A_GIAI_TOA_FILE_ACTION.LOADING });
        const data = yield call(utils.deleteFile, {...payload, subPath: 'asset_releases'});
        yield put({ type: DELETE_A_GIAI_TOA_FILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_GIAI_TOA_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_GIAI_TOA.ACTION,                    doLoadGiaiToaList),
    takeLatest(LOAD_A_GIAI_TOA_INFO.ACTION,                  doLoadAnAssetRelease),
    takeLatest(GIAI_TOA_FORM_NAME_SUBMIT,                    doSubmitGiaiToa),
    takeLatest(DELETE_A_GIAI_TOA_ACTION.ACTION,              doDeleteAGiaiToa),
    takeLatest(GIAI_TOA_LIST_FILTER_FORM_NAME_SUBMIT,        doLoadGiaiToaListFilter),
    takeLatest(UPLOAD_GIAI_TOA_FILES_ACTION.ACTION,          douploadGiaiToaFiles),
    takeLatest(DELETE_A_GIAI_TOA_FILE_ACTION.ACTION,         doDeleteAGiaiToaFile),
];