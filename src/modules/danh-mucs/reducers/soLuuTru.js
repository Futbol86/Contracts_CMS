import { 
    LOAD_LIST_SO_LUU_TRU,
    LOAD_A_SO_LUU_TRU_INFO,
    ADD_A_SO_LUU_TRU_ACTION,
    UPDATE_A_SO_LUU_TRU_ACTION,
    DELETE_A_SO_LUU_TRU_ACTION
} from '../actions';

const defaultState = {
    soLuuTrus: [],
    soLuuTruDetail: {},
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const soLuuTruReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_SO_LUU_TRU.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                soLuuTrus: apiRes.data,
                soLuuTruDetail: {},
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_A_SO_LUU_TRU_INFO.SUCCESS:
            return {
                ...state,
                soLuuTruDetail: action.payload.data.data[0],
                loading: false
            }

        case ADD_A_SO_LUU_TRU_ACTION.SUCCESS:
            return {
                ...state,
                soLuuTrus: [action.payload.data.data, ...state.soLuuTrus],
                loading: false
            };
        
        case UPDATE_A_SO_LUU_TRU_ACTION:
            return {
                ...state,
                soLuuTrus: state.soLuuTrus.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_A_SO_LUU_TRU_ACTION.SUCCESS:
            return {
                ...state,
                soLuuTrus: state.soLuuTrus.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case LOAD_LIST_SO_LUU_TRU.LOADING:
        case LOAD_A_SO_LUU_TRU_INFO.LOADING:
            return {
                ...state,
                loading: false
            };   

        case LOAD_LIST_SO_LUU_TRU.FAILURE:
        case LOAD_A_SO_LUU_TRU_INFO.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        default:
            return state;
    }
};

export default soLuuTruReducer;