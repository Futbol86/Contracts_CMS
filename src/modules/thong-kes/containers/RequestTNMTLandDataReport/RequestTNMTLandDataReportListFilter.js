import React, { Component } from 'react';
import {reduxForm, getFormValues, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';
import {loadListTNMTLandDataReport} from '../../actions';
import RequestTNMTLandDataReportListFilterComponent from '../../components/RequestTNMTLandDataReport/RequestTNMTLandDataReportListFilter';
import {REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME} from '../../constants';
import {getUserData} from "../../../users/selectors";
import {loadListUserGroup,} from "../../../he-thongs/actions";
import {getUserGroupList,} from "../../../he-thongs/selectors";

class RequestTNMTLandDataReportListFilter extends Component {
    componentDidMount() {
        const {userData} = this.props;

        const initialValues = {
            option: 'quoteDate',
            // fromDate: new Date(),
            // toDate: new Date(),
            group_id: userData && userData.userGroupDetail.id,
        }

        this.props.initialize(initialValues);

        this.props.loadListUserGroup({limit: 100000});
    }

    render() {
        return (
            <RequestTNMTLandDataReportListFilterComponent {...this.props} />
        )
    }
}

const formSelector = formValueSelector(REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME);
const mapStateToProps = (state) => ({
    filterData:     getFormValues(REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME)(state),
    userData:       getUserData(state),
    user_groups:    getUserGroupList(state),
    group_id:       formSelector(state, "group_id"),
});

const mapDispatchToProps = (dispatch) => ({
    loadListTNMTLandDataReport:    payload => dispatch(loadListTNMTLandDataReport(payload)),
    loadListUserGroup:             payload => dispatch(loadListUserGroup(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(REQUEST_TNMT_LAND_DATA_REPORT_LIST_FILTER_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(RequestTNMTLandDataReportListFilter)
);