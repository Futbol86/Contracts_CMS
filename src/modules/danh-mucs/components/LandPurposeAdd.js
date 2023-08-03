import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {Field} from "redux-form";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, UncontrolledAlert, Label } from 'reactstrap';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../components/common/Form";

class LandPurposeAdd extends Component {
    render(){
        const { landPurposeDetail, handleSubmit, error, submitting, pristine, invalid, reset } = this.props;

        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {
                                    landPurposeDetail && landPurposeDetail.id ?
                                        "Sửa Mục đích sử dụng đất" : "Thêm Mục đích sử dụng đất"
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Mục đích sử dụng đất:{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="10">
                                    <Field name="name" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Mô tả:{' '}
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
                            <NavLink to={`/danh-mucs/land-purpose/list`} className="btn-secondary p-2 text-dark">
                                Trở về Danh mục
                            </NavLink>
                            
                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                {
                                    landPurposeDetail && landPurposeDetail.id ?
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

LandPurposeAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default LandPurposeAdd;