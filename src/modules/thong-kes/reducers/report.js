import {LOAD_LIST_REPORT, LOAD_LIST_ARCHIVE_BOOK_FILTER, DOC_EXPORT_ARCHIVE_BOOK_TO_EXCEL, DOC_EXPORT_TNMT_LAND_DATA_TO_EXCEL, CLEAR_EXCEL_EXPORT} from '../actions';
import {ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME_SUCCESS} from '../constants';

const defaultState = {
    reports: [],
    contracts: [],
    contractExports: [],
    remoteEXCEL: null,
    filter: {},
    pagination: {},
    errors: {}
};

const thongKeReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_REPORT.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                reports: apiRes.data,
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_LIST_ARCHIVE_BOOK_FILTER.SUCCESS:
            const _apiRes = action.payload.data;
            return {
                ...state,
                contracts: _apiRes.data,
                pagination: { total: _apiRes.total, limit: _apiRes.limit, skip: _apiRes.skip },
                loading: false
            };

        case ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload
            };

        case DOC_EXPORT_ARCHIVE_BOOK_TO_EXCEL.SUCCESS:
            return {
                ...state,
                remoteExcel: action.payload.data.data || action.payload.data,
            };

        case DOC_EXPORT_TNMT_LAND_DATA_TO_EXCEL.SUCCESS:
            return {
                ...state,
                remoteExcel: action.payload.data.data || action.payload.data,
            };

        case CLEAR_EXCEL_EXPORT: 
            return {
                ...state,
                remoteExcel: null,
            }

        default:
            return state;
    }
};

export default thongKeReducer;