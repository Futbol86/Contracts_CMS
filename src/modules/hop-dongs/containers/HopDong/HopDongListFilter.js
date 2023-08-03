import React, { Component } from 'react';
import {reduxForm, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import HopDongListFilterComponent from '../../components/HopDong/HopDongListFilter';
import {HOP_DONG_LIST_FILTER_FORM_NAME} from '../../constants';
import {getUserData} from "../../../users/selectors";

class HopDongListFilter extends Component {
    componentDidMount() {
        const {userData} = this.props;

        const initialValues = {
            option: 'contract_no',
            group_id: userData && userData.userGroupDetail.id,
            isAdmin: userData.username === "admin",
        }

        this.props.initialize(initialValues);
    }

    render() {
        return (
            <HopDongListFilterComponent {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    filterData: getFormValues(HOP_DONG_LIST_FILTER_FORM_NAME)(state),
    userData:   getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: HOP_DONG_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(HOP_DONG_LIST_FILTER_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(HopDongListFilter)
);