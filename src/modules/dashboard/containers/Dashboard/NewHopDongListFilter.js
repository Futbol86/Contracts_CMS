import React, { Component } from 'react';
import {reduxForm, formValueSelector, getFormValues, change} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import NewHopDongListFilterComponent from '../../components/Dashboard/NewHopDongListFilter';
import {NEW_HOP_DONG_LIST_FILTER_FORM_NAME} from '../../../hop-dongs/constants';
// import {getUserData} from "../../../users/selectors";

class NewHopDongListFilter extends Component {
    componentDidMount() {
        this.props.initialize({
            search_type: "normal_search"
        });
    }

    render() {
        return (
            <NewHopDongListFilterComponent {...this.props} />
        )
    }
}

const formSelector = formValueSelector(NEW_HOP_DONG_LIST_FILTER_FORM_NAME);
const mapStateToProps = (state) => ({
    filterData: getFormValues(NEW_HOP_DONG_LIST_FILTER_FORM_NAME)(state),
    //userData:   getUserData(state),
    search_type: formSelector(state, "search_type"),
    search_field: formSelector(state, "search_field"),
});

const mapDispatchToProps = (dispatch) => ({
    changeFieldValue: function (field, value) {
        dispatch(change(NEW_HOP_DONG_LIST_FILTER_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: NEW_HOP_DONG_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(NEW_HOP_DONG_LIST_FILTER_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(NewHopDongListFilter)
);