import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import uuid from "uuid";
import {toast} from 'react-toastify';
import {openModalAction} from "../../../actions";
import auth from "../../../services/auth";

import {DOI_TUONG_FORM_NAME} from "../constants";
import {loadADoiTuongInfo, loadListOwnerType, loadListSubOwnerType, loadListBank} from '../actions';
import {getDoiTuongInfo, getOwnerTypeList, getSubOwnerTypeList, getBankList} from "../selectors";
import {DOC_changeActiveModal, DOC_changeTypeModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId} from "../../users/selectors";
import {validateRequired, validateMinLength, validateMaxLength} from "../../../components/common/Form/FieldLevelValidation";
import DoiTuongAddComponent from "../components/DoiTuongAdd";

class DoiTuongEdit extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(4) === -1) {
                history.push("/dashboard");
            }
        }

        let {id} = this.props.match.params;
        if (id) {
            this.props.loadADoiTuongInfo({id});
            this.props.loadListOwnerType({limit: 10000});
            this.props.loadListSubOwnerType({limit: 10000});
            this.props.loadListBank({limit: 10000});
        }
    }

    componentDidUpdate(prevProps) {
        const {userId, ownerDetail} = this.props;
        if (ownerDetail && ownerDetail.id !== prevProps.ownerDetail.id) {
            let initialForm = {
                ...ownerDetail,
                bank_name: parseInt(ownerDetail.bank_name),
                updated_by: userId,
                updated_at: new Date(),
            }
            
            this.props.initialize(initialForm);
            this.props.changeFieldValue("owner_type_id", ownerDetail && ownerDetail.ownerTypeDetail.id);
        }

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

const validate = (values) => {
    const errors = {};

    if(values.owner_type_id === 1) {
        errors.owner_type_id = validateRequired(values.owner_type_id);
        errors.sub_owner_type_id = validateRequired(values.sub_owner_type_id);
        errors.fullname = validateRequired(values.fullname);
        errors.person_gender = values.person_gender === 0 ? undefined : validateRequired(values.person_gender);
        errors.license_no = validateRequired(values.license_no);
        //errors.issued_date = validateRequired(values.issued_date);

        if(values.year_of_birth)
            errors.year_of_birth = validateRequired(values.year_of_birth) || validateMinLength(4)(values.year_of_birth) || validateMaxLength(4)(values.year_of_birth);

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
    currentModalId:             getDocCurrentModalId(state),
    ownerDetail:                getDoiTuongInfo(state),
    ownerTypes:                 getOwnerTypeList(state),
    subOwnerTypes:              getSubOwnerTypeList(state),
    banks:                      getBankList(state),
    userId:                     getUserId(state),

    owner_type_id:              formSelector(state, "owner_type_id"),
    //formData:                   getFormValues(DOI_TUONG_FORM_NAME)(state),
    submitDatas:                formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:           payload => dispatch(DOC_changeActiveModal(payload)),
    DOC_changeTypeModal:             payload => dispatch(DOC_changeTypeModal(payload)),

    loadADoiTuongInfo:               payload => dispatch(loadADoiTuongInfo(payload)),
    loadListOwnerType:               payload => dispatch(loadListOwnerType(payload)),
    loadListSubOwnerType:            payload => dispatch(loadListSubOwnerType(payload)),
    loadListBank:                    payload => dispatch(loadListBank(payload)),
                      
    changeFieldValue: function (field, value) {
        dispatch(change(DOI_TUONG_FORM_NAME, field, value))
    },

    openModalAction:               payload => dispatch(openModalAction(payload))
});

const onSubmitSuccess = (result, dispatch) => {
    //return dispatch(push(`/danh-mucs/owner/list`));
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã sửa '" + result.data.data.fullname + "' thành công!"
    }
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
    })(DoiTuongEdit)
);