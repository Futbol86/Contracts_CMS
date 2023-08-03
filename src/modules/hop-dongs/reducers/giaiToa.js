import { 
    LOAD_LIST_GIAI_TOA,
    LOAD_A_GIAI_TOA_INFO,
    CLEAR_A_GIAI_TOA_ACTION,
    ADD_A_GIAI_TOA_ACTION,
    UPDATE_A_GIAI_TOA_ACTION,
    DELETE_A_GIAI_TOA_ACTION,
    CHANGE_GIAI_TOA_TAB_ACTION,
    UPLOAD_GIAI_TOA_FILES_ACTION,
    DELETE_A_GIAI_TOA_FILE_ACTION
} from '../actions';

import {GIAI_TOA_LIST_FILTER_FORM_NAME_SUCCESS} from '../constants';

const defaultState = {
    giaiToas: [],
    assetReleaseDetail: {},
    release_file: null,
    tabIndex: 0,
    filter: {},
    pagination: {},
    errors: {}
};

const giaiToaReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_GIAI_TOA.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                giaiToas: apiRes.data,
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_A_GIAI_TOA_INFO.SUCCESS:
            return {
                ...state,
                assetReleaseDetail: action.payload.data.data[0],
                release_file: action.payload.data.data[0] && action.payload.data.data[0].release_file,
                loading: false
            } 

        case CLEAR_A_GIAI_TOA_ACTION:
            return {
                ...state,
                assetReleaseDetail: {},
                file_name: null,
                loading: false
            }

        case ADD_A_GIAI_TOA_ACTION.SUCCESS:
            return {
                ...state,
                giaiToas: [action.payload.data.data, ...state.giaiToas],
                release_file: null,
                loading: false
            };
        
        case UPDATE_A_GIAI_TOA_ACTION:
            return {
                ...state,
                giaiToas: state.giaiToas.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_A_GIAI_TOA_ACTION.SUCCESS:
            return {
                ...state,
                giaiToas: state.giaiToas.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case CHANGE_GIAI_TOA_TAB_ACTION:
            return {
                ...state,
                tabIndex: action.payload
            }

        case GIAI_TOA_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload,
                loading: false,
            }    

        case UPLOAD_GIAI_TOA_FILES_ACTION.SUCCESS:
            return {
                ...state,
                release_file: action.payload.data.data.id || action.payload.data.id,
            };

        case DELETE_A_GIAI_TOA_FILE_ACTION.SUCCESS:
            return {
                ...state,
                release_file: null
            };

        default:
            return state;
    }
};

export default giaiToaReducer;