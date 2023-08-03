import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListNewHopDong, setDisplayFullContext, DOC_exportNewContractListToEXCEL, clearExcelExport} from '../actions';
import {getNewHopDongList, getNewHopDongPaginationInfo, getNewHopDongFilterInfo, getNewHopDongFullContext, getRemoteEXCEL} from "../selectors";
import {getUserData} from "../../users/selectors";
import {PAGINATION_ITEMS_PER_PAGE} from "../constants";
import {DOC_changeActiveModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";
import { loadListUserGroup } from "../../he-thongs/actions";
import { getUserGroupList } from "../../he-thongs/selectors";

import NewHopDongListComponent from "../components/NewHopDongList";

class HopDongList extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(6) === -1) {
                history.push("/dashboard");
            }

            // if(userData.role_ids && userData.role_ids.indexOf(6) === -1) {
            //     history.push("/dashboard");
            // }
        }

        let payload = {};
        let filter = {};
        const query = new URLSearchParams(history.location.search);
        const page = query.get('page');
        if (page)
            payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;

        filter.group_id = userData && userData.userGroupDetail.id;

        if(userData.role_ids && userData.role_ids.indexOf(1) !== -1) {
            filter.isAdmin = true;
        }

        // if(userData.role_ids && userData.role_ids.indexOf(1) !== -1) {
        //     filter.isAdmin = true; //userData.username === "admin";
        // }

        payload.filter = filter;

        this.props.loadListNewHopDong(payload);
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
        const {userData, filterData} = this.props;
        let payload = {};

        //-- get filtering information
        const {filter = {}, pagination} = this.props;
        if(filterData && filterData.fromDate) {
            filter.fromDate = filterData.fromDate;
        }

        if(filterData && filterData.toDate) {
            filter.toDate = filterData.toDate;
        }

        if(filterData && filterData.search) {
            filter.search = filterData.search;
        }
            
        if(filterData && filterData.group_id) {
            filter.group_id = filterData.group_id
        } else {
            filter.group_id = userData && userData.userGroupDetail.id;
        }
        filter.isAdmin = userData.username === "admin";

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

       this.props.loadListNewHopDong(payload);

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
        const {userData, filterData} = this.props;
        const {fromDate, toDate, search} = filterData || {};

        let group_id = filterData && filterData.group_id || userData && userData.userGroupDetail.id;

        this.props.DOC_exportNewContractListToEXCEL({
            group_id, fromDate, toDate, search
        })
    }

    render() {
        const {userData} = this.props;
        let {userGroups} = this.props;

        console.log('--- userData', userData)
        if(userData.role_ids && userData.role_ids.indexOf(1) !== -1) {
            if(userData && userData.userGroupDetail) {
                userGroups = userGroups.filter(item => item.id === userData.userGroupDetail.id);
            }
        }

        return (
            <NewHopDongListComponent {...this.props} 
                                    userGroups={userGroups}
                                    handleShowMoreClick={this.handleShowMoreClick} 
                                    handleModalChange={this.handleModalChange}
                                    handleExportExcelFile={this.handleExportExcelFile}
                                    onChangePage={this.onChangePage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    currentModalId:      getDocCurrentModalId(state),
    contracts:           getNewHopDongList(state),
    pagination:          getNewHopDongPaginationInfo(state),
    userData:            getUserData(state),

    filterData:          getNewHopDongFilterInfo(state),
    fullContext:         getNewHopDongFullContext(state),
    userGroups:          getUserGroupList(state),

    remoteEXCEL:         getRemoteEXCEL(state),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:    payload => dispatch(DOC_changeActiveModal(payload)),
    loadListNewHopDong:       payload => dispatch(loadListNewHopDong(payload)),
    loadListUserGroup:        payload => dispatch(loadListUserGroup(payload)),

    openModalAction:          payload => dispatch(openModalAction(payload)),
    setDisplayFullContext:    payload => dispatch(setDisplayFullContext(payload)),
    DOC_exportNewContractListToEXCEL:  payload => dispatch(DOC_exportNewContractListToEXCEL(payload)),
    clearExcelExport:                  payload => dispatch(clearExcelExport(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HopDongList));