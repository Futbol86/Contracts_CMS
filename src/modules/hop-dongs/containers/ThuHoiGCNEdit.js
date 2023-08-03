import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";
import {toast} from 'react-toastify';
import {reduxForm, formValueSelector, change, reset, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {isEmpty} from 'lodash';

import auth from "../../../services/auth";
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {THU_HOI_GCN_FORM_NAME} from "../constants";

import {DOC_changeActiveModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";

import {getUserId, getUserData} from "../../users/selectors";
import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";

import {loadAThuHoiGCNInfo, clearAThuHoiGCN, uploadThuHoiGCNFiles, deleteAThuHoiGCNFile} from "../actions";
import {getThuHoiGCNInfo, getThuHoiGCNFile} from "../selectors";

import ThuHoiGCNAddComponent from "../components/ThuHoiGCNAdd";

class ThuHoiGCNEdit extends Component {
    componentDidMount() {
        const {history, userData} = this.props;

        // if(userData.role_ids) {
        //     if(userData.role_ids && userData.role_ids.indexOf(8) === -1) {
        //         history.push("/dashboard");
        //     }
        // }

        let {id} = this.props.match.params;
        if (id) {
            this.props.loadAThuHoiGCNInfo({id});
        }
    }

    componentWillUnmount() {
        this.props.clearAThuHoiGCN();
    }

    componentDidUpdate(prevProps) {
        const {thuHoiGCNInfo} = this.props;

        if(thuHoiGCNInfo && !prevProps.thuHoiGCNInfo || 
          (thuHoiGCNInfo && prevProps.thuHoiGCNInfo && thuHoiGCNInfo.id !== prevProps.thuHoiGCNInfo.id)) {


            let initialForm = {
                ...thuHoiGCNInfo,
            }
            this.props.initialize(initialForm);
        }

        const {eviction_file} = this.props;
        if(eviction_file !== prevProps.eviction_file) {
            this.props.changeFieldValue("eviction_file", eviction_file);
        }

        const {submitDatas = {}} = this.props;
        if(submitDatas && !prevProps.submitDatas 
       || (submitDatas && prevProps.submitDatas && submitDatas.id !== prevProps.submitDatas.id)) {
            if(submitDatas.status === false) {
                toast.error(submitDatas.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } else {
                toast.success(submitDatas.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    }

    handleFileDrops = (acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach(file => {
            this.props.uploadThuHoiGCNFiles(file);
        });
    };

    handleDeleteFile = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xoá file này không?',
            onConfirm: () => this.props.deleteAThuHoiGCNFile({id}),
        });
    }

    render() {
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        return (
            <ThuHoiGCNAddComponent {...this.props}
                                staticFileUrl={uploadRootURL}
                                handleModalChange={this.handleModalChange}
                                handleFileDrops={this.handleFileDrops}
                                handleDeleteFile={this.handleDeleteFile}
            />
        );
    }
}

/**
 * Form validation
 *
 * @param values
 */
const validate = (values) => {
    const errors = {};
    return errors;
};

const formSelector = formValueSelector(THU_HOI_GCN_FORM_NAME);
const mapStateToProps = (state) => ({
    formDatas:              getFormValues(THU_HOI_GCN_FORM_NAME)(state),
    currentModalId:         getDocCurrentModalId(state),
    userId:                 getUserId(state),
    userData:               getUserData(state),

    eviction_file:          getThuHoiGCNFile(state),
    thuHoiGCNInfo:          getThuHoiGCNInfo(state),

    submitDatas:            formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(THU_HOI_GCN_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload)),

    loadAThuHoiGCNInfo:         payload => dispatch(loadAThuHoiGCNInfo(payload)),
    clearAThuHoiGCN:            payload => dispatch(clearAThuHoiGCN(payload)),

    uploadThuHoiGCNFiles:       payload => dispatch(uploadThuHoiGCNFiles(payload)),
    deleteAThuHoiGCNFile:       payload => dispatch(deleteAThuHoiGCNFile(payload)),
});

const onSubmitSuccess = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã sửa thành công!"
    }
    dispatch(change(THU_HOI_GCN_FORM_NAME, "submitDatas", returnData));
};

const onSubmitFail = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": false,
        "color": "danger",
        "message": result._error
    }
    dispatch(change(THU_HOI_GCN_FORM_NAME, "submitDatas", returnData));
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: THU_HOI_GCN_FORM_NAME,
        onSubmit: onSubmitActions(THU_HOI_GCN_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        onSubmitFail: onSubmitFail,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(ThuHoiGCNEdit)
);