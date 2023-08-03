import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {isEmpty} from 'lodash';
import uuid from "uuid";
import {toast} from 'react-toastify';

import auth from "../../../services/auth";
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {GIAI_TOA_FORM_NAME} from "../constants";

import {DOC_changeActiveModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";
import {getUserId, getUserData} from "../../users/selectors";
import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";
import GiaiToaAddComponent from "../components/GiaiToaAdd";

import {
    loadAGiaiToaInfo, clearAGiaiToa, deleteAnAssetPreventionDetail, deleteAnOwnerPreventionDetail, doSetAssetPreventionSelected,
    uploadGiaiToaFiles, deleteAGiaiToaFile
} from '../actions';
import {getGiaiToaInfo, getAssetPreventionSelected, getGiaiToaFile} from '../selectors';
import {loadListSoLuuTru, loadListLoaiSoLuuTru} from "../../danh-mucs/actions";
import {getSoLuuTruList, getLoaiSoLuuTruList} from "../../danh-mucs/selectors";

class GiaiToaEdit extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        //const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(8) === -1) {
                history.push("/dashboard");
            }
        }

        let {id} = this.props.match.params;
        if (id) {
            this.props.loadAGiaiToaInfo({id});
        }
        
        this.props.loadListSoLuuTru({limit: 10000000, filter: {group_id: userData.group_id}});
        this.props.loadListLoaiSoLuuTru({limit: 10000});
    }

    componentWillUnmount() {
        this.props.clearAGiaiToa();
        this.props.doSetAssetPreventionSelected({});
    }

    componentDidUpdate(prevProps) {
        let {assetReleaseInfo} = this.props;
        let {archiveBookDetail} = assetReleaseInfo;

        if(assetReleaseInfo && !prevProps.assetReleaseInfo || 
            ( assetReleaseInfo && prevProps.assetReleaseInfo
           && assetReleaseInfo.id !== prevProps.assetReleaseInfo.id)) {

            assetReleaseInfo.prevention_type_id = assetReleaseInfo.prevention_type_id ? assetReleaseInfo.prevention_type_id : 1;

            let initialForm = {
                archive_book_type_id: archiveBookDetail.archive_type_id,
                ...assetReleaseInfo,
            }

            this.props.doSetAssetPreventionSelected(this.props.assetReleaseInfo.assetPreventionDetail);
            this.props.initialize(initialForm);
        }

        let {asset_prevention_selected} = this.props;
        
        if(!isEmpty(asset_prevention_selected)) {
            this.props.changeFieldValue("prevention_id", asset_prevention_selected.id);
        }

        const {release_file} = this.props;
        if(release_file !== prevProps.release_file) {
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

    handleModalChange = (modalId) => {
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
    assetReleaseInfo:       getGiaiToaInfo(state),

    formDatas:              getFormValues(GIAI_TOA_FORM_NAME)(state),
    currentModalId:         getDocCurrentModalId(state),
    userId:                 getUserId(state),
    userData:               getUserData(state),

    prevention_type_id:     formSelector(state, "prevention_type_id"),
    archive_book_type_id:   formSelector(state, "archive_book_type_id"),

    archive_books:          getSoLuuTruList(state),
    archive_book_types:     getLoaiSoLuuTruList(state),

    release_file:           getGiaiToaFile(state),

    asset_prevention_selected: getAssetPreventionSelected(state),
    submitDatas:             formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(GIAI_TOA_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload)),

    clearAGiaiToa:              payload => dispatch(clearAGiaiToa(payload)),

    loadAGiaiToaInfo:           payload => dispatch(loadAGiaiToaInfo(payload)),
    loadListSoLuuTru:           payload => dispatch(loadListSoLuuTru(payload)),
    loadListLoaiSoLuuTru:       payload => dispatch(loadListLoaiSoLuuTru(payload)),

    deleteAnAssetPreventionDetail: payload => dispatch(deleteAnAssetPreventionDetail(payload)),
    deleteAnOwnerPreventionDetail: payload => dispatch(deleteAnOwnerPreventionDetail(payload)),

    uploadGiaiToaFiles:         payload => dispatch(uploadGiaiToaFiles(payload)),
    deleteAGiaiToaFile:         payload => dispatch(deleteAGiaiToaFile(payload)),

    doSetAssetPreventionSelected:  payload => dispatch(doSetAssetPreventionSelected(payload)),
});

const onSubmitSuccess = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã sửa '" + result.data.data.release_number + "' thành công!"
    }
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
    })(GiaiToaEdit)
);