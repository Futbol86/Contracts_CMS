import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_USER_LOG,
         LOAD_A_USER_LOG_INFO,
         ADD_A_USER_LOG_ACTION,
         DELETE_A_USER_LOG_ACTION,
} from '../actions';
import {
    USER_LOG_LIST_FILTER_FORM_NAME_SUBMIT,
    USER_LOG_LIST_FILTER_FORM_NAME_SUCCESS,
    USER_LOG_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';
import {USER_LOG_FORM_NAME, USER_LOG_FORM_NAME_SUBMIT, USER_LOG_FORM_NAME_SUCCESS, USER_LOG_FORM_NAME_FAILURE} from "../constants";

export function* doLoadUserLogList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_USER_LOG.LOADING });
        const data = yield call(api.apiLoadUserLogList, payload);
        yield put({ type: LOAD_LIST_USER_LOG.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_USER_LOG.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAUserLog ({ payload }) {
    try {
        yield put({ type: LOAD_A_USER_LOG_INFO.LOADING });
        const data = yield call(api.apiLoadAUserLog, payload);
        yield put({ type: LOAD_A_USER_LOG_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_USER_LOG_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitUserLog({ payload }) {
    try {
        yield put({ type: ADD_A_USER_LOG_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateAUserLog, payload) :
                   yield call(api.apiCreateAUserLog, payload);
        yield put({ type: USER_LOG_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: USER_LOG_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAUserLog({ payload }) {
    try {
        yield put({ type: DELETE_A_USER_LOG_ACTION.LOADING });
        let data = yield call(api.apiDeleteAUserLog, payload);
        yield put({ type: DELETE_A_USER_LOG_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_USER_LOG_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadUserLogListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_USER_LOG.LOADING });
        const data = yield call(api.apiLoadUserLogList, {filter: payload});
        yield put({ type: LOAD_LIST_USER_LOG.SUCCESS, payload: data });
        yield put({ type: USER_LOG_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: USER_LOG_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_USER_LOG.ACTION,                    doLoadUserLogList),
    takeLatest(LOAD_A_USER_LOG_INFO.ACTION,                  doLoadAUserLog),
    takeLatest(USER_LOG_FORM_NAME_SUBMIT,                    doSubmitUserLog),
    takeLatest(DELETE_A_USER_LOG_ACTION.ACTION,              doDeleteAUserLog),
    takeLatest(USER_LOG_LIST_FILTER_FORM_NAME_SUBMIT,        doLoadUserLogListFilter)
];