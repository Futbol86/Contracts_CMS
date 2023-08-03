import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router'
import {formValueSelector} from 'redux-form';
import uuid from "uuid";

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {DOC_exportSample31ToEXCEL, clearExcelExport} from '../actions';
import {getBieuMau31ReportFilterInfo, getBieuMau31ReportList, getBieuMau31ReportPaginationInfo, getRemoteEXCEL} from "../selectors";
import {getDocCurrentModalType} from "../../documents/selectors";
import {PAGINATION_ITEMS_PER_PAGE, REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME} from "../constants";
import {getUserData} from "../../users/selectors";
import BieuMau31ReportListComponent from "../components/BieuMau31ReportList";

class BieuMau31ReportList extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        // if (BieuMau31Reports && BieuMau31Reports.length > 0 && history.action === 'POP')
        //     return null;
        // if(userData.role_ids) {
        //     if(userData.role_ids && userData.role_ids.indexOf(9) === -1) {
        //         history.push("/dashboard");
        //     }
        // }

        // let payload = {};
        // let filter = {};
        // const query = new URLSearchParams(history.location.search);
        // const page = query.get('page');
        // if (page)
        //     payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;

        // // filter.fromDate = new Date();
        // // filter.toDate = new Date();
        // filter.group_id = userData && userData.userGroupDetail.id;
        
        // payload.filter = filter;

        // this.props.loadListTNMTLandDataReport(payload);
    }

    componentDidUpdate() {
        const {remoteEXCEL} = this.props;
        console.log('---- componentDidUpdate', remoteEXCEL)
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

    // onChangePage = (page) => {
    //     let payload = {};
    //     //-- get filtering information
    //     let {filter, pagination} = this.props;
    //     if (filter)
    //         payload = {...payload, filter};

    //     //-- get pagination
    //     if (pagination){
    //         const {limit, total, skip} = pagination;
    //         if (Math.floor(skip / limit) + 1 === page)
    //             return null;
    //         const newSkip = (page - 1) * limit;
    //         if (newSkip >= 0 && newSkip <= total)
    //             payload = {...payload, skip: newSkip};
    //     }

    //     this.props.loadListTNMTLandDataReport(payload);

    //     //-- Update router's link
    //     const {history} = this.props;
    //     const query = new URLSearchParams(history.location.search);
    //     query.set('page', page);
    //     //-- push then we can go with back button, replace then NO        
    //     history.push({...history.location, search: query.toString()});
    // };

    handleExportExcelFile = (event) => {
        const {group_id, fromDate, toDate} = this.props;

        // reset remoteExcel before recreate data
        this.props.DOC_exportSample31ToEXCEL({
            fromDate, toDate
        })
    }

    render() {
        console.log('---- remoteEXCEL', this.props.remoteEXCEL)
        return (
            <BieuMau31ReportListComponent {...this.props} 
                                          onChangePage={this.onChangePage} 
                                          handleExportExcelFile={this.handleExportExcelFile}/>
        );
    }
}

const formSelector = formValueSelector(REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME);
const mapStateToProps = (state) => ({
    // userData:                        getUserData(state),
    remoteEXCEL:                     getRemoteEXCEL(state), 

    // group_id:                        formSelector(state, "group_id"),
    // fromDate:                        formSelector(state, "fromDate"),
    // toDate:                          formSelector(state, "toDate"),

    // pagination:                      getBieuMau31ReportPaginationInfo(state),
    // filter:                          getBieuMau31ReportFilterInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_exportSample31ToEXCEL: payload => dispatch(DOC_exportSample31ToEXCEL(payload)),
    clearExcelExport:          payload => dispatch(clearExcelExport(payload)),

    openModalAction:        payload => dispatch(openModalAction(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BieuMau31ReportList));