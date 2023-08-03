import { 
    LOAD_LIST_THU_HOI_GCN,
    LOAD_A_THU_HOI_GCN_INFO,
    CLEAR_A_THU_HOI_GCN_ACTION,
    ADD_A_THU_HOI_GCN_ACTION,
    UPDATE_A_THU_HOI_GCN_ACTION,
    DELETE_A_THU_HOI_GCN_ACTION,
    UPLOAD_THU_HOI_GCN_FILES_ACTION,
    DELETE_A_THU_HOI_GCN_FILE_ACTION
} from '../actions';

import {THU_HOI_GCN_LIST_FILTER_FORM_NAME_SUCCESS} from '../constants';

const defaultState = {
    thuHoiGCNs: [],
    thuHoiGCNDetail: {},
    eviction_file: null,
    filter: {},
    pagination: {},
    errors: {}
};

const thuHoiGCNReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_THU_HOI_GCN.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                thuHoiGCNs: apiRes.data,
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_A_THU_HOI_GCN_INFO.SUCCESS:
            return {
                ...state,
                thuHoiGCNDetail: action.payload.data.data[0],
                eviction_file: action.payload.data.data[0] && action.payload.data.data[0].eviction_file,
                loading: false
            } 

        case CLEAR_A_THU_HOI_GCN_ACTION:
            return {
                ...state,
                thuHoiGCNDetail: {},
                eviction_file: null,
                loading: false
            }

        case ADD_A_THU_HOI_GCN_ACTION.SUCCESS:
            return {
                ...state,
                thuHoiGCNs: [action.payload.data.data, ...state.thuHoiGCNs],
                eviction_file: null,
                loading: false
            };
        
        case UPDATE_A_THU_HOI_GCN_ACTION:
            return {
                ...state,
                thuHoiGCNs: state.thuHoiGCNs.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_A_THU_HOI_GCN_ACTION.SUCCESS:
            return {
                ...state,
                thuHoiGCNs: state.thuHoiGCNs.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case THU_HOI_GCN_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload,
                loading: false,
            }    

        case UPLOAD_THU_HOI_GCN_FILES_ACTION.SUCCESS:
            return {
                ...state,
                eviction_file: action.payload.data.data.id || action.payload.data.id,
            };

        case DELETE_A_THU_HOI_GCN_FILE_ACTION.SUCCESS:
            return {
                ...state,
                eviction_file: null,
            };

        default:
            return state;
    }
};

export default thuHoiGCNReducer;