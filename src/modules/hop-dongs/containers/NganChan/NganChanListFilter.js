import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import NganChanListFilterComponent from '../../components/NganChan/NganChanListFilter';
import {NGAN_CHAN_LIST_FILTER_FORM_NAME} from '../../constants';
import {getNganChanFilterInfo, getNganChanTabIndex} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filterData: getNganChanFilterInfo(state),
        //option: "judgments_decision_number",
        //prevention_type_id: parseInt(getNganChanTabIndex(state) + 1),
    },
    //prevention_type_id: parseInt(getNganChanTabIndex(state) + 1),
});

export default
connect(mapStateToProps, null)(
    reduxForm({
        form: NGAN_CHAN_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(NGAN_CHAN_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(NganChanListFilterComponent)
);