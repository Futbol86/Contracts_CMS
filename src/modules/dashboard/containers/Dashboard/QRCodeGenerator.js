import React, {Component} from 'react';
import {reduxForm, getFormValues, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {QR_CODE_FORM_NAME} from '../../constants';
import QRCodeGeneratorComponent from "../../components/Dashboard/QRCodeGenerator";

class QRCodeGenerator extends Component {
    render() {
        console.log('qr_code_text', this.props.qr_code_text)
        return (
            <QRCodeGeneratorComponent {...this.props}/>
        );
    }
}


const formSelector = formValueSelector(QR_CODE_FORM_NAME);
const mapStateToProps = (state) => ({
    qr_code_text:    formSelector(state, "qr_code_text"),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: QR_CODE_FORM_NAME,
        // onSubmit: onSubmitActions(QR_CODE_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(QRCodeGenerator)
);