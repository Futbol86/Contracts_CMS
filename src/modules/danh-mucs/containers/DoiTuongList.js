import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";
import auth from "../../../services/auth";
import {toast} from 'react-toastify';

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListDoiTuong, deleteADoiTuong, doChangeOwnerTab, clearADoiTuongErrorOrMessages} from '../actions';
import {getDoiTuongList, getDoiTuongPaginationInfo, getOwnerTabIndex, getDoiTuongErrors, getDoiTuongMessage} from "../selectors";
import {getDocCurrentModalType} from "../../documents/selectors";
import {PAGINATION_ITEMS_PER_PAGE} from "../constants";
import DoiTuongListComponent from "../components/DoiTuongList";
import {getUserData} from "../../users/selectors";

class DoiTuongList extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(4) === -1) {
                history.push("/dashboard");
            }
        }

        const {tabIndex} = this.props;
        this.loadPage({sub_owner_type_id: tabIndex === 0 ? 1 : 5});
    }

    componentDidUpdate(prevProps) {
        const {errors, message} = this.props;
        if(errors && !prevProps.errors || (errors && prevProps.errors && errors !== prevProps.errors)) {
            toast.error(errors, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            this.props.clearADoiTuongErrorOrMessages();
        }

        if(message && !prevProps.message || (message && prevProps.message && message !== prevProps.message)) {
            toast.success(message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            this.props.clearADoiTuongErrorOrMessages();
        }
    }

    loadPage = ({sub_owner_type_id}) => {
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

      //  filter += "&sub_owner_type_id=" + sub_owner_type_id;
        filter.sub_owner_type_id = sub_owner_type_id;
        if (filter)
            payload.filter = filter;

        this.props.loadListDoiTuong(payload);
    }

    onChangePage = (page) => {
        let payload = {};
        //-- get filtering information
        let {filter = {}, pagination, tabIndex} = this.props;
        if (filter)
            payload = {...payload, filter};

        let sub_owner_type_id = tabIndex === 0 ? 1 : 5;
        //filter += "&sub_owner_type_id=" + sub_owner_type_id;
        filter.sub_owner_type_id = sub_owner_type_id;
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

        this.props.loadListDoiTuong(payload);

        //-- Update router's link
        const {history} = this.props;
        const query = new URLSearchParams(history.location.search);
        query.set('page', page);
        //-- push then we can go with back button, replace then NO        
        history.push({...history.location, search: query.toString()});
    };

    handleChangeTabs = (tabIndex) => {
        this.props.doChangeOwnerTab({tabIndex});

        this.loadPage({
            sub_owner_type_id: tabIndex === 0 ? 1 : 5
        });
    }

    handleDeleteClick = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xóa không?',
            onConfirm: () => {
                this.props.deleteADoiTuong(id)
            },
        });
    }

    render() {
        const {userData} = this.props;
        let isEnableAddEdit = true;

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(4) === -1) {
                isEnableAddEdit = false;
            }
        }

        return (
            <DoiTuongListComponent {...this.props}
                                   isEnableAddEdit={isEnableAddEdit}
                                   tabIndex={this.props.tabIndex}
                                   onChangePage={this.onChangePage}
                                   handleChangeTabs={this.handleChangeTabs}
                                   handleDeleteClick={this.handleDeleteClick} />
        );
    }
}

const mapStateToProps = (state) => ({
    userData:        getUserData(state),
    owners:          getDoiTuongList(state),
    pagination:      getDoiTuongPaginationInfo(state),
    tabIndex:        getOwnerTabIndex(state),
    errors:          getDoiTuongErrors(state),
    message:         getDoiTuongMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListDoiTuong:     payload => dispatch(loadListDoiTuong(payload)),
    deleteADoiTuong:      payload => dispatch(deleteADoiTuong(payload)), 
    doChangeOwnerTab:     payload => dispatch(doChangeOwnerTab(payload)), 
    clearADoiTuongErrorOrMessages: payload => dispatch(clearADoiTuongErrorOrMessages(payload)), 

    openModalAction:     payload => dispatch(openModalAction(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(DoiTuongList));