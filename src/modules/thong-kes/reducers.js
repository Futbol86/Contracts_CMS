import {combineReducers} from 'redux';
import reportReducer from './reducers/report';
import requestTNMTLandDataReportReducer from './reducers/requestTNMTLandDataReport';

let allThongKeReducer = {
    report: 		            reportReducer,
    requestTNMTLandDataReport:  requestTNMTLandDataReportReducer
};

export default combineReducers(allThongKeReducer);