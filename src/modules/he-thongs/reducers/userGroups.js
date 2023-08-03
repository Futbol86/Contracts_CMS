import { 
    LOAD_LIST_USER_GROUP,
    LOAD_A_USER_GROUP_INFO,
    ADD_A_USER_GROUP_ACTION,
    UPDATE_A_USER_GROUP_ACTION,
    DELETE_A_USER_GROUP_ACTION,
    CLEAR_A_USER_GROUP_ACTION
} from '../actions';

const defaultState = {
    userGroups: [],
    userGroupDetail: {},
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const userGroupReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_USER_GROUP.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                userGroups: apiRes.data,
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_A_USER_GROUP_INFO.SUCCESS:
            return {
                ...state,
                userGroupDetail: action.payload.data.data[0],
                loading: false
            }

        case ADD_A_USER_GROUP_ACTION.SUCCESS:
            return {
                ...state,
                userGroups: [action.payload.data.data, ...state.userGroups],
                loading: false
            };
        
        case UPDATE_A_USER_GROUP_ACTION:
            return {
                ...state,
                userGroups: state.userGroups.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_A_USER_GROUP_ACTION.SUCCESS:
            return {
                ...state,
                userGroups: state.userGroups.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case CLEAR_A_USER_GROUP_ACTION:
            return {
                ...state,
                userGroupDetail: {},
            }

        case LOAD_LIST_USER_GROUP.LOADING:
        case LOAD_A_USER_GROUP_INFO.LOADING:
            return {
                ...state,
                loading: false
            };   

        case LOAD_LIST_USER_GROUP.FAILURE:
        case LOAD_A_USER_GROUP_INFO.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        default:
            return state;
    }
};

export default userGroupReducer;