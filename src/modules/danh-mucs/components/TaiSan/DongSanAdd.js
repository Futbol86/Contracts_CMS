import React from 'react';
import {Field} from "redux-form";
import { Card, CardHeader, CardBody, Row, Col, Label } from 'reactstrap';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../components/common/Form";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form/index";
import FieldDatePicker from "../../../../components/common/Form/FieldDatePicker";

const DongSanAdd = ({}) => {
    return (
        <Card>
            <CardHeader className="pl-3">
                <strong>THÔNG TIN TÀI SẢN</strong>
            </CardHeader>
            <CardBody>
                <Row className="mb-2">
                    <Col md="2" className="pl-2">
                        <Label>
                            Số Giấy Tờ{' '}<span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col md="2" className="pr-1 pl-1">
                        <Field name="license_number" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                            //    normalize={(value) => value.toUpperCase()}
                               normalize={(value) => value.toUpperCase().replace(/\s/g, '')}
                        />
                    </Col>
                    <Col md="2" className="pl-2">
                        <Label>
                            Ngày Cấp{' '}
                        </Label>
                    </Col>
                    <Col md="2" className="pr-1 pl-1">
                        <Field  name="issued_at" type="date" component={FieldDatePicker}
                                className="form-control form-control-sm"
                                placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                // validate={FieldLevelValidation.validateRequired}
                        />
                    </Col>
                    <Col md="2" className="pl-2">
                        <Label>
                            Nơi Cấp{' '}
                        </Label>
                    </Col>
                    <Col md="2" className="pr-1 pl-1">
                        <Field name="issued_by" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="2" className="pl-2">
                        <Label>
                            Biển Số{' '}<span className="text-red"></span>
                        </Label>
                    </Col>
                    <Col md="2" className="pr-1 pl-1">
                        <Field name="plate_no" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                        />
                    </Col>
                    <Col md="2" className="pl-2">
                        <Label>
                            Nhãn Hiệu{' '}
                        </Label>
                    </Col>
                    <Col md="2" className="pr-1 pl-1">
                        <Field name="brand" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                        />
                    </Col>
                    <Col md="2" className="pl-2">
                        <Label>
                            Loại Xe{' '}
                        </Label>
                    </Col>
                    <Col md="2" className="pr-1 pl-1">
                        <Field name="kind_of" type="text" component={FieldInputPure}
                                className="form-control form-control-sm"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="2" className="pl-2">
                        <Label>
                            Màu Sơn{' '}
                        </Label>
                    </Col>
                    <Col md="2" className="pr-1 pl-1">
                        <Field name="color" type="text" component={FieldInputPure}
                                className="form-control form-control-sm"
                        />
                    </Col>
                    <Col md="2" className="pl-2">
                        <Label>
                            Số Khung{' '}
                        </Label>
                    </Col>
                    <Col md="2" className="pr-1 pl-1">
                        <Field name="chassis_no" type="text" component={FieldInputPure}
                                className="form-control form-control-sm"
                        />
                    </Col>
                    <Col md="2" className="pl-2">
                        <Label>
                            Số Máy{' '}
                        </Label>
                    </Col>
                    <Col md="2" className="pr-1 pl-1">
                        <Field name="engine_no" type="text" component={FieldInputPure}
                                className="form-control form-control-sm"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="2" className="pl-2">
                        <Label>
                            Năm Sản Xuất{' '}
                        </Label>
                    </Col>
                    <Col md="2" className="pr-1 pl-1">
                        <Field name="yearin" type="number" component={FieldInputPure}
                                className="form-control form-control-sm"
                        />
                    </Col>
                    <Col md="2" className="pl-2">
                        <Label>
                            Nước Sản Xuất{' '}
                        </Label>
                    </Col>
                    <Col md="2" className="pr-1 pl-1">
                        <Field name="madein" type="text" component={FieldInputPure}
                                className="form-control form-control-sm"
                        />
                    </Col>
                    <Col md="2" className="pl-2">
                        <Label>
                            Số Ghế Ngồi{' '}
                        </Label>
                    </Col>
                    <Col md="2" className="pr-1 pl-1">
                        <Field name="seat" type="number" component={FieldInputPure}
                                className="form-control form-control-sm"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="2" className="pl-2">
                        <Label>
                            Ghi Chú{' '}
                        </Label>
                    </Col>
                    <Col md="10" className="pr-1 pl-1">
                        <Field name="notes" type="textarea" component={FieldInputPure}
                                className="form-control" rows={5}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default DongSanAdd;