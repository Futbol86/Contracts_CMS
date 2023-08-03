import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import GiaiToaListFilterComponent from '../../components/GiaiToa/GiaiToaListFilter';
import {GIAI_TOA_LIST_FILTER_FORM_NAME} from '../../constants';
import {getGiaiToaFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        option: "release_number",
        filter: getGiaiToaFilterInfo(state),
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: GIAI_TOA_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(GIAI_TOA_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(GiaiToaListFilterComponent)
);