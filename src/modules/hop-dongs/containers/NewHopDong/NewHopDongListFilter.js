import React, { Component } from 'react';
import {reduxForm, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import NewHopDongListFilterComponent from '../../components/NewHopDong/NewHopDongListFilter';
import {NEW_HOP_DONG_IN_LIST_FILTER_FORM_NAME} from '../../constants';
import {getUserData} from "../../../users/selectors";

class NewHopDongListFilter extends Component {
    componentDidMount() {
        const {userData} = this.props;
        const initialValues = {
            option: 'contract_no',
            group_id: userData && userData.userGroupDetail.id,
            isAdmin: userData.username === "admin",
            userData
        }

        this.props.initialize(initialValues);
    }

    render() {
        return (
            <NewHopDongListFilterComponent {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    filterData: getFormValues(NEW_HOP_DONG_IN_LIST_FILTER_FORM_NAME)(state),
    userData:   getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: NEW_HOP_DONG_IN_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(NEW_HOP_DONG_IN_LIST_FILTER_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(NewHopDongListFilter)
);