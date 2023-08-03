import React from 'react';
import {Field, FieldArray} from "redux-form";
import {Card, CardHeader, CardBody, Row, Col, Label} from 'reactstrap';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../../components/common/Form";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../../../components/common/Form/index";

const renderMucDichSuDungDats = ({ fields, land_purposes = [], handleDeleteLandPurposeRelations, meta: { error, submitFailed }}) => {
    let listLandPurpose = land_purposes.map(item => {return {label: item.name, value: item.id }});
    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col xs="12">
                    <button type="button" className="btn btn-secondary" 
                            onClick={() => fields.push({})}>
                    <i className="icon-plus" /> Thêm mới
                    </button>
                </Col>
            </Row>
            {
                fields.map((member, index) => (
                    <React.Fragment key={index}>
                        <Row className="mb-2">
                            <Col md="4">
                                <Label className="col-form-label">
                                    Mục đích sử dụng đất
                                </Label>
                                <Field
                                    multi={false}
                                    name={`${member}.purpose_id`}
                                    options={listLandPurpose}
                                    component={FieldAutoComplete}
                                />
                            </Col>
                            <Col md="3">
                                <Label className="col-form-label">
                                    Diện tích sử dụng
                                </Label>
                                <Field  name={`${member}.used_area`}
                                        type="number"
                                        component={FieldInputPure}
                                        parse={(value) => value && parseFloat(value, 10)}
                                />
                            </Col>
                            <Col md="3">
                                <Label className="col-form-label">
                                    Thời hạn sử dụng
                                </Label>
                                <Field  name={`${member}.expiration`}
                                        type="text"
                                        component={FieldInputPure}
                                />
                            </Col>
                            <Col md="2">
                                <button type="button" className="btn btn-link" title="Remove" 
                                        onClick={() => handleDeleteLandPurposeRelations(fields, index)}>
                                        {/* onClick={() => fields.remove(index)}> */}
                                    <i className="icon-minus" />
                                </button>
                            </Col>
                        </Row>
                    </React.Fragment>
                ))
            }
        </React.Fragment>
    )
}

const ThongTinThuoDat = ({district_id, districts, wards, land_purposes, handleDeleteLandPurposeRelations}) => {
    let _districts = districts.sort((a, b) => a.id - b.id);
    let _wards = wards.sort((a, b) => a.id - b.id);

    let listDistrict = _districts.map(item => {
        return {
            label: item.name,
            value: item.id
        }});

    let listWard = _wards.filter(item => item.district_id === parseInt(district_id)).map(item => {
        return {
            label: item.name,
            value: item.id
        }});

    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Thửa đất số{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_lands.land_number" type="number" component={FieldInputPure}
                            className="form-control form-control-sm"
                            parse={(value) => parseInt(value, 10)}
                    />
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Tờ bản đồ số{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_lands.map_paper_number" type="number" component={FieldInputPure}
                            className="form-control form-control-sm"
                            parse={(value) => parseInt(value, 10)}
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Thuộc Huyện/TP{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field
                        multi={false}
                        name="related_lands.district_id"
                        options={listDistrict}
                        component={FieldAutoComplete}
                        parse={(value) => parseInt(value, 10)}
                        validate={FieldLevelValidation.validateRequired}
                    />
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Xã/Phường{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field
                        multi={false}
                        name="related_lands.ward_id"
                        options={listWard}
                        component={FieldAutoComplete}
                        parse={(value) => parseInt(value, 10)}
                        validate={FieldLevelValidation.validateRequired}
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Tổng diện tích (m2){' '}
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_lands.area" type="number" component={FieldInputPure}
                            className="form-control form-control-sm"
                            parse={(value) => parseFloat(value, 10)}
                    />
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Diện tích (ghi bằng chữ) (m2){' '}
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_lands.area_in_words" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Diện tích sử dụng riêng (m2){' '}
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_lands.private_area" type="number" component={FieldInputPure}
                            className="form-control form-control-sm"
                            parse={(value) => parseFloat(value, 10)}
                    />
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Diện tích sử dụng chung (m2){' '}
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_lands.public_area" type="number" component={FieldInputPure}
                            className="form-control form-control-sm"
                            parse={(value) => parseFloat(value, 10)}
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Diện tích cấp phép (m2){' '}
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_lands.granted_area" type="number" component={FieldInputPure}
                            className="form-control form-control-sm"
                            parse={(value) => parseFloat(value, 10)}
                    />
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Diện tích không cấp phép (m2){' '}
                    </Label>
                </Col>
                <Col md="4" className="pr-1 pl-1">
                    <Field name="related_lands.not_granted_area" type="number" component={FieldInputPure}
                            className="form-control form-control-sm"
                            parse={(value) => parseFloat(value, 10)}
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Nguồn gốc sử dụng{' '}
                    </Label>
                </Col>
                <Col md="10" className="pr-1 pl-1">
                    <Field name="related_lands.origin_used" type="textarea" component={FieldInputPure}
                            className="form-control" rows={4}
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Ghi chú{' '}
                    </Label>
                </Col>
                <Col md="10" className="pr-1 pl-1">
                    <Field name="related_lands.notes" type="textarea" component={FieldInputPure}
                            className="form-control" rows={4}
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Mục đích sử dụng đất{' '}
                    </Label>
                </Col>
                <Col md="10" className="pr-1 pl-1">
                    <FieldArray name="related_lands.land_purpose_relations" land_purposes={land_purposes} 
                                                                            handleDeleteLandPurposeRelations={handleDeleteLandPurposeRelations} 
                                                                            component={renderMucDichSuDungDats} label="Mục đích sử dụng đất"/>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default ThongTinThuoDat;