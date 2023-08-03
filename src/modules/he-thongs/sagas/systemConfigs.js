import { call, put, takeLatest } from 'redux-saga/effects';
import utils from '../../../services/utils';
import { LOAD_LIST_SYSTEM_CONFIG,
         ADD_A_SYSTEM_CONFIG_ACTION,
         UPLOAD_HDSD_FILE_ACTION,
         DELETE_HDSD_FILE_ACTION,
} from '../actions';
import * as api from '../apis';
import {SYSTEM_CONFIG_FORM_NAME_SUBMIT, SYSTEM_CONFIG_FORM_NAME_SUCCESS, SYSTEM_CONFIG_FORM_NAME_FAILURE} from "../constants";

export function* doLoadSystemConfigList ({ payload }) {
    try {
        yield put({ type: LOAD_LIST_SYSTEM_CONFIG.LOADING });
        const data = yield call(api.apiLoadSystemConfigList, payload);
        yield put({ type: LOAD_LIST_SYSTEM_CONFIG.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_SYSTEM_CONFIG.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitSystemConfig({ payload }) {
    try {
        yield put({ type: ADD_A_SYSTEM_CONFIG_ACTION.LOADING });
        let data = yield call(api.apiUpdateASystemConfig, payload);
        yield put({ type: SYSTEM_CONFIG_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: SYSTEM_CONFIG_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* douploadHDSDFile({ payload }) {
    try {
        yield put({ type: UPLOAD_HDSD_FILE_ACTION.LOADING });
        const data = yield call(utils.uploadFile, payload, 'systems');
        yield put({ type: UPLOAD_HDSD_FILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPLOAD_HDSD_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteHDSDFile({ payload }) {
    try {
        yield put({ type: DELETE_HDSD_FILE_ACTION.LOADING });
        const data = yield call(utils.deleteFile, {...payload, subPath: 'systems'});
        yield put({ type: DELETE_HDSD_FILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_HDSD_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_SYSTEM_CONFIG.ACTION,                    doLoadSystemConfigList),
    takeLatest(SYSTEM_CONFIG_FORM_NAME_SUBMIT,                    doSubmitSystemConfig),
    takeLatest(UPLOAD_HDSD_FILE_ACTION.ACTION,                    douploadHDSDFile),
    takeLatest(DELETE_HDSD_FILE_ACTION.ACTION,                    doDeleteHDSDFile),
];