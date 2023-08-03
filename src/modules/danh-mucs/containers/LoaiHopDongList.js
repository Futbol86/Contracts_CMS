import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListLoaiHopDong, deleteALoaiHopDong} from '../actions';
import {getLoaiHopDongFilterInfo, getLoaiHopDongList, getLoaiHopDongPaginationInfo} from "../selectors";
import {getDocCurrentModalType} from "../../documents/selectors";
import {PAGINATION_ITEMS_PER_PAGE} from "../constants";
import LoaiHopDongListComponent from "../components/LoaiHopDongList";
import auth from "../../../services/auth";

class LoaiHopDongList extends Component {
    componentDidMount() {
        const {history, contructionDataEntries} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(11) === -1) {
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

        this.props.loadListLoaiHopDong(payload);
    }

    onChangePage = (page) => {
        let payload = {};
        //-- get filtering information
        let {filter, pagination} = this.props;
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

        this.props.loadListLoaiHopDong(payload);

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
                this.props.deleteALoaiHopDong(id)
            },
        });
    }

    render() {
        return (
            <LoaiHopDongListComponent {...this.props}
                handleDeleteClick={this.handleDeleteClick}
                onChangePage={this.onChangePage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    contractTypes:      getLoaiHopDongList(state),
    pagination:         getLoaiHopDongPaginationInfo(state),
    filter:             getLoaiHopDongFilterInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListLoaiHopDong:    payload => dispatch(loadListLoaiHopDong(payload)),
    deleteALoaiHopDong:     payload => dispatch(deleteALoaiHopDong(payload)), 

    openModalAction:        payload => dispatch(openModalAction(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoaiHopDongList));