import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_OWNER_TYPE,
         ADD_A_OWNER_TYPE_ACTION,
        } from '../actions';
import * as api from '../apis';

export function* doLoadOwnerTypeList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_OWNER_TYPE.LOADING });
        const data = yield call(api.apiLoadOwnerTypeList, payload);
        yield put({ type: LOAD_LIST_OWNER_TYPE.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_OWNER_TYPE.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_OWNER_TYPE.ACTION,                    doLoadOwnerTypeList)
];