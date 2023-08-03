import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {Field} from "redux-form";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, UncontrolledAlert, Label } from 'reactstrap';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../components/common/Form";
import FieldDatePicker from "../../../components/common/Form/FieldDatePicker";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../components/common/Form/index";
import {ASSET_TYPES} from '../constants';

class SubAssetTypeAdd extends Component {
    render(){
        const { subAssetTypeDetail, submitDatas, handleSubmit, error, submitting, pristine, invalid, reset } = this.props;

        let assetTypeList = ASSET_TYPES.map(item => {return {label: item.name, value: item.id }});
        let {submitStatus, submitStatusColor, submitMessage} = submitDatas || {};

        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {
                                    subAssetTypeDetail && subAssetTypeDetail.id ?
                                        "Sửa Loại Tài sản" : "Thêm Loại Tài sản"
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Thuộc tài sản{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    <Field
                                        multi={false}
                                        name="asset_type_id"
                                        options={assetTypeList}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Tên loại tài sản{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    <Field name="name" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Mô tả
                                    </Label>
                                </Col>
                                <Col xs="6" md="10">
                                    <Field name="description" type="textarea" component={FieldInputPure}
                                        className="form-control" rows={5}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <NavLink to={`/danh-mucs/sub-asset-type/list`} className="btn-secondary p-2 text-dark">
                                Trở về Danh mục
                            </NavLink>

                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                {
                                    subAssetTypeDetail && subAssetTypeDetail.id ?
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

SubAssetTypeAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default SubAssetTypeAdd;