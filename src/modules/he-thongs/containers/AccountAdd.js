import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import uuid from "uuid";
import {toast} from 'react-toastify';
import auth from "../../../services/auth";
import {openModalAction} from "../../../actions";
import {ACCOUNT_FORM_NAME} from "../constants";
import {DOC_changeActiveModal} from "../../documents/actions";

import {loadListUserGroup} from "../actions";
import {getUserGroupList} from "../selectors";
import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId} from "../../users/selectors";
import AccountAddComponent from "../components/AccountAdd";
import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";

class AccountAdd extends Component {
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

        this.props.initialize({
            created_at: new Date(),
            created_by: this.props.userId,
        })
        this.props.loadListUserGroup({limit: 10000});
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
            <AccountAddComponent {...this.props}
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

    errors.username = validateRequired(values.username);
    errors.password = validateRequired(values.password);
    errors.group_id = validateRequired(values.group_id);
    errors.fullname = validateRequired(values.fullname);

    return errors;
};

const formSelector = formValueSelector(ACCOUNT_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),
    userId:             getUserId(state),

    userGroups:         getUserGroupList(state),
    submitDatas:        formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    loadListUserGroup:          payload => dispatch(loadListUserGroup(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(ACCOUNT_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload))
});

const onSubmitSuccess = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã thêm '" + result.data.data.username + "' thành công!"
    }
    dispatch(reset(ACCOUNT_FORM_NAME));
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
    })(AccountAdd)
);