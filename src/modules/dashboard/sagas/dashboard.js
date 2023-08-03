import { call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD, LOAD_LIST_NEW_REPORTS_ACTION } from '../actions';
import * as api from '../apis';

export function* doExportPhieuTraCuuToWORD({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD.LOADING });
        const data = yield call(api.apiExportPhieuTraCuuToWORD, payload);
        yield put({ type: DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD.FAILURE, payload: {errors: error} });
    }
}

function* doLoadNewReportsList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_NEW_REPORTS_ACTION.LOADING });
        const data = yield call(api.apiLoadNewReportsList, payload);
        yield put({ type: LOAD_LIST_NEW_REPORTS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_NEW_REPORTS_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD.ACTION,     doExportPhieuTraCuuToWORD),
    takeLatest(LOAD_LIST_NEW_REPORTS_ACTION.ACTION,         doLoadNewReportsList),
];