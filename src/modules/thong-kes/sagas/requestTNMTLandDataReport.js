import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_TNMT_LAND_DATA_REPORT, LOAD_LIST_LAND_DATA_REPORT_OF_TNMT } from '../actions';
import { 
    REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME_SUBMIT, 
    REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME_SUCCESS,
    REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME_FAILURE,
    LAND_DATA_OF_TNMT_REPORT_LIST_FILTER_FORM_NAME_SUBMIT,
    LAND_DATA_OF_TNMT_REPORT_LIST_FILTER_FORM_NAME_SUCCESS,
    LAND_DATA_OF_TNMT_REPORT_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';

export function* doLoadTNMTLandDataReportList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_TNMT_LAND_DATA_REPORT.LOADING });
        const data = yield call(api.apiLoadRequestTNMTLandDataReportList, payload);
        yield put({ type: LOAD_LIST_TNMT_LAND_DATA_REPORT.SUCCESS, payload: data });
        yield put({ type: REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME_SUCCESS, payload: payload.filter });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_TNMT_LAND_DATA_REPORT.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadLandDataReportOfTNMTList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_LAND_DATA_REPORT_OF_TNMT.LOADING });
        const data = yield call(api.apiRequestLandDataReportOfTNMTList, payload);
        yield put({ type: LOAD_LIST_LAND_DATA_REPORT_OF_TNMT.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_LAND_DATA_REPORT_OF_TNMT.FAILURE, payload: {errors: error} });
    }
}

function* doRequestTNMTLandDataReportListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_TNMT_LAND_DATA_REPORT.LOADING });
        const data = yield call(api.apiLoadRequestTNMTLandDataReportList, {filter: payload});
        yield put({ type: LOAD_LIST_TNMT_LAND_DATA_REPORT.SUCCESS, payload: data });
        yield put({ type: REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doLandDataOfTNMTReportListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_LAND_DATA_REPORT_OF_TNMT.LOADING });
        const data = yield call(api.apiRequestLandDataReportOfTNMTList, payload);
        yield put({ type: LOAD_LIST_LAND_DATA_REPORT_OF_TNMT.SUCCESS, payload: data });
        yield put({ type: LAND_DATA_OF_TNMT_REPORT_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: LAND_DATA_OF_TNMT_REPORT_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_TNMT_LAND_DATA_REPORT.ACTION,                     doLoadTNMTLandDataReportList),
    takeLatest(LOAD_LIST_LAND_DATA_REPORT_OF_TNMT.ACTION,                  doLoadLandDataReportOfTNMTList),
    takeLatest(REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME_SUBMIT, doRequestTNMTLandDataReportListFilter),
    takeLatest(LAND_DATA_OF_TNMT_REPORT_LIST_FILTER_FORM_NAME_SUBMIT,      doLandDataOfTNMTReportListFilter),
];