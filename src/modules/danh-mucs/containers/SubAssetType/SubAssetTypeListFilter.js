import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import SubAssetTypeListFilterComponent from '../../components/SubAssetType/SubAssetTypeListFilter';
import {SUB_ASSET_TYPE_LIST_FILTER_FORM_NAME} from '../../constants';
import {getSubAssetTypeFilterInfo} from "../../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getSubAssetTypeFilterInfo(state)
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: SUB_ASSET_TYPE_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(SUB_ASSET_TYPE_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(SubAssetTypeListFilterComponent)
);