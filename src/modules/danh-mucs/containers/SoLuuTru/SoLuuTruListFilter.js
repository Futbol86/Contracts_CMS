import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import SoLuuTruListFilterComponent from '../../components/SoLuuTru/SoLuuTruListFilter';
import {SO_LUU_TRU_LIST_FILTER_FORM_NAME} from '../../constants';
import {getSoLuuTruFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getSoLuuTruFilterInfo(state)
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: SO_LUU_TRU_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(SO_LUU_TRU_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(SoLuuTruListFilterComponent)
);