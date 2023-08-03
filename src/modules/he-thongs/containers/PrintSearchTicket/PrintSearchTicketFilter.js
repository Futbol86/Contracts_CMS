import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import PrintSearchTicketListFilterComponent from '../../components/PrintSearchTicket/PrintSearchTicketListFilter';
import {PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME} from '../../constants';
import {getPrintSearchTicketFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getPrintSearchTicketFilterInfo(state)
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(PrintSearchTicketListFilterComponent)
);