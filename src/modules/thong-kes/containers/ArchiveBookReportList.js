import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {formValueSelector} from 'redux-form';
import uuid from "uuid";

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME} from "../constants";
import {getUserData} from "../../users/selectors";
import {DOC_changeActiveModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";
import { loadListUserGroup } from "../../he-thongs/actions";
import { getUserGroupList } from "../../he-thongs/selectors"
import { setDisplayFullContext } from "../../hop-dongs/actions";
import { getNewHopDongFullContext } from "../../hop-dongs/selectors"
import {loadListArchiveBookFilter, DOC_exportArchiveBookToEXCEL, clearExcelExport} from "../actions";
import {getContractList, getRemoteEXCEL, getContractPaginationInfo, getContractFilterInfo} from "../selectors";
import ArchiveBookReportListComponent from "../components/ArchiveBookReportList";

class ArchiveBookReportList extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(9) === -1) {
                history.push("/dashboard");
            }
        }

        this.props.loadListUserGroup({limit: 10000});
    }
    
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
        //payload.archive_book_id = filter.archive_book_id;
        //filter.archive_book_id = filter.;

        // if (filter)
        //     payload = {...payload, filter};

        const {userData, filterData} = this.props;
        const {filter = {}, pagination} = this.props;
        let payload = {};

        if(filterData && filterData.group_id) {
            filter.group_id = filterData.group_id
        }
                    
        if(filterData && filterData.archive_book_id) {
            filter.archive_book_id = filterData.archive_book_id
        }

        if(filterData && filterData.fromDate) {
            filter.fromDate = filterData.fromDate;
        }

        if(filterData && filterData.toDate) {
            filter.toDate = filterData.toDate;
        }

        if(filterData && filterData.search) {
            filter.search = filterData.search;
        }

        payload.filter = filter;

        //-- get pagination
        if (pagination){
            const {limit, total, skip} = pagination;
            if (Math.floor(skip / limit) + 1 === page)
                return null;
            const newSkip = (page - 1) * limit;
            if (newSkip >= 0 && newSkip <= total)
                payload = {...payload, skip: newSkip};
        }

        this.props.loadListArchiveBookFilter(payload);

        //-- Update router's link
        const {history} = this.props;
        const query = new URLSearchParams(history.location.search);
        query.set('page', page);
        //-- push then we can go with back button, replace then NO        
        history.push({...history.location, search: query.toString()});
    };

    handleShowMoreClick = (fullContext) => {
        this.props.setDisplayFullContext(fullContext);
        this.props.DOC_changeActiveModal({modalId: 1});
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    handleExportExcelFile = (event) => {
        const {userData, archive_book_id, filterData} = this.props;
        const {group_id, fromDate, toDate} = filterData || {};

        // reset remoteExcel before recreate data
        this.props.DOC_exportArchiveBookToEXCEL({
            group_id,
            archive_book_id,
            fromDate, 
            toDate
        })
    }

    render() {
        const {userData} = this.props;
        let {userGroups} = this.props;

        if(userData.role_ids && userData.role_ids.indexOf(1) === -1) {
            if(userData && userData.userGroupDetail) {
                userGroups = userGroups.filter(item => item.id === userData.userGroupDetail.id);
            }
        }

        return (
            <ArchiveBookReportListComponent {...this.props} userGroups={userGroups} 
                                            onChangePage={this.onChangePage} 
                                            handleShowMoreClick={this.handleShowMoreClick}
                                            handleModalChange={this.handleModalChange}
                                            handleExportExcelFile={this.handleExportExcelFile}/>
        );
    }
}

const formSelector = formValueSelector(ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),
    userData:           getUserData(state),
    userGroups:         getUserGroupList(state),

    contracts:          getContractList(state),
    remoteEXCEL:        getRemoteEXCEL(state),

    pagination:         getContractPaginationInfo(state),
    filterData:         getContractFilterInfo(state),

    fullContext:        getNewHopDongFullContext(state),

    archive_book_id:    formSelector(state, "archive_book_id"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:        payload => dispatch(DOC_changeActiveModal(payload)),
    loadListArchiveBookFilter:    payload => dispatch(loadListArchiveBookFilter(payload)),
    loadListUserGroup:            payload => dispatch(loadListUserGroup(payload)),

    DOC_exportArchiveBookToEXCEL: payload => dispatch(DOC_exportArchiveBookToEXCEL(payload)),
    clearExcelExport:             payload => dispatch(clearExcelExport(payload)),

    setDisplayFullContext:        payload => dispatch(setDisplayFullContext(payload)),
    openModalAction:              payload => dispatch(openModalAction(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArchiveBookReportList));