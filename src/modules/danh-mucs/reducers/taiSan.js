import { 
    LOAD_LIST_TAI_SAN,
    LOAD_A_TAI_SAN_INFO,
    LOAD_A_TAI_SAN_HISTORY,
    QUERY_A_TAI_SAN,
    ADD_A_TAI_SAN_ACTION,
    UPDATE_A_TAI_SAN_ACTION,
    DELETE_A_TAI_SAN_ACTION,
    CHANGE_TAI_SAN_TAB_ACTION,
    CLEAR_A_TAI_SAN,
    SET_A_TAI_SAN_QUERY_INDEX,
    CLEAR_A_TAI_SAN_ERROR_OR_MESSAGES,
    DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD,
    CLEAR_DOC_EXPORT,
} from '../actions';

import {
    TAI_SAN_FORM_NAME_SUCCESS,
    BAT_DONG_SAN_LIST_FILTER_FORM_NAME_SUCCESS,
    DONG_SAN_LIST_FILTER_FORM_NAME_SUBMIT
} from '../constants';

const defaultState = {
    taiSans: [],
    taiSanDetail: {},
    taiSanInsertContract: {},
    taiSanHistories: [],
    taiSanQuery: {},
    taiSanQueryIndex: -1,
    tabIndex: 0,
    remoteDOC: {},
    filter: {search: ''},
    pagination: {},
    errors: null,
    message: null,
};

const taiSanReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_TAI_SAN.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                taiSans: apiRes.data,
                taiSanDetail: {},
                // filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case BAT_DONG_SAN_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload
            };

        case DONG_SAN_LIST_FILTER_FORM_NAME_SUBMIT:
            return {
                ...state,
                filter: action.payload
            };

        case LOAD_A_TAI_SAN_INFO.SUCCESS:
            return {
                ...state,
                taiSanDetail: action.payload.data.data[0],
                loading: false
            }

        case LOAD_A_TAI_SAN_HISTORY.SUCCESS:
            return {
                ...state,
                taiSanHistories: action.payload.data.data,
                loading: false
            }

        case QUERY_A_TAI_SAN.SUCCESS:
            return {
                ...state,
                taiSanQuery: action.payload.data.data[0],
                loading: false
            }
        
        case CHANGE_TAI_SAN_TAB_ACTION.SUCCESS:
            return {
                ...state,
                tabIndex: action.payload
            }
        
        case TAI_SAN_FORM_NAME_SUCCESS:
            return {
                ...state,
                taiSans: [action.payload.data.data, ...state.taiSans],
                taiSanInsertContract: action.payload.data.data || action.payload.data,
                loading: false
            };
        
        case UPDATE_A_TAI_SAN_ACTION:
            return {
                ...state,
                taiSans: state.taiSans.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_A_TAI_SAN_ACTION.SUCCESS:
            return {
                ...state,
                taiSans: state.taiSans.filter(item => item.id !== parseFloat(action.payload.data.data)),
                message: action.payload.data.msg,
                loading: false
            };

        case DELETE_A_TAI_SAN_ACTION.FAILURE:
            return {
                ...state,
                errors: action.payload._error,
                loading: false
            };

        case CLEAR_A_TAI_SAN: 
            return {
                ...state,
                taiSanQuery: {}
            }
            
        case CLEAR_A_TAI_SAN_ERROR_OR_MESSAGES: 
            return {
                ...state,
                message: null,
                errors: null,
            }

        case SET_A_TAI_SAN_QUERY_INDEX:
            return {
                ...state,
                taiSanQueryIndex: action.payload,
            }

        case LOAD_LIST_TAI_SAN.LOADING:
        case LOAD_A_TAI_SAN_INFO.LOADING:
            return {
                ...state,
                loading: false
            };   

        case LOAD_LIST_TAI_SAN.FAILURE:
        case LOAD_A_TAI_SAN_INFO.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        case DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD.SUCCESS:
            return {
                ...state,
                remoteDOC: action.payload.data.data || action.payload.data,
            };
            
        case CLEAR_DOC_EXPORT: 
            return {
                ...state,
                remoteDOC: null,
            }

        default:
            return state;
    }
};

export default taiSanReducer;