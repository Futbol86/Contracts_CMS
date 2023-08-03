import { call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { LOAD_LIST_DOI_TUONG,
         LOAD_A_DOI_TUONG_INFO,
         ADD_A_DOI_TUONG_ACTION,
         UPDATE_A_DOI_TUONG_ACTION,
         DELETE_A_DOI_TUONG_ACTION,
         QUERY_A_DOI_TUONG,
         QUERY_A_DOI_TUONG_TYPE,
} from '../actions';
import {
    DOI_TUONG_FORM_NAME,
    DOI_TUONG_FORM_NAME_SUBMIT,
    DOI_TUONG_FORM_NAME_SUCCESS,
    DOI_TUONG_FORM_NAME_FAILURE,
    CA_NHAN_LIST_FILTER_FORM_NAME,
    CA_NHAN_LIST_FILTER_FORM_NAME_SUBMIT,
    CA_NHAN_LIST_FILTER_FORM_NAME_SUCCESS,
    CA_NHAN_LIST_FILTER_FORM_NAME_FAILURE,
    TO_CHUC_LIST_FILTER_FORM_NAME,
    TO_CHUC_LIST_FILTER_FORM_NAME_SUBMIT,
    TO_CHUC_LIST_FILTER_FORM_NAME_SUCCESS,
    TO_CHUC_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadDoiTuongList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_DOI_TUONG.LOADING });
        const data = yield call(api.apiLoadDoiTuongList, payload);
        yield put({ type: LOAD_LIST_DOI_TUONG.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_DOI_TUONG.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadADoiTuong ({ payload }) {
    try {
        yield put({ type: LOAD_A_DOI_TUONG_INFO.LOADING });
        const data = yield call(api.apiLoadADoiTuong, payload);
        yield put({ type: LOAD_A_DOI_TUONG_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_DOI_TUONG_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doQueryADoiTuong ({ payload }) {
    try {
        yield put({ type: QUERY_A_DOI_TUONG.LOADING });
        let data = yield call(api.apiQueryADoiTuong, payload);
        yield put({ type: QUERY_A_DOI_TUONG_TYPE, payload: payload.query_type });
        yield put({ type: QUERY_A_DOI_TUONG.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUERY_A_DOI_TUONG.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitDoiTuong({ payload }) {
    if(payload.issued_date) {
        if(!payload.id)
            payload.issued_date = moment(payload.issued_date).add(1, "day");
    }

    try {
        yield put({ type: ADD_A_DOI_TUONG_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateADoiTuong, payload) :
                   yield call(api.apiCreateADoiTuong, payload);
        if(data && data.data && data.data.data) {
            data.data.data.doiTuongType = payload.doiTuongType;
        }
            
        if(data.data.status !== 1) {
            yield put({ type: DOI_TUONG_FORM_NAME_FAILURE, payload: {_error: data.data.msg} });
            return;
        }

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Đối tượng "id: ${payload.id ?? data.data.data.id}"`
        });
        yield put({ type: DOI_TUONG_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOI_TUONG_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteADoiTuong({ payload }) {
    try {
        yield put({ type: DELETE_A_DOI_TUONG_ACTION.LOADING });
        let data = yield call(api.apiDeleteADoiTuong, payload);

        if(data.data.status === 1) {
            // Add user log
            const userData = auth.getUserFromStorage();
            yield call(userApi.apiAddAUserLog, { 
                username: userData.username, 
                method: "DELETE", 
                message: `Đối tượng "id: ${payload}"`
            });
            yield put({ type: DELETE_A_DOI_TUONG_ACTION.SUCCESS, payload: data });
        } else {
            yield put({ type: DELETE_A_DOI_TUONG_ACTION.FAILURE, payload: {_error: data.data.msg} });
        }
    }
    catch (error) {
        yield put({ type: DELETE_A_DOI_TUONG_ACTION.FAILURE, payload: {errors: error} });
    }
}


function* doLoadCaNhanListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_DOI_TUONG.LOADING });
        const data = yield call(api.apiLoadDoiTuongList, {filter: payload});
        yield put({ type: LOAD_LIST_DOI_TUONG.SUCCESS, payload: data });
        yield put({ type: CA_NHAN_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: CA_NHAN_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doLoadToChucListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_DOI_TUONG.LOADING });
        const data = yield call(api.apiLoadDoiTuongList, {filter: payload});
        yield put({ type: LOAD_LIST_DOI_TUONG.SUCCESS, payload: data });
        yield put({ type: TO_CHUC_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: TO_CHUC_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_DOI_TUONG.ACTION,                    doLoadDoiTuongList),
    takeLatest(LOAD_A_DOI_TUONG_INFO.ACTION,                  doLoadADoiTuong),
    takeLatest(QUERY_A_DOI_TUONG.ACTION,                      doQueryADoiTuong),
    takeLatest(DOI_TUONG_FORM_NAME_SUBMIT,                    doSubmitDoiTuong),
    takeLatest(DELETE_A_DOI_TUONG_ACTION.ACTION,              doDeleteADoiTuong),
    takeLatest(CA_NHAN_LIST_FILTER_FORM_NAME_SUBMIT,          doLoadCaNhanListFilter),
    takeLatest(TO_CHUC_LIST_FILTER_FORM_NAME_SUBMIT,          doLoadToChucListFilter)
];