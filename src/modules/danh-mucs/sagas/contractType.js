import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_CONTRACT_TYPE,
         LOAD_A_CONTRACT_TYPE_INFO,
         ADD_A_CONTRACT_TYPE_ACTION,
         UPDATE_A_CONTRACT_TYPE_ACTION,
         DELETE_A_CONTRACT_TYPE_ACTION } from '../actions';
import * as api from '../apis';
import {
    CONTRACT_TYPE_FORM_NAME,
    CONTRACT_TYPE_FORM_NAME_SUBMIT,
    CONTRACT_TYPE_FORM_NAME_SUCCESS,
    CONTRACT_TYPE_FORM_NAME_FAILURE,
    CONTRACT_TYPE_LIST_FILTER_FORM_NAME,
    CONTRACT_TYPE_LIST_FILTER_FORM_NAME_SUBMIT,
    CONTRACT_TYPE_LIST_FILTER_FORM_NAME_SUCCESS,
    CONTRACT_TYPE_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadContractTypeList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_CONTRACT_TYPE.LOADING });
        const data = yield call(api.apiLoadContractTypeList, payload);
        yield put({ type: LOAD_LIST_CONTRACT_TYPE.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_CONTRACT_TYPE.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAContractType ({ payload }) {
    try {
        yield put({ type: LOAD_A_CONTRACT_TYPE_INFO.LOADING });
        const data = yield call(api.apiLoadAContractType, payload);
        yield put({ type: LOAD_A_CONTRACT_TYPE_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_CONTRACT_TYPE_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitContractType({ payload }) {
    try {
        yield put({ type: ADD_A_CONTRACT_TYPE_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateAContractType, payload) :
                   yield call(api.apiCreateAContractType, payload);
        
        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Loại giao dịch "id: ${payload.id ?? data.data.data.id}"`
        });
        yield put({ type: CONTRACT_TYPE_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: CONTRACT_TYPE_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAContractType({ payload }) {
    try {
        yield put({ type: DELETE_A_CONTRACT_TYPE_ACTION.LOADING });
        let data = yield call(api.apiDeleteAContractType, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, { 
            username: userData.username, 
            method: "DELETE",
            message: `Loại giao dịch "id: ${payload}"`
        });
        yield put({ type: DELETE_A_CONTRACT_TYPE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_CONTRACT_TYPE_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadContractTypeListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_CONTRACT_TYPE.LOADING });
        const data = yield call(api.apiLoadContractTypeList, {filter: payload});
        yield put({ type: LOAD_LIST_CONTRACT_TYPE.SUCCESS, payload: data });
        yield put({ type: CONTRACT_TYPE_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: CONTRACT_TYPE_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_CONTRACT_TYPE.ACTION,                    doLoadContractTypeList),
    takeLatest(LOAD_A_CONTRACT_TYPE_INFO.ACTION,                  doLoadAContractType),
    takeLatest(CONTRACT_TYPE_FORM_NAME_SUBMIT,                    doSubmitContractType),
    takeLatest(DELETE_A_CONTRACT_TYPE_ACTION.ACTION,              doDeleteAContractType),
    takeLatest(CONTRACT_TYPE_LIST_FILTER_FORM_NAME_SUBMIT,        doLoadContractTypeListFilter)
];