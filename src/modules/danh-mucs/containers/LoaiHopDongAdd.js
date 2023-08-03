import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import uuid from "uuid";
import {toast} from 'react-toastify';

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {LOAI_HOP_DONG_FORM_NAME} from "../constants";
import {DOC_changeActiveModal} from "../../documents/actions";

import {loadListContractType} from "../actions";
import {getContractTypeList} from "../selectors";
import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId, getUserName} from "../../users/selectors";
import {validateRequired, validateMinLength, validateMaxLength} from "../../../components/common/Form/FieldLevelValidation";
import LoaiHopDongAddComponent from "../components/LoaiHopDongAdd";
import auth from "../../../services/auth";

class LoaiHopDongAdd extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(11) === -1) {
                history.push("/dashboard");
            }
        }

        this.props.initialize({
            submitStatus: false,
            created_at: new Date(),
            created_by: this.props.userId,
        })

        this.props.loadListContractType({limit: 1000});
    }

    componentDidUpdate(prevProps) {
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

    // getUserGeolocationDetails = () => {
    //     fetch(
    //         "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
    //     )
    //     .then(response => response.json())
    //     .then(data => console.log('--- data', data));
    // }

    render() {
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        return (
            <>
                <LoaiHopDongAddComponent {...this.props}
                                        uploadRootURL={uploadRootURL}
                                        handleModalChange={this.handleModalChange}
                                        handleModalClose={this.handleModalClose}
                />
            </>
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

    errors.contract_type_id = validateRequired(values.contract_type_id);
    errors.name = validateRequired(values.name);

    return errors;
};

const formSelector = formValueSelector(LOAI_HOP_DONG_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),
    contractTypes:      getContractTypeList(state),
    
    userId:             getUserId(state),
    username:           getUserName(state),

    submitDatas:        formSelector(state, "submitDatas")
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    loadListContractType:       payload => dispatch(loadListContractType(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(LOAI_HOP_DONG_FORM_NAME, field, value))
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
    dispatch(reset(LOAI_HOP_DONG_FORM_NAME));
    dispatch(change(LOAI_HOP_DONG_FORM_NAME, "submitDatas", returnData));
};

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: LOAI_HOP_DONG_FORM_NAME,
        onSubmit: onSubmitActions(LOAI_HOP_DONG_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(LoaiHopDongAdd)
);