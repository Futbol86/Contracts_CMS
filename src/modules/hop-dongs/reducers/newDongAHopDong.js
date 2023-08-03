import { 
    LOAD_LIST_NEW_DONG_A_HOP_DONG,
    DISPLAY_FULL_CONTEXT_ACTION,
} from '../actions';

import {
    NEW_DONG_A_HOP_DONG_LIST_FILTER_FORM_NAME_SUCCESS,
    NEW_DONG_A_HOP_DONG_IN_LIST_FILTER_FORM_NAME_SUCCESS
} from '../constants';

const defaultState = {
    hopDongs: [],
    hopDongSearchs: [],
    hopDongTotalSearch: 0,
    search_keys: [],
    contractDetail: {},
    contract_files: [],
    filter: {},
    pagination: {},
    errors: {}
};

const newDongAHopDongReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_NEW_DONG_A_HOP_DONG.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;

            return {
                ...state,
                hopDongs: apiRes.data,
                pagination: { total, limit, skip },
                loading: false
            };

        case DISPLAY_FULL_CONTEXT_ACTION:
            return {
                ...state,
                fullContext: action.payload,
            }
        
        default:
            return state;
    }
};

export default newDongAHopDongReducer;