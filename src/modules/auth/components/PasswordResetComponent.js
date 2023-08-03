import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Container, Row, Col, CardGroup, Card, CardBody, Form, FormGroup, Alert, Label} from 'reactstrap';
import {Field} from 'redux-form';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';

import AuthRightCardComponent from './AuthRightCardComponent';
// import {ReCaptcha} from "../../../components/common/Form";
import {FieldStandard} from "../../../components/common/Form";

class PasswordResetComponent extends Component {
    componentDidMount() {
        const {token} = this.props.match.params;
        this.props.changeFieldValue('token', token);
    }
    
    render() {
        const {handleSubmit, submitSucceeded, submitting, error, invalid} = this.props;
        const {token} = this.props.match.params;
        return (
            <div style={{width: window.innerWidth, height: window.innerHeight, backgroundImage: `url("/assets/background.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <Container className="mt-4">
                    <Row className="justify-content-center">
                        <Col md="6">
                            {submitSucceeded ?
                                <Alert color="success">
                                    <span>Thay đổi Mật khẩu mới thành công!</span>
                                    <br /><NavLink to={`/auth/login`}><FormattedMessage id="app.auth.Return_to_LOGIN" defaultMessage="Return to LOGIN" /></NavLink>.
                                </Alert>
                                :
                                <CardGroup>
                                    <Card className="p-4 rounded-login">
                                        <CardBody>
                                            <div className="d-flex justify-content-center">
                                                <img src="/assets/logo.png" border="0" style={{width: '90%', height: '90%'}}/>
                                            </div>

                                            <Form onSubmit={handleSubmit}>
                                                <h1 className="text-center" style={{color: '#004085', fontSize: '24px', fontWeight: '500'}}>THAY ĐỔI MẬT KHẨU</h1>
                                                {error && <Alert color="danger"><p>{error}</p></Alert>}
       
                                                <FormGroup>
                                                    <input type="hidden" name="token" value={token}/>
                                                    <Field name="password" type="password" autoComplete="off" label="Nhập Mật khẩu mới"
                                                           iconClassName="icon-password" className="mb-3"
                                                           component={FieldStandard}/>
                                                    <Field name="passwordAgain" type="password" autoComplete="off" label="Nhập lại Mật khẩu mới"
                                                           iconClassName="icon-password" className="mb-3"
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
                                                            Thay đổi mật khẩu
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
                </Container>
            </div>
        )
    }
}

export default PasswordResetComponent;