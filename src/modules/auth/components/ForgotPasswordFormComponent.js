import React, {Component} from 'react';
import {Field} from 'redux-form';
import {NavLink} from 'react-router-dom';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Form, FormGroup, Alert, Label} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';

import {FieldInputPure, FieldInputPure2, FieldPrepend, FieldStandard2, FieldLevelValidation} from '../../../components/common/Form';
import AuthRightCardComponent from './AuthRightCardComponent';
import './CSS/login.scss';

class AuthSigninComponent extends Component {
    render() {
        const {handleSubmit, submitting, error, invalid} = this.props;
        return (
            <div className="container">
                <div className="forms-container">
                  <div className="signin-signup">
                    <Form onSubmit={handleSubmit} className="sign-in-form">
                      <img src="/assets/logo.png" className="image" alt="" border="0" style={{width: '50%', height: '50%', marginBottom: '20px'}}/>
                      <h2 className="title">QUÊN MẬT KHẨU</h2>
                      {error && <Alert color="danger"><p>{error}</p></Alert>}
                      <div className="input-field">
                        <i className="fa fa-user"></i>
                        <Field name="username" type="text" autocomplete="username" label="Nhập tài khoản" component={FieldInputPure2} validate={FieldLevelValidation.validateRequired}/>
                      </div>
                      <div className="input-field">
                        <i className="fa fa-lock"></i>
                        <Field name="email" type="text" autocomplete="email" label="Nhập email" component={FieldInputPure2} validate={FieldLevelValidation.validateRequired}/>
                      </div>
                      <a className="pass" href='/auth/login'>
                        <FormattedMessage id="app.auth.Return_to_LOGIN" defaultMessage="Trở về trang chủ" className="" />
                      </a>
                      <LaddaButton
                        loading={submitting}
                        disabled={submitting || invalid}
                        data-size={L}
                        data-style={EXPAND_LEFT}
                        data-color="green"
                        data-spinner-lines={12}
                        className="btn_login btn-dark px-4"
                        type="submit"
                      >
                        Yêu cầu mật khẩu
                      </LaddaButton>
                    </Form>
                  </div>
                </div>
                <div className="panels-container">
                  <div className="panel left-panel">
                    <div className="content">
                      <h3>QUẢN LÝ ĐĂNG KÝ GIAO DỊCH ĐẢM BẢO</h3>
                      <p>Hệ cơ sở dữ liệu công chứng</p>
                      <p>Phát triển bởi công ty cổ phần công nghệ DITECO</p>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

export default AuthSigninComponent;