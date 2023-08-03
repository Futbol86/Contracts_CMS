import { 
    LOAD_LIST_DOI_TUONG,
    LOAD_A_DOI_TUONG_INFO,
    QUERY_A_DOI_TUONG,
    QUERY_A_DOI_TUONG_TYPE,
    ADD_A_DOI_TUONG_ACTION,
    UPDATE_A_DOI_TUONG_ACTION,
    DELETE_A_DOI_TUONG_ACTION,
    CHANGE_OWNER_TAB_ACTION,
    SET_A_DOI_TUONG_QUERY_INDEX,
    CLEAR_A_DOI_TUONG,
    CLEAR_A_DOI_TUONG_ERROR_OR_MESSAGES,
} from '../actions';

import {
    DOI_TUONG_FORM_NAME_SUCCESS
} from '../constants';

const defaultState = {
    doiTuongs: [],
    doiTuongDetail: {},
    doiTuongInsertContract: {},
    doiTuongQuery: {},
    doiTuongQueryType: null,
    doiTuongQueryIndex: -1,
    tabIndex: 0,
    filter: {search: ''},
    pagination: {},
    errors: {},
    message: {},
};

const doiTuongReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_DOI_TUONG.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                doiTuongs: apiRes.data,
                doiTuongDetail: {},
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_A_DOI_TUONG_INFO.SUCCESS:
            return {
                ...state,
                doiTuongDetail: action.payload.data.data[0],
                loading: false
            }

        case QUERY_A_DOI_TUONG.SUCCESS:
            return {
                ...state,
                doiTuongQuery: action.payload.data.data[0],
                loading: false
            }

        case QUERY_A_DOI_TUONG_TYPE: 
            return {
                ...state,
                doiTuongQueryType: action.payload,
                loading: false
            }

        case ADD_A_DOI_TUONG_ACTION.SUCCESS:
            return {
                ...state,
                doiTuongs: [action.payload.data.data, ...state.doiTuongs],
                loading: false
            };
        
        case DOI_TUONG_FORM_NAME_SUCCESS:
            return {
                ...state,
                doiTuongs: [action.payload.data.data, ...state.doiTuongs],
                doiTuongInsertContract: action.payload.data.data || action.payload.data,
                loading: false
            }

        case UPDATE_A_DOI_TUONG_ACTION:
            return {
                ...state,
                doiTuongs: state.doiTuongs.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_A_DOI_TUONG_ACTION.SUCCESS:
            return {
                ...state,
                doiTuongs: state.doiTuongs.filter(item => item.id !== parseFloat(action.payload.data.data)),
                message: action.payload.data.msg,
                loading: false
            };

        case DELETE_A_DOI_TUONG_ACTION.FAILURE:
            return {
                ...state,
                errors: action.payload._error,
                loading: false
            };

        case CHANGE_OWNER_TAB_ACTION:
            return {
                ...state,
                tabIndex: action.payload.tabIndex,
            }

        case CLEAR_A_DOI_TUONG: 
            return {
                ...state,
                doiTuongQuery: {}
            }

        case CLEAR_A_DOI_TUONG_ERROR_OR_MESSAGES: 
            return {
                ...state,
                message: null,
                errors: null,
            }

        case SET_A_DOI_TUONG_QUERY_INDEX:
            return {
                ...state,
                doiTuongQueryIndex: action.payload,
            }

        case LOAD_LIST_DOI_TUONG.LOADING:
        case LOAD_A_DOI_TUONG_INFO.LOADING:
            return {
                ...state,
                loading: false
            };   

        case LOAD_LIST_DOI_TUONG.FAILURE:
        case LOAD_A_DOI_TUONG_INFO.FAILURE:
        case QUERY_A_DOI_TUONG.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        default:
            return state;
    }
};

export default doiTuongReducer;