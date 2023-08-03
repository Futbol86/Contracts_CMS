import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";
import {toast} from 'react-toastify';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {SO_LUU_TRU_FORM_NAME} from "../constants";
import {DOC_changeActiveModal} from "../../documents/actions";

import {loadListLoaiSoLuuTru} from "../actions";
import {getLoaiSoLuuTruList} from "../selectors";
import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId, getUserData} from "../../users/selectors";
import {validateRequired, validateMinLength, validateMaxLength} from "../../../components/common/Form/FieldLevelValidation";
import SoLuuTruAddComponent from "../components/SoLuuTruAdd";
import isEmpty from "lodash/isEmpty";

class SoLuuTruAdd extends Component {
    componentDidMount() {
        const {history, userData} = this.props;

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(10) === -1) {
                history.push("/dashboard");
            }
        }

        this.props.initialize({
            created_at: new Date(),
            created_by: userData.group_id,
        });
        this.props.loadListLoaiSoLuuTru({limit: 10000});
    }

    componentDidUpdate(prevProps) {
        const {submitDatas = {}} = this.props;
        if(submitDatas && !prevProps.submitDatas || (submitDatas && prevProps.submitDatas && submitDatas.id !== prevProps.submitDatas.id)) {
            toast.success(submitDatas.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }
    
    render() {
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        return (
            <SoLuuTruAddComponent {...this.props}
                                  uploadRootURL={uploadRootURL}
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

    errors.name = validateRequired(values.name);
    errors.archive_type_id = validateRequired(values.archive_type_id);
    errors.open_date = validateRequired(values.open_date);
    errors.close_date = validateRequired(values.close_date);

    return errors;
};

const formSelector = formValueSelector(SO_LUU_TRU_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),
    userId:             getUserId(state),
    userData:           getUserData(state),
    archiveBookTypes:   getLoaiSoLuuTruList(state),

    submitDatas:        formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    loadListLoaiSoLuuTru:       payload => dispatch(loadListLoaiSoLuuTru(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(SO_LUU_TRU_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload))
});

const onSubmitSuccess = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã thêm '" + result.data.data.name + "' thành công!"
    }
    dispatch(reset(SO_LUU_TRU_FORM_NAME));
    dispatch(change(SO_LUU_TRU_FORM_NAME, "submitDatas", returnData));
};

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: SO_LUU_TRU_FORM_NAME,
        onSubmit: onSubmitActions(SO_LUU_TRU_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(SoLuuTruAdd)
);