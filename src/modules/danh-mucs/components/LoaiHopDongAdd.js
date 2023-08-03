import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {Field} from "redux-form";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Label } from 'reactstrap';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../components/common/Form";
import FieldDatePicker from "../../../components/common/Form/FieldDatePicker";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../components/common/Form/index";

class LoaiHopDongAdd extends Component {
    render(){
        const { subContractTypeDetail, contractTypes = [], submitDatas,
                handleModalChange, handleModalClose, currentModalId, handleSubmit,
                error, submitting, pristine, invalid, reset } = this.props;

        let _contractTypes = contractTypes.sort((a, b) => a.id - b.id);
        let contractTypeList = _contractTypes.map(item => {return {label: item.name, value: item.id }});

        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {
                                    subContractTypeDetail && subContractTypeDetail.id ?
                                        "Sửa Loại Hợp đồng" : "Thêm Loại Hợp đồng"
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Loại giao dịch{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    <Field
                                        multi={false}
                                        name="contract_type_id"
                                        options={contractTypeList}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Tên loại hợp đồng{' '}<span className="text-red">(*)</span>
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
                            <NavLink to={`/danh-mucs/sub-contract-type/list`} className="btn-secondary p-2 text-dark">
                                Trở về Danh mục
                            </NavLink>

                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                {
                                    subContractTypeDetail && subContractTypeDetail.id ?
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

LoaiHopDongAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default LoaiHopDongAdd;