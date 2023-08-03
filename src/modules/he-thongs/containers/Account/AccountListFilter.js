import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import AccountListFilterComponent from '../../components/Account/AccountListFilter';
import {ACCOUNT_LIST_FILTER_FORM_NAME} from '../../constants';
import {getAccountFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getAccountFilterInfo(state)
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: ACCOUNT_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(ACCOUNT_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(AccountListFilterComponent)
);