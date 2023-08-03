import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_DISTRICT
        } from '../actions';
import * as api from '../apis';

export function* doLoadDistrictList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_DISTRICT.LOADING });
        const data = yield call(api.apiLoadDistrictList, payload);
        yield put({ type: LOAD_LIST_DISTRICT.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_DISTRICT.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_DISTRICT.ACTION,                    doLoadDistrictList)
];