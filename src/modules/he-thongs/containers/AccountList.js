import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {change} from 'redux-form';
import uuid from "uuid";
import auth from "../../../services/auth";

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListAccount, deleteAnAccount, loadListUserGroup} from '../actions';
import {getAccountList, getAccountPaginationInfo, getUserGroupList} from "../selectors";

import {DOC_changeActiveModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";

import {PAGINATION_ITEMS_PER_PAGE, ACCOUNT_CHANGE_PASSWORD_FORM_NAME} from "../constants";
import AccountListComponent from "../components/AccountList";

class AccountList extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();
        let isAdmin = userData.username === "admin";

        if(isAdmin === false) {
            if(userData.role_ids) {
                if(userData.role_ids && userData.role_ids.indexOf(1) === -1) {
                    history.push("/dashboard");
                }
            }
        }
  
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

        this.props.loadListAccount(payload);
        this.props.loadListUserGroup({limit: 10000});
    }

    onChangePage = (page) => {
        let payload = {};
        //-- get filtering information
        const {filter, pagination} = this.props;
        if (filter)
            payload = {...payload, filter};

        //-- get pagination
        if (pagination){
            const {limit, total, skip} = pagination;
            if (Math.floor(skip / limit) + 1 === page)
                return null;
            const newSkip = (page - 1) * limit;
            if (newSkip >= 0 && newSkip <= total)
                payload = {...payload, skip: newSkip};
        }

        this.props.loadListAccount(payload);

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
                this.props.deleteAnAccount(id)
            },
        });
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    handleShowChangePasswordClick = (id) => {
        this.props.changeFieldValue("id", id);
        this.props.DOC_changeActiveModal({modalId: 1});
    }

    render() {
        return (
            <AccountListComponent {...this.props}
                handleDeleteClick={this.handleDeleteClick}
                onChangePage={this.onChangePage}
                handleModalChange={this.handleModalChange}
                handleShowChangePasswordClick={this.handleShowChangePasswordClick}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    currentModalId:    getDocCurrentModalId(state),
    accounts:          getAccountList(state),
    pagination:        getAccountPaginationInfo(state),

    userGroups:        getUserGroupList(state),        
});

const mapDispatchToProps = (dispatch) => ({
    loadListAccount:     payload => dispatch(loadListAccount(payload)),
    deleteAnAccount:     payload => dispatch(deleteAnAccount(payload)),
    loadListUserGroup:   payload => dispatch(loadListUserGroup(payload)),

    openModalAction:     payload => dispatch(openModalAction(payload)),
    DOC_changeActiveModal:    payload => dispatch(DOC_changeActiveModal(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(ACCOUNT_CHANGE_PASSWORD_FORM_NAME, field, value))
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountList));