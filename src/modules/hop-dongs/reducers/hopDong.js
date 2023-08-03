import { 
    LOAD_LIST_HOP_DONG,
    LOAD_A_HOP_DONG_INFO,
    ADD_A_HOP_DONG_ACTION,
    UPDATE_A_HOP_DONG_STATUS_ACTION,
    DELETE_A_HOP_DONG_ACTION,
    CLEAR_A_HOP_DONG_ACTION,
    DOC_EXPORT_CONTRACT_TO_PDF,
    DOC_EXPORT_TESTIMONIAL_TO_PDF,
    DOC_EXPORT_CONTRACT_TO_WORD,
    DOC_EXPORT_TESTIMONIAL_TO_WORD,
    CLEAR_DOC_EXPORT,
    UPLOAD_HOP_DONG_FILES_ACTION,
    DELETE_A_HOP_DONG_FILE_ACTION,
    REQUEST_TNMT_LAND_DATA_ACTION,
    REQUEST_TNMT_TONG_TIEN_NAP_ACTION,
    CLEAR_TNMT_LAND_DATA_ACTION
} from '../actions';

import {
    HOP_DONG_LIST_FILTER_FORM_NAME_SUCCESS
} from '../constants';

const defaultState = {
    hopDongs: [],
    contractDetail: {},
    contract_files: [],
    removedFiles: [],
    requestTNMTLandData: null,
    requestTNMTTongTienNap: {},
    remotePDF: null,
    remoteDOC: null,
    filter: {},
    pagination: {},
    errors: {}
};

const hopDongReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_HOP_DONG.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                hopDongs: apiRes.data,
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_A_HOP_DONG_INFO.SUCCESS:
            return {
                ...state,
                contractDetail: action.payload.data.data[0],
                contract_files: action.payload.data.data[0] && action.payload.data.data[0].contract_files && JSON.parse(action.payload.data.data[0].contract_files) || [],
                loading: false
            }

        case CLEAR_A_HOP_DONG_ACTION:
            return {
                ...state,
                contractDetail: {},
                contract_files: [],
                loading: false
            }

        case ADD_A_HOP_DONG_ACTION.SUCCESS:
            return {
                ...state,
                hopDongs: [action.payload.data.data, ...state.hopDongs],
                loading: false
            };
        
        case UPDATE_A_HOP_DONG_STATUS_ACTION.SUCCESS:
            let findAHopDong = state.hopDongs.find(item => item.id === action.payload.data.data.id);
            findAHopDong.statusDetail = action.payload.data.data.statusDetail;

            return {
                ...state,
                hopDongs: state.hopDongs.map(item => item.id !== action.payload.data.data.id ? item : findAHopDong),
                loading: false
            };

        case DELETE_A_HOP_DONG_ACTION.SUCCESS:
            return {
                ...state,
                hopDongs: state.hopDongs.filter(item => item.id !== parseFloat(action.payload.data.data)),
                loading: false
            };

        case DOC_EXPORT_CONTRACT_TO_PDF.SUCCESS:
            const rs = action.payload.data;
            let pdfBuffer;
            if (rs && rs.data) {
                pdfBuffer = rs.data;
            }
            else
                pdfBuffer = rs;
            return {
                ...state,
                remotePDF: pdfBuffer,
            };
            
        case DOC_EXPORT_CONTRACT_TO_WORD.SUCCESS:
            return {
                ...state,
                remoteDOC: action.payload.data.data || action.payload.data,
            };

        case DOC_EXPORT_TESTIMONIAL_TO_WORD.SUCCESS:
            return {
                ...state,
                remoteDOC: action.payload.data.data || action.payload.data,
            };

        case CLEAR_DOC_EXPORT: 
            return {
                ...state,
                remoteDOC: null,
            }

        case REQUEST_TNMT_LAND_DATA_ACTION.SUCCESS:
            return {
                ...state,
                requestTNMTLandData: action.payload.data.data || action.payload.data.alert,
                loading: false
            };

        case REQUEST_TNMT_TONG_TIEN_NAP_ACTION.SUCCESS:
            return {
                ...state,
                requestTNMTTongTienNap: action.payload.data.data,
                loading: false
            };

        case UPLOAD_HOP_DONG_FILES_ACTION.SUCCESS:
            return {
                ...state,
                contract_files: [
                    ...state.contract_files,
                    action.payload.data.data.id || action.payload.data.id
                ]
            };

        case DELETE_A_HOP_DONG_FILE_ACTION.SUCCESS:
            const fileToRemove = state.contract_files && state.contract_files.find(item => item === action.payload.id);
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

        case HOP_DONG_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: {
                   // ...state.filter,
                    ...action.payload
                }
            };
        
        case CLEAR_TNMT_LAND_DATA_ACTION: 
            return {
                ...state,
                requestTNMTLandData: null
            }
        
        default:
            return state;
    }
};

export default hopDongReducer;