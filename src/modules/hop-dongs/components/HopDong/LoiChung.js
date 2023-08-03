import React from 'react';
import {Row, Col, Card, CardHeader, CardBody, Label} from 'reactstrap';
import {Field} from "redux-form";
import { FormattedDate } from 'react-intl';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../components/common/Form";
import FieldDatePicker from "../../../../components/common/Form/FieldDatePicker";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form/index";

const LoiChung = ({contractDetail, isReadOnly}) => {
    return (
        <Card>
            <CardHeader>
                <b>LỜI CHỨNG CỦA CÔNG CHỨNG VIÊN</b>
            </CardHeader>
            <CardBody>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Công Chứng Viên{' '}<span className="text-red">(*):</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="2">
                        {   
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{contractDetail && contractDetail.notary_name }</strong>
                                </Label> 
                                :
                                <Field  name="notary_name" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                />
                        }
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Thuộc:
                        </Label>
                    </Col>
                    <Col xs="6" md="2">
                        {   
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{contractDetail && contractDetail.groupDetail && contractDetail.groupDetail.group_name}</strong>
                                </Label> 
                                :
                                <Field  name="group_name" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm" readOnly={true}
                                />
                        }
                    </Col>
                    <Col xs="6" md="1">
                        <Label className="col-form-label">
                            Tại địa chỉ:
                        </Label>
                    </Col>
                    <Col xs="6" md="3">
                        {   
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{contractDetail && contractDetail.groupDetail && contractDetail.groupDetail.address}</strong>
                                </Label> 
                                :
                                <Field  name="group_address" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm" readOnly={true}
                                />
                        }
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số công chứng:
                        </Label>
                    </Col>
                    <Col xs="6" md="2">
                        {   
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{ contractDetail && contractDetail.notary_number }</strong>
                                </Label> 
                                :
                                <Field  name="notary_number" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm" readOnly={isReadOnly}
                                />
                        }
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Ngày công chứng:
                        </Label>
                    </Col>
                    <Col xs="6" md="2">
                        {   
                            isReadOnly ?
                                (
                                    contractDetail && contractDetail.notary_date &&
                                    <Label className="col-form-label">
                                        <strong>
                                            <FormattedDate value={contractDetail && contractDetail.notary_date}>
                                                {
                                                    parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                                                }
                                            </FormattedDate>
                                        </strong>
                                    </Label> 
                                )
                                :
                                <Field  name="notary_date" type="date" component={FieldDatePicker}
                                        className="form-control form-control-sm"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                        style={{width: '600px'}}
                                        readOnly={isReadOnly}
                                />
                        }
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số bản chính:
                        </Label>
                    </Col>
                    <Col xs="6" md="2">
                        {   
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{ contractDetail && contractDetail.origin_number }</strong>
                                </Label> 
                                :
                                <Field name="origin_number" type="number" component={FieldInputPure}
                                        className="form-control form-control-sm" readOnly={isReadOnly}
                                />
                        }
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số trang bản chính:
                        </Label>
                    </Col>
                    <Col xs="6" md="2">
                        {   
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{ contractDetail && contractDetail.pages_of_original }</strong>
                                </Label> 
                                :
                                <Field name="pages_of_original" type="number" component={FieldInputPure}
                                        className="form-control form-control-sm" readOnly={isReadOnly}
                                />
                        }
                    </Col>
                    <Col xs="6" md="1">
                        <Label className="col-form-label">
                            Số tờ:
                        </Label>
                    </Col>
                    <Col xs="6" md="3">
                        {   
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{ contractDetail && contractDetail.number_of_copies }</strong>
                                </Label> 
                                :
                                <Field name="number_of_copies" type="number" component={FieldInputPure}
                                    className="form-control form-control-sm" readOnly={isReadOnly}
                                />
                        }
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số bản bên A:
                        </Label>
                    </Col>
                    <Col xs="6" md="2">
                        {   
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{ contractDetail && contractDetail.copies_of_a }</strong>
                                </Label> 
                                :
                                <Field name="copies_of_a" type="number" component={FieldInputPure}
                                    className="form-control form-control-sm" readOnly={isReadOnly}
                                />
                        }
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số bản bên B:
                        </Label>
                    </Col>
                    <Col xs="6" md="2">
                        {   
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{ contractDetail && contractDetail.copies_of_b }</strong>
                                </Label> 
                                :
                                <Field name="copies_of_b" type="number" component={FieldInputPure}
                                    className="form-control form-control-sm" readOnly={isReadOnly}
                                />
                        }
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Nội dung lời chứng:
                        </Label>
                    </Col>
                    <Col xs="6" md="10">
                        {   
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{ contractDetail && contractDetail.notary_content }</strong>
                                </Label> 
                                :
                                <Field name="notary_content" type="textarea" component={FieldInputPure}
                                    className="form-control" rows={5} readOnly={isReadOnly}
                                />
                        }
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
};

export default LoiChung;