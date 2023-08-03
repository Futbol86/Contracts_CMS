import { 
    LOAD_LIST_SYSTEM_CONFIG,
    ADD_A_SYSTEM_CONFIG_ACTION,
    CLEAR_A_SYSTEM_CONFIG_ACTION,
    UPLOAD_HDSD_FILE_ACTION,
    DELETE_HDSD_FILE_ACTION,
    SET_HDSD_FILE_ACTION
} from '../actions';

const defaultState = {
    systemConfigs: [],
    file_name: null,
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const systemConfigReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_SYSTEM_CONFIG.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                systemConfigs: apiRes.data,
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case ADD_A_SYSTEM_CONFIG_ACTION.SUCCESS:
            return {
                ...state,
                systemConfigs: [action.payload.data.data, ...state.systemConfigs],
                loading: false
            };

        case CLEAR_A_SYSTEM_CONFIG_ACTION: {
            return {
                ...state,
                systemConfigs: [],
            }
        }

        case LOAD_LIST_SYSTEM_CONFIG.LOADING:
            return {
                ...state,
                loading: false
            };   

        case LOAD_LIST_SYSTEM_CONFIG.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        case UPLOAD_HDSD_FILE_ACTION.SUCCESS:
            return {
                ...state,
                file_name: action.payload.data.data.id || action.payload.data.id,
            };

        case DELETE_HDSD_FILE_ACTION.SUCCESS:
            return {
                ...state,
                file_name: null
            };

        case SET_HDSD_FILE_ACTION: {
            return {
                ...state,
                file_name: action.payload,
            }
        }

        default:
            return state;
    }
};

export default systemConfigReducer;