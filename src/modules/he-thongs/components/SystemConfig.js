import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {Field} from "redux-form";
import {isEmpty} from "lodash";
import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, Label } from 'reactstrap';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../components/common/Form";
import FieldDatePicker from "../../../components/common/Form/FieldDatePicker";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../components/common/Form/index";
import {API_SUB_URL_SYSTEM_FILE} from "../constants";

class SystemConfigAdd extends Component {
    render(){
        const { staticFileUrl, file_name, handleFileDrops, handleDeleteFile, handleSubmit, error, submitting, pristine, invalid, reset } = this.props;

        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                Cấu Hình Hệ Thống
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Card>
                                <CardHeader>
                                    THÔNG BÁO HỆ THỐNG
                                </CardHeader>
                                <CardBody>
                                    <Row className="mb-2">
                                        <Col md="12">
                                            <Label className="col-form-label">
                                                <strong>Gửi thông báo tới toàn hệ thống:{' '}</strong>
                                            </Label>
                                            <Field name="notification" type="textarea" component={FieldInputPure}
                                                className="form-control" rows={5}
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>  
                            <Card>
                                <CardHeader>
                                    CHI PHÍ TRA CỨU THÔNG TIN ĐẤT ĐAI
                                </CardHeader>
                                <CardBody>
                                    <Row className="mb-2">
                                        <Col md="4">
                                            <Label className="col-form-label">
                                                <strong>Chi phí 1 lần tra cứu:{' '}</strong>
                                            </Label>
                                            <Field name="requestTNMTLandData.feeOneRequest" type="number" component={FieldInputPure}
                                                className="form-control form-control-sm"
                                            />
                                        </Col>
                                        <Col md="4">
                                            <Label className="col-form-label">
                                                <strong>Chi phí tra cứu tối đa trong 1 tháng:{' '}</strong>
                                            </Label>
                                            <Field name="requestTNMTLandData.maxFeeOneMonth" type="text" component={FieldInputPure}
                                                className="form-control form-control-sm"
                                            />
                                        </Col>
                                        <Col md="4">
                                            <Label className="col-form-label">
                                                <strong>Email nhận thông báo:{' '}</strong>
                                            </Label>
                                            <Field name="requestTNMTLandData.remindEmails" type="text" component={FieldInputPure}
                                                className="form-control form-control-sm"
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>  
                            <Card>
                                <CardHeader>
                                    UPLOAD FILE HƯỚNG DẪN SỬ DỤNG
                                </CardHeader>
                                <CardBody>
                                    <Row className="mb-2">
                                        <Col md="12">
                                            <Field
                                                name="upload_hdsd_file"
                                                component={FieldDropZone}
                                                handleFileDrops={handleFileDrops}
                                                label="Chọn File"
                                                className="btn btn-outline-primary btn-sm btn-block"
                                                listDroppedFiles={false}
                                            />
                                            {file_name && !isEmpty(file_name) && (
                                                <ul style={{listStyleType: "none", paddingLeft: "0px"}}>
                                                    <li>
                                                        <a href={`${staticFileUrl}${API_SUB_URL_SYSTEM_FILE}/${file_name}`} target="_blank">{file_name}</a>
                                                        {/* <a href={`${staticFileUrl}${API_SUB_URL_SYSTEM_FILE}/${file_name}`} target="_blank">{file_name && file_name.substring(10)}</a> */}
                                                        <button type="button" className="btn btn-link pl-3 pt-0" title="Delete This File" onClick={() => handleDeleteFile(file_name)}>
                                                            <i className="icon-minus" />
                                                        </button>
                                                    </li>
                                                </ul>
                                            )}
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>  
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                Cập nhật
                            </LaddaButton>
                        </CardFooter>
                    </Card>
                </Form>
            </div>
        );
    }
}

SystemConfigAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default SystemConfigAdd;