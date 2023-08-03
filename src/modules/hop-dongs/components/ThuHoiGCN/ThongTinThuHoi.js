import React from 'react';
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, Label} from 'reactstrap';
import {Field} from "redux-form";
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../components/common/Form";
import FieldDatePicker from "../../../../components/common/Form/FieldDatePicker";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form/index";
import {isEmpty} from "lodash";
import {API_SUB_URL_THU_HOI_GCN_FILES} from "../../constants";

const ThongTinThuHoi = ({ staticFileUrl, file_name, handleFileDrops, handleDeleteFile }) => {

    return (
        <Card>
            <CardHeader>
                <b>THÔNG TIN THU HỒI/HUỶ</b>
            </CardHeader>
            <CardBody>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số quyết định Thu hồi/Huỷ{' '}<span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="eviction_number" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Ngày ban hành{' '}<span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field  name="eviction_date" type="date" component={FieldDatePicker}
                                className="form-control form-control-sm"
                                placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                validate={FieldLevelValidation.validateRequired}
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Cơ quan ban hành quyết định Thu hồi/Huỷ{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="eviction_org" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Giấy chứng nhận trước khi Thu hồi/Huỷ{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="license_number" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Văn bản đính kèm{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field
                            name="upload_file"
                            component={FieldDropZone}
                            handleFileDrops={handleFileDrops}
                            label="Chọn File"
                            className="btn btn-outline-primary btn-sm btn-block"
                            listDroppedFiles={false}
                        />
                        {file_name && !isEmpty(file_name) && (
                            <ul style={{listStyleType: "none", paddingLeft: "0px"}}>
                                {/* {files.map((rsFile, idx) => ( */}
                                    <li>
                                        <a href={`${staticFileUrl}${API_SUB_URL_THU_HOI_GCN_FILES}/${file_name}`} target="_blank">{file_name && file_name.substring(10)}</a>
                                        <button type="button" className="btn btn-link pl-3 pt-0" title="Delete This File" onClick={() => handleDeleteFile(file_name)}>
                                            <i className="icon-minus" />
                                        </button>
                                    </li>
                                {/* ))} */}
                            </ul>
                        )}
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Tài sản Thu hồi/Huỷ{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="10">
                        <Field name="eviction_asset" type="textarea" component={FieldInputPure}
                               className="form-control" rows={6}
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Nội dung Thu hồi/Huỷ{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="10">
                        <Field name="eviction_content" type="textarea" component={FieldInputPure}
                               className="form-control" rows={6}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
};

export default ThongTinThuHoi;