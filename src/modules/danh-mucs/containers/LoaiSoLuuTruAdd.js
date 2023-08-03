import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";
import {toast} from 'react-toastify';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {LOAI_SO_LUU_TRU_FORM_NAME} from "../constants";
import {DOC_changeActiveModal} from "../../documents/actions";

import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId} from "../../users/selectors";
import {validateRequired, validateMinLength, validateMaxLength} from "../../../components/common/Form/FieldLevelValidation";
import LoaiSoLuuTruAddComponent from "../components/LoaiSoLuuTruAdd";
import auth from "../../../services/auth";

class LoaiSoLuuTruAdd extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(13) === -1) {
                history.push("/dashboard");
            }
        }

        this.props.initialize({
            created_at: new Date(),
            created_by: this.props.userId,
        });
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
            <LoaiSoLuuTruAddComponent {...this.props}
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

    return errors;
};

const formSelector = formValueSelector(LOAI_SO_LUU_TRU_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),
    userId:             getUserId(state),

    submitDatas:        formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(LOAI_SO_LUU_TRU_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload))
});

const onSubmitSuccess = (result, dispatch) => {
    //return dispatch(push(`/danh-mucs/archive-book-type/list`));
    dispatch(reset(LOAI_SO_LUU_TRU_FORM_NAME));
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã thêm '" + result.data.data.name + "' thành công!"
    }
    dispatch(change(LOAI_SO_LUU_TRU_FORM_NAME, "submitDatas", returnData));

    return true;
};

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: LOAI_SO_LUU_TRU_FORM_NAME,
        onSubmit: onSubmitActions(LOAI_SO_LUU_TRU_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(LoaiSoLuuTruAdd)
);