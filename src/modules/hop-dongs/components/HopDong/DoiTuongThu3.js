import React from 'react';
import { Card, CardHeader, CardBody, Row, Col, Label, Button, Badge } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field, FieldArray} from "redux-form";
import Modal from 'react-modal';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../components/common/Form";

const renderOwnerStatus = ({input: {value}}) => {
    let isNoResult = value.indexOf("Không tìm thấy thông tin") !== -1;

    return (
        <React.Fragment>
            {
                isNoResult && <span className='text-danger'>{value}</span>
            }
            {
                !isNoResult &&
                <Badge color="danger">{value}</Badge>
            }
        </React.Fragment>
    );
}

const renderInfoLabel = ({input: {value}}) => {
    return (
        <strong>{value}</strong>
    )
}

const renderDoiTuongs = ({ fields, isReadOnly, handleSearch, handleDelete, meta: { error, submitFailed }}) => {
    return (
        <React.Fragment>
             {
                isReadOnly === false &&
                <Row className="mb-2">
                    <Col xs="12">
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-primary"
                                    onClick={() => fields.push({})}>
                                <i className="icon-plus" /> BÊN TRUNG GIAN
                            </button>
                        </div>
                    </Col>
                </Row>
            }

            {
                fields.map((member, index) => (
                    <div key={index}>
                        <Row>
                            <Col md="2">  
                                <Label className="col-form-label">
                                    <strong><u>Đối tượng {index + 1}:</u></strong>
                                </Label>  
                            </Col>
                            <Col md="10">
                                <Field  name={`${member}.error`}
                                        component={renderOwnerStatus}
                                />
                            </Col>
                        </Row>

                        <hr />

                        {
                            isReadOnly === false &&
                            <Row className="mb-2">
                                <Col md="4">
                                    <Label className="col-form-label">
                                        <strong>CMND/GCN Doanh Nghiệp{' '}<span className="text-red">(*)</span></strong>
                                    </Label>
                                </Col>
                                <Col md="4">
                                    <Field  name={`${member}.license_no`}
                                            type="text"
                                            component={FieldInputPure}
                                    />
                                </Col>
                                <Col md="2">
                                    <Button color="warning" onClick={() => handleSearch(index)}>
                                        <i className="fa fa-search fa-lg" title="Tra cứu" />
                                        {' '}Tra cứu
                                    </Button>
                                </Col>
                                <Col md="2">
                                    <button type="button" className="btn btn-link" title="Remove" 
                                            onClick={() => handleDelete(fields, index)}>
                                        <i className="icon-minus" /> Xoá
                                    </button>
                                </Col>
                            </Row>
                        }

                        <Row className="mb-2">
                            <Col md="2">
                                <Label className="col-form-label">
                                    Loại Đối tượng:
                                </Label>
                            </Col>
                            <Col md="4">
                                <Field  name={`${member}.subOwnerTypeDetail.name`}
                                        type="text"
                                        component={renderInfoLabel}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2">
                                <Label className="col-form-label">
                                    Tên:
                                </Label>
                            </Col>
                            <Col md="4">
                                <Field  name={`${member}.fullname`}
                                        type="text"
                                        component={renderInfoLabel}
                                />
                            </Col>
                            <Col md="2">
                                <Label className="col-form-label">
                                    CMND Số:
                                </Label>
                            </Col>
                            <Col md="4">
                                <Field  name={`${member}.license_no`}
                                        type="text"
                                        component={renderInfoLabel}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2">
                                <Label className="col-form-label">
                                    Số Điện Thoại:
                                </Label>
                            </Col>
                            <Col md="4">
                                <Field  name={`${member}.phone`}
                                        type="text"
                                        component={renderInfoLabel}
                                />
                            </Col>
                            <Col md="2">
                                <Label className="col-form-label">
                                    Địa Chỉ:
                                </Label>
                            </Col>
                            <Col md="4">
                                <Field  name={`${member}.address`}
                                        type="text"
                                        component={renderInfoLabel}
                                />
                            </Col>
                        </Row>
                    </div>
                ))
            }
        </React.Fragment>
    )
}

const DoiTuongThu3 = ({ title, isReadOnly = false, handleSearchMidOwner, handleDeleteMidOwner }) => {
    return (
        <Card>
            <CardHeader>
                <div className='d-flex justify-content-between'>
                    <b>BÊN TRUNG GIAN {' '}<span className="text-red"></span></b>
                    <Label className="col-form-label">
                        <span className="text-red">Nhập Số CMND (GCN Doanh nghiệp), nhấn "Tra cứu" sẽ ra thông tin</span>
                    </Label>
                </div>
            </CardHeader>
            <CardBody>
                <FieldArray name="mid_owners" isReadOnly={isReadOnly}
                                              handleSearch={handleSearchMidOwner} 
                                              handleDelete={handleDeleteMidOwner} 
                                              component={renderDoiTuongs} 
                                              label="Bên Thứ 3"/>
            </CardBody>
        </Card>
    )
};

export default DoiTuongThu3;