import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListSubAssetType, deleteASubAssetType} from '../actions';
import {getSubAssetTypeList, getSubAssetTypePaginationInfo} from "../selectors";
import {getDocCurrentModalType} from "../../documents/selectors";
import {PAGINATION_ITEMS_PER_PAGE} from "../constants";
import SubAssetTypeListComponent from "../components/SubAssetTypeList";
import auth from "../../../services/auth";

class SubAssetTypeList extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(12) === -1) {
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

        this.props.loadListSubAssetType(payload);
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

        this.props.loadListSubAssetType(payload);

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
                this.props.deleteASubAssetType(id)
            },
        });
    }

    render() {
        return (
            <SubAssetTypeListComponent {...this.props}
                handleDeleteClick={this.handleDeleteClick}
                onChangePage={this.onChangePage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    subAssetTypes:      getSubAssetTypeList(state),
    pagination:         getSubAssetTypePaginationInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListSubAssetType:    payload => dispatch(loadListSubAssetType(payload)),
    deleteASubAssetType:     payload => dispatch(deleteASubAssetType(payload)), 

    openModalAction:     payload => dispatch(openModalAction(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SubAssetTypeList));