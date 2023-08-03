import { call, put, takeLatest } from 'redux-saga/effects';
import utils from '../../../services/utils';
import { 
    LOAD_LIST_NEW_DONG_A_HOP_DONG,
} from '../actions';
import {
    NEW_DONG_A_HOP_DONG_IN_LIST_FILTER_FORM_NAME_SUBMIT,
    NEW_DONG_A_HOP_DONG_IN_LIST_FILTER_FORM_NAME_SUCCESS,
} from '../constants';
import * as api from '../apis';
import {isEmpty} from "lodash";
import * as userApi from '../../users/apis';
import auth from '../../../services/auth';

export function* doLoadNewDongAHopDongList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_NEW_DONG_A_HOP_DONG.LOADING });
        const data = yield call(api.apiLoadNewDongAHopDongList, payload);
        yield put({ type: LOAD_LIST_NEW_DONG_A_HOP_DONG.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_NEW_DONG_A_HOP_DONG.FAILURE, payload: {errors: error} });
    }
}

function* doLoadNewDongAHopDongInListFilter({ payload }) {
    try {
        let filter = {};
        if(payload.search) 
            filter.search = payload.search;
        if(payload.fromDate)
            filter.fromDate = payload.fromDate;
        if(payload.toDate)
            filter.toDate = payload.toDate;

        payload.filter = filter;

        yield put({ type: LOAD_LIST_NEW_DONG_A_HOP_DONG.LOADING });
        const data = yield call(api.apiLoadNewDongAHopDongList, payload);
        yield put({ type: LOAD_LIST_NEW_DONG_A_HOP_DONG.SUCCESS, payload: data });
        yield put({ type: NEW_DONG_A_HOP_DONG_IN_LIST_FILTER_FORM_NAME_SUCCESS, payload: filter });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_NEW_DONG_A_HOP_DONG.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_NEW_DONG_A_HOP_DONG.ACTION,                   doLoadNewDongAHopDongList),
    takeLatest(NEW_DONG_A_HOP_DONG_IN_LIST_FILTER_FORM_NAME_SUBMIT,    doLoadNewDongAHopDongInListFilter),
];