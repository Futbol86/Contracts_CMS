import { 
    LOAD_LIST_NEW_HOP_DONG,
    LOAD_A_NEW_HOP_DONG_INFO,
    ADD_A_NEW_HOP_DONG_ACTION,
    CLEAR_A_NEW_HOP_DONG_ACTION,
    DISPLAY_FULL_CONTEXT_ACTION,
    UPLOAD_NEW_HOP_DONG_FILES_ACTION,
    DOC_EXPORT_NEW_CONTRACT_LIST_TO_EXCEL,
    DOC_EXPORT_NGAN_CHAN_LIST_TO_EXCEL,
    DOC_EXPORT_GIAI_TOA_LIST_TO_EXCEL,
    DOC_EXPORT_THU_HOI_GCN_LIST_TO_EXCEL,
    CLEAR_EXCEL_EXPORT,
    DELETE_A_NEW_HOP_DONG_FILE_ACTION,
    CLEAR_A_NEW_HOP_DONG_SEARCHS_ACTION
} from '../actions';

import {
    NEW_HOP_DONG_LIST_FILTER_FORM_NAME_SUCCESS,
    NEW_HOP_DONG_IN_LIST_FILTER_FORM_NAME_SUCCESS
} from '../constants';

const defaultState = {
    hopDongs: [],
    hopDongSearchs: [],
    hopDongTotalSearch: 0,
    assetPreventionSearchs: [],
    assetPreventionTotalSearch: 0,
    thuHoiGCNSearchs: [],
    thuHoiGCNTotalSearch: 0,
    search_keys: [],
    contractDetail: {},
    contract_files: [],
    removedFiles: [],
    remotePDF: null,
    remoteDOC: null,
    remoteEXCEL: null,
    filter: {},
    pagination: {},
    errors: {}
};

const newHopDongReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_NEW_HOP_DONG.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;

            return {
                ...state,
                hopDongs: apiRes.data,
                pagination: { total, limit, skip },
                loading: false
            };

        case NEW_HOP_DONG_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                hopDongSearchs: action.payload.data.data && action.payload.data.data.result,
                hopDongTotalSearch: action.payload.data.data && action.payload.data.data.newContractTotal,
                assetPreventionSearchs: action.payload.data.data && action.payload.data.data.assetPreventionResult,
                assetPreventionTotalSearch: action.payload.data.data && action.payload.data.data.assetPreventionTotal,
                thuHoiGCNSearchs: action.payload.data.data && action.payload.data.data.thuHoiGCNResult,
                thuHoiGCNTotalSearch: action.payload.data.data && action.payload.data.data.thuHoiGCNTotal,
                search_keys: action.payload.data.data && action.payload.data.data.search_keys,
                loading: false
            };

        case NEW_HOP_DONG_IN_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload,
                loading: false,
            }

        case DISPLAY_FULL_CONTEXT_ACTION:
            return {
                ...state,
                fullContext: action.payload,
            }

        case LOAD_A_NEW_HOP_DONG_INFO.SUCCESS:
            return {
                ...state,
                contractDetail: action.payload.data.data[0],
                contract_files: action.payload.data.data[0] && 
                                action.payload.data.data[0].contract_files || [],
                loading: false
            }

        case CLEAR_A_NEW_HOP_DONG_ACTION:
            return {
                ...state,
                contractDetail: {},
                contract_files: [],
                loading: false
            }

        case ADD_A_NEW_HOP_DONG_ACTION.SUCCESS:
            return {
                ...state,
                hopDongs: [action.payload.data.data, ...state.hopDongs],
                contract_files: [],
                loading: false
            };

        case UPLOAD_NEW_HOP_DONG_FILES_ACTION.SUCCESS:
            return {
                ...state,
                contract_files: [
                    ...state.contract_files,
                    action.payload.data.data.id || action.payload.data.id
                ]
            };

        case DOC_EXPORT_NEW_CONTRACT_LIST_TO_EXCEL.SUCCESS:
            return {
                ...state,
                remoteExcel: action.payload.data.data || action.payload.data,
            };

        case DOC_EXPORT_NGAN_CHAN_LIST_TO_EXCEL.SUCCESS:
            return {
                ...state,
                remoteExcel: action.payload.data.data || action.payload.data,
            };

        case DOC_EXPORT_GIAI_TOA_LIST_TO_EXCEL.SUCCESS:
            return {
                ...state,
                remoteExcel: action.payload.data.data || action.payload.data,
            };

        case DOC_EXPORT_THU_HOI_GCN_LIST_TO_EXCEL.SUCCESS:
            return {
                ...state,
                remoteExcel: action.payload.data.data || action.payload.data,
            };

        case CLEAR_EXCEL_EXPORT: 
            return {
                ...state,
                remoteExcel: null,
            }

        case CLEAR_A_NEW_HOP_DONG_SEARCHS_ACTION: 
            return {
                ...state,
                hopDongSearchs: [],
                hopDongTotalSearch: 0,
                assetPreventionSearchs: [],
                assetPreventionTotalSearch: 0,
                thuHoiGCNSearchs: [],
                thuHoiGCNTotalSearch: 0,
                search_keys: [],
            }

        case DELETE_A_NEW_HOP_DONG_FILE_ACTION.SUCCESS:
            const fileToRemove = state.contract_files && state.contract_files.find(item => item === action.payload.data.data);
            if (fileToRemove) {
                return {
                    ...state,
                    contract_files: state.contract_files.filter(item => item !== fileToRemove),
                    removedFiles: [
                        ...state.removedFiles,
                        fileToRemove
                    ]
                };
            }
            else
                return state;
        
        default:
            return state;
    }
};

export default newHopDongReducer;