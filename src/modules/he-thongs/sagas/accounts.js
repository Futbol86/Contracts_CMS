import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_ACCOUNT,
         LOAD_AN_ACCOUNT_INFO,
         ADD_AN_ACCOUNT_ACTION,
         UPDATE_AN_ACCOUNT_ACTION,
         DELETE_AN_ACCOUNT_ACTION } from '../actions';
import {
    ACCOUNT_LIST_FILTER_FORM_NAME_SUBMIT,
    ACCOUNT_LIST_FILTER_FORM_NAME_SUCCESS,
    ACCOUNT_LIST_FILTER_FORM_NAME_FAILURE,
    ACCOUNT_CHANGE_PASSWORD_FORM_NAME_SUBMIT,
    ACCOUNT_CHANGE_PASSWORD_FORM_NAME_SUCCESS,
    ACCOUNT_CHANGE_PASSWORD_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';
import {ACCOUNT_FORM_NAME, ACCOUNT_FORM_NAME_SUBMIT, ACCOUNT_FORM_NAME_SUCCESS, ACCOUNT_FORM_NAME_FAILURE} from "../constants";
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadAccountList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_ACCOUNT.LOADING });
        const data = yield call(api.apiLoadAccountList, payload);
        yield put({ type: LOAD_LIST_ACCOUNT.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_ACCOUNT.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAnAccount ({ payload }) {
    try {
        yield put({ type: LOAD_AN_ACCOUNT_INFO.LOADING });
        const data = yield call(api.apiLoadAnAccount, payload);
        yield put({ type: LOAD_AN_ACCOUNT_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_AN_ACCOUNT_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitAccount({ payload }) {
    try {
        yield put({ type: ADD_AN_ACCOUNT_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateAnAccount, payload) :
                   yield call(api.apiCreateAnAccount, payload);
        if(data.data.status === 0) {
            yield put({ type: ACCOUNT_FORM_NAME_FAILURE, payload: {_error: "Tài khoản đã tồn tại!"} });
            return;
        }

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Tài khoản "id: ${payload.id ?? data.data.data.id}"`
        });
        yield put({ type: ACCOUNT_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: ACCOUNT_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAnAccount({ payload }) {
    try {
        yield put({ type: DELETE_AN_ACCOUNT_ACTION.LOADING });
        let data = yield call(api.apiDeleteAnAccount, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, { 
            username: userData.username, 
            method: "DELETE",
            message: `Tài khoản "id: ${payload}"`
        });
        yield put({ type: DELETE_AN_ACCOUNT_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_ACCOUNT_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadAccountListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_ACCOUNT.LOADING });
        const data = yield call(api.apiLoadAccountList, {filter: payload});
        yield put({ type: LOAD_LIST_ACCOUNT.SUCCESS, payload: data });
        yield put({ type: ACCOUNT_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: ACCOUNT_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doAccountChangePassword({ payload }) {
    try {
        yield put({ type: ADD_AN_ACCOUNT_ACTION.LOADING });
        const data = yield call(api.apiAccountChangePassword, payload);
        yield put({ type: ACCOUNT_CHANGE_PASSWORD_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: ACCOUNT_CHANGE_PASSWORD_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_ACCOUNT.ACTION,                    doLoadAccountList),
    takeLatest(LOAD_AN_ACCOUNT_INFO.ACTION,                 doLoadAnAccount),
    takeLatest(ACCOUNT_FORM_NAME_SUBMIT,                    doSubmitAccount),
    takeLatest(DELETE_AN_ACCOUNT_ACTION.ACTION,             doDeleteAnAccount),
    takeLatest(ACCOUNT_LIST_FILTER_FORM_NAME_SUBMIT,        doLoadAccountListFilter),
    takeLatest(ACCOUNT_CHANGE_PASSWORD_FORM_NAME_SUBMIT,    doAccountChangePassword),
];