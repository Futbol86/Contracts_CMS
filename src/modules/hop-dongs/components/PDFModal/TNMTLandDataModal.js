import React from 'react';
import {injectIntl} from 'react-intl';
import {Col, Row, Label, Button} from 'reactstrap';
import {Field} from "redux-form";
import {FieldDropdownList} from "../../../../components/common/Form/index";
import {CONTRACT_TYPE_SHEET} from '../../constants';
import {isObject} from 'lodash';

class TNMTLandDataModal extends React.Component {
    render(){
        const { 
            landDataFromRequest, districts, wards, district_id, ward_id, search_tnmt_land_data_type, 
            handleModalClose, handleExportPhieuTraCuuClick 
        } = this.props;

        let detailGCNArray = [], detailGCNText = "";

        detailGCNArray = landDataFromRequest && landDataFromRequest.cefLst && landDataFromRequest.cefLst.map(item =>
            "Số phát hành: " + item.soPhatHanh + " - Ngày cấp: " + item.ngaycap
        );

        if(detailGCNArray && detailGCNArray.length > 0) {
            detailGCNText = detailGCNArray.join(", ");
        }

        let findADistrict = districts.find(item => item.id === district_id);
        let findAWard = wards.find(item => item.id === ward_id);

        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        Kết quả tra cứu thông tin đất đai (Sở TNMT)
                    </h4>
                    <button type="button" className="close" onClick={handleModalClose}>
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">
                            Đóng
                        </span>
                    </button>
                </div>
                <div className="modal-body">
                    {
                        landDataFromRequest && landDataFromRequest.landSpotNo ?
                        <React.Fragment>
                            <Row>
                                <Col md="2">  
                                    <Label className="col-form-label">
                                        Số thửa đất:
                                    </Label>  
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        <strong>{landDataFromRequest && landDataFromRequest.landSpotNo}</strong>
                                    </Label>  
                                </Col>
                                <Col md="2">  
                                    <Label className="col-form-label">
                                        Số tờ bản đồ:
                                    </Label>  
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        <strong>{landDataFromRequest && landDataFromRequest.mapSheetNo}</strong>
                                    </Label>  
                                </Col>
                            </Row>
                            <Row>
                                <Col md="2">  
                                    <Label className="col-form-label">
                                        Diện tích đất:
                                    </Label>  
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        <strong>{landDataFromRequest && landDataFromRequest.landSquare}</strong>
                                    </Label>  
                                </Col>
                                <Col md="2">  
                                    <Label className="col-form-label">
                                        Loại đất:
                                    </Label>  
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        <strong>{landDataFromRequest && landDataFromRequest.landType}</strong>
                                    </Label>  
                                </Col>
                            </Row>
                            {
                                search_tnmt_land_data_type !== "apartment_search" &&
                                <Row>
                                    <Col md="2">  
                                        <Label className="col-form-label">
                                            Địa chỉ thửa đất:
                                        </Label>  
                                    </Col>
                                    <Col md="10">
                                        <Label className="col-form-label">
                                            <strong>{findAWard && findAWard.name}, {findADistrict && findADistrict.name}, tỉnh Đồng Nai</strong>
                                        </Label>  
                                    </Col>
                                </Row>
                            }
                            {
                                search_tnmt_land_data_type === "apartment_search" &&
                                <Row>
                                    <Col md="2">  
                                        <Label className="col-form-label">
                                            Địa chỉ căn hộ:
                                        </Label>  
                                    </Col>
                                    <Col md="10">
                                        <Label className="col-form-label">
                                            <strong>{landDataFromRequest && landDataFromRequest.apartNumber}</strong>
                                        </Label>  
                                    </Col>
                                </Row>
                            }
                            <Row>
                                <Col md="2">  
                                    <Label className="col-form-label">
                                        Giấy chứng nhận:
                                    </Label>  
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        <strong>{landDataFromRequest && landDataFromRequest.cefNo}</strong>
                                    </Label>  
                                </Col>
                                <Col md="2">  
                                    <Label className="col-form-label">
                                        Chi tiết Giấy chứng nhận:
                                    </Label>  
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        <strong>{detailGCNText}</strong>
                                    </Label>  
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md="2">  
                                    <Label className="col-form-label">
                                        Chủ sở hữu hiện tại:
                                    </Label>  
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        {
                                            search_tnmt_land_data_type !== "apartment_search" &&
                                            <strong>{ landDataFromRequest && landDataFromRequest.ownerName }</strong>
                                        }
                                        {
                                            search_tnmt_land_data_type === "apartment_search" &&
                                            <strong>{ landDataFromRequest && landDataFromRequest.apartOwner }</strong>
                                        }
                                    </Label>  
                                </Col>
                                <Col md="2">  
                                    <Label className="col-form-label">
                                        Địa chỉ Chủ sở hữu:
                                    </Label>  
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                    {
                                        search_tnmt_land_data_type !== "apartment_search" &&
                                        <strong>{landDataFromRequest && landDataFromRequest.ownerIdentifyNo}</strong>
                                    }
                                    {
                                        search_tnmt_land_data_type === "apartment_search" &&
                                        <strong>{landDataFromRequest && landDataFromRequest.apartOwnerIdentify}</strong>
                                    }
                                    </Label>  
                                </Col>
                            </Row>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Row>
                                <Col md="12">
                                    <Label className="col-form-label">
                                        {isObject(landDataFromRequest) ? JSON.stringify(landDataFromRequest) : landDataFromRequest}
                                    </Label>  
                                </Col>
                            </Row>
                        </React.Fragment>
                    }
                </div>

                <div className="modal-footer d-flex justify-content-between">
                    <Button color="secondary" onClick={() => handleExportPhieuTraCuuClick(landDataFromRequest)}>
                        Xuất file tra cứu
                    </Button>
                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                        Đóng
                    </button>
                </div>
            </div>
        );
    }
}

export default injectIntl(TNMTLandDataModal);