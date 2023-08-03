import React from 'react';
import { Card, CardHeader, CardBody, Row, Col, Label, Button, Badge } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field, FieldArray} from "redux-form";
import Modal from 'react-modal';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../components/common/Form";
import AddDoiTuongModal from './AddDoiTuongModal';

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

const renderInfoLabel = ({input: {value}, className}) => {
    return (
        <strong className={className}>{value}</strong>
    )
}

const renderDoiTuongs = ({ fields, isReadOnly, title, currentModalId, handleSearch, handleDelete, handleModalChange, meta: { error, submitFailed },}) => {
    return (
        <React.Fragment>
            {
                isReadOnly === false &&
                <Row className="mb-2">
                    <Col xs="12">
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-primary"
                                    onClick={() => fields.push({})}>
                                <i className="icon-plus" /> BÊN {title}
                            </button>
                            
                            <Button color="secondary" onClick={() => handleModalChange(201 - currentModalId)}>
                                <i className="icon-plus" /> Thêm Đối Tượng
                            </Button>

                            <Modal className="Modal__Bootstrap modal-dialog modal-xl"
                                isOpen={currentModalId === 201}
                                contentLabel="Thêm mới Đối tượng"
                                style={{content: {outline: 0}}}
                            >
                                <AddDoiTuongModal
                                    doiTuongType="from_owners"
                                    hiddenReturnButton={true}
                                    handleModalClose={() => handleModalChange(0)}
                                />
                            </Modal>
                        </div>
                    </Col>
                </Row>
            }
            {
                fields.map((member, index) => (
                    <div key={index} className="shadow p-4 mb-2">
                        <Row className="mb-2">
                            <Col md="2">  
                                <Label className="col-form-label">
                                    <strong><u>Đối tượng {index + 1}:</u></strong>
                                </Label>  
                            </Col>
                            <Col md="4">
                                <Field  name={`${member}.error`}
                                        component={renderOwnerStatus}
                                />
                            </Col>
                            {/* <Col md="6">
                                <Label className="col-form-label">
                                    Hiện là Chủ sở hữu của Tài Sản:
                                </Label>
                                <Field  name={`${member}.license_number`}
                                        type="text" className="ml-2 text-primary h5"
                                        component={renderInfoLabel}
                                />
                            </Col> */}
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

const DoiTuongA = ({ title, isReadOnly = false, currentModalId, handleSearchFromOwner, handleDeleteFromOwner, handleModalChange }) => {
    return (
        <Card>
            <CardHeader>
                <div className='d-flex justify-content-between'>
                    <b>BÊN {title}{' '}<span className="text-red">(*)</span></b>
                    <Label className="col-form-label">
                        <span className="text-red">Nhập Số CMND (GCN Doanh nghiệp), nhấn "Tra cứu" sẽ ra thông tin</span>
                    </Label>
                </div>
            </CardHeader>
            <CardBody>
                <FieldArray name="from_owners" isReadOnly={isReadOnly}
                                               title={title}
                                               currentModalId={currentModalId}
                                               handleSearch={handleSearchFromOwner} 
                                               handleDelete={handleDeleteFromOwner} 
                                               handleModalChange={handleModalChange}
                                               label="Bên A"
                                               component={renderDoiTuongs} />
            </CardBody>
        </Card>
    )
};

export default DoiTuongA;