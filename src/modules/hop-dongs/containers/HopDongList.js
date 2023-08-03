import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListHopDong, updateAHopDongStatus, deleteAHopDong} from '../actions';
import {getHopDongList, getHopDongPaginationInfo, getHopDongFilterInfo} from "../selectors";
import {getUserData} from "../../users/selectors";
import {PAGINATION_ITEMS_PER_PAGE} from "../constants";
import HopDongListComponent from "../components/HopDongList";

class HopDongList extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        // if (contracts && contracts.length > 0 && history.action === 'POP')
        //     return null;

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(6) === -1) {
                history.push("/dashboard");
            }
        }

        let payload = {};
        let filter = {};
        const query = new URLSearchParams(history.location.search);
        const page = query.get('page');
        if (page)
            payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;

        filter.group_id = userData && userData.userGroupDetail.id;
        filter.isAdmin = userData.username === "admin";
        payload.filter = filter;

        this.props.loadListHopDong(payload);
    }

    onChangePage = (page) => {
        const {userData} = this.props;
        let payload = {};
        //-- get filtering information
        const {filter = {}, pagination} = this.props;
        filter.group_id = userData && userData.userGroupDetail.id;
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

        this.props.loadListHopDong(payload);

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
                this.props.deleteAHopDong(id)
            },
        });
    }

    handleConfirmCompleteClick = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có đồng ý xác nhận hợp đồng này đã "Hoàn thành" không?',
            onConfirm: () => {
               this.props.updateAHopDongStatus({id, status_id: 3});
            },
        });
    }

    handleConfirmCancelClick = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có đồng ý xác nhận hợp đồng này "Huỷ" không?',
            onConfirm: () => {
               this.props.updateAHopDongStatus({id, status_id: 5});
            },
        });
    }

    render() {
        const {userData} = this.props;
        let isEnableAddEdit = true;

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(6) === -1) {
                isEnableAddEdit = false;
            }
        }

        return (
            <HopDongListComponent {...this.props}
                                    isEnableAddEdit={isEnableAddEdit}
                                    handleDeleteClick={this.handleDeleteClick}
                                    handleConfirmCompleteClick={this.handleConfirmCompleteClick}
                                    handleConfirmCancelClick={this.handleConfirmCancelClick}
                                    onChangePage={this.onChangePage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    contracts:           getHopDongList(state),
    pagination:          getHopDongPaginationInfo(state),
    userData:            getUserData(state),

    filter:              getHopDongFilterInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListHopDong:          payload => dispatch(loadListHopDong(payload)),
    updateAHopDongStatus:     payload => dispatch(updateAHopDongStatus(payload)), 
    deleteAHopDong:           payload => dispatch(deleteAHopDong(payload)), 

    openModalAction:          payload => dispatch(openModalAction(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HopDongList));