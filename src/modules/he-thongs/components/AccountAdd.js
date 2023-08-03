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
import {ACCOUNT_PERMISSION, ACCOUNT_STATUS} from "../constants";

class AccountAdd extends Component {
    render(){
        const { userGroups, accountDetail, submitDatas, handleSubmit, error, submitting, pristine, invalid, reset } = this.props;
        let listUserGroup = userGroups.map(item => {
            return {
                label: item.group_name,
                value: item.id
            }
        });

        let listAccountPermission = ACCOUNT_PERMISSION.map(item => {return {label: item.name, value: item.id }});
        console.log('--- accountDetail', accountDetail  )
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        {error && <Alert color="danger">{error}</Alert>}
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {
                                    accountDetail && accountDetail.id ? "Sửa Tài khoản" : "Thêm Tài khoản"
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col md="2">
                                    <Label className="col-form-label">
                                        Tên Tài Khoản:{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col md="4">
                                    <Field name="username" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                                {
                                    !accountDetail &&
                                    <React.Fragment>
                                        <Col md="2">
                                            <Label className="col-form-label">
                                                Mật Khẩu:{' '}<span className="text-red">(*)</span>
                                            </Label>
                                        </Col>
                                        <Col md="4">
                                            <Field name="password" type="password" component={FieldInputPure}
                                                className="form-control form-control-sm"
                                            />
                                        </Col>
                                    </React.Fragment>
                                }
                            </Row>
                            <Row className="mb-2">
                                <Col md="2">
                                    <Label className="col-form-label">
                                        Họ và Tên:{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col md="4">
                                    <Field name="fullname" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                                <Col md="2">
                                    <Label className="col-form-label">
                                        Thuộc Đơn Vị:{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col md="4">
                                    <Field
                                        multi={false}
                                        name="group_id"
                                        options={listUserGroup}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md="2">
                                    <Label className="col-form-label">
                                        Quyền{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col md="4">
                                    <Field
                                        multi={true}
                                        name="role_ids"
                                        options={listAccountPermission}
                                        component={FieldAutoComplete}
                                    />
                                </Col>
                                <Col md="2">
                                    <Label className="col-form-label">
                                        Trạng Thái Tài Khoản{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col md="4">
                                    <Field name="status" className="mb-4"
                                            textField="name" valueField="id" titleOption="-- Chọn trạng thái tài khoản --"
                                            data={ACCOUNT_STATUS}
                                            component={FieldDropdownList}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md="2">
                                    <Label className="col-form-label">
                                        Email:{' '}
                                    </Label>
                                </Col>
                                <Col md="4">
                                    <Field name="email" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                                <Col md="2">
                                    <Label className="col-form-label">
                                        Số Điện Thoại:{' '}
                                    </Label>
                                </Col>
                                <Col md="4">
                                    <Field name="phone" type="text" component={FieldInputPure}
                                           className="form-control form-control-sm"
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <NavLink to={`/he-thongs/accounts/list`} className="btn-secondary p-2 text-dark">
                                Trở về Danh mục
                            </NavLink>

                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                {
                                    accountDetail && accountDetail.id ?
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

AccountAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default AccountAdd;