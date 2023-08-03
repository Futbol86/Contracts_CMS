import React, {Component} from 'react';
import {Field} from 'redux-form';
import {NavLink} from 'react-router-dom';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Form, FormGroup, Alert, Label} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';

import {FieldPrepend} from '../../../components/common/Form';
import AuthRightCardComponent from './AuthRightCardComponent';

class AuthSigninComponent extends Component {
    render() {
        const {handleSubmit, submitting, error, invalid} = this.props;
        return (
            <div style={{width: window.innerWidth, height: window.innerHeight, backgroundImage: `url("/assets/background.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <Container className="mt-2">
                    <Row className="justify-content-center">
                        <Col md="6">
                            <CardGroup>
                                <Card className="p-4 rounded-login">
                                    <CardBody>
                                        <div className="d-flex justify-content-center">
                                            <img src="/assets/logo.png" border="0" style={{width: '90%', height: '90%'}}/>
                                        </div>

                                        <Form onSubmit={handleSubmit}>
                                            <h1 className="text-center" style={{color: '#004085', fontSize: '24px', fontWeight: '500'}}>ĐĂNG NHẬP HỆ THỐNG</h1>
                                            {error && <Alert color="danger"><p>{error}</p></Alert>}
                                            <FormGroup>
                                                <Label className="col-form-label-lg" for="username">
                                                    <strong>Tài khoản:</strong>
                                                </Label>
                                                <Field name="username" id="username" type="text" label="Tài Khoản" iconClassName="icon-user" className="mb-3"
                                                    component={FieldPrepend} />
                                            </FormGroup>

                                            <FormGroup>
                                                <Label className="col-form-label-lg" for="password">
                                                    <strong>Mật khẩu:</strong>
                                                </Label>
                                                <Field name="password" type="password" label="Password" iconClassName="icon-lock" className="mb-4"
                                                    component={FieldPrepend} />
                                            </FormGroup>

                                            <Row>
                                                <Col xs="6">
                                                    <LaddaButton
                                                        loading={submitting}
                                                        disabled={submitting || invalid}
                                                        data-size={L}
                                                        data-style={EXPAND_LEFT}
                                                        data-color="green"
                                                        data-spinner-lines={12}
                                                        className="btn btn-dark px-4"
                                                        type="submit"
                                                    >
                                                        {/*<span className="ladda-label">*/}
                                                        <FormattedMessage id="app.auth.Login" defaultMessage="Login" />
                                                        {/*</span>*/}
                                                    </LaddaButton>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0" type="button">
                                                        <NavLink to={`/auth/forgot-password`}>
                                                            <FormattedMessage id="app.auth.Forgot_Password" defaultMessage="Forgot password" />?
                                                        </NavLink>
                                                    </Button>
                                                </Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col md="12">
                                                    <p className="text-center" style={{color: '#ccc'}}>Hỗ trợ kỹ thuật — 0332.071.071</p>
                                                    <p className="text-center" style={{color: '#004085'}}>Copyright © 2021 — Sở Tư Pháp tỉnh Đồng Nai</p>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default AuthSigninComponent;