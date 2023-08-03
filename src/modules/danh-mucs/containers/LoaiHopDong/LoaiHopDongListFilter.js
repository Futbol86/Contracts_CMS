import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import LoaiHopDongListFilterComponent from '../../components/LoaiHopDong/LoaiHopDongListFilter';
import {LOAI_HOP_DONG_LIST_FILTER_FORM_NAME} from '../../constants';
import {getLoaiHopDongFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getLoaiHopDongFilterInfo(state)
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: LOAI_HOP_DONG_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(LOAI_HOP_DONG_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(LoaiHopDongListFilterComponent)
);