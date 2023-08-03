import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import BatDongSanListFilterComponent from '../../components/TaiSan/BatDongSanListFilter';
import {BAT_DONG_SAN_LIST_FILTER_FORM_NAME} from '../../constants';
import {getTaiSanFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getTaiSanFilterInfo(state),
        asset_type_id: 2,
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: BAT_DONG_SAN_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(BAT_DONG_SAN_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(BatDongSanListFilterComponent)
);