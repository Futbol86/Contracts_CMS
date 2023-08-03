import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListThuHoiGCN, deleteAThuHoiGCN, DOC_exportThuHoiGCNListToEXCEL, clearExcelExport} from '../actions';
import {getThuHoiGCNList, getThuHoiGCNPaginationInfo, getThuHoiGCNFilterInfo, getRemoteEXCEL} from "../selectors";
import {getUserData} from "../../users/selectors";
import {PAGINATION_ITEMS_PER_PAGE} from "../constants";
import {DOC_changeActiveModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";
import { loadListUserGroup } from "../../he-thongs/actions";
import { getUserGroupList } from "../../he-thongs/selectors";

import ThuHoiGCNListComponent from "../components/ThuHoiGCNList";

class ThuHoiGCNList extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        // if(userData.role_ids) {
        //     if(userData.role_ids && userData.role_ids.indexOf(6) === -1) {
        //         history.push("/dashboard");
        //     }
        // }

        let payload = {};
        // let filter = {};
        // const query = new URLSearchParams(history.location.search);
        // const page = query.get('page');
        // if (page)
        //     payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;

        // filter.group_id = userData && userData.userGroupDetail.id;
        // if(userData.role_ids && userData.role_ids.indexOf(1) !== -1) {
        //     filter.isAdmin = true; //userData.username === "admin";
        // }
        // payload.filter = filter;

        this.props.loadListThuHoiGCN(payload);
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

       this.props.loadListThuHoiGCN(payload);

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

        let group_id = filterData && filterData.group_id; //|| userData && userData.userGroupDetail.id;

        console.log('----- handleExportExcelFile')
        this.props.DOC_exportThuHoiGCNListToEXCEL({
            group_id, fromDate, toDate, search
        })
    }

    handleDeleteClick = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xóa không?',
            onConfirm: () => {
                this.props.deleteAThuHoiGCN(id)
            },
        });
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
            <ThuHoiGCNListComponent {...this.props} 
                                    staticFileUrl={process.env.REACT_APP_STATIC_FILE_URL2}
                                    userGroups={userGroups}
                                    // handleShowMoreClick={this.handleShowMoreClick} 
                                    // handleModalChange={this.handleModalChange}
                                    handleExportExcelFile={this.handleExportExcelFile}
                                    handleDeleteClick={this.handleDeleteClick}
                                    onChangePage={this.onChangePage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),
    thuHoiGCNs:         getThuHoiGCNList(state),
    pagination:         getThuHoiGCNPaginationInfo(state),
    userData:           getUserData(state),

    filterData:         getThuHoiGCNFilterInfo(state),
    userGroups:         getUserGroupList(state),

    remoteEXCEL:         getRemoteEXCEL(state),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    loadListThuHoiGCN:          payload => dispatch(loadListThuHoiGCN(payload)),
    loadListUserGroup:          payload => dispatch(loadListUserGroup(payload)),
    deleteAThuHoiGCN:           payload => dispatch(deleteAThuHoiGCN(payload)),
    
    openModalAction:            payload => dispatch(openModalAction(payload)),
    DOC_exportThuHoiGCNListToEXCEL:  payload => dispatch(DOC_exportThuHoiGCNListToEXCEL(payload)),
    clearExcelExport:                payload => dispatch(clearExcelExport(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ThuHoiGCNList));