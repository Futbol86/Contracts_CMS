import React from 'react';
import {Field} from "redux-form";
import { Card, CardHeader, CardBody, Row, Col, Label } from 'reactstrap';
import {FieldInputPure, FieldRadioButtonGroup, FieldAutoComplete, FieldLevelValidation} from "../../../../../components/common/Form";
import {RELATED_ASSET_TYPES} from "../../../constants";

const TaiSanGanLienVoiDat = ({ }) => {
    let listRelatedAssetTypes = RELATED_ASSET_TYPES.map(item => {return {label: item.name, value: item.id }});

    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Loại Tài Sản{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field
                        multi={false}
                        name="related_assets.related_type_id"
                        options={listRelatedAssetTypes}
                        component={FieldAutoComplete}
                        validate={FieldLevelValidation.validateRequired}
                    />
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Loại nhà{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_assets.kind_of" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Tổng diện tích{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_assets.total_area" type="number" component={FieldInputPure}
                            className="form-control form-control-sm"
                            parse={(value) => parseFloat(value, 10)}
                    />
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Diện tích xây dựng{' '}
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_assets.used_area" type="number" component={FieldInputPure}
                            className="form-control form-control-sm"
                            parse={(value) => parseFloat(value, 10)}
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Kết Cấu Nhà{' '}
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_assets.asset_structure" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Số Tầng{' '}
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_assets.number_of_floor" type="number" component={FieldInputPure}
                            className="form-control form-control-sm"
                            parse={(value) => value && parseInt(value, 10)}
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Năm xây dựng{' '}
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_assets.year_built" type="number" component={FieldInputPure}
                            className="form-control form-control-sm"
                            parse={(value) => value && parseInt(value, 10)}
                    />
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Thời hạn được sử dụng{' '}
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_assets.term_of_use" type="text" component={FieldInputPure}
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
                    <Field name="related_assets.notes" type="textarea" component={FieldInputPure}
                            className="form-control" rows={5}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default TaiSanGanLienVoiDat;