import React, {Component} from 'react';
import {Field} from 'redux-form';
import {NavLink} from 'react-router-dom';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Form, FormGroup, Alert, Label} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';

import {FieldPrepend} from '../../../components/common/Form';
import AuthRightCardComponent from './AuthRightCardComponent';
import './CSS/login.scss';

class AuthSigninComponent extends Component {
    render() {
        const {handleSubmit, submitting, error, invalid} = this.props;
        return (
            <div className="container">
                <div className="forms-container">
                  <div className="signin-signup">
                    <form action="" className="sign-in-form">
                      <img src="/assets/logo.png" className="image" alt="" border="0" style={{width: '50%', height: '50%', marginBottom: '20px'}}/>
                      <h2 className="title">ĐĂNG NHẬP HỆ THỐNG</h2>
                      <div className="input-field">
                        <i className="fa fa-user"></i>
                        <input type="text" name="usuario" autocomplete="username" placeholder="Tài khoản" required="yes"/>
                      </div>
                      <div className="input-field">
                        <i className="fa fa-lock"></i>
                        <input type="password" name="currentPassword" autocomplete="current-password" placeholder="Mật khẩu" id="id_password" required="yes" />
                        <i className="icon-eye" id="togglePassword" style={{cursor: 'pointer'}}></i>
                      </div>
                      <a href="#" className="key use-keyboard-input">Virtual keyboard</a>
                      <a className="pass" href="#">Quên mật khẩu?</a>
                      <input type="submit" value="Đăng nhập" className="btn solid"/>
                      {/* <p className="social-text">You can login with:</p>
                      <div className="social-media">
                        <a href="#" className="social-icon" aria-label="Register with Google">
                          <i className="fab fa-google"></i>
                        </a>
                        <a href="#" className="social-icon" aria-label="Register with Discord">
                          <i className="fab fa-discord"></i>
                        </a>
                        <a href="#" className="social-icon" aria-label="Register with Twitter">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="social-icon">
                          <i className="fab fa-facebook-f" aria-label="Register with Facebook"></i>
                        </a>
                      </div> */}
                      {/* <div className="social-media">
                        <a className="icon-mode" onclick="toggleTheme('dark');"><i className="fas fa-moon"></i></a>
                        <a className="icon-mode" onclick="toggleTheme('light');"><i className="fas fa-sun"></i></a>
                      </div>
                      <p className="text-mode">Change theme</p> */}
                    </form>
                    {/* <form action="" className="sign-up-form">
                      <h2 className="title">Register</h2>
                      <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" name="usuario" autocomplete="username" placeholder="Username" required="yes"/>
                      </div>
                      <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input type="email" name="correo" autocomplete="email" placeholder="Email" required="yes"/>
                      </div>
                      <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="password" name="contraseña" autocomplete="current-password" placeholder="Password" id="id_reg" required="yes"/>
                        <i className="far fa-eye" id="toggleReg" style={{cursor: 'pointer'}}></i>
                      </div>
                      <a href="#" className="key use-keyboard-input">Virtual keyboard</a>
                      <a href="https://priva.reversecode.repl.co/tools/pass.html" className="pass" target="_blank">Generate a strong password</a>
                      <label className="check">
                        <input type="checkbox" checked="checked"/>
                        <span className="checkmark">I accept the <a href="terms.html">terms and services</a></span>
                      </label>
                      <input type="submit" value="Create account" className="btn solid"/>
                      <p className="social-text">You can register with:</p>
                      <div className="social-media">
                        <a href="#" className="social-icon" aria-label="Register with Google">
                          <i className="fab fa-google"></i>
                        </a>
                        <a href="#" className="social-icon" aria-label="Register with Discord">
                          <i className="fab fa-discord"></i>
                        </a>
                        <a href="#" className="social-icon" aria-label="Register with Twitter">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="social-icon">
                          <i className="fab fa-facebook-f" aria-label="Register with Facebook"></i>
                        </a>
                      </div>
                    </form> */}
                  </div>
                </div>
                <div className="panels-container">
                  <div className="panel left-panel">
                    <div className="content">
                      <h3>QUẢN LÝ ĐĂNG KÝ GIAO DỊCH ĐẢM BẢO</h3>
                      <p>Hệ cơ sở dữ liệu công chứng</p>
                      <p>Phát triển bởi công ty cổ phần công nghệ DITECO</p>
                      {/* <button className="btn transparent" id="sign-up-btn">Register</button> */}
                    </div>
                    {/* <img src="/asset/logo.png" className="image" alt="" /> */}
                  </div>

                  {/* <div className="panel right-panel">
                    <div className="content">
                      <h3>Already have an account?</h3>
                      <p>Login to see your notifications and post your favorite photos</p>
                      <button className="btn transparent" id="sign-in-btn">Sign in</button>
                    </div>
                    <img src="img/register.svg" className="image" alt="" />
                  </div> */}
                </div>
            </div>
        )
    }
}

export default AuthSigninComponent;