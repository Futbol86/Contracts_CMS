import { 
    LOAD_LIST_NGAN_CHAN,
    LOAD_A_NGAN_CHAN_INFO,
    LOAD_AN_ASSET_PREVENTION_SELECTED,
    SET_ASSET_PREVENTION_SELECTED,
    CLEAR_A_NGAN_CHAN_ACTION,
    CLEAR_A_NGAN_CHAN_FILTER,
    ADD_A_NGAN_CHAN_ACTION,
    UPDATE_A_NGAN_CHAN_ACTION,
    DELETE_A_NGAN_CHAN_ACTION,
    CHANGE_NGAN_CHAN_TAB_ACTION,
    UPLOAD_ASSET_PREVENTION_FILES_ACTION,
    DELETE_AN_ASSET_PREVENTION_FILE_ACTION,
} from '../actions';

import {NGAN_CHAN_LIST_FILTER_FORM_NAME_SUCCESS, NGAN_CHAN_FORM_NAME_FAILURE} from '../constants';

const defaultState = {
    nganChans: [],
    assetPreventionDetail: {},
    assetPreventionSelected: [],
    file_name: null,
    tabIndex: 0,
    filter: {},
    pagination: {},
    errors: {},
    error: {},
};

const nganChanReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_NGAN_CHAN.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                nganChans: apiRes.data,
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_A_NGAN_CHAN_INFO.SUCCESS:
            return {
                ...state,
                assetPreventionDetail: action.payload.data.data[0],
                file_name: action.payload.data.data[0] && action.payload.data.data[0].file_name,
                loading: false
            } 
    
        case LOAD_AN_ASSET_PREVENTION_SELECTED.SUCCESS:
            return {
                ...state,
                assetPreventionSelected: action.payload.data.data[0],
                loading: false
            } 

        case SET_ASSET_PREVENTION_SELECTED:
            return {
                ...state,
                assetPreventionSelected: action.payload,
            }

        case CLEAR_A_NGAN_CHAN_ACTION:
            return {
                ...state,
                assetPreventionDetail: {},
                file_name: null,
                loading: false
            }

        case ADD_A_NGAN_CHAN_ACTION.SUCCESS:
            return {
                ...state,
                nganChans: [action.payload.data.data, ...state.nganChans],
                file_name: null,
                loading: false
            };
        
        case UPDATE_A_NGAN_CHAN_ACTION:
            return {
                ...state,
                nganChans: state.nganChans.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };

        case DELETE_A_NGAN_CHAN_ACTION.SUCCESS:
            return {
                ...state,
                nganChans: state.nganChans.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case CHANGE_NGAN_CHAN_TAB_ACTION:
            return {
                ...state,
                tabIndex: action.payload
            }

        case NGAN_CHAN_FORM_NAME_FAILURE:
            return {
                ...state,
                error: action.payload.errors,
                errors: action.payload.errors,
                loading: false
            }

        case NGAN_CHAN_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload,
                loading: false,
            }    
        
        case CLEAR_A_NGAN_CHAN_FILTER: 
            return {
                ...state,
                filter: {},
                loading: false,
            }  

        case UPLOAD_ASSET_PREVENTION_FILES_ACTION.SUCCESS:
            return {
                ...state,
                file_name: action.payload.data.data.id || action.payload.data.id,
            };

        case DELETE_AN_ASSET_PREVENTION_FILE_ACTION.SUCCESS:
            return {
                ...state,
                file_name: null
                // files: state.files.filter(item => item !== fileToRemove),
                // removedFiles: [
                //     ...state.removedFiles,
                //     fileToRemove
                // ]
            };
            // const fileToRemove = state.files && state.files.find(item => item === action.payload.id);
            // if (fileToRemove) {
            //     return {
            //         ...state,
            //         file_name: null
            //         // files: state.files.filter(item => item !== fileToRemove),
            //         // removedFiles: [
            //         //     ...state.removedFiles,
            //         //     fileToRemove
            //         // ]
            //     };
            // }
            // else
            //     return state;

        default:
            return state;
    }
};

export default nganChanReducer;