import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {Field} from "redux-form";

import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, UncontrolledAlert, Label } from 'reactstrap';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../components/common/Form";
import FieldDatePicker from "../../../../components/common/Form/FieldDatePicker";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form/index";

class DoiTuongAddToChuc extends Component {
    render(){
        const {ownerTypes = [], banks = [], currentModalId,} = this.props;    
        let _ownerTypes = ownerTypes.sort((a, b) => a.id - b.id);
        let _banks = banks.sort((a, b) => a.id - b.id);
        let listBank = _banks.map(item => {return {label: item.short_name, value: item.id }});

        return (
            <div className="animated fadeIn">
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Tên Tổ Chức{' '}<span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="fullname" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số Điện Thoại{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="phone" type="number" component={FieldInputPure}
                                className="form-control form-control-sm"
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Người Đại Diện{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="representer" type="text" component={FieldInputPure}
                                className="form-control form-control-sm"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số GCN Đăng Ký Doanh Nghiệp{' '}<span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="license_no" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                               normalize={(value) => value.replace(/\s/g, '')}
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Ngày Cấp{' '}<span className="text-red"></span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                    <Field  name="issued_date" type="date" component={FieldDatePicker}
                            className="form-control form-control-sm"
                            placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Nơi Cấp{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="issued_by" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Địa Chỉ{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="address" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Email{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="email" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Mã Số Thuế{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="tax_code" type="number" component={FieldInputPure}
                            className="form-control form-control-sm"
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số Tài Khoản{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="bank_account" type="number" component={FieldInputPure}
                            className="form-control form-control-sm"
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Ngân Hàng{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field
                            multi={false}
                            name="bank_name"
                            options={listBank}
                            component={FieldAutoComplete}
                            parse={(value) => parseInt(value, 10)}
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Ghi Chú
                        </Label>
                    </Col>
                    <Col xs="6" md="10">
                        <Field name="description" type="textarea" component={FieldInputPure}
                            className="form-control" rows={5}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

DoiTuongAddToChuc.propTypes = {
    handleSubmit: PropTypes.func
};

export default DoiTuongAddToChuc;