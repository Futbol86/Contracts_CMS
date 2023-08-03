import React from 'react';
import { Card, CardHeader, CardBody, Row, Col, Label, Button } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field, FieldArray} from "redux-form";
import Modal from 'react-modal';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../components/common/Form";

const renderOwnerAssetRelations = ({ fields, handleSearch, handleDeleteOwnerAssetRelations, meta: { error, submitFailed }}) => {
    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col xs="12">
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" 
                                onClick={() => fields.push({})}>
                            <i className="icon-plus" /> Thêm Chủ sở hữu
                        </button>
                        <Label className="col-form-label">
                            <span className="text-red">Nhập Số CMND (GCN Doanh nghiệp), nhấn "Tra cứu" sẽ ra thông tin Chủ Sở Hữu</span>
                        </Label>
                    </div>
                </Col>
            </Row>
            {
                fields.map((member, index) => (
                    <React.Fragment key={index}>
                        <hr />
                        <Row className="mb-2">
                            <Col md="1">
                                <Label className="col-form-label">
                                    CMND/GCN Doanh Nghiệp{' '}<span className="text-red">(*)</span>
                                </Label>
                            </Col>
                            <Col md="6">
                                <Field  name={`${member}.license_no`}
                                        type="text"
                                        component={FieldInputPure}
                                />
                            </Col>
                            <Col md="2">
                                <Button color="secondary" onClick={() => handleSearch(index)}>
                                    <i className="fa fa-search fa-lg" title="Tra cứu" />
                                    {' '}Tra cứu
                                </Button>
                            </Col>
                            <Col md="3">
                                <button type="button" className="btn btn-link" title="Remove" 
                                        onClick={() => handleDeleteOwnerAssetRelations(fields, index)}>
                                    <i className="icon-minus" /> Xoá Chủ sở hữu
                                </button>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="1">
                                <Label className="col-form-label">
                                    Tên
                                </Label>
                            </Col>
                            <Col md="3">
                                <Field  name={`${member}.fullname`}
                                        type="text"
                                        component={FieldInputPure}
                                />
                            </Col>
                            <Col md="1">
                                <Label className="col-form-label">
                                    Địa Chỉ
                                </Label>
                            </Col>
                            <Col md="3">
                                <Field  name={`${member}.address`}
                                        type="text"
                                        component={FieldInputPure}
                                />
                            </Col>
                            <Col md="1">
                                <Label className="col-form-label">
                                    SDT
                                </Label>
                            </Col>
                            <Col md="3">
                                <Field  name={`${member}.phone`}
                                        type="text"
                                        component={FieldInputPure}
                                />
                            </Col>
                        </Row>
                    </React.Fragment>
                ))
            }
        </React.Fragment>
    )
}

const OwnerAssetRelation = ({ handleSearch, handleDeleteOwnerAssetRelations }) => {
    return (
        <Card>
            <CardHeader>
                <b>CHỦ SỞ HỮU</b>
            </CardHeader>
            <CardBody>
                <FieldArray name="owners" handleSearch={handleSearch} 
                                          handleDeleteOwnerAssetRelations={handleDeleteOwnerAssetRelations} 
                                          component={renderOwnerAssetRelations} 
                                          label="Chủ sỡ hữu"/>
            </CardBody>
        </Card>
    )
};

export default OwnerAssetRelation;