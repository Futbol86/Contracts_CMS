import React, { Component } from 'react';
import {Field} from "redux-form";
import {Card, CardHeader, CardBody, CardTitle, CardText, Row, Col, Label, Button} from 'reactstrap';
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-modal";
import {FieldInputPure, FieldDropdownList, FieldRadioButtonGroup, FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form/index";
import TNMTLandDataModal from '../../../hop-dongs/containers/PDFModal/TNMTLandDataModal';
import TNMTTongTienNapModal from "../../../hop-dongs/containers/PDFModal/TNMTTongTienNapModal"
import {SEARCH_FILTER_OPTIONS, SEARCH_TNMT_LAND_DATA_TYPES} from '../../constants';

const RequestTNMTLandDataStatisticComponent = ({
        currentModalId, reports, tongTienNapTNMT, systemConfigs = [], districts = [], wards = [], 
        land_number, map_paper_number, district_id, ward_id, search_tnmt_land_data_type,
        handleRequestTNMTLandData, handleRequestTNMTTongTienNap, handleModalChange
    }) => {
    const {daily, weekly, monthly,} = reports || {};
    // let findARequestTNMTLandData = systemConfigs.find(item => item.param_name === "requestTNMTLandData");
    // let {feeOneRequest, maxFeeOneMonth, remindEmails} = findARequestTNMTLandData 
    //                                                  && findARequestTNMTLandData.param_value_json
    //                                                  && JSON.parse(findARequestTNMTLandData.param_value_json) || {};

    //let totalFeeRequest = monthly; // && monthly.totalSearchLogMonthly * feeOneRequest || 0;

    let listDistrict = districts.map(item => {
        return {
            label: item.name,
            value: item.id
        }
    });
        
    let listWard = wards.filter(item => item.district_id === parseInt(district_id)).map(item => {
        return {
            label: item.name,
            value: item.id
        }
    });

   const listSearchTNMTLandDataType = SEARCH_TNMT_LAND_DATA_TYPES.map(item => { 
        return {
            name: item.name,
            code: item.code 
        }
    });

    let isEnableSearch = land_number && map_paper_number && district_id && ward_id;

    return (
        <React.Fragment>
            <Row className="mt-4 mb-3">
                {/* <Col md={6}> */}
                    {/* <Row>
                        <Col md="4">
                            <Card body inverse color="danger">
                                <CardTitle tag="h5">
                                    TRONG NGÀY
                                </CardTitle>
                                <CardText>
                                    <Label className="font-2xl">{daily && daily.totalSearchLogDaily}</Label>
                                </CardText>
                            </Card>
                        </Col>
                        <Col md="8">
                            <Card body inverse color="success">
                                <CardTitle tag="h5" className="d-flex justify-content-between">
                                    <span>THÁNG NÀY</span>
                                </CardTitle>
                                <CardText>
                                    <Label className="font-2xl">
                                        {monthly && monthly.totalSearchLogMonthly}
                                    </Label>
                                </CardText>
                            </Card>
                        </Col>
                    </Row> */}
                    {/* <Row> */}
                <Col md="12">
                    <Card color="primary">
                        <CardTitle tag="h6" className="p-4">
                            <h5>TRA CỨU THÔNG TIN ĐẤT ĐAI (SỞ TÀI NGUYÊN MÔI TRƯỜNG)</h5>
                        </CardTitle>
                        <CardBody>
                            <React.Fragment>
                                <Row className="mb-2">
                                    <Col md="4">
                                        <Label className="col-form-label">
                                            Loại tra cứu:
                                        </Label>
                                    </Col>
                                    <Col md="8">
                                        <Field name="search_tnmt_land_data_type" className="width-200 bg-primary text-white"
                                               textField="name" valueField="code" 
                                               titleOption="-- Chọn Loại Tra Cứu --"
                                               data={listSearchTNMTLandDataType}
                                               component={FieldDropdownList} />
                                    </Col>
                                </Row>   
                                <hr />      
                                <Row className="mb-2">
                                    <Col md="4">
                                        <Label className="col-form-label">
                                            Thửa Đất Số:
                                        </Label>
                                    </Col>
                                    <Col md="8">
                                        <Field  name={`land_number`}
                                                type="number"
                                                component={FieldInputPure}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md="4">
                                        <Label className="col-form-label">
                                            Tờ Bản Đồ Số:
                                        </Label>
                                    </Col>
                                    <Col md="8">
                                        <Field  name={`map_paper_number`}
                                                type="number"
                                                component={FieldInputPure}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md="4">
                                        <Label className="col-form-label">
                                            Huyện:
                                        </Label>
                                    </Col>
                                    <Col md="8">
                                        <Field
                                            multi={false}
                                            name={`district_id`}
                                            options={listDistrict}
                                            component={FieldAutoComplete}
                                            className="text-danger"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md="4">
                                        <Label className="col-form-label">
                                            Xã:
                                        </Label>
                                    </Col>
                                    <Col md="8">
                                        <Field
                                            multi={false}
                                            name={`ward_id`}
                                            options={listWard}
                                            component={FieldAutoComplete}
                                            className="text-danger"
                                        />
                                    </Col>
                                </Row>
                                {
                                    search_tnmt_land_data_type === "apartment_search" &&
                                    <>
                                        <Row className="mb-2">
                                            <Col md="4">
                                                <Label className="col-form-label">
                                                    Số hiệu căn chung cư:
                                                </Label>
                                            </Col>
                                            <Col md="8">
                                                 <Field name={`apartmentNumber`}
                                                        type="text"
                                                        component={FieldInputPure}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md="4">
                                                <Label className="col-form-label">
                                                    Tầng chung cư:
                                                </Label>
                                            </Col>
                                            <Col md="8">
                                                 <Field name={`apartmentFloor`}
                                                        type="number"
                                                        component={FieldInputPure}
                                                />
                                            </Col>
                                        </Row>
                                    </>
                                }
                                <Row className="mb-2 mt-4">
                                    <Col md="12" className="d-flex justify-content-end">
                                        <Button color="info" disabled={!isEnableSearch} onClick={() => handleRequestTNMTLandData()}>
                                            <i className="fa fa-search fa-lg" title="Tra cứu" />
                                            {' '}Tra cứu
                                        </Button>
                                    </Col> 
                                </Row>
                            </React.Fragment>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="12">
                    <ul>
                        <li>
                            <strong className='text-primary'>
                                <h5><a href='#' onClick={handleRequestTNMTTongTienNap}>Xem chi tiết "Tiền Nạp" tra cứu</a></h5>
                            </strong>
                        </li>
                        <li>
                            <strong>
                                <h5><a href='/thong-kes/request-land-data-of-tnmt-reports/list' target='_blank'>Xem lịch sử thống kê Tra cứu (từ TNMT)</a></h5>
                            </strong>
                        </li>
                        <li>
                            <strong>
                                <h5><a href='/thong-kes/request-tnmt-land-data-reports/list' target='_blank'>Xem lịch sử thống kê Tra cứu (từ phần mềm GDDB)</a></h5>
                            </strong>
                        </li>
                    </ul>  
                </Col>
            </Row>
            <ToastContainer />
            <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                    isOpen={currentModalId === 100}
                    onRequestClose={() => handleModalChange(0)}
                    contentLabel="Kết Quả Tra Cứu Thông Tin Đất Đai"
                    style={{content: {outline: 0}}}
                >
                    <TNMTLandDataModal
                        tongTienNapTNMT={tongTienNapTNMT}
                        handleModalClose={() => handleModalChange(0)}
                    />
            </Modal>
            <Modal className="Modal__Bootstrap modal-dialog modal-md"
                isOpen={currentModalId === 2}
                contentLabel="Tổng tiền nạp Tra cứu thông tin đất đai"
                style={{content: {outline: 0}}}
            >
                <TNMTTongTienNapModal tongTienNapTNMT={tongTienNapTNMT} handleModalClose={() => handleModalChange(0)}/>
            </Modal>
        </React.Fragment>
    )
}

export default RequestTNMTLandDataStatisticComponent;