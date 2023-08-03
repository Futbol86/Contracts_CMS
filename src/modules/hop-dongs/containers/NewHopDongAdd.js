import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import uuid from "uuid";
import {toast} from 'react-toastify';
import {isEmpty} from 'lodash';

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";

import {loadListContractType, loadListLoaiHopDong, loadListSoLuuTru, loadListLoaiSoLuuTru} from "../../danh-mucs/actions";
import {getContractTypeList, getLoaiHopDongList, getSoLuuTruList, getLoaiSoLuuTruList} from "../../danh-mucs/selectors";

import {DOC_changeActiveModal, DOC_changeTypeModal} from "../../documents/actions";
import {getDocCurrentModalId, getDocCurrentModalType} from "../../documents/selectors";
import {getUserId, getGroupId, getUserData} from "../../users/selectors";

import {uploadNewHopDongFiles, deleteANewHopDongFile} from "../actions";
import {getNewHopDongFiles} from "../selectors";
import {NEW_HOP_DONG_FORM_NAME} from "../constants";

import NewHopDongAddComponent from "../components/NewHopDongAdd";

class NewHopDongAdd extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        
        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(6) === -1) {
                history.push("/dashboard");
            }
        }

        this.props.initialize({
            contract_date: new Date(),
            created_at: new Date(),
            created_by: this.props.userId,
            group_id: userData && userData.userGroupDetail.id,
        })

        // this.props.loadListDistrict({limit: 10000});
        // this.props.loadListWard({limit: 10000});
        this.props.loadListContractType({limit: 10000});
        this.props.loadListLoaiHopDong({limit: 10000});
        this.props.loadListSoLuuTru({limit: 10000000, filter: {group_id: userData.group_id}});
        this.props.loadListLoaiSoLuuTru({limit: 10000});
    }

    componentDidUpdate(prevProps) {
        // Upload contract files
        const {contract_files} = this.props;

        if(contract_files && (contract_files !== prevProps.contract_files)) {
            this.props.changeFieldValue("contract_files", contract_files);
        }

        const {submitDatas = {}} = this.props;
        if(submitDatas && !prevProps.submitDatas || (submitDatas && prevProps.submitDatas && submitDatas.id !== prevProps.submitDatas.id)) {
            if(submitDatas.status === 0) {
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
            this.props.uploadNewHopDongFiles(file);
        });
    };

    handleDeleteFile = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xoá file này không?',
            onConfirm: () => this.props.deleteANewHopDongFile({id}),
        });
    }

    render() {
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        return (
            <NewHopDongAddComponent {...this.props}
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
    return errors;
};

const formSelector = formValueSelector(NEW_HOP_DONG_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:         getDocCurrentModalId(state),
    userId:                 getUserId(state),
    groupId:                getGroupId(state),
    userData:               getUserData(state),
    // districts:              getDistrictList(state),
    // wards:                  getWardList(state),

    contract_types:         getContractTypeList(state),
    sub_contract_types:     getLoaiHopDongList(state),
    archive_books:          getSoLuuTruList(state),
    archive_book_types:     getLoaiSoLuuTruList(state),
    contract_files:         getNewHopDongFiles(state),

    //formDatas:              getFormValues(NEW_HOP_DONG_FORM_NAME)(state),
     
    contract_type_id:       formSelector(state, "contract_type_id"),
    archive_book_type_id:   formSelector(state, "archive_book_type_id"),
    submitDatas:            formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    DOC_changeTypeModal:        payload => dispatch(DOC_changeTypeModal(payload)),

    // loadListDistrict:           payload => dispatch(loadListDistrict(payload)),
    // loadListWard:               payload => dispatch(loadListWard(payload)),

    loadListContractType:       payload => dispatch(loadListContractType(payload)),
    loadListLoaiHopDong:        payload => dispatch(loadListLoaiHopDong(payload)),
    loadListSoLuuTru:           payload => dispatch(loadListSoLuuTru(payload)),
    loadListLoaiSoLuuTru:       payload => dispatch(loadListLoaiSoLuuTru(payload)),

    uploadNewHopDongFiles:      payload => dispatch(uploadNewHopDongFiles(payload)),
    deleteANewHopDongFile:      payload => dispatch(deleteANewHopDongFile(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(NEW_HOP_DONG_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload))
});

const onSubmitSuccess = (result, dispatch) => {
    //return dispatch(push(`/hop-dongs/contract/list`));
    let returnData = {
        "id": uuid.v4(),
        "status": 1,
        "color": "success",
        "message": "Bạn đã thêm thành công!"
    }

    dispatch(reset(NEW_HOP_DONG_FORM_NAME));
    dispatch(change(NEW_HOP_DONG_FORM_NAME, "submitDatas", returnData));
};

const onSubmitFail = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": 0,
        "color": "false",
        "message": result.error
    }

    dispatch(change(NEW_HOP_DONG_FORM_NAME, "submitDatas", returnData));
}


export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: NEW_HOP_DONG_FORM_NAME,
        onSubmit: onSubmitActions(NEW_HOP_DONG_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        onSubmitFail: onSubmitFail,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(NewHopDongAdd)
);