import { 
    LOAD_LIST_USER_LOG,
    LOAD_A_USER_LOG_INFO,
    ADD_A_USER_LOG_ACTION,
    DELETE_A_USER_LOG_ACTION
} from '../actions';

import {
    USER_LOG_LIST_FILTER_FORM_NAME_SUBMIT, 
    USER_LOG_LIST_FILTER_FORM_NAME_SUCCESS
} from '../constants';

const defaultState = {
    userLogs: [],
    userLogDetail: {},
    filter: {},
    pagination: {},
    errors: {}
};

const userLogReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_USER_LOG.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                userLogs: apiRes.data,
                //filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_A_USER_LOG_INFO.SUCCESS:
            return {
                ...state,
                userLogDetail: action.payload.data.data[0],
                loading: false
            }

        case ADD_A_USER_LOG_ACTION.SUCCESS:
            return {
                ...state,
                userLogs: [action.payload.data.data, ...state.userLogs],
                loading: false
            };

        case DELETE_A_USER_LOG_ACTION.SUCCESS:
            return {
                ...state,
                userLogs: state.userLogs.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case LOAD_LIST_USER_LOG.LOADING:
        case LOAD_A_USER_LOG_INFO.LOADING:
            return {
                ...state,
                loading: false
            };   

        case LOAD_LIST_USER_LOG.FAILURE:
        case LOAD_A_USER_LOG_INFO.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        case USER_LOG_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload,
                // filter: {
                //     ...action.payload
                // }
            };

        default:
            return state;
    }
};

export default userLogReducer;