import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";
import {toast} from 'react-toastify';
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';

import {LOAI_SO_LUU_TRU_FORM_NAME} from "../constants";
import {loadALoaiSoLuuTruInfo} from '../actions';
import {getLoaiSoLuuTruInfo,} from "../selectors";
import {DOC_changeActiveModal, DOC_changeTypeModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId} from "../../users/selectors";
import {validateRequired, validateMinLength, validateMaxLength} from "../../../components/common/Form/FieldLevelValidation";
import LoaiSoLuuTruAddComponent from "../components/LoaiSoLuuTruAdd";
import auth from "../../../services/auth";

class LoaiSoLuuTruEdit extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(13) === -1) {
                history.push("/dashboard");
            }
        }

        let {id} = this.props.match.params;
        if (id) {
            this.props.loadALoaiSoLuuTruInfo({id});
        }
    }

    componentDidUpdate(prevProps) {
        const {archiveBookTypeDetail} = this.props;
        if (archiveBookTypeDetail && archiveBookTypeDetail.id !== prevProps.archiveBookTypeDetail.id) {
            let initialForm = {
                ...archiveBookTypeDetail,
            }
            
            this.props.initialize(initialForm);
        }

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

const validate = (values) => {
    const errors = {};

    errors.name = validateRequired(values.name);

    return errors;
};

const formSelector = formValueSelector(LOAI_SO_LUU_TRU_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:             getDocCurrentModalId(state),
    archiveBookTypeDetail:      getLoaiSoLuuTruInfo(state),
    userId:                     getUserId(state),

    submitDatas:                formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    loadALoaiSoLuuTruInfo:           payload => dispatch(loadALoaiSoLuuTruInfo(payload)),
    DOC_changeActiveModal:           payload => dispatch(DOC_changeActiveModal(payload)),
    DOC_changeTypeModal:             payload => dispatch(DOC_changeTypeModal(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(LOAI_SO_LUU_TRU_FORM_NAME, field, value))
    },

    openModalAction:                payload => dispatch(openModalAction(payload))
});

const onSubmitSuccess = (result, dispatch) => {
    //return dispatch(push(`/danh-mucs/archive-book-type/list`));
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã sửa '" + result.data.data.name + "' thành công!"
    }
    dispatch(change(LOAI_SO_LUU_TRU_FORM_NAME, "submitDatas", returnData));
};

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: LOAI_SO_LUU_TRU_FORM_NAME,
        onSubmit: onSubmitActions(LOAI_SO_LUU_TRU_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(LoaiSoLuuTruEdit)
);