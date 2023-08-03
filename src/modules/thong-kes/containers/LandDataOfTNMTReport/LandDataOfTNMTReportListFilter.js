import React, { Component } from 'react';
import {reduxForm, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';
import LandDataOfTNMTReportListFilterComponent from '../../components/LandDataOfTNMTReport/LandDataOfTNMTReportListFilter';
import {LAND_DATA_OF_TNMT_REPORT_LIST_FILTER_FORM_NAME} from '../../constants';
import {getUserData} from "../../../users/selectors";

class LandDataOfTNMTReportListFilter extends Component {
    componentDidMount() {
        const {userData} = this.props;

        const initialValues = {
            username: userData.userGroupDetail.userRequestTNMTData,
            password: userData.userGroupDetail.passwordRequestTNMTData,
            departmentCode: userData.userGroupDetail.departmentCode,
            option: 'quoteDate',
            fromDate: new Date(),
            toDate: new Date()
        }

        this.props.initialize(initialValues);
    }

    render() {
        return (
            <LandDataOfTNMTReportListFilterComponent {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    userData:   getUserData(state),
    filterData: getFormValues(LAND_DATA_OF_TNMT_REPORT_LIST_FILTER_FORM_NAME)(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: LAND_DATA_OF_TNMT_REPORT_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(LAND_DATA_OF_TNMT_REPORT_LIST_FILTER_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(LandDataOfTNMTReportListFilter)
);