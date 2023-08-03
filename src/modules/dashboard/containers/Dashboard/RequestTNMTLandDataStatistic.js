import React, { Component } from 'react';
import {reduxForm, getFormValues, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';
import uuid from "uuid";
import {isEmpty} from "lodash";
import {toast} from 'react-toastify';

import {openModalAction} from "../../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../../constants';
import {REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME} from '../../constants';
import {getUserId, getGroupId, getUserData} from "../../../users/selectors";
import {DOC_changeActiveModal, DOC_changeTypeModal} from "../../../documents/actions";
import {getDocCurrentModalId, getDocCurrentModalType} from "../../../documents/selectors";
import {loadListDistrict, loadListWard,} from "../../../danh-mucs/actions";
import {getDistrictList, getWardList} from "../../../danh-mucs/selectors";
import {requestTNMTLandData, requestTNMTTongTienNap, clearTNMTLandData} from "../../../hop-dongs/actions";
import {getTMNTLandData, getTMNTTongTienNap} from "../../../hop-dongs/selectors";

import RequestTNMTLandDataStatisticComponent from '../../components/Dashboard/RequestTNMTLandDataStatistic';

class RequestTNMTLandDataStatistic extends Component {
    componentDidMount() {
        const {userData} = this.props;

        const initialValues = {
            // option: 'contract_no',
            // group_id: userData && userData.userGroupDetail.id,
            // isAdmin: userData.username === "admin",
            search_tnmt_land_data_type: "normal_search"
        }

        this.props.initialize(initialValues);

        this.props.loadListDistrict({limit: 10000});
        this.props.loadListWard({limit: 10000});
    }

    // componentDidUpdate(prevProps) {
    //     const {landDataTNMT} = this.props;

    //     if(landDataTNMT && landDataTNMT !== prevProps.landDataTNMT) {
    //         this.handleModalChange(100);
    //     }
    // }

    handleModalChange = (modalId) => {
        if(modalId === 0) {
            this.props.clearTNMTLandData();
        }
        this.props.DOC_changeActiveModal({modalId});
    };
     
    handleRequestTNMTLandData = () => {
        let {
            userId, groupId, userData, districts, wards, land_number, map_paper_number, 
            district_id, ward_id, search_tnmt_land_data_type, apartmentNumber, apartmentFloor
        } = this.props;
        if(isEmpty(userData.userGroupDetail.secretKey) || isEmpty(userData.userGroupDetail.departmentCode) 
        || isEmpty(userData.userGroupDetail.userRequestTNMTData) || isEmpty(userData.userGroupDetail.passwordRequestTNMTData)) {
            let message = userData.userGroupDetail.group_name + " thiếu các trường thông tin để tra cứu: tài khoản, mật khẩu, key, mã phòng công chứng!"
            toast.error(message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } else {
            this.props.openModalAction({
                id: uuid.v4(),
                type: MODAL_TYPE_CONFIRMATION,
                text: 'Bạn có muốn tra cứu thông tin đất đai (Sở TNTT)?',
                onConfirm: () => {
                    let findADistrict = districts.find(item => item.id === district_id);
                    let findAWard = wards.find(item => item.id === ward_id);
                    
                    let villageCode = findAWard ? findAWard.code : 0;
                    let districtCode = findADistrict ? findADistrict.code : 0;

                    this.props.requestTNMTLandData({
                        transaction_code: uuid.v4(),
                        land_number,
                        map_paper_number,
                        villageCode,
                        districtCode,
                        search_tnmt_land_data_type,
                        apartmentNumber,
                        apartmentFloor,
                        userId,
                        groupId,
                        secretKey: userData.userGroupDetail.secretKey,
                        departmentCode: userData.userGroupDetail.departmentCode,
                        username: userData.userGroupDetail.userRequestTNMTData,
                        password: userData.userGroupDetail.passwordRequestTNMTData,
                    });

                    this.handleModalChange(100);
                },
            });
        }
    }

    handleRequestTNMTTongTienNap = (evt) => {
        evt.preventDefault();

        const {userData} = this.props;

        let requestTNMTPayload = {
            username: userData.userGroupDetail.userRequestTNMTData,
            password: userData.userGroupDetail.passwordRequestTNMTData,
            departmentCode: userData.userGroupDetail.departmentCode,
        }

        this.props.requestTNMTTongTienNap(requestTNMTPayload);
        this.handleModalChange(2);
    }

    render() {
        return (
            <RequestTNMTLandDataStatisticComponent {...this.props} 
                                                    handleModalChange={this.handleModalChange}
                                                    handleRequestTNMTLandData={this.handleRequestTNMTLandData}
                                                    handleRequestTNMTTongTienNap={this.handleRequestTNMTTongTienNap}/>
        )
    }
}

const formSelector = formValueSelector(REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME);
const mapStateToProps = (state) => ({
    userId:          getUserId(state),
    groupId:         getGroupId(state),
    userData:        getUserData(state),

    currentModalId:  getDocCurrentModalId(state),
    districts:       getDistrictList(state),
    wards:           getWardList(state),

    formData:       getFormValues(REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME)(state),

    land_number:    formSelector(state, "land_number"),
    map_paper_number:    formSelector(state, "map_paper_number"),
    district_id:    formSelector(state, "district_id"),
    ward_id:        formSelector(state, "ward_id"),

    search_tnmt_land_data_type: formSelector(state, "search_tnmt_land_data_type"),
    apartmentNumber: formSelector(state, "apartmentNumber"),
    apartmentFloor: formSelector(state, "apartmentFloor"),

    landDataTNMT:    getTMNTLandData(state),
    tongTienNapTNMT: getTMNTTongTienNap(state),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    openModalAction:            payload => dispatch(openModalAction(payload)),

    loadListDistrict:           payload => dispatch(loadListDistrict(payload)),
    loadListWard:               payload => dispatch(loadListWard(payload)),

    requestTNMTLandData:        payload => dispatch(requestTNMTLandData(payload)),
    requestTNMTTongTienNap:     payload => dispatch(requestTNMTTongTienNap(payload)),

    clearTNMTLandData:          payload => dispatch(clearTNMTLandData(payload)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME,
        onSubmit: onSubmitActions(REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(RequestTNMTLandDataStatistic)
);