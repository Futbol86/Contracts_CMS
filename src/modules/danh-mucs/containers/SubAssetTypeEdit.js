import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import uuid from "uuid";
import {toast} from 'react-toastify';
import { push } from 'connected-react-router';
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';

import {SUB_ASSET_TYPE_FORM_NAME} from "../constants";
import {loadASubAssetTypeInfo} from '../actions';
import {getSubAssetTypeInfo} from "../selectors";
import {DOC_changeActiveModal, DOC_changeTypeModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId} from "../../users/selectors";
import {validateRequired, validateMinLength, validateMaxLength} from "../../../components/common/Form/FieldLevelValidation";
import SubAssetTypeAddComponent from "../components/SubAssetTypeAdd";
import auth from "../../../services/auth";

class SubAssetTypeEdit extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(12) === -1) {
                history.push("/dashboard");
            }
        }

        let {id} = this.props.match.params;
        if (id) {
            this.props.loadASubAssetTypeInfo({id});
        }
    }

    componentDidUpdate(prevProps) {
        const {subAssetTypeDetail} = this.props;
        if (subAssetTypeDetail && subAssetTypeDetail.id !== prevProps.subAssetTypeDetail.id) {
            let initialForm = {
                ...subAssetTypeDetail,
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
            <SubAssetTypeAddComponent {...this.props}
                                      uploadRootURL={uploadRootURL}
            />
        );
    }
}

const validate = (values) => {
    const errors = {};

    errors.asset_type_id = validateRequired(values.asset_type_id);
    errors.name = validateRequired(values.name);

    return errors;
};

const formSelector = formValueSelector(SUB_ASSET_TYPE_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:             getDocCurrentModalId(state),
    subAssetTypeDetail:         getSubAssetTypeInfo(state),

    submitDatas:                formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    loadASubAssetTypeInfo:           payload => dispatch(loadASubAssetTypeInfo(payload)),

    DOC_changeActiveModal:           payload => dispatch(DOC_changeActiveModal(payload)),
    DOC_changeTypeModal:             payload => dispatch(DOC_changeTypeModal(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(SUB_ASSET_TYPE_FORM_NAME, field, value))
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
    dispatch(change(SUB_ASSET_TYPE_FORM_NAME, "submitDatas", returnData));
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: SUB_ASSET_TYPE_FORM_NAME,
        onSubmit: onSubmitActions(SUB_ASSET_TYPE_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(SubAssetTypeEdit)
);