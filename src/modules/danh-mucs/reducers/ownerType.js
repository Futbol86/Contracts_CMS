import { 
    LOAD_LIST_OWNER_TYPE,
} from '../actions';

const defaultState = {
    ownerTypes: [],
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const ownerTypeReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_OWNER_TYPE.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                ownerTypes: apiRes.data,
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_LIST_OWNER_TYPE.LOADING:

        case LOAD_LIST_OWNER_TYPE.FAILURE:

        default:
            return state;
    }
};

export default ownerTypeReducer;