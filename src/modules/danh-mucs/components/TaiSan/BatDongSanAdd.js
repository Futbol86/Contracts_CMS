import React from 'react';
import {Field} from "redux-form";
import { Card, CardHeader, CardBody, Row, Col, Label } from 'reactstrap';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../components/common/Form";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form/index";
import FieldDatePicker from "../../../../components/common/Form/FieldDatePicker";
import ThongTinThuoDatComponent from "./BatDongSan/ThongTinThuoDat";
import TaiSanGanLienVoiDatComponent from "./BatDongSan/TaiSanGanLienVoiDat";

const BatDongSanAdd = ({hasNoLicenseNumber = false, hasThongTinThuoDat, hasTaiSanGanLienVoiDat, district_id, districts, wards, land_purposes, handleDeleteLandPurposeRelations}) => {
    return (
        <Card>
            <CardHeader className="pl-3">
                <strong>TÀI SẢN ĐẤT ĐAI</strong>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md="12" className="pl-2">
                        <Field name="hasNoLicenseNumber" id="hasNoLicenseNumber" component="input" type="checkbox" />{' '}
                            <label htmlFor="hasNoLicenseNumber"><strong>{' '}Chưa được cấp giấy chứng nhận QSDĐ</strong></label>
                    </Col>
                </Row>
                {
                    hasNoLicenseNumber === false &&
                    <React.Fragment>
                        <Row className="mb-2">
                            <Col md="2" className="pl-2">
                                <Label>
                                    Giấy CN Quyền Sử Dụng Đất{' '}<span className="text-red">(*)</span>
                                </Label>
                            </Col>
                            <Col md="4" className="pr-1 pl-1">
                                <Field name="license_number" type="text" component={FieldInputPure}
                                    className="form-control form-control-sm"
                                    // normalize={(value) => value.toUpperCase()}
                                    normalize={(value) => value.toUpperCase().replace(/\s/g, '')}
                                />
                            </Col>
                            <Col md="2" className="pl-2">
                                <Label>
                                    Số vào sổ cấp GCN{' '}
                                </Label>
                            </Col>
                            <Col md="4" className="pr-1 pl-1">
                                <Field name="cert_number" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2" className="pl-2">
                                <Label>
                                    Ngày Cấp{' '}<span className="text-red">(*)</span>
                                </Label>
                            </Col>
                            <Col md="4" className="pr-1 pl-1">
                                <Field  name="issued_at" type="date" component={FieldDatePicker}
                                        className="form-control form-control-sm"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                        validate={FieldLevelValidation.validateRequired}
                                />
                            </Col>
                            <Col md="2" className="pl-2">
                                <Label>
                                    Nơi Cấp{' '}<span className="text-red">(*)</span>
                                </Label>
                            </Col>
                            <Col md="4" className="pr-1 pl-1">
                                <Field name="issued_by" type="text" component={FieldInputPure}
                                    className="form-control form-control-sm"
                                />
                            </Col>
                        </Row> 
                    </React.Fragment>
                }
                <Row className="mb-2">
                    <Col md="2" className="pl-2">
                        <Label>
                            Địa Chỉ{' '}<span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col md="10" className="pr-1 pl-1">
                        <Field name="address" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="pl-2">
                        <Card>
                            <CardHeader className="pl-3">
                                <Field name="hasThongTinThuoDat" id="hasThongTinThuoDat" component="input" type="checkbox" />{' '}
                                <label htmlFor="hasThongTinThuoDat"><strong>{' '}THÔNG TIN THỬA ĐẤT</strong></label>
                            </CardHeader>
                            {
                                hasThongTinThuoDat && 
                                <CardBody>
                                    <ThongTinThuoDatComponent district_id={district_id} districts={districts} 
                                                              wards={wards} land_purposes={land_purposes}
                                                              handleDeleteLandPurposeRelations={handleDeleteLandPurposeRelations}/>
                                </CardBody>
                            }
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="pl-2">
                        <Card>
                            <CardHeader className="pl-3">
                                <Field name="hasTaiSanGanLienVoiDat" id="hasTaiSanGanLienVoiDat" component="input" type="checkbox" />{' '}
                                <label htmlFor="hasTaiSanGanLienVoiDat"><strong>{' '}TÀI SẢN GẮN LIỀN VỚI ĐẤT</strong></label>
                            </CardHeader>
                            {
                                hasTaiSanGanLienVoiDat && 
                                <CardBody>
                                    <TaiSanGanLienVoiDatComponent />
                                </CardBody>
                            }
                        </Card>
                    </Col>
                </Row>
            </CardBody> 
        </Card>
    );
}

export default BatDongSanAdd;