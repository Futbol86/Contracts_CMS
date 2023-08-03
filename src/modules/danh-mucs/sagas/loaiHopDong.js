import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_LOAI_HOP_DONG,
         LOAD_A_LOAI_HOP_DONG_INFO,
         ADD_A_LOAI_HOP_DONG_ACTION,
         UPDATE_A_LOAI_HOP_DONG_ACTION,
         DELETE_A_LOAI_HOP_DONG_ACTION } from '../actions';
import * as api from '../apis';
import {LOAI_HOP_DONG_FORM_NAME, 
        LOAI_HOP_DONG_FORM_NAME_SUBMIT, 
        LOAI_HOP_DONG_FORM_NAME_SUCCESS, 
        LOAI_HOP_DONG_FORM_NAME_FAILURE,
        LOAI_HOP_DONG_LIST_FILTER_FORM_NAME_SUBMIT,
        LOAI_HOP_DONG_LIST_FILTER_FORM_NAME_SUCCESS,
        LOAI_HOP_DONG_LIST_FILTER_FORM_NAME_FAILURE
} from "../constants";
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadLoaiHopDongList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_LOAI_HOP_DONG.LOADING });
        const data = yield call(api.apiLoadLoaiHopDongList, payload);
        yield put({ type: LOAD_LIST_LOAI_HOP_DONG.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_LOAI_HOP_DONG.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadALoaiHopDong ({ payload }) {
    try {
        yield put({ type: LOAD_A_LOAI_HOP_DONG_INFO.LOADING });
        const data = yield call(api.apiLoadALoaiHopDong, payload);
        yield put({ type: LOAD_A_LOAI_HOP_DONG_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_LOAI_HOP_DONG_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitLoaiHopDong({ payload }) {
    try {
        yield put({ type: ADD_A_LOAI_HOP_DONG_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateALoaiHopDong, payload) :
                   yield call(api.apiCreateALoaiHopDong, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Loại Hợp Đồng "id: ${payload.id ?? data.data.data.id}"`
        });
        yield put({ type: LOAI_HOP_DONG_FORM_NAME_SUCCESS, payload: data });
        //yield put({ type: LOAI_HOP_DONG_FORM_NAME_SUCCESS, payload: "Hop dong giao dich" });
    }
    catch (error) {
        yield put({ type: LOAI_HOP_DONG_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteALoaiHopDong({ payload }) {
    try {
        yield put({ type: DELETE_A_LOAI_HOP_DONG_ACTION.LOADING });
        let data = yield call(api.apiDeleteALoaiHopDong, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: "DELETE",
            message: `Loại hợp đồng "id: ${payload}"`
        });
        yield put({ type: DELETE_A_LOAI_HOP_DONG_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_LOAI_HOP_DONG_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadLoaiHopDongListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_LOAI_HOP_DONG.LOADING });
        const data = yield call(api.apiLoadLoaiHopDongList, {filter: payload});
        yield put({ type: LOAD_LIST_LOAI_HOP_DONG.SUCCESS, payload: data });
        yield put({ type: LOAI_HOP_DONG_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: LOAI_HOP_DONG_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_LOAI_HOP_DONG.ACTION,                    doLoadLoaiHopDongList),
    takeLatest(LOAD_A_LOAI_HOP_DONG_INFO.ACTION,                  doLoadALoaiHopDong),
    takeLatest(LOAI_HOP_DONG_FORM_NAME_SUBMIT,                    doSubmitLoaiHopDong),
    takeLatest(DELETE_A_LOAI_HOP_DONG_ACTION.ACTION,              doDeleteALoaiHopDong),
    takeLatest(LOAI_HOP_DONG_LIST_FILTER_FORM_NAME_SUBMIT,        doLoadLoaiHopDongListFilter)
];