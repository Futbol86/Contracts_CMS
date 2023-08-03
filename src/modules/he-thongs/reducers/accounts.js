import { 
    LOAD_LIST_ACCOUNT,
    LOAD_AN_ACCOUNT_INFO,
    ADD_AN_ACCOUNT_ACTION,
    UPDATE_AN_ACCOUNT_ACTION,
    DELETE_AN_ACCOUNT_ACTION,
    CLEAR_AN_ACCOUN_ACTION
} from '../actions';

const defaultState = {
    accounts: [],
    accountDetail: {},
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const accountReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_ACCOUNT.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                accounts: apiRes.data,
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_AN_ACCOUNT_INFO.SUCCESS:
            return {
                ...state,
                accountDetail: action.payload.data.data[0],
                loading: false
            }

        case ADD_AN_ACCOUNT_ACTION.SUCCESS:
            return {
                ...state,
                accounts: [action.payload.data.data, ...state.accounts],
                loading: false
            };
        
        case UPDATE_AN_ACCOUNT_ACTION:
            return {
                ...state,
                accounts: state.accounts.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_AN_ACCOUNT_ACTION.SUCCESS:
            return {
                ...state,
                accounts: state.accounts.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case CLEAR_AN_ACCOUN_ACTION: 
            return {
                ...state,
                accountDetail: {},
            }

        case LOAD_LIST_ACCOUNT.LOADING:
        case LOAD_AN_ACCOUNT_INFO.LOADING:
            return {
                ...state,
                loading: false
            };   

        case LOAD_LIST_ACCOUNT.FAILURE:
        case LOAD_AN_ACCOUNT_INFO.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        default:
            return state;
    }
};

export default accountReducer;