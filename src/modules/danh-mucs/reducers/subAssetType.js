import { 
    LOAD_LIST_SUB_ASSET_TYPE,
    LOAD_A_SUB_ASSET_TYPE_INFO,
    ADD_A_SUB_ASSET_TYPE_ACTION,
    UPDATE_A_SUB_ASSET_TYPE_ACTION,
    DELETE_A_SUB_ASSET_TYPE_ACTION
} from '../actions';

const defaultState = {
    subAssetTypes: [],
    subAssetTypeDetail: {},
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const subAssetTypeReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_SUB_ASSET_TYPE.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                subAssetTypes: apiRes.data,
                subAssetTypeDetail: {},
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_A_SUB_ASSET_TYPE_INFO.SUCCESS:
            return {
                ...state,
                subAssetTypeDetail: action.payload.data.data[0],
                loading: false
            }

        case ADD_A_SUB_ASSET_TYPE_ACTION.SUCCESS:
            return {
                ...state,
                subAssetTypes: [action.payload.data.data, ...state.subAssetTypes],
                loading: false
            };
        
        case UPDATE_A_SUB_ASSET_TYPE_ACTION:
            return {
                ...state,
                subAssetTypes: state.subAssetTypes.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_A_SUB_ASSET_TYPE_ACTION.SUCCESS:
            return {
                ...state,
                subAssetTypes: state.subAssetTypes.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case LOAD_LIST_SUB_ASSET_TYPE.LOADING:
        case LOAD_A_SUB_ASSET_TYPE_INFO.LOADING:
            return {
                ...state,
                loading: false
            };   

        case LOAD_LIST_SUB_ASSET_TYPE.FAILURE:
        case LOAD_A_SUB_ASSET_TYPE_INFO.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        default:
            return state;
    }
};

export default subAssetTypeReducer;