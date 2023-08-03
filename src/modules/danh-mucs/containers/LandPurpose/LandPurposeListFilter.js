import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import LandPurposeListFilterComponent from '../../components/LandPurpose/LandPurposeListFilter';
import {LAND_PURPOSE_LIST_FILTER_FORM_NAME} from '../../constants';
import {getTaiSanFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getTaiSanFilterInfo(state)
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: LAND_PURPOSE_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(LAND_PURPOSE_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(LandPurposeListFilterComponent)
);