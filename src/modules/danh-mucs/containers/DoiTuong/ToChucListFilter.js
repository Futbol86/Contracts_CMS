import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import ToChucListFilterComponent from '../../components/DoiTuong/ToChucListFilter';
import {TO_CHUC_LIST_FILTER_FORM_NAME} from '../../constants';
import {getDoiTuongFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getDoiTuongFilterInfo(state)
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: TO_CHUC_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(TO_CHUC_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(ToChucListFilterComponent)
);