import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_LAND_PURPOSE,
         LOAD_A_LAND_PURPOSE_INFO,
         ADD_A_LAND_PURPOSE_ACTION,
         UPDATE_A_LAND_PURPOSE_ACTION,
         DELETE_A_LAND_PURPOSE_ACTION } from '../actions';
import {LAND_PURPOSE_FORM_NAME, 
        LAND_PURPOSE_FORM_NAME_SUBMIT, 
        LAND_PURPOSE_FORM_NAME_SUCCESS, 
        LAND_PURPOSE_FORM_NAME_FAILURE,
        LAND_PURPOSE_LIST_FILTER_FORM_NAME_SUBMIT,
        LAND_PURPOSE_LIST_FILTER_FORM_NAME_SUCCESS,
        LAND_PURPOSE_LIST_FILTER_FORM_NAME_FAILURE
} from "../constants";
import * as api from '../apis';
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadLandPurposeList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_LAND_PURPOSE.LOADING });
        const data = yield call(api.apiLoadLandPurposeList, payload);
        yield put({ type: LOAD_LIST_LAND_PURPOSE.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_LAND_PURPOSE.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadALandPurpose ({ payload }) {
    try {
        yield put({ type: LOAD_A_LAND_PURPOSE_INFO.LOADING });
        const data = yield call(api.apiLoadALandPurpose, payload);
        yield put({ type: LOAD_A_LAND_PURPOSE_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_LAND_PURPOSE_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitLandPurpose({ payload }) {
    try {
        yield put({ type: ADD_A_LAND_PURPOSE_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateALandPurpose, payload) :
                   yield call(api.apiCreateALandPurpose, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Mục đích sử dụng đất "id: ${payload.id ?? data.data.data.id}"`
        });
        yield put({ type: LAND_PURPOSE_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LAND_PURPOSE_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteALandPurpose({ payload }) {
    try {
        yield put({ type: DELETE_A_LAND_PURPOSE_ACTION.LOADING });
        let data = yield call(api.apiDeleteALandPurpose, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, { 
            username: userData.username, 
            method: "DELETE", 
            message: `Mục đích sử dụng đất "id: ${payload}"`
        });
        yield put({ type: DELETE_A_LAND_PURPOSE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_LAND_PURPOSE_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadLandPurposeListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_LAND_PURPOSE.LOADING });
        const data = yield call(api.apiLoadLandPurposeList, {filter: payload});
        yield put({ type: LOAD_LIST_LAND_PURPOSE.SUCCESS, payload: data });
        yield put({ type: LAND_PURPOSE_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: LAND_PURPOSE_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_LAND_PURPOSE.ACTION,                    doLoadLandPurposeList),
    takeLatest(LOAD_A_LAND_PURPOSE_INFO.ACTION,                  doLoadALandPurpose),
    takeLatest(LAND_PURPOSE_FORM_NAME_SUBMIT,                    doSubmitLandPurpose),
    takeLatest(DELETE_A_LAND_PURPOSE_ACTION.ACTION,              doDeleteALandPurpose),
    takeLatest(LAND_PURPOSE_LIST_FILTER_FORM_NAME_SUBMIT,        doLoadLandPurposeListFilter)
];