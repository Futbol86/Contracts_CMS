import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import PermissionListFilterComponent from '../../components/Permission/PermissionListFilter';
import {PERMISSION_LIST_FILTER_FORM_NAME} from '../../constants';
import {getPermissionFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getPermissionFilterInfo(state)
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: PERMISSION_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(PERMISSION_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(PermissionListFilterComponent)
);