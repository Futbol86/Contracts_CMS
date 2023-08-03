import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {Field} from "redux-form";
import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Label } from 'reactstrap';
import {FieldInputPure} from "../../../../components/common/Form";

class AccountChangePasswordModal extends Component {
    render(){
        const { error, submitting, pristine, invalid, reset, handleSubmit, handleModalClose, } = this.props;

        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                Thay đổi Mật khẩu
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col md="4">
                                    <Field name="id" type="hidden" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md="4">
                                    <Label className="col-form-label">
                                        Mật Khẩu:{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col md="8">
                                    <Field name="password" type="password" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                                <i className="fa fa-times fa-lg" /> {' '}
                                Đóng
                            </button>
                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                Cập nhật
                            </LaddaButton>
                        </CardFooter>
                    </Card>
                </Form>
            </div>
        );
    }
}

AccountChangePasswordModal.propTypes = {
    handleSubmit: PropTypes.func
};

export default AccountChangePasswordModal;