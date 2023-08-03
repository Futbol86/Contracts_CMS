import { call, put, takeLatest } from 'redux-saga/effects';
import {isEmpty} from "lodash";
import utils from '../../../services/utils';
import { LOAD_LIST_NGAN_CHAN,
         LOAD_A_NGAN_CHAN_INFO,
         LOAD_AN_ASSET_PREVENTION_SELECTED,
         ADD_A_NGAN_CHAN_ACTION,
         UPDATE_A_NGAN_CHAN_ACTION,
         DELETE_A_NGAN_CHAN_ACTION,
         DELETE_AN_ASSET_PREVENTION_DETAIL_ACTION,
         DELETE_AN_OWNER_PREVENTION_DETAIL_ACTION,
         UPLOAD_ASSET_PREVENTION_FILES_ACTION,
         DELETE_AN_ASSET_PREVENTION_FILE_ACTION
} from '../actions';
import {
    NGAN_CHAN_LIST_FILTER_FORM_NAME_SUBMIT,
    NGAN_CHAN_LIST_FILTER_FORM_NAME_SUCCESS,
    NGAN_CHAN_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';
import {NGAN_CHAN_FORM_NAME_SUBMIT, NGAN_CHAN_FORM_NAME_SUCCESS, NGAN_CHAN_FORM_NAME_FAILURE} from "../constants";
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadNganChanList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_NGAN_CHAN.LOADING });
        const data = yield call(api.apiLoadNganChanList, payload);
        yield put({ type: LOAD_LIST_NGAN_CHAN.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_NGAN_CHAN.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAnAssetPrevention ({ payload }) {
    try {
        yield put({ type: LOAD_A_NGAN_CHAN_INFO.LOADING });
        const data = yield call(api.apiLoadAnAssetPrevention, payload);
        yield put({ type: LOAD_A_NGAN_CHAN_INFO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_NGAN_CHAN_INFO.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAnAssetPreventionSelected ({ payload }) {
    try {
        yield put({ type: LOAD_AN_ASSET_PREVENTION_SELECTED.LOADING });
        const data = yield call(api.apiLoadAnAssetPreventionSelected, payload);
        yield put({ type: LOAD_AN_ASSET_PREVENTION_SELECTED.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_AN_ASSET_PREVENTION_SELECTED.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitNganChan({ payload }) {
    try {
        // if(payload.prevention_type_id === 1 && payload.assets && payload.assets.length !== 0) {
        //     // Tìm xem có tài sản nào bị ngăn chặn ko
        //     for(let i = 0; i < payload.assets.length; i++) {
        //         if(!isEmpty(payload.assets[i])) {
        //             if(payload.assets[i].error) {
        //                 yield put({ type: NGAN_CHAN_FORM_NAME_FAILURE, payload: {_error: payload.assets[i].error} });
        //                 return;              
        //             }
        //         }
        //     }
        // }

        // if(payload.prevention_type_id === 2 && payload.owners && payload.owners.length !== 0) {
        //     for(let i = 0; i < payload.owners.length; i++) {
        //         if(!isEmpty(payload.owners[i])) {
        //             if(payload.owners[i].error) {
        //                 yield put({ type: NGAN_CHAN_FORM_NAME_FAILURE, payload: {_error: payload.owners[i].error} });
        //                 return;
        //             }
        //         }
        //     }
        // }

        let data = payload.id ? yield call(api.apiUpdateANganChan, payload) : yield call(api.apiCreateANganChan, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, {
            username: userData.username,
            method: payload.id ? "UPDATE" : "CREATE",
            message: `Ngăn chặn "id: ${payload.id ?? data.data.data.id}"`
        });

        yield put({ type: NGAN_CHAN_FORM_NAME_SUCCESS, payload: data });
        if(!payload.id)
            yield put({ type: ADD_A_NGAN_CHAN_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: NGAN_CHAN_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteANganChan({ payload }) {
    try {
        yield put({ type: DELETE_A_NGAN_CHAN_ACTION.LOADING });
        let data = yield call(api.apiDeleteANganChan, payload);

        // Add user log
        const userData = auth.getUserFromStorage();
        yield call(userApi.apiAddAUserLog, { 
            username: userData.username, 
            method: "DELETE",
            message: `Ngăn chặn "id: ${payload}"`
        });
        yield put({ type: DELETE_A_NGAN_CHAN_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_NGAN_CHAN_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAnAssetPreventionDetail({ payload }) {
    try {
        yield put({ type: DELETE_AN_ASSET_PREVENTION_DETAIL_ACTION.LOADING });
        let data = yield call(api.apiDeleteAnAssetPreventionDetail, payload);
        yield put({ type: DELETE_AN_ASSET_PREVENTION_DETAIL_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_ASSET_PREVENTION_DETAIL_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAnOwnerPreventionDetail({ payload }) {
    try {
        yield put({ type: DELETE_AN_OWNER_PREVENTION_DETAIL_ACTION.LOADING });
        let data = yield call(api.apiDeleteAnOwnerPreventionDetail, payload);
        yield put({ type: DELETE_AN_OWNER_PREVENTION_DETAIL_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_OWNER_PREVENTION_DETAIL_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadNganChanListFilter({ payload }) {
    try {
        let filter = {};
        if(payload.group_id) 
            filter.group_id = payload.group_id;
        if(payload.search) 
            filter.search = payload.search;
        if(payload.fromDate)
            filter.fromDate = payload.fromDate;
        if(payload.toDate)
            filter.toDate = payload.toDate;

        payload.filter = filter;

        yield put({ type: LOAD_LIST_NGAN_CHAN.LOADING });
        const data = yield call(api.apiLoadNganChanList, {filter: payload});
        yield put({ type: LOAD_LIST_NGAN_CHAN.SUCCESS, payload: data });
        yield put({ type: NGAN_CHAN_LIST_FILTER_FORM_NAME_SUCCESS, payload: filter });
    }
    catch (error) {
        yield put({ type: NGAN_CHAN_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* douploadAssetPreventionFiles({ payload }) {
    try {
        yield put({ type: UPLOAD_ASSET_PREVENTION_FILES_ACTION.LOADING });
        const data = yield call(utils.uploadFile, payload, 'asset_preventions');
        yield put({ type: UPLOAD_ASSET_PREVENTION_FILES_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPLOAD_ASSET_PREVENTION_FILES_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAnAssetPreventionFile({ payload }) {
    try {
        yield put({ type: DELETE_AN_ASSET_PREVENTION_FILE_ACTION.LOADING });
        const data = yield call(utils.deleteFile, {...payload, subPath: 'asset_preventions'});
        yield put({ type: DELETE_AN_ASSET_PREVENTION_FILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_ASSET_PREVENTION_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_NGAN_CHAN.ACTION,                    doLoadNganChanList),
    takeLatest(LOAD_A_NGAN_CHAN_INFO.ACTION,                  doLoadAnAssetPrevention),
    takeLatest(LOAD_AN_ASSET_PREVENTION_SELECTED.ACTION,      doLoadAnAssetPreventionSelected),
    takeLatest(NGAN_CHAN_FORM_NAME_SUBMIT,                    doSubmitNganChan),
    takeLatest(DELETE_A_NGAN_CHAN_ACTION.ACTION,              doDeleteANganChan),
    takeLatest(DELETE_AN_ASSET_PREVENTION_DETAIL_ACTION.ACTION, doDeleteAnAssetPreventionDetail),
    takeLatest(DELETE_AN_OWNER_PREVENTION_DETAIL_ACTION.ACTION, doDeleteAnOwnerPreventionDetail),
    takeLatest(NGAN_CHAN_LIST_FILTER_FORM_NAME_SUBMIT,        doLoadNganChanListFilter),
    takeLatest(UPLOAD_ASSET_PREVENTION_FILES_ACTION.ACTION,   douploadAssetPreventionFiles),
    takeLatest(DELETE_AN_ASSET_PREVENTION_FILE_ACTION.ACTION, doDeleteAnAssetPreventionFile),
];