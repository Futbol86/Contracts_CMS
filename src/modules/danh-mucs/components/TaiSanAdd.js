import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, UncontrolledAlert, Label } from 'reactstrap';
import {Field} from "redux-form";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames';

import {FieldInputPure, FieldRadioButtonGroup} from "../../../components/common/Form";
import FieldDatePicker from "../../../components/common/Form/FieldDatePicker";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../components/common/Form/index";
import {ASSET_TYPES} from '../constants';

import DongSanAddComponent from './TaiSan/DongSanAdd';
import BatDongSanAddComponent from './TaiSan/BatDongSanAdd';
import ChuSoHuuComponent from './TaiSan/ChuSoHuu';

class TaiSanAdd extends Component {
    render(){
        const { assetDetail, subAssetTypes = [], asset_type_id, district_id, districts, wards, land_purposes,
                hasNoLicenseNumber, hasThongTinThuoDat, hasTaiSanGanLienVoiDat, hiddenReturnButton = false,
                handleSearch, handleDeleteOwnerAssetRelations, handleDeleteLandPurposeRelations,
                handleSubmit, error, submitting, pristine, invalid, reset } = this.props;
        
        var listAssetType = ASSET_TYPES.map(item => {
                                                return {
                                                    label: item.name,
                                                    value: item.id
                                                }
                                            });
        var listSubAssetType = [];
        
        let _subAssetTypes = subAssetTypes.sort((a, b) => a.id - b.id);

        if(asset_type_id) {
            listSubAssetType =  _subAssetTypes.filter(item => item.asset_type_id === parseInt(asset_type_id)).map(item => {
                                    return {
                                        label: item.name,
                                        value: item.id
                                    }
                                });
        }
        
        return (
            <div className="animated fadeIn">
                <Form onSubmit={evt => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    handleSubmit();
                }}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {
                                    assetDetail && assetDetail.id ? "Sửa Tài sản" : "Thêm Tài sản"
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Nhóm Tài Sản{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    <Field
                                        multi={false}
                                        name="asset_type_id"
                                        options={listAssetType}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Loại Tài Sản{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    <Field
                                        multi={false}
                                        name="sub_asset_type_id"
                                        options={listSubAssetType}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                            </Row>
                            {
                                (asset_type_id === 1) &&
                                <Row className="mb-2">
                                    <Col xs={12}>
                                        <DongSanAddComponent />
                                    </Col>
                                </Row>
                            }
                            {
                                (asset_type_id === 2) &&
                                <Row className="mb-2">
                                    <Col xs="12">
                                        <BatDongSanAddComponent district_id={district_id} districts={districts} 
                                                                wards={wards} land_purposes={land_purposes}
                                                                hasNoLicenseNumber={hasNoLicenseNumber}
                                                                hasThongTinThuoDat={hasThongTinThuoDat}
                                                                hasTaiSanGanLienVoiDat={hasTaiSanGanLienVoiDat}
                                                                handleDeleteLandPurposeRelations={handleDeleteLandPurposeRelations}/>
                                    </Col>
                                </Row>
                            }
                            {/* <Row className="mb-2">
                                <Col xs={12}>
                                    <ChuSoHuuComponent handleSearch={handleSearch} 
                                                       handleDeleteOwnerAssetRelations={handleDeleteOwnerAssetRelations}/>
                                </Col>
                            </Row> */}
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <NavLink to={`/danh-mucs/asset/list`}
                                        className={classNames("btn-secondary p-2 text-dark", {"disabled": hiddenReturnButton})}>
                                Trở về Danh mục
                            </NavLink>

                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                        data-spinner-lines={12} className="btn btn-dark" type="submit"
                                        loading={submitting} disabled={submitting || invalid || pristine}>
                                {
                                    assetDetail && assetDetail.id ?
                                    "Cập nhật" : "Thêm mới"
                                }
                            </LaddaButton>
                        </CardFooter>
                    </Card>
                </Form>
                <ToastContainer />
            </div>
        );
    }
}

TaiSanAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default TaiSanAdd;