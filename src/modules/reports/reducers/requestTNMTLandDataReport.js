import { 
    LOAD_LIST_TNMT_LAND_DATA_REPORT,
    LOAD_LIST_LAND_DATA_REPORT_OF_TNMT,
} from '../actions';

import {
    REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME_SUCCESS,
    LAND_DATA_OF_TNMT_REPORT_LIST_FILTER_FORM_NAME_SUCCESS
} from '../constants';

const defaultState = {
    requestTNMTLandDataReports: [],
    requestLandDataOfTNMTReports: [],
    filter: {},
    pagination: {},
    errors: {}
};

const requestTNMTLandDataReportReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_TNMT_LAND_DATA_REPORT.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                requestTNMTLandDataReports: apiRes.data,
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_LIST_LAND_DATA_REPORT_OF_TNMT.SUCCESS:
            return {
                ... state,
                requestLandDataOfTNMTReports:  action.payload.data.data,
                loading: false,
            }

        case REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload
            };

        case LAND_DATA_OF_TNMT_REPORT_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload
            };

        default:
            return state;
    }
};

export default requestTNMTLandDataReportReducer;