import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_PRINT_SEARCH_TICKET,
         ADD_A_PRINT_SEARCH_TICKET_ACTION,
} from '../actions';
import {
    PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME_SUBMIT,
    PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME_SUCCESS,
    PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';

export function* doLoadPrintSearchTicketList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_PRINT_SEARCH_TICKET.LOADING });
        const data = yield call(api.apiLoadPrintSearchTicketList, payload);
        yield put({ type: LOAD_LIST_PRINT_SEARCH_TICKET.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_PRINT_SEARCH_TICKET.FAILURE, payload: {errors: error} });
    }
}

export function* doAddAPrintSearchTicket({ payload }) {
    try {
        yield put({ type: ADD_A_PRINT_SEARCH_TICKET_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateAPrintSearchTicket, payload) :
                   yield call(api.apiCreateAPrintSearchTicket, payload);
        yield put({ type: ADD_A_PRINT_SEARCH_TICKET_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: ADD_A_PRINT_SEARCH_TICKET_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadPrintSearchTicketListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_PRINT_SEARCH_TICKET.LOADING });
        const data = yield call(api.apiLoadPrintSearchTicketList, {filter: payload});
        yield put({ type: LOAD_LIST_PRINT_SEARCH_TICKET.SUCCESS, payload: data });
        yield put({ type: PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_PRINT_SEARCH_TICKET.ACTION,                    doLoadPrintSearchTicketList),
    takeLatest(ADD_A_PRINT_SEARCH_TICKET_ACTION.ACTION,                 doAddAPrintSearchTicket),
    takeLatest(PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME_SUBMIT,        doLoadPrintSearchTicketListFilter)
];