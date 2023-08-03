import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import uuid from "uuid";
import {toast} from 'react-toastify';
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';

import {LAND_PURPOSE_FORM_NAME} from "../constants";
import {loadALandPurposeInfo} from '../actions';
import {getLandPurposeInfo, getLoaiLandPurposeList} from "../selectors";
import {DOC_changeActiveModal, DOC_changeTypeModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId} from "../../users/selectors";
import {validateRequired, validateMinLength, validateMaxLength} from "../../../components/common/Form/FieldLevelValidation";
import LandPurposeAddComponent from "../components/LandPurposeAdd";
import auth from "../../../services/auth";

class LandPurposeEdit extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(14) === -1) {
                history.push("/dashboard");
            }
        }

        let {id} = this.props.match.params;
        if (id) {
            this.props.loadALandPurposeInfo({id});
        }
    }

    componentDidUpdate(prevProps) {
        const {landPurposeDetail} = this.props;
        if (landPurposeDetail && landPurposeDetail.id !== prevProps.landPurposeDetail.id) {
            let initialForm = {
                ...landPurposeDetail,
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
            <LandPurposeAddComponent {...this.props}
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

const formSelector = formValueSelector(LAND_PURPOSE_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:             getDocCurrentModalId(state),
    landPurposeDetail:          getLandPurposeInfo(state),
    userId:                     getUserId(state),
    
    submitDatas:                formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    loadALandPurposeInfo:               payload => dispatch(loadALandPurposeInfo(payload)),
    DOC_changeActiveModal:              payload => dispatch(DOC_changeActiveModal(payload)),
    DOC_changeTypeModal:                payload => dispatch(DOC_changeTypeModal(payload)),
    
    changeFieldValue: function (field, value) {
        dispatch(change(LAND_PURPOSE_FORM_NAME, field, value))
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
    dispatch(change(LAND_PURPOSE_FORM_NAME, "submitDatas", returnData));
};

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: LAND_PURPOSE_FORM_NAME,
        onSubmit: onSubmitActions(LAND_PURPOSE_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(LandPurposeEdit)
);