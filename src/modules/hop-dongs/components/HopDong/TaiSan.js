import React from 'react';
import moment from 'moment';
import { Card, CardHeader, CardBody, Row, Col, Label, Button, Badge, Alert, FormGroup } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field, FieldArray} from "redux-form";
import Modal from 'react-modal';
import { isEmpty } from 'lodash';
import {FieldInputPure, FieldRadioButtonGroup, FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form";
import AddTaiSanModal from './AddTaiSanModal';

const renderAssetStatus = ({input: {value}}) => {
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

const renderTaiSans = ({ fields, isReadOnly, assetQuery = {}, districts = [], wards = [], currentModalId, 
                         handleSearchAsset, handleDeleteAsset, handleShowHistoryClick, handleRequestTNMTLandData, handleModalChange }) => {
    return (
        <React.Fragment>
             {
                isReadOnly === false &&
                <Row className="mb-2">
                    <Col xs="12">
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-primary"
                                    onClick={() => fields.push({})}>
                                <i className="icon-plus" /> TÀI SẢN
                            </button>

                            <Button color="secondary" onClick={() => handleModalChange(200 - currentModalId)}>
                                <i className="icon-plus" /> Thêm Tài Sản
                            </Button>

                            <Modal className="Modal__Bootstrap modal-dialog modal-xl"
                                isOpen={currentModalId === 200}
                                contentLabel="Thêm mới Tài sản"
                                style={{content: {outline: 0}}}
                            >
                                <AddTaiSanModal
                                    hiddenReturnButton={true}
                                    handleModalClose={() => handleModalChange(0)}
                                />
                            </Modal>
                        </div>
                    </Col>
                </Row>
            }
            {
                fields.map((member, index) => {
                    let asset_type_id = fields.get(index).asset_type_id;
                    let ward_id = fields.get(index).ward_id;
                    let district_id = fields.get(index).district_id;
                    let land_number = fields.get(index).land_number;
                    let map_paper_number = fields.get(index).map_paper_number;

                    let isPartial = fields.get(index).isPartial;
                    let totalArea = fields.get(index).totalArea || 0;
                    let partialArea = fields.get(index).partialArea > totalArea ? totalArea: fields.get(index).partialArea;
                    let remainArea = (totalArea || 0) - (partialArea || 0);

                    fields.get(index).totalArea = totalArea;
                    fields.get(index).partialArea = partialArea;
                    fields.get(index).remainArea = remainArea;

                    if(assetQuery.license_number === fields.get(index).license_number) {
                        asset_type_id = assetQuery.sub_asset_type_detail && assetQuery.sub_asset_type_detail.asset_type_id || 0;
                        ward_id = assetQuery.related_lands && assetQuery.related_lands.ward_id || 0;
                        district_id = assetQuery.related_lands && assetQuery.related_lands.district_id || 0;
                        land_number = assetQuery.related_lands && assetQuery.related_lands.land_number || 0;
                        map_paper_number = assetQuery.related_lands && assetQuery.related_lands.map_paper_number || 0;
                    }

                    let listDistrict = districts.map(item => {
                        return {
                            label: item.name,
                            value: item.id
                        }
                    });
                      
                    let listWard = wards.filter(item => item.district_id === parseInt(district_id)).map(item => {
                        return {
                            label: item.name,
                            value: item.id
                        }
                    });

                    let isEnableSearch = ward_id && district_id && land_number && map_paper_number;

                    return (
                        <div key={index} className="shadow mb-4 p-4">
                            <Row>
                                <Col md="2">  
                                    <Label className="col-form-label">
                                        <strong><u>Tài Sản {index + 1}:</u></strong>
                                    </Label>  
                                </Col>
                                <Col md="10">
                                    <Field  name={`${member}.error`}
                                            component={renderAssetStatus}
                                    />
                                </Col>
                            </Row>

                            <hr />
                            {
                                isReadOnly === false &&
                                <Row className="mb-2">
                                    <Col md="4">
                                        <Label className="col-form-label">
                                            <strong>Số giấy tờ (Giấy chứng nhận):{' '}<span className="text-red">(*)</span></strong>
                                        </Label>
                                    </Col>
                                    <Col md="4">
                                        <Field  name={`${member}.license_number`}
                                                type="text"
                                                component={FieldInputPure}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <div className='d-flex justify-content-between'>
                                            <Button color="warning" onClick={() => handleSearchAsset(index)}>
                                                <i className="fa fa-search fa-lg" title="Tra cứu" />
                                                {' '}Tra cứu
                                            </Button>
                                            
                                            <Button color="secondary" onClick={() => handleShowHistoryClick(index)}>
                                                <i className="fa fa-search fa-lg" title="Tra cứu" />
                                                {' '}Lịch sử GD
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col md="1">
                                        <button type="button" className="btn btn-link" title="Remove" 
                                                onClick={() => handleDeleteAsset(fields, index)}>
                                            <i className="icon-minus" /> Xoá
                                        </button>
                                    </Col>
                                </Row>
                            }

                            <Row className="mb-2">
                                <Col md="2">
                                    <Label className="col-form-label">
                                        Loại Tài Sản:
                                    </Label>
                                </Col>
                                <Col md="4">
                                    <Field  name={`${member}.subAssetTypeDetail.name`}
                                            type="text"
                                            component={renderInfoLabel}
                                    />
                                </Col>
                                <Col md="2">
                                    <Label className="col-form-label">
                                        Giấy Chứng Nhận:
                                    </Label>
                                </Col>
                                <Col md="4">
                                    <Field  name={`${member}.license_number`}
                                            type="text"
                                            component={renderInfoLabel}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col md="2">
                                    <Label className="col-form-label">
                                        Ngày Cấp:
                                    </Label>
                                </Col>
                                <Col md="4">
                                    <Field  name={`${member}.issued_at`}
                                            type="text"
                                            format={(value, name) => value ? moment(value).format("DD-MM-YYYY") : null}
                                            component={renderInfoLabel}
                                    />
                                </Col>
                                <Col md="2">
                                    <Label className="col-form-label">
                                        Nơi Cấp:
                                    </Label>
                                </Col>
                                <Col md="4">
                                    <Field  name={`${member}.issued_by`}
                                            type="text"
                                            component={renderInfoLabel}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
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

                            <hr />
                            {
                                asset_type_id === 2 &&
                                <React.Fragment>
                                    <Row className="mb-2">
                                        <Col md="2">
                                            <Label className="col-form-label">
                                                Thửa Đất Số:
                                            </Label>
                                        </Col>
                                        <Col md="4">
                                            <Field  name={`${member}.land_number`}
                                                    type="number"
                                                    component={FieldInputPure}
                                            />
                                        </Col>
                                        <Col md="2">
                                            <Label className="col-form-label">
                                                Tờ Bản Đồ Số:
                                            </Label>
                                        </Col>
                                        <Col md="4">
                                            <Field  name={`${member}.map_paper_number`}
                                                    type="number"
                                                    component={FieldInputPure}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md="2">
                                            <Label className="col-form-label">
                                                Huyện:
                                            </Label>
                                        </Col>
                                        <Col md="4">
                                            <Field
                                                multi={false}
                                                name={`${member}.district_id`}
                                                options={listDistrict}
                                                component={FieldAutoComplete}
                                            />
                                        </Col>
                                        <Col md="2">
                                            <Label className="col-form-label">
                                                Xã:
                                            </Label>
                                        </Col>
                                        <Col md="4">
                                            <Field
                                                multi={false}
                                                name={`${member}.ward_id`}
                                                options={listWard}
                                                component={FieldAutoComplete}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button color="info" disabled={!isEnableSearch} onClick={() => handleRequestTNMTLandData(index)}>
                                                <i className="fa fa-search fa-lg" title="Tra cứu" />
                                                {' '}Tra cứu Thông Tin Đất Đai (Sở Tài Nguyên Môi Trường)
                                            </Button>
                                        </Col> 
                                    </Row>
                                </React.Fragment>
                            }
                            <hr />
                            <Row className="mb-1">
                                <Col md="12" className="pl-2">
                                    <Field name={`${member}.isPartial`} id={`${member}.isPartial`} component="input" type="checkbox" />{' '}
                                        <label htmlFor={`${member}.isPartial`}><strong>{' '}Là giao dịch một phần</strong></label>
                                </Col>
                            </Row>
                            {
                                isPartial === true &&
                                <Row className="mb-1">
                                    <Col md="2">
                                        <Label className="col-form-label">
                                            Tổng diện tích (m2):
                                        </Label>
                                    </Col>
                                    <Col md="2">
                                        <Field  name={`${member}.totalArea`}
                                                type="text"
                                                component={renderInfoLabel}
                                        />
                                    </Col>
                                    <Col md="2">
                                        <Label className="col-form-label">
                                            Diện tích giao dịch (m2):
                                        </Label>
                                    </Col>
                                    {
                                        isReadOnly === false ?
                                        <Col md="2">
                                            <Field  name={`${member}.partialArea`}
                                                    type="number"
                                                    component={FieldInputPure}
                                            />
                                        </Col>
                                        :
                                        <Col md="2">
                                            <Field  name={`${member}.partialArea`}
                                                    type="number"
                                                    component={renderInfoLabel}
                                            />
                                        </Col>
                                    }
                                    <Col md="2">
                                        <Label className="col-form-label">
                                            Diện tích còn lại (m2):
                                        </Label>
                                    </Col>
                                    <Col md="2">
                                        <Field  name={`${member}.remainArea`}
                                                type="text"
                                                component={renderInfoLabel}
                                        />
                                    </Col>
                                </Row>
                            }
                        </div>
                    )
                })
            }
        </React.Fragment>
    )
}

const TaiSan = ({ isReadOnly = false, assetQuery, districts, wards, currentModalId,
                  handleSearchAsset, handleShowHistoryClick, handleDeleteAsset, handleRequestTNMTLandData, handleModalChange, error }) => {
    return (
        <Card>
            <CardHeader>
               <div className='d-flex justify-content-between'>
                    <b>TÀI SẢN {' '}<span className="text-red">(*)</span></b>
                    <Label className="col-form-label">
                        <span className="text-red">Nhập Số Giấy Tờ (Giấy Chứng Nhận) tài sản, nhấn "Tra cứu" sẽ ra thông tin</span>
                    </Label>
                </div>
            </CardHeader>
            <CardBody>
                <FieldArray name="assets" isReadOnly={isReadOnly} assetQuery={assetQuery} districts={districts} wards={wards}
                                          currentModalId={currentModalId}
                                          handleSearchAsset={handleSearchAsset} 
                                          handleShowHistoryClick={handleShowHistoryClick}
                                          handleDeleteAsset={handleDeleteAsset} 
                                          handleRequestTNMTLandData={handleRequestTNMTLandData}
                                          handleModalChange={handleModalChange}
                                          component={renderTaiSans}
                                          label="Tài Sản" />
            </CardBody>
        </Card>
    )
};

export default TaiSan;