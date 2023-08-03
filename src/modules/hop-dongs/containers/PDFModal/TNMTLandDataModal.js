import React, {Component} from 'react';
import {formValueSelector} from 'redux-form';
import {connect} from 'react-redux';

import TNMTLandDataModalComponent from "../../components/PDFModal/TNMTLandDataModal";
import {DOC_changeActiveModal} from "../../../documents/actions";
import {getDocCurrentModalId} from "../../../documents/selectors";
import {clearTNMTLandData} from "../../actions";
import {getTMNTLandData} from "../../selectors";
import {setPhieuTraCuuAssetDetail} from "../../../dashboard/actions";
import {getDistrictList, getWardList} from "../../../danh-mucs/selectors";
import {REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME} from '../../../dashboard/constants';

class TNMTLandDataModal extends Component {
    handleExportPhieuTraCuuClick = (landDataFromRequest) => {
        let detailGCNArray = [], detailGCNText = "";

        detailGCNArray = landDataFromRequest && landDataFromRequest.cefLst && landDataFromRequest.cefLst.map(item =>
            "Số phát hành: " + item.soPhatHanh + " - Ngày cấp: " + item.ngaycap
        );

        if(detailGCNArray && detailGCNArray.length > 0) {
            detailGCNText = detailGCNArray.join(", ");
        }

        let result =  "- Số thửa đất:" + (landDataFromRequest && landDataFromRequest.landSpotNo) + "\n" +
        "- Số tờ bản đồ: " + (landDataFromRequest && landDataFromRequest.mapSheetNo)+ "\n" +
        "- Diện tích đất: " + (landDataFromRequest && landDataFromRequest.landSquare) + "\n" +
        "- Loại đất: " + (landDataFromRequest && landDataFromRequest.landType) + "\n" +
        "- Giấy chứng nhận: " + (landDataFromRequest && landDataFromRequest.cefNo) + "\n" +
        "- Chi tiết Giấy chứng nhận: " + (detailGCNText) + "\n" +
        "- Chủ sở hữu hiện tại: " + (landDataFromRequest && landDataFromRequest.ownerName) + "\n" +
        "- Địa chỉ Chủ sở hữu: " + (landDataFromRequest && landDataFromRequest.ownerIdentifyNo);

        this.props.setPhieuTraCuuAssetDetail(result);
        this.props.DOC_changeActiveModal({modalId: 500}); // 500 is open modal Phieu Tra Cuu

    }

    handleModalClose = () => {
        this.props.DOC_changeActiveModal({modalId: 0});
    }

    render() {
        return (
            <TNMTLandDataModalComponent {...this.props} handleExportPhieuTraCuuClick={this.handleExportPhieuTraCuuClick} handleModalClose={this.handleModalClose}/>
        );
    }
}

const formSelector = formValueSelector(REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),

    landDataFromRequest: getTMNTLandData(state),
    districts:           getDistrictList(state),
    wards:               getWardList(state),

    district_id:    formSelector(state, "district_id"),
    ward_id:        formSelector(state, "ward_id"),

    search_tnmt_land_data_type: formSelector(state, "search_tnmt_land_data_type"),
});

export default connect(mapStateToProps, {DOC_changeActiveModal, setPhieuTraCuuAssetDetail, clearTNMTLandData})(TNMTLandDataModal);