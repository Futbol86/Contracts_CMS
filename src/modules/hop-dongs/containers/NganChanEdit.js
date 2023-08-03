import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";
import {toast} from 'react-toastify';
import {reduxForm, formValueSelector, change, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {isEmpty} from 'lodash';

import auth from "../../../services/auth";
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {NGAN_CHAN_FORM_NAME} from "../constants";

import {DOC_changeActiveModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";

import {getUserId, getUserData} from "../../users/selectors";
import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";
import NganChanAddComponent from "../components/NganChanAdd";

import {loadANganChanInfo, clearANganChan, deleteAnAssetPreventionDetail, deleteAnOwnerPreventionDetail} from '../actions';
import {getNganChanInfo} from '../selectors';
import {
    loadListSoLuuTru, loadListLoaiSoLuuTru, queryADoiTuong, queryATaiSan, 
    clearADoiTuong, clearATaiSan, setATaiSanQueryIndex, setADoiTuongQueryIndex, loadListDistrict, loadListWard,
    loadATaiSanHistory,
} from "../../danh-mucs/actions";
import {
    getSoLuuTruList, getLoaiSoLuuTruList, getDoiTuongQuery, getTaiSanQuery, 
    getTaiSanQueryIndex, getDoiTuongQueryIndex, getDistrictList, getWardList, getTaiSanHistories
} from "../../danh-mucs/selectors";

import {uploadAssetPreventionFiles, deleteAnAssetPreventionFile} from "../actions";
import {getNganChanFile} from "../selectors";

class NganChanEdit extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        //const userData = auth.getUserFromStorage();
        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(7) === -1) {
                history.push("/dashboard");
            }
        }

        let {id} = this.props.match.params;
        if (id) {
            this.props.loadANganChanInfo({id});
        }
        
        this.props.loadListSoLuuTru({limit: 10000000, filter: {group_id: userData.group_id}});
        this.props.loadListLoaiSoLuuTru({limit: 10000});
        this.props.loadListDistrict({limit: 10000});
        this.props.loadListWard({limit: 10000});
    }

    componentWillUnmount() {
        this.props.clearANganChan();
    }

    componentDidUpdate(prevProps) {
        let {assetPreventionInfo} = this.props;
        let {archiveBookDetail} = assetPreventionInfo;

        if(assetPreventionInfo && !prevProps.assetPreventionInfo || 
            ( assetPreventionInfo && prevProps.assetPreventionInfo && assetPreventionInfo.id !== prevProps.assetPreventionInfo.id)) {

            assetPreventionInfo.prevention_type_id = assetPreventionInfo.prevention_type_id ? assetPreventionInfo.prevention_type_id : 1;

            let initialForm = {
                archive_book_type_id: archiveBookDetail.archive_type_id,
                ...assetPreventionInfo,
            }
            this.props.initialize(initialForm);
        }

        const {file_name} = this.props;

        if(file_name !== prevProps.file_name) {
            this.props.changeFieldValue("file_name", file_name);
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
            this.props.uploadAssetPreventionFiles(file);
        });
    };

    handleDeleteFile = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xoá file này không?',
            onConfirm: () => this.props.deleteAnAssetPreventionFile({id}),
        });
    }

    render() {
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        return (
            <NganChanAddComponent {...this.props}
                                staticFileUrl={uploadRootURL}
                                handleFileDrops={this.handleFileDrops}
                                handleDeleteFile={this.handleDeleteFile}
                                handleModalChange={this.handleModalChange}
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

    errors.judgments_decision_number = validateRequired(values.judgments_decision_number);
    errors.judgments_decision_date = validateRequired(values.judgments_decision_date);
    errors.archive_book_type_id = validateRequired(values.archive_book_type_id);
    errors.archive_book_id = validateRequired(values.archive_book_id);

    return errors;
};

const formSelector = formValueSelector(NGAN_CHAN_FORM_NAME);
const mapStateToProps = (state) => ({
    assetPreventionInfo:    getNganChanInfo(state),

    //formDatas:              getFormValues(NGAN_CHAN_FORM_NAME)(state),
    assets:                 formSelector(state, "assets"),
    owners:                 formSelector(state, "owners"),

    currentModalId:         getDocCurrentModalId(state),
    userId:                 getUserId(state),
    userData:               getUserData(state),

    prevention_type_id:     formSelector(state, "prevention_type_id"),
    archive_book_type_id:   formSelector(state, "archive_book_type_id"),
    asset_prevention_type:  formSelector(state, "asset_prevention_type"),
    
    districts:              getDistrictList(state),
    wards:                  getWardList(state),

    ownerQuery:             getDoiTuongQuery(state),
    assetQuery:             getTaiSanQuery(state),
    assetQueryIndex:        getTaiSanQueryIndex(state),
    ownerQueryIndex:        getDoiTuongQueryIndex(state),

    archive_books:          getSoLuuTruList(state),
    archive_book_types:     getLoaiSoLuuTruList(state),

    file_name:              getNganChanFile(state),
    assetHistories:         getTaiSanHistories(state),
    
    submitDatas:            formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    
    changeFieldValue: function (field, value) {
        dispatch(change(NGAN_CHAN_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload)),

    queryADoiTuong:             payload => dispatch(queryADoiTuong(payload)),
    queryATaiSan:               payload => dispatch(queryATaiSan(payload)),
    clearADoiTuong:             payload => dispatch(clearADoiTuong(payload)),
    clearATaiSan:               payload => dispatch(clearATaiSan(payload)),
    clearANganChan:             payload => dispatch(clearANganChan(payload)),
    setATaiSanQueryIndex:       payload => dispatch(setATaiSanQueryIndex(payload)),
    setADoiTuongQueryIndex:     payload => dispatch(setADoiTuongQueryIndex(payload)),

    loadANganChanInfo:          payload => dispatch(loadANganChanInfo(payload)),
    loadListSoLuuTru:           payload => dispatch(loadListSoLuuTru(payload)),
    loadListLoaiSoLuuTru:       payload => dispatch(loadListLoaiSoLuuTru(payload)),
    loadListDistrict:           payload => dispatch(loadListDistrict(payload)),
    loadListWard:               payload => dispatch(loadListWard(payload)),

    loadATaiSanHistory:         payload => dispatch(loadATaiSanHistory(payload)),

    deleteAnAssetPreventionDetail: payload => dispatch(deleteAnAssetPreventionDetail(payload)),
    deleteAnOwnerPreventionDetail: payload => dispatch(deleteAnOwnerPreventionDetail(payload)),

    uploadAssetPreventionFiles: payload => dispatch(uploadAssetPreventionFiles(payload)),
    deleteAnAssetPreventionFile: payload => dispatch(deleteAnAssetPreventionFile(payload)),
});

const onSubmitSuccess = (result, dispatch) => {
    //return dispatch(push(`/hop-dongs/asset-preventions/list`));
    // let returnData = {
    //     "id": uuid.v4(),
    //     "submitStatus": true,
    //     "submitStatusColor": "success",
    //     "submitMessage": "Bạn đã sửa '" + result.data.data.judgments_decision_number + "' thành công!"
    // }
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã sửa '" + result.data.data.judgments_decision_number + "' thành công!"
    }
    dispatch(change(NGAN_CHAN_FORM_NAME, "submitDatas", returnData));
};

const onSubmitFail = (result, dispatch) => {
    let returnData = {
        "submitStatus": false,
        "submitStatusColor": "danger",
        "submitMessage": result._error
    }
    dispatch(change(NGAN_CHAN_FORM_NAME, "submitDatas", returnData));
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: NGAN_CHAN_FORM_NAME,
        onSubmit: onSubmitActions(NGAN_CHAN_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        onSubmitFail: onSubmitFail,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(NganChanEdit)
);