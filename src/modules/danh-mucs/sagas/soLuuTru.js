import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_SO_LUU_TRU,
         LOAD_A_SO_LUU_TRU_INFO,
         ADD_A_SO_LUU_TRU_ACTION,
         UPDATE_A_SO_LUU_TRU_ACTION,
         DELETE_A_SO_LUU_TRU_ACTION } from '../actions';
import {
    SO_LUU_TRU_FORM_NAME,
    SO_LUU_TRU_FORM_NAME_SUBMIT,
    SO_LUU_TRU_FORM_NAME_SUCCESS,
    SO_LUU_TRU_FORM_NAME_FAILURE,
    SO_LUU_TRU_LIST_FILTER_FORM_NAME,
    SO_LUU_TRU_LIST_FILTER_FORM_NAME_SUBMIT,
    SO_LUU_TRU_LIST_FILTER_FORM_NAME_SUCCESS,
    SO_LUU_TRU_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadSoLuuTruList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_SO_LUU_TRU.LOADING });
        const data = yield call(api.apiLoadSoLuuTruList, payload);
        yield put({ type: LOAD_LIST_SO_LUU_TRU.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_SO_LUU_TRU.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadASoLuuTru ({ payload }) {
    try {
        yield put({ type: LOAD_A_SO_LUU_TRU_INFO.LOADING });
        const data = yield call(api.apiLoadASoLuuTru, payload);
        yield put({ type: LOAD_A_SO_LUU_TRU_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_SO_LUU_TRU_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitSoLuuTru({ payload }) {
    try {
        yield put({ type: ADD_A_SO_LUU_TRU_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateASoLuuTru, payload) :
                   yield call(api.apiCreateASoLuuTru, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Sổ lưu trữ "id: ${payload.id ?? data.data.data.id}"`
        });
        yield put({ type: SO_LUU_TRU_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: SO_LUU_TRU_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteASoLuuTru({ payload }) {
    try {
        yield put({ type: DELETE_A_SO_LUU_TRU_ACTION.LOADING });
        let data = yield call(api.apiDeleteASoLuuTru, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, { 
            username: userData.username, 
            method: "DELETE", 
            message: `Sổ lưu trữ "id: ${payload}"`
        });
        yield put({ type: DELETE_A_SO_LUU_TRU_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_SO_LUU_TRU_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadSoLuuTruListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_SO_LUU_TRU.LOADING });
        const data = yield call(api.apiLoadSoLuuTruList, {filter: payload});
        yield put({ type: LOAD_LIST_SO_LUU_TRU.SUCCESS, payload: data });
        yield put({ type: SO_LUU_TRU_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: SO_LUU_TRU_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_SO_LUU_TRU.ACTION,                    doLoadSoLuuTruList),
    takeLatest(LOAD_A_SO_LUU_TRU_INFO.ACTION,                  doLoadASoLuuTru),
    takeLatest(SO_LUU_TRU_FORM_NAME_SUBMIT,                    doSubmitSoLuuTru),
    takeLatest(DELETE_A_SO_LUU_TRU_ACTION.ACTION,              doDeleteASoLuuTru),
    takeLatest(SO_LUU_TRU_LIST_FILTER_FORM_NAME_SUBMIT,        doLoadSoLuuTruListFilter)
];