import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";

import auth from "../../../services/auth";
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {
    loadListNganChan, deleteANganChan, doChangeNganChanTab, loadAnAssetPreventionSelected, 
    DOC_exportNganChanListToEXCEL, clearExcelExport, clearANganChanFilterInfo
} from '../actions';
import {getNganChanList, getNganChanPaginationInfo, getNganChanFilterInfo, getNganChanTabIndex, getRemoteEXCEL} from "../selectors";
import {loadListSubAssetType} from '../../danh-mucs/actions';
import {getSubAssetTypeList} from '../../danh-mucs/selectors';
import {DOC_changeActiveModal} from "../../documents/actions";
import {getUserData} from "../../users/selectors";
import { loadListUserGroup } from "../../he-thongs/actions";
import { getUserGroupList } from "../../he-thongs/selectors";
import NganChanListComponent from "../components/NganChanList";

class NganChanList extends Component {
    componentDidMount() {
        const {history} = this.props;
        //const userData = auth.getUserFromStorage();
        // if(userData.role_ids) {
        //     if(userData.role_ids && userData.role_ids.indexOf(7) === -1) {
        //         history.push("/dashboard");
        //     }
        // }

        const {tabIndex} = this.props;
        this.loadPage(tabIndex);

        this.props.loadListSubAssetType({skip: 0, limit: 1000});
        this.props.loadListUserGroup({limit: 10000});
    }

    loadPage = (tabIndex) => {
        const {history} = this.props;
        if (history.action === 'POP')
            return null;

        let payload = {};
        let filter = {};
        
        if(tabIndex === 1) {
            filter.prevention_type_id = 2;
            //filter += "&prevention_type_id=2";
        }
        if (filter)
            payload.filter = filter;

        this.props.loadListNganChan(payload);
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
        //-- get filtering information
        const {userData, filterData} = this.props;
        const {filter = {}, pagination} = this.props;
        let payload = {};

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

        this.props.loadListNganChan(payload);

        //-- Update router's link
        const {history} = this.props;
        const query = new URLSearchParams(history.location.search);
        query.set('page', page);
        //-- push then we can go with back button, replace then NO        
        history.push({...history.location, search: query.toString()});
    };

    handleDeleteClick = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xóa không?',
            onConfirm: () => {
                this.props.deleteANganChan(id);
            },
        });
    }

    handleSelectAssetPrevention = (id) => {
        this.props.DOC_changeActiveModal({modalId: 0});
        this.props.loadAnAssetPreventionSelected({id});
        this.props.clearANganChanFilterInfo();
    }

    handleTabChange = (tabIndex) => {
        this.props.doChangeNganChanTab(tabIndex);

        this.loadPage(tabIndex);
    }

    handleExportExcelFile = (event) => {
        const {userData, filterData} = this.props;
        const {fromDate, toDate, search, group_id} = filterData || {};

        this.props.DOC_exportNganChanListToEXCEL({
            group_id, fromDate, toDate, search
        })
    }

    render() {
        const userData = auth.getUserFromStorage();
        let isEnableAddEdit = true;

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(7) === -1) {
                //history.push("/dashboard");
                isEnableAddEdit = false;
            }
        }

        return (
            <NganChanListComponent {...this.props}
                                    isEnableAddEdit={isEnableAddEdit}
                                    staticFileUrl={process.env.REACT_APP_STATIC_FILE_URL2}
                                    handleTabChange={this.handleTabChange}
                                    handleDeleteClick={this.handleDeleteClick}
                                    handleSelectAssetPrevention={this.handleSelectAssetPrevention}
                                    handleExportExcelFile={this.handleExportExcelFile}
                                    onChangePage={this.onChangePage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    userData:            getUserData(state),

    asset_preventions:   getNganChanList(state),
    sub_asset_types:     getSubAssetTypeList(state),
    tabIndex:            getNganChanTabIndex(state),
    pagination:          getNganChanPaginationInfo(state),

    filterData:          getNganChanFilterInfo(state),
    userGroups:          getUserGroupList(state),

    remoteEXCEL:         getRemoteEXCEL(state),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:  payload => dispatch(DOC_changeActiveModal(payload)),

    loadListNganChan:       payload => dispatch(loadListNganChan(payload)),
    loadAnAssetPreventionSelected: payload => dispatch(loadAnAssetPreventionSelected(payload)),
    deleteANganChan:        payload => dispatch(deleteANganChan(payload)), 
    doChangeNganChanTab:    payload => dispatch(doChangeNganChanTab(payload)), 
    loadListSubAssetType:   payload => dispatch(loadListSubAssetType(payload)),
    loadListUserGroup:      payload => dispatch(loadListUserGroup(payload)),

    DOC_exportNganChanListToEXCEL:   payload => dispatch(DOC_exportNganChanListToEXCEL(payload)),
    clearExcelExport:                payload => dispatch(clearExcelExport(payload)),
    clearANganChanFilterInfo:        payload => dispatch(clearANganChanFilterInfo(payload)),

    openModalAction:        payload => dispatch(openModalAction(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(NganChanList));