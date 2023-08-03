import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import UserLogListFilterComponent from '../../components/UserLog/UserLogListFilter';
import {USER_LOG_LIST_FILTER_FORM_NAME} from '../../constants';
import {getUserLogFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getUserLogFilterInfo(state)
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: USER_LOG_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(USER_LOG_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(UserLogListFilterComponent)
);