import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import uuid from "uuid";

import {DOC_changeActiveModal} from "../../../../documents/actions";
import {getDocCurrentModalId} from "../../../../documents/selectors";
import {loadListSubAssetType} from "../../../../danh-mucs/actions";
import {getSubAssetTypeList} from "../../../../danh-mucs/selectors";
import {addAPrintSearchTicket} from "../../../../he-thongs/actions";
import {PHIEU_TRA_CUU_FORM_NAME} from '../../../constants'
import {DOC_exportPhieuTraCuuToWORD, clearDocExport} from '../../../actions';
import {getRemoteDOC} from '../../../selectors';
import {getUserData} from "../../../../users/selectors";
import {getPhieuTraCuuAssetDetail} from "../../../selectors";
import PhieuTraCuuModalComponent from "../../../components/Dashboard/PDFModal/PhieuTraCuuModal";

class PhieuTraCuuModal extends Component {
    componentDidMount() {
        const {asset_detail, userData, currentModalId} = this.props;

        this.props.initialize({
            transaction_code: uuid.v4(),
            asset_detail,
            asset_status: currentModalId === 500 ? "asset_valid" : "asset_prevention",
            asset_type_id: 7, // Nhà đất
            notary_name: userData && userData.fullname,
            group_name: userData && userData.userGroupDetail.group_name,
        });

        this.props.loadListSubAssetType({limit: 10000});
    }

    handleModalChange = (modalId) => {
        const {userData, subAssetTypes, asset_type_id, search_keys = []} = this.props;
        
        if(modalId === 0) {
            let {formDatas} = this.props;
            let findASubAssetType = subAssetTypes.find(item => item.id === asset_type_id);
            
            if(findASubAssetType)
                formDatas.asset_type = findASubAssetType.name;

            formDatas.searchText = search_keys.join (", ");

            this.props.DOC_exportPhieuTraCuuToWORD(formDatas);

            // Save Print Search Ticket
            // formDatas.asset_status = formDatas.asset_status === "asset_valid" 
            //                       ? "Được phép giao dịch" : (formDatas.asset_status === "asset_prevention" ? "Đang bị ngăn chặn" : "")
            // formDatas.created_by= userData && userData.username;
            
            let bodyData = {
                ...formDatas,
                asset_status: formDatas.asset_status === "asset_valid" 
                            ? "Được phép giao dịch" : (formDatas.asset_status === "asset_prevention" ? "Đang bị ngăn chặn" : ""),
                created_by: userData && userData.username,
            }
            this.props.addAPrintSearchTicket(bodyData);
        }
    };

    componentDidUpdate(prevProps) {
        const {remoteDOC} = this.props;
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL;

        if(remoteDOC !== prevProps.remoteDOC) {
            let url = uploadRootURL + remoteDOC;
            window.open(url, "_blank");

            this.props.DOC_changeActiveModal({modalId: 0});
        }
    }

    componentWillUnmount() {
        this.props.clearDocExport();
    }

    render() {
        return (
            <PhieuTraCuuModalComponent {...this.props} handleModalChange={this.handleModalChange}/>
        );
    }
}

const formSelector = formValueSelector(PHIEU_TRA_CUU_FORM_NAME);
const mapStateToProps = (state) => ({
    userData:           getUserData(state),
    currentModalId:     getDocCurrentModalId(state),
    remoteDOC:          getRemoteDOC(state),
    asset_detail:       getPhieuTraCuuAssetDetail(state),
    subAssetTypes:      getSubAssetTypeList(state),

    asset_type_id:      formSelector(state, "asset_type_id"),

    formDatas:          getFormValues(PHIEU_TRA_CUU_FORM_NAME)(state),
});

export default connect(mapStateToProps, {DOC_exportPhieuTraCuuToWORD, DOC_changeActiveModal, clearDocExport, loadListSubAssetType, addAPrintSearchTicket})(
    reduxForm({
        form: PHIEU_TRA_CUU_FORM_NAME,
        onSubmit: onSubmitActions(PHIEU_TRA_CUU_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(PhieuTraCuuModal)
);