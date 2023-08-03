import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import uuid from "uuid";
import {toast} from 'react-toastify';
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';

import {LOAI_HOP_DONG_FORM_NAME} from "../constants";
import {loadALoaiHopDongInfo, loadListContractType} from '../actions';
import {getLoaiHopDongInfo, getContractTypeList} from "../selectors";
import {DOC_changeActiveModal, DOC_changeTypeModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId} from "../../users/selectors";
import {validateRequired, validateMinLength, validateMaxLength} from "../../../components/common/Form/FieldLevelValidation";
import LoaiHopDongAddComponent from "../components/LoaiHopDongAdd";
import auth from "../../../services/auth";

class LoaiHopDongEdit extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(11) === -1) {
                history.push("/dashboard");
            }
        }

        let {id} = this.props.match.params;
        if (id) {
            this.props.loadALoaiHopDongInfo({id});
            this.props.loadListContractType({limit: 1000});
        }
    }

    componentDidUpdate(prevProps) {
        const {userId, subContractTypeDetail} = this.props;
        if (subContractTypeDetail && subContractTypeDetail.id !== prevProps.subContractTypeDetail.id) {
            let initialForm = {
                ...subContractTypeDetail,
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
            <LoaiHopDongAddComponent {...this.props}
                uploadRootURL={uploadRootURL}
                handleModalChange={this.handleModalChange}
                handleModalClose={this.handleModalClose}
            />
        );
    }
}

const validate = (values) => {
    const errors = {};

    errors.contract_type_id = validateRequired(values.contract_type_id);
    errors.name = validateRequired(values.name);

    return errors;
};

const formSelector = formValueSelector(LOAI_HOP_DONG_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:             getDocCurrentModalId(state),
    subContractTypeDetail:      getLoaiHopDongInfo(state),
    contractTypes:              getContractTypeList(state),

    submitDatas:                formSelector(state, "submitDatas")
});

const mapDispatchToProps = (dispatch) => ({
    loadALoaiHopDongInfo:            payload => dispatch(loadALoaiHopDongInfo(payload)),
    loadListContractType:            payload => dispatch(loadListContractType(payload)),

    DOC_changeActiveModal:           payload => dispatch(DOC_changeActiveModal(payload)),
    DOC_changeTypeModal:             payload => dispatch(DOC_changeTypeModal(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(LOAI_HOP_DONG_FORM_NAME, field, value))
    },

    openModalAction:               payload => dispatch(openModalAction(payload))
});

const onSubmitSuccess = (result, dispatch) => {
    //return dispatch(push(`/danh-mucs/sub-contract-type/list`));
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã sửa '" + result.data.data.name + "' thành công!"
    }
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
    })(LoaiHopDongEdit)
);