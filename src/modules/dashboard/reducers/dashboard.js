import { 
    CHANGE_TAB_ACTION, DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD, CLEAR_DOC_EXPORT, SET_PHIEU_TRA_CUU_ASSET_DETAIL, 
    LOAD_LIST_NEW_REPORTS_ACTION 
} from '../actions';

const defaultState = {
    tabIndex: 0,
    remoteDOC: {},
    asset_detail: null,
    newReports: [],
};

const dashboardReducer = (state = defaultState, action = {}) => {
    switch (action.type) {        
        case CHANGE_TAB_ACTION:
            return {
                ...state,
                tabIndex: action.payload,
            }

        case DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD.SUCCESS:
            return {
                ...state,
                remoteDOC: action.payload.data.data || action.payload.data,
            };
            
        case CLEAR_DOC_EXPORT: 
            return {
                ...state,
                remoteDOC: null,
            }

        case SET_PHIEU_TRA_CUU_ASSET_DETAIL:
            return {
                ...state,
                asset_detail: action.payload,
            }

        case LOAD_LIST_NEW_REPORTS_ACTION.SUCCESS:
            const apiRes = action.payload.data;
            //const {total, limit, skip} = apiRes;

            return {
                ...state,
                newReports: apiRes.data,
                // pagination: { total, limit, skip },
                loading: false
            };

        default:
            return state;
    }
};

export default dashboardReducer;