import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_PERMISSION,
         LOAD_A_PERMISSION_INFO,
         ADD_A_PERMISSION_ACTION,
         UPDATE_A_PERMISSION_ACTION,
         DELETE_A_PERMISSION_ACTION } from '../actions';
import {
    PERMISSION_LIST_FILTER_FORM_NAME_SUBMIT,
    PERMISSION_LIST_FILTER_FORM_NAME_SUCCESS,
    PERMISSION_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';
import {PERMISSION_FORM_NAME, PERMISSION_FORM_NAME_SUBMIT, PERMISSION_FORM_NAME_SUCCESS, PERMISSION_FORM_NAME_FAILURE} from "../constants";
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadPermissionList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_PERMISSION.LOADING });
        const data = yield call(api.apiLoadPermissionList, payload);
        yield put({ type: LOAD_LIST_PERMISSION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_PERMISSION.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAPermission ({ payload }) {
    try {
        yield put({ type: LOAD_A_PERMISSION_INFO.LOADING });
        const data = yield call(api.apiLoadAPermission, payload);
        yield put({ type: LOAD_A_PERMISSION_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_PERMISSION_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitPermission({ payload }) {
    try {
        yield put({ type: ADD_A_PERMISSION_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateAPermission, payload) :
                   yield call(api.apiCreateAPermission, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Quyền "id: ${payload.id ?? data.data.data.id}"`
        });
        yield put({ type: PERMISSION_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: PERMISSION_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAPermission({ payload }) {
    try {
        yield put({ type: DELETE_A_PERMISSION_ACTION.LOADING });
        let data = yield call(api.apiDeleteAPermission, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, { 
            username: userData.username, 
            method: "DELETE", 
            message: `Quyền "id: ${payload}"`
        });
        yield put({ type: DELETE_A_PERMISSION_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_PERMISSION_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadPermissionListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_PERMISSION.LOADING });
        const data = yield call(api.apiLoadPermissionList, {filter: payload});
        yield put({ type: LOAD_LIST_PERMISSION.SUCCESS, payload: data });
        yield put({ type: PERMISSION_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: PERMISSION_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_PERMISSION.ACTION,                   doLoadPermissionList),
    takeLatest(LOAD_A_PERMISSION_INFO.ACTION,                 doLoadAPermission),
    takeLatest(PERMISSION_FORM_NAME_SUBMIT,                   doSubmitPermission),
    takeLatest(DELETE_A_PERMISSION_ACTION.ACTION,             doDeleteAPermission),
    takeLatest(PERMISSION_LIST_FILTER_FORM_NAME_SUBMIT,       doLoadPermissionListFilter)
];