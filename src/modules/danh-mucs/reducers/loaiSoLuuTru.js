import { 
    LOAD_LIST_LOAI_SO_LUU_TRU,
    LOAD_A_LOAI_SO_LUU_TRU_INFO,
    ADD_A_LOAI_SO_LUU_TRU_ACTION,
    UPDATE_A_LOAI_SO_LUU_TRU_ACTION,
    DELETE_A_LOAI_SO_LUU_TRU_ACTION
} from '../actions';

const defaultState = {
    loaiSoLuuTrus: [],
    loaiSoLuuTruDetail: {},
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const loaiSoLuuTruReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_LOAI_SO_LUU_TRU.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                loaiSoLuuTrus: apiRes.data,
                loaiSoLuuTruDetail: {},
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_A_LOAI_SO_LUU_TRU_INFO.SUCCESS:
            return {
                ...state,
                loaiSoLuuTruDetail: action.payload.data.data[0],
                loading: false
            }

        case ADD_A_LOAI_SO_LUU_TRU_ACTION.SUCCESS:
            return {
                ...state,
                loaiSoLuuTrus: [action.payload.data.data, ...state.loaiSoLuuTrus],
                loading: false
            };
        
        case UPDATE_A_LOAI_SO_LUU_TRU_ACTION:
            return {
                ...state,
                loaiSoLuuTrus: state.loaiSoLuuTrus.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_A_LOAI_SO_LUU_TRU_ACTION.SUCCESS:
            return {
                ...state,
                loaiSoLuuTrus: state.loaiSoLuuTrus.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case LOAD_LIST_LOAI_SO_LUU_TRU.LOADING:
        case LOAD_A_LOAI_SO_LUU_TRU_INFO.LOADING:
            return {
                ...state,
                loading: false
            };   

        case LOAD_LIST_LOAI_SO_LUU_TRU.FAILURE:
        case LOAD_A_LOAI_SO_LUU_TRU_INFO.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        default:
            return state;
    }
};

export default loaiSoLuuTruReducer;