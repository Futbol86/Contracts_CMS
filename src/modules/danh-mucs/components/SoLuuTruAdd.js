import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {Field} from "redux-form";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, UncontrolledAlert, Label } from 'reactstrap';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../components/common/Form";
import FieldDatePicker from "../../../components/common/Form/FieldDatePicker";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../components/common/Form/index";

class SoLuuTruAdd extends Component {
    render(){
        const { archiveBookDetail, submitDatas, archiveBookTypes, handleSubmit, error, submitting, pristine, invalid, reset } = this.props;

        var archiveBookTypeList = archiveBookTypes.map(item => {return {label: item.name, value: item.id }});
        let {submitStatus, submitStatusColor, submitMessage} = submitDatas || {};

        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {
                                    archiveBookDetail && archiveBookDetail.id ?
                                        "Sửa Sổ lưu trữ" : "Thêm Sổ lưu trữ"
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Loại Sổ lưu trữ{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    <Field
                                        multi={false}
                                        name="archive_type_id"
                                        options={archiveBookTypeList}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Tên Sổ lưu trữ:{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    <Field name="name" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Mở sổ ngày:{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    {/* <Field name="open_date" type="number" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    /> */}
                                    <Field  name="open_date" type="date" component={FieldDatePicker}
                                        className="form-control form-control-sm"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                        style={{width: '600px'}}
                                    />
                                </Col>
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Khoá sổ ngày:{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    {/* <Field name="close_date" type="number" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    /> */}
                                    <Field  name="close_date" type="date" component={FieldDatePicker}
                                        className="form-control form-control-sm"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                        style={{width: '600px'}}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Mô tả{' '}
                                    </Label>
                                </Col>
                                <Col xs="6" md="10">
                                    <Field name="description" type="textarea" component={FieldInputPure}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <NavLink to={`/danh-mucs/archive-book/list`} className="btn-secondary p-2 text-dark">
                                Trở về Danh mục
                            </NavLink>

                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                {
                                    archiveBookDetail && archiveBookDetail.id ?
                                    "Cập nhật" : "Thêm mới"
                                }
                            </LaddaButton>
                        </CardFooter>
                    </Card>
                </Form>
                <ToastContainer />
            </div>
        );
    }
}

SoLuuTruAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default SoLuuTruAdd;