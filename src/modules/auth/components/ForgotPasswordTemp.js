import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Container, Row, Col, CardGroup, Card, CardBody, Form, FormGroup, Alert, Label} from 'reactstrap';
import {Field} from 'redux-form';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';

import AuthRightCardComponent from './AuthRightCardComponent';
// import {ReCaptcha} from "../../../components/common/Form";
import {FieldStandard} from "../../../components/common/Form";

class ForgotPasswordFormComponent extends Component {
    render() {
        const {handleSubmit, submitSucceeded, submitting, error, invalid} = this.props;
        return (
            <div style={{width: window.innerWidth, height: window.innerHeight, backgroundImage: `url("/assets/background.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <div className="mt-4">
                    <Row className="justify-content-center">
                        <Col md="4">
                            {submitSucceeded ?
                                <Alert color="success">
                                    <FormattedMessage id="app.auth.Please_Check_your_email_and_follow_instruction" defaultMessage="Please Check your email and follow resetting instruction." />
                                    <br /><NavLink to={`/auth/login`}><FormattedMessage id="app.auth.Return_to_LOGIN" defaultMessage="Return to LOGIN" /></NavLink>.
                                </Alert>
                                :
                                <CardGroup>
                                    <Card className="p-4 rounded-login">
                                        <CardBody>
                                            <div className="d-flex justify-content-center">
                                                <img src="/assets/logo.png" border="0" style={{width: '40%', height: '40%'}}/>
                                            </div>

                                            <Form onSubmit={handleSubmit}>
                                                <h1 className="text-center" style={{color: '#004085', fontSize: '24px', fontWeight: '500'}}>QUÊN MẬT KHẨU</h1>
                                                {error && <Alert color="danger"><p>{error}</p></Alert>}
       
                                                <FormGroup>
                                                    <Field name="username" type="text" label="Nhập tài khoản"
                                                           iconClassName="icon-user" className="mb-3"
                                                           component={FieldStandard}/>
                                                    <Field name="email" type="text" label="Nhập địa chỉ Email"
                                                           iconClassName="icon-email" className="mb-3"
                                                           component={FieldStandard}/>
                                                </FormGroup>

                                                <Row>
                                                    <Col xs="6" className="text-left">
                                                        <NavLink to={`/auth/login`}>
                                                            <FormattedMessage id="app.auth.Return_to_LOGIN" defaultMessage="Return to LOGIN" />
                                                        </NavLink>.
                                                    </Col>
                                                    <Col xs="6" className="text-right">
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
                                                            <FormattedMessage id="app.auth.Request_Password" defaultMessage="Request Password" />
                                                        </LaddaButton>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </CardGroup>
                            }
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default ForgotPasswordFormComponent;