import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";

import auth from "../../../services/auth";
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListGiaiToa, deleteAGiaiToa, DOC_exportGiaiToaListToEXCEL, clearExcelExport} from '../actions';
import {getRemoteEXCEL, getGiaiToaFilterInfo} from '../selectors';
import {loadListSubAssetType} from '../../danh-mucs/actions';
import {getGiaiToaList, getGiaiToaPaginationInfo} from "../selectors";
import {getSubAssetTypeList} from '../../danh-mucs/selectors';
import {getUserData} from "../../users/selectors";
import {PAGINATION_ITEMS_PER_PAGE} from "../constants";
import { loadListUserGroup } from "../../he-thongs/actions";
import { getUserGroupList } from "../../he-thongs/selectors";
import GiaiToaListComponent from "../components/GiaiToaList";

class GiaiToaList extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();
        // if(userData.role_ids) {
        //     if(userData.role_ids && userData.role_ids.indexOf(8) === -1) {
        //         history.push("/dashboard");
        //     }
        // }

        let payload = {};
        let filter = {};
        const query = new URLSearchParams(history.location.search);
        const page = query.get('page');
        if (page)
            payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;
        // const state = query.get('state');
        // if (state)
        //     filter.state = state;
        // const search = query.get('search');
        // if (search)
        //     filter.search = search;
        // if (filter)
        //     payload.filter = filter;

        this.props.loadListGiaiToa(payload);
        this.props.loadListSubAssetType({skip: 0, limit: 1000});
        this.props.loadListUserGroup({limit: 10000});
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

        this.props.loadListGiaiToa(payload);

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
                this.props.deleteAGiaiToa(id)
            },
        });
    }

    handleExportExcelFile = (event) => {
        const {userData, filterData} = this.props;
        const {fromDate, toDate, search, group_id} = filterData || {};

        this.props.DOC_exportGiaiToaListToEXCEL({
            group_id, fromDate, toDate, search
        })
    }

    render() {
        const userData = auth.getUserFromStorage();
        let isEnableAddEdit = true;

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(8) === -1) {
                isEnableAddEdit = false;
            }
        }

        return (
            <GiaiToaListComponent {...this.props}
                                    isEnableAddEdit={isEnableAddEdit}
                                    staticFileUrl={process.env.REACT_APP_STATIC_FILE_URL2}
                                    handleDeleteClick={this.handleDeleteClick}
                                    handleExportExcelFile={this.handleExportExcelFile}
                                    onChangePage={this.onChangePage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    userData:           getUserData(state),
    asset_releases:     getGiaiToaList(state),
    sub_asset_types:    getSubAssetTypeList(state),
    pagination:         getGiaiToaPaginationInfo(state),
    filterData:         getGiaiToaFilterInfo(state),    
    userGroups:         getUserGroupList(state),

    remoteEXCEL:        getRemoteEXCEL(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListGiaiToa:        payload => dispatch(loadListGiaiToa(payload)),
    deleteAGiaiToa:         payload => dispatch(deleteAGiaiToa(payload)), 
    loadListSubAssetType:   payload => dispatch(loadListSubAssetType(payload)),
    loadListUserGroup:      payload => dispatch(loadListUserGroup(payload)),

    DOC_exportGiaiToaListToEXCEL:   payload => dispatch(DOC_exportGiaiToaListToEXCEL(payload)),
    clearExcelExport:               payload => dispatch(clearExcelExport(payload)),

    openModalAction:        payload => dispatch(openModalAction(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(GiaiToaList));