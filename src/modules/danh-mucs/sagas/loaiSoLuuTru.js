import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_LOAI_SO_LUU_TRU,
         LOAD_A_LOAI_SO_LUU_TRU_INFO,
         ADD_A_LOAI_SO_LUU_TRU_ACTION,
         UPDATE_A_LOAI_SO_LUU_TRU_ACTION,
         DELETE_A_LOAI_SO_LUU_TRU_ACTION } from '../actions';
import {
    LOAI_SO_LUU_TRU_FORM_NAME,
    LOAI_SO_LUU_TRU_FORM_NAME_SUBMIT,
    LOAI_SO_LUU_TRU_FORM_NAME_SUCCESS,
    LOAI_SO_LUU_TRU_FORM_NAME_FAILURE,
    LOAI_SO_LUU_TRU_LIST_FILTER_FORM_NAME,
    LOAI_SO_LUU_TRU_LIST_FILTER_FORM_NAME_SUBMIT,
    LOAI_SO_LUU_TRU_LIST_FILTER_FORM_NAME_SUCCESS,
    LOAI_SO_LUU_TRU_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadLoaiSoLuuTruList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_LOAI_SO_LUU_TRU.LOADING });
        const data = yield call(api.apiLoadLoaiSoLuuTruList, payload);
        yield put({ type: LOAD_LIST_LOAI_SO_LUU_TRU.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_LOAI_SO_LUU_TRU.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadALoaiSoLuuTru ({ payload }) {
    try {
        yield put({ type: LOAD_A_LOAI_SO_LUU_TRU_INFO.LOADING });
        const data = yield call(api.apiLoadALoaiSoLuuTru, payload);
        yield put({ type: LOAD_A_LOAI_SO_LUU_TRU_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_LOAI_SO_LUU_TRU_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitLoaiSoLuuTru({ payload }) {
    try {
        yield put({ type: ADD_A_LOAI_SO_LUU_TRU_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateALoaiSoLuuTru, payload) :
                   yield call(api.apiCreateALoaiSoLuuTru, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Loại sổ lưu trữ "id: ${payload.id ?? data.data.data.id}"`
        });
        yield put({ type: LOAI_SO_LUU_TRU_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAI_SO_LUU_TRU_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteALoaiSoLuuTru({ payload }) {
    try {
        yield put({ type: DELETE_A_LOAI_SO_LUU_TRU_ACTION.LOADING });
        let data = yield call(api.apiDeleteALoaiSoLuuTru, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, { 
            username: userData.username, 
            method: "DELETE", 
            message: `Loại sổ lưu trữ "id: ${payload}"`
        });
        yield put({ type: DELETE_A_LOAI_SO_LUU_TRU_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_LOAI_SO_LUU_TRU_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadLoaiSoLuuTruListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_LOAI_SO_LUU_TRU.LOADING });
        const data = yield call(api.apiLoadLoaiSoLuuTruList, {filter: payload});
        yield put({ type: LOAD_LIST_LOAI_SO_LUU_TRU.SUCCESS, payload: data });
        yield put({ type: LOAI_SO_LUU_TRU_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: LOAI_SO_LUU_TRU_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_LOAI_SO_LUU_TRU.ACTION,                    doLoadLoaiSoLuuTruList),
    takeLatest(LOAD_A_LOAI_SO_LUU_TRU_INFO.ACTION,                  doLoadALoaiSoLuuTru),
    takeLatest(LOAI_SO_LUU_TRU_FORM_NAME_SUBMIT,                    doSubmitLoaiSoLuuTru),
    takeLatest(DELETE_A_LOAI_SO_LUU_TRU_ACTION.ACTION,              doDeleteALoaiSoLuuTru),
    takeLatest(LOAI_SO_LUU_TRU_LIST_FILTER_FORM_NAME_SUBMIT,        doLoadLoaiSoLuuTruListFilter)
];