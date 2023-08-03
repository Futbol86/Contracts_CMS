import { 
    LOAD_LIST_DISTRICT,
} from '../actions';

const defaultState = {
    districts: [],
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const districtReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_DISTRICT.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                districts: apiRes.data,
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_LIST_DISTRICT.LOADING:

        case LOAD_LIST_DISTRICT.FAILURE:

        default:
            return state;
    }
};

export default districtReducer;