import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";
import moment from "moment";
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import auth from "../../../services/auth";
import {openModalAction} from "../../../actions";

import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {SYSTEM_CONFIG_FORM_NAME} from "../constants";
import {loadListSystemConfig, clearASystemConfig, uploadHDSDFile, deleteHDSDFile, setHDSDFile} from '../actions';
import {getSystemConfigList, getHDSDFile} from "../selectors";
import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId} from "../../users/selectors";
import {validateRequired, validateMaxLength, validateMinLength} from "../../../components/common/Form/FieldLevelValidation";
import SystemConfigComponent from "../components/SystemConfig";

class SystemConfig extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(1) === -1) {
                history.push("/dashboard");
            }
        }
        
        this.props.clearASystemConfig();
        this.props.loadListSystemConfig({limit: 10000});
    }

    // componentWillUnmount() {
    //     this.props.clearASystemConfig();
    // }

    componentDidUpdate(prevProps) {
        const {systemConfigs} = this.props;
        if (systemConfigs && prevProps.systemConfigs && systemConfigs !== prevProps.systemConfigs) {
            let findARequestTNMTLandData = systemConfigs.find(item => item.param_name === "requestTNMTLandData");
            let {feeOneRequest, maxFeeOneMonth, remindEmails} = findARequestTNMTLandData 
                                                             && findARequestTNMTLandData.param_value_json
                                                             && JSON.parse(findARequestTNMTLandData.param_value_json) || {};

            this.props.changeFieldValue("requestTNMTLandData.feeOneRequest", feeOneRequest);
            this.props.changeFieldValue("requestTNMTLandData.maxFeeOneMonth", maxFeeOneMonth);
            this.props.changeFieldValue("requestTNMTLandData.remindEmails", remindEmails);

            let findAHDSDFile = systemConfigs.find(item => item.param_name === "hdsdFile");
            let hdsdFile = findAHDSDFile && findAHDSDFile.param_value;
            this.props.setHDSDFile(hdsdFile);
        }

        const {file_name} = this.props;
        if((file_name !== prevProps.file_name)) {
            this.props.changeFieldValue("file_name", file_name);
        }
    }

    handleFileDrops = (acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach(file => {
            this.props.uploadHDSDFile(file);
        });
    };

    handleDeleteFile = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xoá file này không?',
            onConfirm: () => this.props.deleteHDSDFile({id}),
        });
    }

    render() {
        return (
            <SystemConfigComponent {...this.props}
                                   staticFileUrl={process.env.REACT_APP_STATIC_FILE_URL2}
                                   handleFileDrops={this.handleFileDrops}
                                   handleDeleteFile={this.handleDeleteFile}
            />
        );
    }
}

const validate = (values) => {
    const errors = {};

    return errors;
};

const formSelector = formValueSelector(SYSTEM_CONFIG_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:             getDocCurrentModalId(state),
    systemConfigs:              getSystemConfigList(state),

    userId:                     getUserId(state),
    file_name:                  getHDSDFile(state),
    formData:                   getFormValues(SYSTEM_CONFIG_FORM_NAME)(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListSystemConfig:           payload => dispatch(loadListSystemConfig(payload)),
    clearASystemConfig:             payload => dispatch(clearASystemConfig(payload)),
    uploadHDSDFile:                 payload => dispatch(uploadHDSDFile(payload)),
    deleteHDSDFile:                 payload => dispatch(deleteHDSDFile(payload)),
    setHDSDFile:                    payload => dispatch(setHDSDFile(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(SYSTEM_CONFIG_FORM_NAME, field, value))
    },

    openModalAction:               payload => dispatch(openModalAction(payload))
});

const onSubmitSuccess = (result, dispatch) => {
    return dispatch(push(`/he-thongs/system-configs`));
};

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: SYSTEM_CONFIG_FORM_NAME,
        onSubmit: onSubmitActions(SYSTEM_CONFIG_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(SystemConfig)
);