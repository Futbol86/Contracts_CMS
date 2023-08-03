import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_USER_GROUP,
         LOAD_A_USER_GROUP_INFO,
         ADD_A_USER_GROUP_ACTION,
         UPDATE_A_USER_GROUP_ACTION,
         DELETE_A_USER_GROUP_ACTION } from '../actions';
import {
    USER_GROUP_LIST_FILTER_FORM_NAME_SUBMIT,
    USER_GROUP_LIST_FILTER_FORM_NAME_SUCCESS,
    USER_GROUP_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';
import {USER_GROUP_FORM_NAME, USER_GROUP_FORM_NAME_SUBMIT, USER_GROUP_FORM_NAME_SUCCESS, USER_GROUP_FORM_NAME_FAILURE} from "../constants";
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadUserGroupList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_USER_GROUP.LOADING });
        const data = yield call(api.apiLoadUserGroupList, payload);
        yield put({ type: LOAD_LIST_USER_GROUP.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_USER_GROUP.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAUserGroup ({ payload }) {
    try {
        yield put({ type: LOAD_A_USER_GROUP_INFO.LOADING });
        const data = yield call(api.apiLoadAUserGroup, payload);
        yield put({ type: LOAD_A_USER_GROUP_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_USER_GROUP_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitUserGroup({ payload }) {
    try {
        yield put({ type: ADD_A_USER_GROUP_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateAUserGroup, payload) :
                   yield call(api.apiCreateAUserGroup, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Đơn vị "id: ${payload.id ?? data.data.data.id}"`
        });
        yield put({ type: USER_GROUP_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: USER_GROUP_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAUserGroup({ payload }) {
    try {
        yield put({ type: DELETE_A_USER_GROUP_ACTION.LOADING });
        let data = yield call(api.apiDeleteAUserGroup, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, { 
            username: userData.username, 
            method: "DELETE",
            message: `Đơn vị "id: ${payload}"`
        });
        yield put({ type: DELETE_A_USER_GROUP_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_USER_GROUP_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadUserGroupListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_USER_GROUP.LOADING });
        const data = yield call(api.apiLoadUserGroupList, {filter: payload});
        yield put({ type: LOAD_LIST_USER_GROUP.SUCCESS, payload: data });
        yield put({ type: USER_GROUP_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: USER_GROUP_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_USER_GROUP.ACTION,                   doLoadUserGroupList),
    takeLatest(LOAD_A_USER_GROUP_INFO.ACTION,                 doLoadAUserGroup),
    takeLatest(USER_GROUP_FORM_NAME_SUBMIT,                   doSubmitUserGroup),
    takeLatest(DELETE_A_USER_GROUP_ACTION.ACTION,             doDeleteAUserGroup),
    takeLatest(USER_GROUP_LIST_FILTER_FORM_NAME_SUBMIT,       doLoadUserGroupListFilter)
];