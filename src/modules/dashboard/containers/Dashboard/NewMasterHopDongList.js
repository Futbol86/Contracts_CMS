import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {getFormValues, formValueSelector, change} from 'redux-form';

import {openModalAction} from "../../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../../constants';
import {NEW_HOP_DONG_LIST_FILTER_FORM_NAME} from '../../../hop-dongs/constants';
import {setDisplayFullContext, clearANewHopDongSearchs} from "../../../hop-dongs/actions";
import {
    getNewHopDongSearchList, getNewHopDongSearchKeys, getAssetPreventionSearchList, 
    getNewHopDongTotalSearch, getAssetPreventionTotalSearch, getThuHoiGCNSearchList, getThuHoiGCNTotalSearch, getNewHopDongFullContext
} from "../../../hop-dongs/selectors";
import {DOC_changeActiveModal} from "../../../documents/actions";
import {getDocCurrentModalId} from "../../../documents/selectors";
import {loadListUserGroup} from "../../../he-thongs/actions";
import {getUserGroupList} from "../../../he-thongs/selectors";
import {doChangeTab, setPhieuTraCuuAssetDetail} from "../../actions";
import {getTabIndex} from "../../selectors";
import {PHIEU_TRA_CUU_FORM_NAME} from "../../constants";

import NewMasterHopDongListComponent from "../../components/Dashboard/NewMasterHopDongList";

class NewMasterHopDongList extends Component {
    componentDidMount() {
        this.props.loadListUserGroup({limit: 10000});
    }

    componentWillUnmount() {
        this.props.clearANewHopDongSearchs({});
    }
    
    handleShowMoreClick = (fullContext) => {
        this.props.setDisplayFullContext(fullContext);
        this.props.DOC_changeActiveModal({modalId: 1});
    }

    handleExportPhieuTraCuuClick = (asset, modalId) => {
        // console.log('--- export ', uuid.v4())
        // console.log('--- asset ', asset)
        // this.props.changeFieldValue("transaction_code", uuid.v4());
        this.props.setPhieuTraCuuAssetDetail(asset);
        this.props.DOC_changeActiveModal({modalId});
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    handleTabChange = (tabIndex) => {
        this.props.doChangeTab(tabIndex)
    }

    render() {
        return (
            <NewMasterHopDongListComponent {...this.props} staticFileUrl={process.env.REACT_APP_STATIC_FILE_URL2}
                                            handleShowMoreClick={this.handleShowMoreClick} 
                                            handleExportPhieuTraCuuClick={this.handleExportPhieuTraCuuClick}
                                            handleTabChange={this.handleTabChange}
                                            handleModalChange={this.handleModalChange}/>
        );
    }
}

const formNewHopDongListSelector = formValueSelector(NEW_HOP_DONG_LIST_FILTER_FORM_NAME);

const mapStateToProps = (state) => ({
    currentModalId:      getDocCurrentModalId(state),
    contracts:           getNewHopDongSearchList(state),
    new_contract_total:  getNewHopDongTotalSearch(state),

    asset_preventions:   getAssetPreventionSearchList(state),
    asset_prevention_total: getAssetPreventionTotalSearch(state),
    thu_hoi_GCNs:        getThuHoiGCNSearchList(state),
    thu_hoi_GCN_total:   getThuHoiGCNTotalSearch(state),

    search_keys:         getNewHopDongSearchKeys(state),
    fullContext:         getNewHopDongFullContext(state),

    tabIndex:            getTabIndex(state),

    userGroups:          getUserGroupList(state),

    search_field:       formNewHopDongListSelector(state, "search_field"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),

    openModalAction:            payload => dispatch(openModalAction(payload)),
    setDisplayFullContext:      payload => dispatch(setDisplayFullContext(payload)),
    loadListUserGroup:          payload => dispatch(loadListUserGroup(payload)),
    doChangeTab:                payload => dispatch(doChangeTab(payload)),
    setPhieuTraCuuAssetDetail:  payload => dispatch(setPhieuTraCuuAssetDetail(payload)),
    clearANewHopDongSearchs:    payload => dispatch(clearANewHopDongSearchs(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(NEW_HOP_DONG_LIST_FILTER_FORM_NAME, field, value))
    },
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(NewMasterHopDongList));