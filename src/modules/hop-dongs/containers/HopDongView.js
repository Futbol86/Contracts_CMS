import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";
import moment from "moment";
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import { isEmpty } from 'lodash';

import auth from "../../../services/auth";
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';

import {HOP_DONG_FORM_NAME} from "../constants";
import {loadAHopDongInfo, clearAHopDong} from '../actions';
import {getHopDongInfo, getHopDongFiles} from "../selectors";
import {DOC_changeActiveModal, DOC_changeTypeModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";

import {loadListContractType, loadListLoaiHopDong} from "../../danh-mucs/actions";
import {getContractTypeList, getLoaiHopDongList} from "../../danh-mucs/selectors";
import {getUserId, getGroupId, getUserData} from "../../users/selectors";

import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";
import HopDongAddComponent from "../components/HopDongAdd";

class HopDongView extends Component {
    componentDidMount() {
        const {history} = this.props;
        // const userData = auth.getUserFromStorage();

        // if(userData.role_ids) {
        //     if(userData.role_ids && userData.role_ids.indexOf(6) === -1) {
        //         history.push("/dashboard");
        //     }
        // }

        let {id} = this.props.match.params;
        if (id) {
            this.props.loadAHopDongInfo({id});
        }
        
        this.props.loadListContractType({limit: 10000});
        this.props.loadListLoaiHopDong({limit: 10000});
    }

    componentWillUnmount() {
        this.props.clearAHopDong();
    }

    componentDidUpdate(prevProps) {
        let {contractDetail, userData} = this.props;
        let {subContractTypeDetail, archiveBookDetail, assetDetails, fromOwnerDetails, toOwnerDetails, midOwnerDetails, exchangeContractDetail} = this.props.contractDetail;

        if(contractDetail && !prevProps.contractDetail || 
            (contractDetail && prevProps.contractDetail && contractDetail.id !== prevProps.contractDetail.id)) {

            //*** update information when partial contract
            let partialLands = [];
            if(exchangeContractDetail && exchangeContractDetail.partial_lands) {
                let partialLandsJSON = JSON.parse(exchangeContractDetail.partial_lands);
                partialLands = partialLandsJSON.partial_lands;
            }

            assetDetails.map((item, index) => {
                //item.asset_type_id = assetDetails[index] && assetDetails[index].subAssetTypeDetail && assetDetails[index].subAssetTypeDetail.asset_type_id;
                item.land_number = partialLands[index] && partialLands[index].landSpotNo;
                item.map_paper_number = partialLands[index] && partialLands[index].mapSheetNo;
                item.isPartial = partialLands[index] && partialLands[index].isPartial;
                item.totalArea = partialLands[index] && partialLands[index].totalArea;
                item.partialArea = partialLands[index] && partialLands[index].partialArea;
                item.remainArea = partialLands[index] && partialLands[index].remainArea;
            });

            let initialForm = {
                assets: assetDetails,
                from_owners: fromOwnerDetails,
                to_owners: toOwnerDetails,
                mid_owners: midOwnerDetails,
                contract_type_id: subContractTypeDetail.contract_type_id,
                archive_book_type_id: archiveBookDetail.archive_type_id,

                ...this.props.contractDetail,
            }

            this.props.initialize(initialForm);

            contractDetail.group_name = userData && userData.userGroupDetail.group_name;
            contractDetail.group_address = userData && userData.userGroupDetail.address;
        }
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    render() {
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        return (
            <HopDongAddComponent {...this.props}
                                 staticFileUrl={uploadRootURL}
                                 action={`view`}
                                 handleModalChange={this.handleModalChange}
            />
        );
    }
}

const formSelector = formValueSelector(HOP_DONG_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:          getDocCurrentModalId(state),
    contractDetail:          getHopDongInfo(state),

    userId:                  getUserId(state),
    userData:                getUserData(state),
    contract_type_id:        formSelector(state, "contract_type_id"),

    contract_types:          getContractTypeList(state),
    sub_contract_types:      getLoaiHopDongList(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadAHopDongInfo:               payload => dispatch(loadAHopDongInfo(payload)),

    loadListContractType:           payload => dispatch(loadListContractType(payload)),
    loadListLoaiHopDong:            payload => dispatch(loadListLoaiHopDong(payload)),

    clearAHopDong:                 payload => dispatch(clearAHopDong(payload)),

    openModalAction:               payload => dispatch(openModalAction(payload)),
    DOC_changeActiveModal:         payload => dispatch(DOC_changeActiveModal(payload)),
});

const onSubmitSuccess = (result, dispatch) => {
    let returnData = {
        "submitStatus": true,
        "submitStatusColor": "success",
        "submitMessage": "Bạn đã sửa '" + result.data.data.contract_no + "' thành công!"
    }
    dispatch(change(HOP_DONG_FORM_NAME, "submitDatas", returnData));
};

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: HOP_DONG_FORM_NAME,
        onSubmit: onSubmitActions(HOP_DONG_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(HopDongView)
);