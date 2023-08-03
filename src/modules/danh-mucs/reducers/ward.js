import { 
    LOAD_LIST_WARD,
} from '../actions';

const defaultState = {
    wards: [],
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const wardReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_WARD.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                wards: apiRes.data,
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_LIST_WARD.LOADING:

        case LOAD_LIST_WARD.FAILURE:

        default:
            return state;
    }
};

export default wardReducer;