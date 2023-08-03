import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";
import {toast} from 'react-toastify';
import {reduxForm, formValueSelector, change, reset, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {isEmpty} from 'lodash';

import auth from "../../../services/auth";
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {GIAI_TOA_FORM_NAME} from "../constants";

import {doSetAssetPreventionSelected} from '../actions';
import {getAssetPreventionSelected} from '../selectors';

import {DOC_changeActiveModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";

import {getUserId, getUserData} from "../../users/selectors";
import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";
import GiaiToaAddComponent from "../components/GiaiToaAdd";

import {loadListSoLuuTru, loadListLoaiSoLuuTru} from "../../danh-mucs/actions";
import {getSoLuuTruList, getLoaiSoLuuTruList} from "../../danh-mucs/selectors";

import {uploadGiaiToaFiles, deleteAGiaiToaFile, clearANganChanFilterInfo} from "../actions";
import {getGiaiToaFile} from "../selectors";

class GiaiToaAdd extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        //const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(8) === -1) {
                history.push("/dashboard");
            }
        }

        this.props.initialize({
            archive_book_type_id: 2,
            archive_book_id: 14,
            release_date: new Date(),
            group_id: userData && userData.userGroupDetail.id,
            created_at: new Date(),
            created_by: this.props.userId,
        });

        this.props.loadListSoLuuTru({limit: 10000000, filter: {group_id: userData.group_id}});
        this.props.loadListLoaiSoLuuTru({limit: 10000});
    }

    componentDidUpdate(prevProps) {
        let {asset_prevention_selected} = this.props;
        
        if(!isEmpty(asset_prevention_selected)) {
            this.props.changeFieldValue("prevention_id", asset_prevention_selected.id);
        }
        const {release_file} = this.props;

        if(release_file && (release_file !== prevProps.release_file)) {
            this.props.changeFieldValue("release_file", release_file);
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

    componentWillUnmount() {
        this.props.doSetAssetPreventionSelected([]);
    }

    handleModalChange = (modalId) => {
        if(modalId === 0) {
            this.props.clearANganChanFilterInfo();
        }
        this.props.DOC_changeActiveModal({modalId});
    };

    handleFileDrops = (acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach(file => {
            this.props.uploadGiaiToaFiles(file);
        });
    };

    handleDeleteFile = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xoá file này không?',
            onConfirm: () => this.props.deleteAGiaiToaFile({id}),
        });
    }

    render() {
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        //console.log('----- archive_book_id', this.props.archive_book_id)
        return (
            <GiaiToaAddComponent {...this.props}
                                staticFileUrl={uploadRootURL}
                                handleModalChange={this.handleModalChange}
                                handleFileDrops={this.handleFileDrops}
                                handleDeleteFile={this.handleDeleteFile}
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

    errors.release_number = validateRequired(values.release_number);
    errors.release_date = validateRequired(values.release_date);
    errors.archive_book_type_id = validateRequired(values.archive_book_type_id);
    errors.archive_book_id = validateRequired(values.archive_book_id);

    return errors;
};

const formSelector = formValueSelector(GIAI_TOA_FORM_NAME);
const mapStateToProps = (state) => ({
    formDatas:              getFormValues(GIAI_TOA_FORM_NAME)(state),
    currentModalId:         getDocCurrentModalId(state),
    userId:                 getUserId(state),
    userData:               getUserData(state),

    prevention_id:          formSelector(state, "prevention_id"),
    prevention_type_id:     formSelector(state, "prevention_type_id"),
    archive_book_type_id:   formSelector(state, "archive_book_type_id"),
   // archive_book_id:   formSelector(state, "archive_book_id"),

    archive_books:          getSoLuuTruList(state),
    archive_book_types:     getLoaiSoLuuTruList(state),

    asset_prevention_selected: getAssetPreventionSelected(state),

    release_file:            getGiaiToaFile(state),
    submitDatas:             formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(GIAI_TOA_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload)),

    loadListSoLuuTru:           payload => dispatch(loadListSoLuuTru(payload)),
    loadListLoaiSoLuuTru:       payload => dispatch(loadListLoaiSoLuuTru(payload)),

    doSetAssetPreventionSelected:  payload => dispatch(doSetAssetPreventionSelected(payload)),
    clearANganChanFilterInfo:   payload => dispatch(clearANganChanFilterInfo(payload)),

    uploadGiaiToaFiles:         payload => dispatch(uploadGiaiToaFiles(payload)),
    deleteAGiaiToaFile:         payload => dispatch(deleteAGiaiToaFile(payload)),
});

const onSubmitSuccess = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã thêm '" + result.data.data.release_number + "' thành công!"
    }
    dispatch(doSetAssetPreventionSelected({}));
    dispatch(reset(GIAI_TOA_FORM_NAME));
    dispatch(change(GIAI_TOA_FORM_NAME, "submitDatas", returnData));
};

const onSubmitFail = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": false,
        "color": "danger",
        "message": result._error
    }
    dispatch(change(GIAI_TOA_FORM_NAME, "submitDatas", returnData));
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: GIAI_TOA_FORM_NAME,
        onSubmit: onSubmitActions(GIAI_TOA_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        onSubmitFail: onSubmitFail,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(GiaiToaAdd)
);