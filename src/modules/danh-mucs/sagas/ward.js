import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_WARD
        } from '../actions';
import * as api from '../apis';

export function* doLoadWardList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_WARD.LOADING });
        const data = yield call(api.apiLoadWardList, payload);
        yield put({ type: LOAD_LIST_WARD.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_WARD.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_WARD.ACTION,                    doLoadWardList)
];