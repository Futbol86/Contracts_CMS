import { 
    LOAD_LIST_CONTRACT_TYPE,
    LOAD_A_CONTRACT_TYPE_INFO,
    ADD_A_CONTRACT_TYPE_ACTION,
    UPDATE_A_CONTRACT_TYPE_ACTION,
    DELETE_A_CONTRACT_TYPE_ACTION
} from '../actions';

const defaultState = {
    contractTypes: [],
    contractTypeDetail: {},
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const contractTypeReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_CONTRACT_TYPE.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                contractTypes: apiRes.data,
                contractTypeDetail: {},
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_A_CONTRACT_TYPE_INFO.SUCCESS:
            return {
                ...state,
                contractTypeDetail: action.payload.data.data[0],
                loading: false
            }

        case ADD_A_CONTRACT_TYPE_ACTION.SUCCESS:
            return {
                ...state,
                contractTypes: [action.payload.data.data, ...state.contractTypes],
                loading: false
            };
        
        case UPDATE_A_CONTRACT_TYPE_ACTION:
            return {
                ...state,
                contractTypes: state.contractTypes.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_A_CONTRACT_TYPE_ACTION.SUCCESS:
            return {
                ...state,
                contractTypes: state.contractTypes.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case LOAD_LIST_CONTRACT_TYPE.LOADING:
        case LOAD_A_CONTRACT_TYPE_INFO.LOADING:
            return {
                ...state,
                loading: false
            };   

        case LOAD_LIST_CONTRACT_TYPE.FAILURE:
        case LOAD_A_CONTRACT_TYPE_INFO.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        default:
            return state;
    }
};

export default contractTypeReducer;