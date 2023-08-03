import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";
import auth from "../../../services/auth";

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListUserLog, deleteAnUserLog} from '../actions';
import {getUserLogList, getUserLogFilterInfo, getUserLogPaginationInfo} from "../selectors";
import {getDocCurrentModalType} from "../../documents/selectors";
import { loadListUserGroup } from "../../he-thongs/actions";
import { getUserGroupList } from "../../he-thongs/selectors";
import {getUserData} from "../../users/selectors";
import {PAGINATION_ITEMS_PER_PAGE} from "../constants";
import UserLogListComponent from "../components/UserLogList";

class UserLogList extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(1) === -1) {
                history.push("/dashboard");
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

        this.props.loadListUserGroup({limit: 10000});
        this.props.loadListUserLog(payload);
    }

    onChangePage = (page) => {
        // let payload = {};
        //-- get filtering information
        // let {filter = {}, pagination} = this.props;
        // //filter.search = "";
        // payload.filter = filter;
        // if (filter)
        //     payload = {...payload, filter};
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

        this.props.loadListUserLog(payload);

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
                this.props.deleteAnUserLog(id)
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
            <UserLogListComponent {...this.props}
                handleDeleteClick={this.handleDeleteClick}
                onChangePage={this.onChangePage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    userGroups:        getUserGroupList(state),
    userLogs:          getUserLogList(state),
    userData:          getUserData(state),

    filterData:        getUserLogFilterInfo(state),
    pagination:        getUserLogPaginationInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListUserGroup:   payload => dispatch(loadListUserGroup(payload)),
    loadListUserLog:     payload => dispatch(loadListUserLog(payload)),
    deleteAnUserLog:     payload => dispatch(deleteAnUserLog(payload)),
    openModalAction:     payload => dispatch(openModalAction(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserLogList));