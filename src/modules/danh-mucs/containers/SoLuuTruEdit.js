import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";
import {toast} from 'react-toastify';
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';

import {SO_LUU_TRU_FORM_NAME} from "../constants";
import {loadASoLuuTruInfo, loadListLoaiSoLuuTru} from '../actions';
import {getSoLuuTruInfo, getLoaiSoLuuTruList} from "../selectors";
import {DOC_changeActiveModal, DOC_changeTypeModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId} from "../../users/selectors";
import {validateRequired, validateMinLength, validateMaxLength} from "../../../components/common/Form/FieldLevelValidation";
import SoLuuTruAddComponent from "../components/SoLuuTruAdd";
import auth from "../../../services/auth";

class SoLuuTruEdit extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(10) === -1) {
                history.push("/dashboard");
            }
        }

        let {id} = this.props.match.params;
        if (id) {
            this.props.loadASoLuuTruInfo({id});
        }

        this.props.loadListLoaiSoLuuTru({limit: 10000});
    }

    componentDidUpdate(prevProps) {
        const {archiveBookDetail} = this.props;
        if (archiveBookDetail && archiveBookDetail.id !== prevProps.archiveBookDetail.id) {
            let initialForm = {
                ...archiveBookDetail,
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
    
    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    handleModalClose = () => {
        this.handleModalChange(0);
    }

    render() {
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        return (
            <SoLuuTruAddComponent {...this.props}
                uploadRootURL={uploadRootURL}
                handleModalChange={this.handleModalChange}
                handleModalClose={this.handleModalClose}
            />
        );
    }
}

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
    currentModalId:             getDocCurrentModalId(state),
    archiveBookDetail:          getSoLuuTruInfo(state),
    userId:                     getUserId(state),
    archiveBookTypes:           getLoaiSoLuuTruList(state),

    submitDatas:                formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    loadASoLuuTruInfo:               payload => dispatch(loadASoLuuTruInfo(payload)),
    DOC_changeActiveModal:           payload => dispatch(DOC_changeActiveModal(payload)),
    DOC_changeTypeModal:             payload => dispatch(DOC_changeTypeModal(payload)),
    loadListLoaiSoLuuTru:            payload => dispatch(loadListLoaiSoLuuTru(payload)),
    
    changeFieldValue: function (field, value) {
        dispatch(change(SO_LUU_TRU_FORM_NAME, field, value))
    },

    openModalAction:               payload => dispatch(openModalAction(payload))
});

const onSubmitSuccess = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã sửa '" + result.data.data.name + "' thành công!"
    }
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
    })(SoLuuTruEdit)
);