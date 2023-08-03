import { 
    LOAD_LIST_BANK,
} from '../actions';

const defaultState = {
    banks: [],
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const bankReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_BANK.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                banks: apiRes.data,
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_LIST_BANK.LOADING:

        case LOAD_LIST_BANK.FAILURE:

        default:
            return state;
    }
};

export default bankReducer;