import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import UserGroupListFilterComponent from '../../components/UserGroup/UserGroupListFilter';
import {USER_GROUP_LIST_FILTER_FORM_NAME} from '../../constants';
import {getUserGroupFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getUserGroupFilterInfo(state)
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: USER_GROUP_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(USER_GROUP_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(UserGroupListFilterComponent)
);