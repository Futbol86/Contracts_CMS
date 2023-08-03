import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import ThuHoiGCNListFilterComponent from '../../components/ThuHoiGCN/ThuHoiGCNListFilter';
import {THU_HOI_GCN_LIST_FILTER_FORM_NAME} from '../../constants';
import {getThuHoiGCNFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filterData: getThuHoiGCNFilterInfo(state),
    },
});

export default
connect(mapStateToProps, null)(
    reduxForm({
        form: THU_HOI_GCN_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(THU_HOI_GCN_LIST_FILTER_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(ThuHoiGCNListFilterComponent)
);