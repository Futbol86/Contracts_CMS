import { call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { LOAD_LIST_TAI_SAN,
         LOAD_A_TAI_SAN_INFO,
         LOAD_A_TAI_SAN_HISTORY,
         QUERY_A_TAI_SAN,
         ADD_A_TAI_SAN_ACTION,
         UPDATE_A_TAI_SAN_ACTION,
         DELETE_A_TAI_SAN_ACTION, 
         DELETE_A_OWNER_ASSET_RELATION_ACTION,
         DELETE_A_LAND_PURPOSE_RELATION_ACTION,
         CHANGE_TAI_SAN_TAB_ACTION,
         DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD,
    } from '../actions';
import {
    TAI_SAN_FORM_NAME,
    TAI_SAN_FORM_NAME_SUBMIT,
    TAI_SAN_FORM_NAME_SUCCESS,
    TAI_SAN_FORM_NAME_FAILURE,
    DONG_SAN_LIST_FILTER_FORM_NAME,
    DONG_SAN_LIST_FILTER_FORM_NAME_SUBMIT,
    DONG_SAN_LIST_FILTER_FORM_NAME_SUCCESS,
    DONG_SAN_LIST_FILTER_FORM_NAME_FAILURE,
    BAT_DONG_SAN_LIST_FILTER_FORM_NAME,
    BAT_DONG_SAN_LIST_FILTER_FORM_NAME_SUBMIT,
    BAT_DONG_SAN_LIST_FILTER_FORM_NAME_SUCCESS,
    BAT_DONG_SAN_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';


export function* doLoadTaiSanList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_TAI_SAN.LOADING });
        const data = yield call(api.apiLoadTaiSanList, payload);
        yield put({ type: LOAD_LIST_TAI_SAN.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_TAI_SAN.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadATaiSan ({ payload }) {
    try {
        yield put({ type: LOAD_A_TAI_SAN_INFO.LOADING });
        const data = yield call(api.apiLoadATaiSan, payload);
        yield put({ type: LOAD_A_TAI_SAN_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_TAI_SAN_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadATaiSanHistory ({ payload }) {
    try {
        yield put({ type: LOAD_A_TAI_SAN_HISTORY.LOADING });
        const data = yield call(api.apiLoadATaiSanHistory, payload);
        yield put({ type: LOAD_A_TAI_SAN_HISTORY.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_TAI_SAN_HISTORY.FAILURE, payload: {errors: error} });
    }
}

export function* doQueryATaiSan ({ payload }) {
    try {
        yield put({ type: QUERY_A_TAI_SAN.LOADING });
        const data = yield call(api.apiQueryATaiSan, payload);
        yield put({ type: QUERY_A_TAI_SAN.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUERY_A_TAI_SAN.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitTaiSan({ payload }) {
    if(payload.issued_at) {
        if(!payload.id) {
            payload.issued_at = moment(payload.issued_at).add(1, "day");
        }
    }

    try {
        yield put({ type: ADD_A_TAI_SAN_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateATaiSan, payload) :
                   yield call(api.apiCreateATaiSan, payload);
        
        if(data.data.status !== 1) {
            yield put({ type: TAI_SAN_FORM_NAME_FAILURE, payload: {_error: data.data.msg} });
            return;
        }

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Tài sản "id: ${payload.id ?? data.data.data.id}"`
        });

        yield put({ type: TAI_SAN_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: TAI_SAN_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteATaiSan({ payload }) {
    try {
        yield put({ type: DELETE_A_TAI_SAN_ACTION.LOADING });
        let data = yield call(api.apiDeleteATaiSan, payload);

        if(data.data.status === 1) {
            // Add user log
            const userData = auth.getUserFromStorage();
            yield call(userApi.apiAddAUserLog, { 
                username: userData.username, 
                method: "DELETE",
                message: `Tài sản "id: ${payload}"`
            });
            yield put({ type: DELETE_A_TAI_SAN_ACTION.SUCCESS, payload: data });
        } else {
            yield put({ type: DELETE_A_TAI_SAN_ACTION.FAILURE, payload: {_error: data.data.msg} });
        }
    }
    catch (error) {
        yield put({ type: DELETE_A_TAI_SAN_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAOwnerAssetRelation({ payload }) {
    try {
        yield put({ type: DELETE_A_OWNER_ASSET_RELATION_ACTION.LOADING });
        let data = yield call(api.apiDeleteAOwnerAssetRelation, payload);
        yield put({ type: DELETE_A_OWNER_ASSET_RELATION_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_OWNER_ASSET_RELATION_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteALandPurposeRelation({ payload }) {
    try {
        yield put({ type: DELETE_A_LAND_PURPOSE_RELATION_ACTION.LOADING });
        let data = yield call(api.apiDeleteALandPurposeRelation, payload);
        yield put({ type: DELETE_A_LAND_PURPOSE_RELATION_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_LAND_PURPOSE_RELATION_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doChangeTabTaiSan ({ payload }) {
    try {
        yield put({ type: CHANGE_TAI_SAN_TAB_ACTION.SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: CHANGE_TAI_SAN_TAB_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadDongSanListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_TAI_SAN.LOADING });
        const data = yield call(api.apiLoadTaiSanList, {filter: payload});
        yield put({ type: LOAD_LIST_TAI_SAN.SUCCESS, payload: data });
        yield put({ type: DONG_SAN_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: DONG_SAN_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doLoadBatDongSanListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_TAI_SAN.LOADING });
        const data = yield call(api.apiLoadTaiSanList, {filter: payload});
        yield put({ type: LOAD_LIST_TAI_SAN.SUCCESS, payload: data });
        yield put({ type: BAT_DONG_SAN_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: BAT_DONG_SAN_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export function* doExportPhieuTraCuuToWORD({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD.LOADING });
        const data = yield call(api.apiExportPhieuTraCuuToWORD, payload);
        yield put({ type: DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_TAI_SAN.ACTION,                    doLoadTaiSanList),
    takeLatest(LOAD_A_TAI_SAN_INFO.ACTION,                  doLoadATaiSan),
    takeLatest(LOAD_A_TAI_SAN_HISTORY.ACTION,               doLoadATaiSanHistory),
    takeLatest(QUERY_A_TAI_SAN.ACTION,                      doQueryATaiSan),
    takeLatest(TAI_SAN_FORM_NAME_SUBMIT,                    doSubmitTaiSan),
    takeLatest(ADD_A_TAI_SAN_ACTION.ACTION,                 doSubmitTaiSan),
    takeLatest(DELETE_A_TAI_SAN_ACTION.ACTION,              doDeleteATaiSan),
    takeLatest(DELETE_A_OWNER_ASSET_RELATION_ACTION.ACTION, doDeleteAOwnerAssetRelation),
    takeLatest(DELETE_A_LAND_PURPOSE_RELATION_ACTION.ACTION,doDeleteALandPurposeRelation),
    takeLatest(CHANGE_TAI_SAN_TAB_ACTION.ACTION,            doChangeTabTaiSan),
    takeLatest(DONG_SAN_LIST_FILTER_FORM_NAME_SUBMIT,       doLoadDongSanListFilter),
    takeLatest(BAT_DONG_SAN_LIST_FILTER_FORM_NAME_SUBMIT,   doLoadBatDongSanListFilter),
    takeLatest(DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD.ACTION,     doExportPhieuTraCuuToWORD),
];