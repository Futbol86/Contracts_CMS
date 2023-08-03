import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_SUB_ASSET_TYPE,
         LOAD_A_SUB_ASSET_TYPE_INFO,
         ADD_A_SUB_ASSET_TYPE_ACTION,
         UPDATE_A_SUB_ASSET_TYPE_ACTION,
         DELETE_A_SUB_ASSET_TYPE_ACTION } from '../actions';
import {
    SUB_ASSET_TYPE_FORM_NAME,
    SUB_ASSET_TYPE_FORM_NAME_SUBMIT,
    SUB_ASSET_TYPE_FORM_NAME_SUCCESS,
    SUB_ASSET_TYPE_FORM_NAME_FAILURE,
    SUB_ASSET_TYPE_LIST_FILTER_FORM_NAME,
    SUB_ASSET_TYPE_LIST_FILTER_FORM_NAME_SUBMIT,
    SUB_ASSET_TYPE_LIST_FILTER_FORM_NAME_SUCCESS,
    SUB_ASSET_TYPE_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadSubAssetTypeList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_SUB_ASSET_TYPE.LOADING });
        const data = yield call(api.apiLoadSubAssetTypeList, payload);
        yield put({ type: LOAD_LIST_SUB_ASSET_TYPE.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_SUB_ASSET_TYPE.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadASubAssetType ({ payload }) {
    try {
        yield put({ type: LOAD_A_SUB_ASSET_TYPE_INFO.LOADING });
        const data = yield call(api.apiLoadASubAssetType, payload);
        yield put({ type: LOAD_A_SUB_ASSET_TYPE_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_SUB_ASSET_TYPE_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitSubAssetType({ payload }) {
    try {
        yield put({ type: ADD_A_SUB_ASSET_TYPE_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateASubAssetType, payload) :
                   yield call(api.apiCreateASubAssetType, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Loại tài sản "id: ${payload.id ?? data.data.data.id}"`
        });
        yield put({ type: SUB_ASSET_TYPE_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: SUB_ASSET_TYPE_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteASubAssetType({ payload }) {
    try {
        yield put({ type: DELETE_A_SUB_ASSET_TYPE_ACTION.LOADING });
        let data = yield call(api.apiDeleteASubAssetType, payload);
    
        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, { 
            username: userData.username, 
            method: "DELETE", 
            message: `Loại tài sản "id: ${payload}"`
        });
        yield put({ type: DELETE_A_SUB_ASSET_TYPE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_SUB_ASSET_TYPE_ACTION.FAILURE, payload: {errors: error} });
    }
}


function* doLoadSubAssetTypeListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_SUB_ASSET_TYPE.LOADING });
        const data = yield call(api.apiLoadSubAssetTypeList, {filter: payload});
        yield put({ type: LOAD_LIST_SUB_ASSET_TYPE.SUCCESS, payload: data });
        yield put({ type: SUB_ASSET_TYPE_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: SUB_ASSET_TYPE_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_SUB_ASSET_TYPE.ACTION,                    doLoadSubAssetTypeList),
    takeLatest(LOAD_A_SUB_ASSET_TYPE_INFO.ACTION,                  doLoadASubAssetType),
    takeLatest(SUB_ASSET_TYPE_FORM_NAME_SUBMIT,                    doSubmitSubAssetType),
    takeLatest(DELETE_A_SUB_ASSET_TYPE_ACTION.ACTION,              doDeleteASubAssetType),
    takeLatest(SUB_ASSET_TYPE_LIST_FILTER_FORM_NAME_SUBMIT,        doLoadSubAssetTypeListFilter)
];