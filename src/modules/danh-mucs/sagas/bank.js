import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_BANK,
         ADD_A_BANK_ACTION
        } from '../actions';
import * as api from '../apis';

export function* doLoadBankList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_BANK.LOADING });
        const data = yield call(api.apiLoadBankList, payload);
        yield put({ type: LOAD_LIST_BANK.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_BANK.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_BANK.ACTION,                    doLoadBankList)
];