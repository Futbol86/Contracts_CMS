import { 
    LOAD_LIST_PERMISSION,
    LOAD_A_PERMISSION_INFO,
    ADD_A_PERMISSION_ACTION,
    UPDATE_A_PERMISSION_ACTION,
    DELETE_A_PERMISSION_ACTION,
    CLEAR_A_PERMISSION_ACTION
} from '../actions';

const defaultState = {
    permissions: [],
    permissionDetail: {},
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const permissionReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_PERMISSION.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                permissions: apiRes.data,
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_A_PERMISSION_INFO.SUCCESS:
            return {
                ...state,
                permissionDetail: action.payload.data.data[0],
                loading: false
            }

        case ADD_A_PERMISSION_ACTION.SUCCESS:
            return {
                ...state,
                permissions: [action.payload.data.data, ...state.permissions],
                loading: false
            };
        
        case UPDATE_A_PERMISSION_ACTION:
            return {
                ...state,
                permissions: state.permissions.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_A_PERMISSION_ACTION.SUCCESS:
            return {
                ...state,
                permissions: state.permissions.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case CLEAR_A_PERMISSION_ACTION:
            return {
                ...state,
                permissionDetail: {},
            }

        case LOAD_LIST_PERMISSION.LOADING:
        case LOAD_A_PERMISSION_INFO.LOADING:
            return {
                ...state,
                loading: false
            };   

        case LOAD_LIST_PERMISSION.FAILURE:
        case LOAD_A_PERMISSION_INFO.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        default:
            return state;
    }
};

export default permissionReducer;