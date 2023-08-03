import { 
    LOAD_LIST_LOAI_HOP_DONG,
    LOAD_A_LOAI_HOP_DONG_INFO,
    ADD_A_LOAI_HOP_DONG_ACTION,
    UPDATE_A_LOAI_HOP_DONG_ACTION,
    DELETE_A_LOAI_HOP_DONG_ACTION
} from '../actions';

import {
    LOAI_HOP_DONG_LIST_FILTER_FORM_NAME_SUCCESS
} from '../constants';

const defaultState = {
    loaiHopDongs: [],
    loaiHopDongDetail: {},
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const loaiHopDongReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_LOAI_HOP_DONG.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                loaiHopDongs: apiRes.data,
                loaiHopDongDetail: {},
                // filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAI_HOP_DONG_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload
            };

        case LOAD_A_LOAI_HOP_DONG_INFO.SUCCESS:
            return {
                ...state,
                loaiHopDongDetail: action.payload.data.data[0],
                loading: false
            }

        case ADD_A_LOAI_HOP_DONG_ACTION.SUCCESS:
            return {
                ...state,
                loaiHopDongs: [action.payload.data.data, ...state.loaiHopDongs],
                loading: false
            };
        
        case UPDATE_A_LOAI_HOP_DONG_ACTION:
            return {
                ...state,
                loaiHopDongs: state.loaiHopDongs.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_A_LOAI_HOP_DONG_ACTION.SUCCESS:
            return {
                ...state,
                loaiHopDongs: state.loaiHopDongs.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case LOAD_LIST_LOAI_HOP_DONG.LOADING:
        case LOAD_A_LOAI_HOP_DONG_INFO.LOADING:
            return {
                ...state,
                loading: false
            };   

        case LOAD_LIST_LOAI_HOP_DONG.FAILURE:
        case LOAD_A_LOAI_HOP_DONG_INFO.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        default:
            return state;
    }
};

export default loaiHopDongReducer;