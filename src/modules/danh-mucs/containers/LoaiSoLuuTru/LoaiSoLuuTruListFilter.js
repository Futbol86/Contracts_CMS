import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import LoaiSoLuuTruListFilterComponent from '../../components/LoaiSoLuuTru/LoaiSoLuuTruListFilter';
import {LOAI_SO_LUU_TRU_LIST_FILTER_FORM_NAME} from '../../constants';
import {getLoaiSoLuuTruFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getLoaiSoLuuTruFilterInfo(state)
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: LOAI_SO_LUU_TRU_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(LOAI_SO_LUU_TRU_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(LoaiSoLuuTruListFilterComponent)
);