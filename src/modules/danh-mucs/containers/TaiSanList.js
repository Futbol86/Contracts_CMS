import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";
import auth from "../../../services/auth";
import {toast} from 'react-toastify';

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListTaiSan, loadATaiSanHistory, deleteATaiSan, doChangeTaiSanTab, clearATaiSanErrorOrMessages} from '../actions';
import {
    getTaiSanList, getTaiSanHistories, getTaiSanTabIndex, getTaiSanPaginationInfo, 
    getTaiSanFilterInfo, getTaiSanErrors, getTaiSanMessage
} from "../selectors";
import {PAGINATION_ITEMS_PER_PAGE} from "../constants";

import {DOC_changeActiveModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";

import {getUserData} from "../../users/selectors";
import TaiSanListComponent from "../components/TaiSanList";

class TaiSanList extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(5) === -1) {
                history.push("/dashboard");
            }
        }

        const {tabIndex} = this.props;
        this.loadPage({asset_type_id: tabIndex === 0 ? 2 : (tabIndex === 1 ? 1 : 3)});
    }

    componentDidUpdate(prevProps) {
        const {errors, message} = this.props;
        if(errors && !prevProps.errors || (errors && prevProps.errors && errors !== prevProps.errors)) {
            toast.error(errors, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            this.props.clearATaiSanErrorOrMessages();
        }

        if(message && !prevProps.message || (message && prevProps.message && message !== prevProps.message)) {
            toast.success(message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            this.props.clearATaiSanErrorOrMessages();
        }
    }

    loadPage = ({asset_type_id}) => {
        const {history, } = this.props;
        if (history.action === 'POP')
            return null;

        let payload = {};
        //let filter = "";
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

        //filter += "&asset_type_id=" + asset_type_id;
        filter.asset_type_id = asset_type_id;
        if (filter)
            payload.filter = filter;

        this.props.loadListTaiSan(payload);
    }

    onChangePage = (page) => {
        let payload = {};
        //-- get filtering information
        let {tabIndex, filter = {}, pagination} = this.props;
        if (filter)
            payload = {...payload, filter};

        let asset_type_id = tabIndex === 0 ? 2 : (tabIndex === 1 ? 1 : 3);

        //filter += "&asset_type_id=" + asset_type_id;
        filter.asset_type_id = asset_type_id;
        if (filter)
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

        this.props.loadListTaiSan(payload);

        //-- Update router's link
        const {history} = this.props;
        const query = new URLSearchParams(history.location.search);
        query.set('page', page);
        //-- push then we can go with back button, replace then NO        
        history.push({...history.location, search: query.toString()});
    };

    handleTabChange = (tabIndex) => {
        this.props.doChangeTaiSanTab(tabIndex);

        this.loadPage({
            asset_type_id: tabIndex === 0 ? 2 : (tabIndex === 1 ? 1 : 3)
        });
    }

    handleDeleteClick = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xóa không?',
            onConfirm: () => {
                this.props.deleteATaiSan(id)
            },
        });
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    handleShowHistoryClick = (id) => {
        this.props.loadATaiSanHistory({id});
        this.props.DOC_changeActiveModal({modalId: 1});
    }

    render() {
        const userData = auth.getUserFromStorage();
        let isEnableAddEdit = true;

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(5) === -1) {
                isEnableAddEdit = false;
            }
        }

        return (
            <TaiSanListComponent {...this.props}
                                isEnableAddEdit={isEnableAddEdit}
                                handleTabChange={this.handleTabChange}
                                handleDeleteClick={this.handleDeleteClick}
                                handleModalChange={this.handleModalChange}
                                handleShowHistoryClick={this.handleShowHistoryClick}
                                onChangePage={this.onChangePage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    userData:           getUserData(state),
    currentModalId:     getDocCurrentModalId(state),

    assets:             getTaiSanList(state),
    assetHistories:     getTaiSanHistories(state),
    tabIndex:           getTaiSanTabIndex(state),
    pagination:         getTaiSanPaginationInfo(state),
    filter:             getTaiSanFilterInfo(state),
    errors:             getTaiSanErrors(state),
    message:            getTaiSanMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:    payload => dispatch(DOC_changeActiveModal(payload)),

    loadListTaiSan:    payload => dispatch(loadListTaiSan(payload)),
    loadATaiSanHistory: payload => dispatch(loadATaiSanHistory(payload)),
    deleteATaiSan:     payload => dispatch(deleteATaiSan(payload)), 
    doChangeTaiSanTab: payload => dispatch(doChangeTaiSanTab(payload)), 
    clearATaiSanErrorOrMessages: payload => dispatch(clearATaiSanErrorOrMessages(payload)), 
  
    openModalAction:   payload => dispatch(openModalAction(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(TaiSanList));