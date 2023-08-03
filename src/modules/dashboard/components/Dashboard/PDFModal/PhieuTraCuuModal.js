import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody, Label, Table, Badge, CardFooter} from 'reactstrap';
import {Field} from "redux-form";
import {FormattedDate, FormattedTime} from 'react-intl';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../../components/common/Form";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../../../components/common/Form/index";
import {ASSET_STATUSES} from "../../../constants";

const PhieuTraCuuModal = ({subAssetTypes, handleModalClose, handleModalChange}) => {

    const listAssetStatus = ASSET_STATUSES.map(item => {
        return {
            name: item.name,
            code: item.code,
        }
    });

    const listSubAssetType = subAssetTypes.map(item => {
        return {
            name: item.name,
            id: item.id,
        }
    });

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <div className="d-flex justify-content-between">
                        <h2>Thông Tin Phiếu Tra Cứu</h2>
                        <button type="button" className="close" onClick={handleModalClose}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">
                                Đóng
                            </span>
                        </button>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col md="6">
                            <Label className="col-form-label">
                                Mã phiếu tra cứu:{' '}
                            </Label>
                        </Col>
                        <Col md="6">
                            <Field name="transaction_code" type="text" component={FieldInputPure}
                                   className="form-control form-control-sm" readOnly={true}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="6">
                            <Label className="col-form-label">
                                Người yêu cầu tra cứu:{' '}
                            </Label>
                        </Col>
                        <Col md="6">
                            <Field name="name" type="text" component={FieldInputPure}
                                   className="form-control form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="6">
                            <Label className="col-form-label">
                                Địa chỉ:{' '}
                            </Label>
                        </Col>
                        <Col md="6">
                            <Field name="address" type="text" component={FieldInputPure}
                                   className="form-control form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="6">
                            <Label className="col-form-label">
                                Số điện thoại liên hệ:{' '}
                            </Label>
                        </Col>
                        <Col md="6">
                            <Field name="phone" type="text" component={FieldInputPure}
                                   className="form-control form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="6">
                            <Label className="col-form-label">
                                Cán bộ thực hiện tra cứu:{' '}
                            </Label>
                        </Col>
                        <Col md="6">
                            <Field name="notary_name" type="text" component={FieldInputPure}
                                   className="form-control form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="6">
                            <Label className="col-form-label">
                                Đơn vị:{' '}
                            </Label>
                        </Col>
                        <Col md="6">
                            <Field name="group_name" type="text" component={FieldInputPure}
                                   className="form-control form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="6">
                            <Label className="col-form-label">
                                Loại tài sản:{' '}
                            </Label>
                        </Col>
                        <Col md="6">
                            <Field name="asset_type_id" className="width-200"
                                    textField="name" valueField="id" titleOption="-- Loại Tài sản --"
                                    data={listSubAssetType}
                                    parse={(value) => parseInt(value, 10)}
                                    component={FieldDropdownList} />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="6">
                            <Label className="col-form-label">
                                Tài sản:{' '}
                            </Label>
                        </Col>
                        <Col md="6">
                            <Field name="asset_detail" type="textarea" component={FieldInputPure}
                                   className="form-control" rows={7}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="6">
                            <Label className="col-form-label">
                                Tình trạng tài sản:{' '}
                            </Label>
                        </Col>
                        <Col md="6">
                            <Field name="asset_status" className="width-200 disabled"
                                    textField="name" valueField="code" titleOption="-- Tình trạng Tài sản --"
                                    data={listAssetStatus}
                                    component={FieldDropdownList} />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="6">
                            <Label className="col-form-label">
                                Nội dung tra cứu:{' '}
                            </Label>
                        </Col>
                        <Col md="6">
                            <Field name="content" type="textarea" component={FieldInputPure}
                                   className="form-control" rows={5}
                            />
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                            Đóng
                        </button>

                        <button type="button" className="btn btn-primary" onClick={() => handleModalChange(0)}>
                            Đồng Ý
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
};

export default PhieuTraCuuModal;