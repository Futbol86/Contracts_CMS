import { call, put, takeLatest } from 'redux-saga/effects';
import { 
    LOAD_LIST_REPORT, LOAD_LIST_ARCHIVE_BOOK_FILTER, 
    DOC_EXPORT_SAMPLE_31_TO_EXCEL 
} from '../actions';
import {
    ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME_SUBMIT,
    ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME_SUCCESS,
    ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME_FAILURE,
} from '../constants';
import * as api from '../apis';

export function* doLoadReportList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_REPORT.LOADING });
        const data = yield call(api.apiLoadReportList, payload);
        yield put({ type: LOAD_LIST_REPORT.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_REPORT.FAILURE, payload: {errors: error} });
    }
}

function* doArchiveBookReportListFilter({ payload }) {
    try {
        let filter = {};
        if(payload.group_id) 
            filter.group_id = payload.group_id;
        if(payload.archive_book_id)
            filter.archive_book_id = payload.archive_book_id;
        if(payload.isAdmin) 
            filter.isAdmin = payload.isAdmin;
        if(payload.search) 
            filter.search = payload.search;
        if(payload.fromDate)
            filter.fromDate = payload.fromDate;
        if(payload.toDate)
            filter.toDate = payload.toDate;

        payload.filter = filter;

        // const data = yield call(api.apiLoadNewHopDongList, payload);

        // yield put({ type: LOAD_LIST_ARCHIVE_BOOK_FILTER.SUCCESS, payload: data });
        // yield put({ type: ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export function* doExportSample31ToEXCEL({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_SAMPLE_31_TO_EXCEL.LOADING });
        const data = yield call(api.apiExportSample31ToEXCEL, payload);
        console.log('----- doExportSample31ToEXCEL', data);
        yield put({ type: DOC_EXPORT_SAMPLE_31_TO_EXCEL.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_SAMPLE_31_TO_EXCEL.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_REPORT.ACTION,                               doLoadReportList),
    takeLatest(ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME_SUBMIT,      doArchiveBookReportListFilter),

    takeLatest(DOC_EXPORT_SAMPLE_31_TO_EXCEL.ACTION,                  doExportSample31ToEXCEL),
];