import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router'
import {formValueSelector} from 'redux-form';
import uuid from "uuid";

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListTNMTLandDataReport, DOC_exportTNMTLandDataToEXCEL, clearExcelExport} from '../actions';
import {getRequestTNMTLandDataReportFilterInfo, getRequestTNMTLandDataReportList, getRequestTNMTLandDataReportPaginationInfo, getRemoteEXCEL} from "../selectors";
import {getDocCurrentModalType} from "../../documents/selectors";
import {PAGINATION_ITEMS_PER_PAGE, REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME} from "../constants";
import {getUserData} from "../../users/selectors";
import RequestTNMTLandDataReportListComponent from "../components/RequestTNMTLandDataReportList";

class RequestTNMTLandDataReportList extends Component {
    componentDidMount() {
        const {history, userData, requestTNMTLandDataReports} = this.props;
        // if (requestTNMTLandDataReports && requestTNMTLandDataReports.length > 0 && history.action === 'POP')
        //     return null;
        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(9) === -1) {
                history.push("/dashboard");
            }
        }

        let payload = {};
        let filter = {};
        const query = new URLSearchParams(history.location.search);
        const page = query.get('page');
        if (page)
            payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;

        // filter.fromDate = new Date();
        // filter.toDate = new Date();
        filter.group_id = userData && userData.userGroupDetail.id;
        
        payload.filter = filter;

        this.props.loadListTNMTLandDataReport(payload);
    }

    // componentDidUpdate(prevProps) {
    //     const {remoteEXCEL} = this.props;
    //     const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL;
    //     if(remoteEXCEL && remoteEXCEL !== prevProps.remoteEXCEL) {
    //         let url = uploadRootURL + remoteEXCEL;
    //         window.open(url, "_blank");
    //         this.props.clearExcelExport();
    //     }
    // }

    componentDidUpdate() {
        const {remoteEXCEL} = this.props;

        let blobEXCEL, excelFileURL;
        if (remoteEXCEL){
            blobEXCEL = new Blob([remoteEXCEL], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'});
            //Build a URL from the file
            excelFileURL = window.URL.createObjectURL(blobEXCEL);
            //Open the URL on new Window
            window.open(excelFileURL, '_blank');
            this.props.clearExcelExport({});
        }
    }

    onChangePage = (page) => {
        let payload = {};
        //-- get filtering information
        let {filter, pagination} = this.props;
        if (filter)
            payload = {...payload, filter};

        //-- get pagination
        if (pagination){
            const {limit, total, skip} = pagination;
            if (Math.floor(skip / limit) + 1 === page)
                return null;
            const newSkip = (page - 1) * limit;
            if (newSkip >= 0 && newSkip <= total)
                payload = {...payload, skip: newSkip};
        }

        this.props.loadListTNMTLandDataReport(payload);

        //-- Update router's link
        const {history} = this.props;
        const query = new URLSearchParams(history.location.search);
        query.set('page', page);
        //-- push then we can go with back button, replace then NO        
        history.push({...history.location, search: query.toString()});
    };

    handleExportExcelFile = (event) => {
        const {group_id, fromDate, toDate} = this.props;

        // reset remoteExcel before recreate data
        this.props.DOC_exportTNMTLandDataToEXCEL({
            group_id, fromDate, toDate
        })
    }

    render() {
        return (
            <RequestTNMTLandDataReportListComponent {...this.props} onChangePage={this.onChangePage} handleExportExcelFile={this.handleExportExcelFile}/>
        );
    }
}

const formSelector = formValueSelector(REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME);
const mapStateToProps = (state) => ({
    userData:                        getUserData(state),
    requestTNMTLandDataReports:      getRequestTNMTLandDataReportList(state),
    remoteEXCEL:                     getRemoteEXCEL(state), 

    group_id:                        formSelector(state, "group_id"),
    fromDate:                        formSelector(state, "fromDate"),
    toDate:                          formSelector(state, "toDate"),

    pagination:                      getRequestTNMTLandDataReportPaginationInfo(state),
    filter:                          getRequestTNMTLandDataReportFilterInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListTNMTLandDataReport:    payload => dispatch(loadListTNMTLandDataReport(payload)),
    DOC_exportTNMTLandDataToEXCEL: payload => dispatch(DOC_exportTNMTLandDataToEXCEL(payload)),
    clearExcelExport:              payload => dispatch(clearExcelExport(payload)),

    openModalAction:        payload => dispatch(openModalAction(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(RequestTNMTLandDataReportList));