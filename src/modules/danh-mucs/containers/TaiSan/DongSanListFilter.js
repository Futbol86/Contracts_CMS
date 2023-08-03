import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import DongSanListFilterComponent from '../../components/TaiSan/DongSanListFilter';
import {DONG_SAN_LIST_FILTER_FORM_NAME} from '../../constants';
import {getTaiSanFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getTaiSanFilterInfo(state),
        asset_type_id: 1,
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: DONG_SAN_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(DONG_SAN_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(DongSanListFilterComponent)
);