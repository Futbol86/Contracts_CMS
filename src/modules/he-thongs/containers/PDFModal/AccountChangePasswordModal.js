import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';

import {ACCOUNT_CHANGE_PASSWORD_FORM_NAME} from "../../constants";
import {validateRequired} from "../../../../components/common/Form/FieldLevelValidation";
import {DOC_changeActiveModal} from "../../../documents/actions";
import {getDocCurrentModalId} from "../../../documents/selectors";

import AccountChangePasswordModalComponent from "../../components/PDFModal/AccountChangePasswordModal";

class AccountChangePasswordModal extends Component {
    render() {
        return (
            <AccountChangePasswordModalComponent {...this.props} />
        );
    }
}

const validate = (values) => {
    const errors = {};

    errors.password = validateRequired(values.password);
    return errors;
};

const onSubmitSuccess = (result, dispatch) => {
    return dispatch(DOC_changeActiveModal({modalId: 0}))
};

const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),
});

export default connect(mapStateToProps, {DOC_changeActiveModal})(
    reduxForm({
        form: ACCOUNT_CHANGE_PASSWORD_FORM_NAME,
        onSubmit: onSubmitActions(ACCOUNT_CHANGE_PASSWORD_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(AccountChangePasswordModal)
);