import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListSoLuuTru, deleteASoLuuTru} from '../actions';
import {getSoLuuTruList, getSoLuuTruPaginationInfo} from "../selectors";
import {getDocCurrentModalType} from "../../documents/selectors";
import {getUserData} from "../../users/selectors";
import {PAGINATION_ITEMS_PER_PAGE} from "../constants";
import SoLuuTruListComponent from "../components/SoLuuTruList";
import auth from "../../../services/auth";

class SoLuuTruList extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(10) === -1) {
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
        // const state = query.get('state');
        // if (state)
        //     filter.state = state;
        // const search = query.get('search');
        // if (search)
        //     filter.search = search;
        // if (filter)
        //     payload.filter = filter;

        this.props.loadListSoLuuTru(payload);
    }

    onChangePage = (page) => {
        const {userData} = this.props;
        let payload = {};
        //-- get filtering information
        const {filter = {}, pagination} = this.props;
        filter.group_id = userData && userData.userGroupDetail.id;
        filter.isAdmin = userData.username === "admin";
        payload.filter = filter;
        // if (filter)
        //     payload = {...payload, filter};

        //-- get pagination
        if (pagination){
            const {limit, total, skip} = pagination;
            if (Math.floor(skip / limit) + 1 === page)
                return null;
            const newSkip = (page - 1) * limit;
            if (newSkip >= 0 && newSkip <= total)
                payload = {...payload, skip: newSkip};
        }

        this.props.loadListSoLuuTru(payload);

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
                this.props.deleteASoLuuTru(id)
            },
        });
    }

    render() {
        return (
            <SoLuuTruListComponent {...this.props}
                handleDeleteClick={this.handleDeleteClick}
                onChangePage={this.onChangePage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    archiveBooks:       getSoLuuTruList(state),
    pagination:         getSoLuuTruPaginationInfo(state),

    userData:           getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListSoLuuTru:    payload => dispatch(loadListSoLuuTru(payload)),
    deleteASoLuuTru:     payload => dispatch(deleteASoLuuTru(payload)),
    openModalAction:     payload => dispatch(openModalAction(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SoLuuTruList));