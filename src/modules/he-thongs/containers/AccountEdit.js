import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import uuid from "uuid";
import {toast} from 'react-toastify';
import auth from "../../../services/auth";
import {openModalAction} from "../../../actions";

import {ACCOUNT_FORM_NAME} from "../constants";
import {loadListUserGroup, loadAnAccountInfo, clearAnAccount} from '../actions';
import {getUserGroupList, getAccountInfo} from "../selectors";
import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId} from "../../users/selectors";
import {validateRequired, validateMaxLength, validateMinLength} from "../../../components/common/Form/FieldLevelValidation";
import AccountAddComponent from "../components/AccountAdd";

class AccountEdit extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();
        let isAdmin = userData.username === "admin";

        if(isAdmin === false) {
            if(userData.role_ids) {
                if(userData.role_ids && userData.role_ids.indexOf(1) === -1) {
                    history.push("/dashboard");
                }
            }
        }

        let {id} = this.props.match.params;
        if (id) {
            this.props.loadAnAccountInfo({id});
        }
        
        this.props.loadListUserGroup({limit: 10000});
    }

    componentWillUnmount() {
        this.props.clearAnAccount();
    }

    componentDidUpdate(prevProps) {
        const {accountDetail} = this.props;
        if (accountDetail && accountDetail.id !== prevProps.accountDetail.id) {
            let initialForm = {
                ...accountDetail,
                role_ids: accountDetail.role_ids, //accountDetail.role_ids ? JSON.parse(accountDetail.role_ids) : [],
            }
            
            console.log('--- initialForm', initialForm)
            this.props.initialize(initialForm);
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
            <AccountAddComponent {...this.props}
                                 uploadRootURL={uploadRootURL}
            />
        );
    }
}

const validate = (values) => {
    const errors = {};

    errors.username = validateRequired(values.username);
    errors.password = validateRequired(values.password);
    errors.group_id = validateRequired(values.group_id);
    errors.fullname = validateRequired(values.fullname);

    // if(values.SoDienThoai)
    //     errors.SoDienThoai = validateRequired(values.SoDienThoai) || validateMinLength(10)(values.SoDienThoai) || validateMaxLength(12)(values.SoDienThoai);

    return errors;
};

const formSelector = formValueSelector(ACCOUNT_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:             getDocCurrentModalId(state),
    accountDetail:              getAccountInfo(state),

    userId:                     getUserId(state),
    userGroups:                 getUserGroupList(state),
    submitDatas:                formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    loadAnAccountInfo:              payload => dispatch(loadAnAccountInfo(payload)),
    loadListUserGroup:              payload => dispatch(loadListUserGroup(payload)),
    clearAnAccount:                 payload => dispatch(clearAnAccount(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(ACCOUNT_FORM_NAME, field, value))
    },

    openModalAction:               payload => dispatch(openModalAction(payload))
});

const onSubmitSuccess = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã sửa '" + result.data.data.username + "' thành công!"
    }
    dispatch(change(ACCOUNT_FORM_NAME, "submitDatas", returnData));
};

const onSubmitFail = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": false,
        "color": "danger",
        "message": result._error
    }
    dispatch(change(ACCOUNT_FORM_NAME, "submitDatas", returnData));
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: ACCOUNT_FORM_NAME,
        onSubmit: onSubmitActions(ACCOUNT_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        onSubmitFail: onSubmitFail,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(AccountEdit)
);