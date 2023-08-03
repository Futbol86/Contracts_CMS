import React, {Component} from 'react';
import {connect} from 'react-redux';
import { push } from 'connected-react-router';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import uuid from "uuid";
import {toast} from 'react-toastify';
import auth from "../../../services/auth";
import {openModalAction} from "../../../actions";

import {loadListOwnerType, loadListSubOwnerType, loadListBank} from "../actions";
import {getOwnerTypeList, getSubOwnerTypeList, getBankList} from "../selectors";

import {DOI_TUONG_FORM_NAME} from "../constants";
import {DOC_changeActiveModal} from "../../documents/actions";

import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId} from "../../users/selectors";
import {validateRequired, validateMinLength, validateMaxLength, validateBetweenValue} from "../../../components/common/Form/FieldLevelValidation";
import DoiTuongAddComponent from "../components/DoiTuongAdd";

class DoiTuongAdd extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();
        const {doiTuongType} = this.props; // use for contract

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(4) === -1) {
                history.push("/dashboard");
            }
        }

        this.props.initialize({
            created_at: new Date(),
            created_by: this.props.userId,
            owner_type_id: 1,
            sub_owner_type_id: 1,
            doiTuongType
        });

       // this.props.loadListOwnerType({limit: 10000});
        this.props.loadListSubOwnerType({limit: 10000});
        this.props.loadListBank({limit: 10000});
    }

    componentDidUpdate(prevProps) {
        const {submitDatas = {}} = this.props;
        if(submitDatas && !prevProps.submitDatas || (submitDatas && prevProps.submitDatas && submitDatas.id !== prevProps.submitDatas.id)) {
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

    render() {
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        return (
            <DoiTuongAddComponent {...this.props} uploadRootURL={uploadRootURL} />
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

    if(values.owner_type_id === 1) {
        errors.owner_type_id = validateRequired(values.owner_type_id);
        errors.sub_owner_type_id = validateRequired(values.sub_owner_type_id);
        errors.fullname = validateRequired(values.fullname);
        errors.person_gender = values.person_gender === 0 ? undefined : validateRequired(values.person_gender);
        errors.license_no = validateRequired(values.license_no);
        //errors.issued_date = validateRequired(values.issued_date);
        errors.year_of_birth = validateRequired(values.year_of_birth);

        if(values.year_of_birth)
            errors.year_of_birth = validateMinLength(4)(values.year_of_birth) || validateMaxLength(4)(values.year_of_birth);

        if(values.phone)
            errors.phone = validateRequired(values.phone) || validateMinLength(10)(values.phone) || validateMaxLength(12)(values.phone);
    } else {
        errors.owner_type_id = validateRequired(values.owner_type_id);
        errors.sub_owner_type_id = validateRequired(values.sub_owner_type_id);
        errors.fullname = validateRequired(values.fullname);
        errors.license_no = validateRequired(values.license_no);
        //errors.issued_date = validateRequired(values.issued_date);
        
        if(values.phone)
            errors.phone = validateRequired(values.phone) || validateMinLength(10)(values.phone) || validateMaxLength(12)(values.phone);
    }
    
    return errors;
};

const formSelector = formValueSelector(DOI_TUONG_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:       getDocCurrentModalId(state),
    //ownerTypes:           getOwnerTypeList(state),
    subOwnerTypes:        getSubOwnerTypeList(state),
    banks:                getBankList(state),

    userId:               getUserId(state),

    owner_type_id:        formSelector(state, "owner_type_id"),
    sub_owner_type_id:    formSelector(state, "sub_owner_type_id"),
    submitDatas:          formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    loadListOwnerType:          payload => dispatch(loadListOwnerType(payload)),
    loadListSubOwnerType:       payload => dispatch(loadListSubOwnerType(payload)),
    loadListBank:               payload => dispatch(loadListBank(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(DOI_TUONG_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload))
});

const onSubmitSuccess = (result, dispatch) => {
    //return dispatch(push(`/danh-mucs/owner/list`));
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã thêm '" + result.data.data.fullname + "' thành công!"
    }
    dispatch(reset(DOI_TUONG_FORM_NAME));
    dispatch(change(DOI_TUONG_FORM_NAME, "submitDatas", returnData));
};

const onSubmitFail = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": false,
        "color": "danger",
        "message": result._error
    }
    dispatch(change(DOI_TUONG_FORM_NAME, "submitDatas", returnData));
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: DOI_TUONG_FORM_NAME,
        onSubmit: onSubmitActions(DOI_TUONG_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        onSubmitFail: onSubmitFail,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(DoiTuongAdd)
);