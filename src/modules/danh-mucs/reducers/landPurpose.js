import { 
    LOAD_LIST_LAND_PURPOSE,
    LOAD_A_LAND_PURPOSE_INFO,
    ADD_A_LAND_PURPOSE_ACTION,
    UPDATE_A_LAND_PURPOSE_ACTION,
    DELETE_A_LAND_PURPOSE_ACTION
} from '../actions';

const defaultState = {
    landPurposes: [],
    landPurposeDetail: {},
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const landPurposeReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_LAND_PURPOSE.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                landPurposes: apiRes.data,
                landPurposeDetail: {},
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_A_LAND_PURPOSE_INFO.SUCCESS:
            return {
                ...state,
                landPurposeDetail: action.payload.data.data[0],
                loading: false
            }

        case ADD_A_LAND_PURPOSE_ACTION.SUCCESS:
            return {
                ...state,
                landPurposes: [action.payload.data.data, ...state.landPurposes],
                loading: false
            };
        
        case UPDATE_A_LAND_PURPOSE_ACTION:
            return {
                ...state,
                landPurposes: state.landPurposes.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_A_LAND_PURPOSE_ACTION.SUCCESS:
            return {
                ...state,
                landPurposes: state.landPurposes.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case LOAD_LIST_LAND_PURPOSE.LOADING:
        case LOAD_A_LAND_PURPOSE_INFO.LOADING:
            return {
                ...state,
                loading: false
            };   

        case LOAD_LIST_LAND_PURPOSE.FAILURE:
        case LOAD_A_LAND_PURPOSE_INFO.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        default:
            return state;
    }
};

export default landPurposeReducer;