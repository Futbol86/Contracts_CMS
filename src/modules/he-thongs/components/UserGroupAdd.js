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
import {GROUP_TYPES} from "../constants";

class UserGroupAdd extends Component {
    render(){
        const { userGroups = [], districts, userGroupDetail, handleSubmit, error, submitting, pristine, invalid, reset } = this.props;
        let listUserGroup = userGroups.map(item => {
            return {
                label: item.group_name,
                value: item.id
            }
        });

        let listDistrict = districts.map(item => {
            return {
                label: item.name,
                value: item.id
            }
        });

        let listGroupType = GROUP_TYPES.map(item => {
            return {
                name: item.name,
                id: item.id,
            }
        });

        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {
                                    userGroupDetail && userGroupDetail.id ? "Sửa Đơn vị" : "Thêm Đơn vị"
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col md="4">
                                    <Label className="col-form-label">
                                        Mã Đơn Vị:{' '}<span className="text-red">(*)</span>
                                    </Label>
                                    <Field name="group_code" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        Tên Đơn Vị:{' '}<span className="text-red">(*)</span>
                                    </Label>
                                    <Field name="group_name" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        Đơn Vị Quản Lý:{' '}
                                    </Label>
                                    <Field
                                        multi={false}
                                        name="parent_group"
                                        options={listUserGroup}
                                        component={FieldAutoComplete}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md="4">
                                    <Label className="col-form-label">
                                        Loại Đơn Vị:{' '}
                                    </Label>
                                    <Field name="group_type" className="width-200"
                                           textField="name" valueField="id" titleOption="-- Loại Đơn Vị --"
                                           data={listGroupType}
                                           component={FieldDropdownList} />
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        Thuộc TP/Huyện:{' '}
                                    </Label>
                                    <Field
                                        multi={false}
                                        name="district_id"
                                        options={listDistrict}
                                        component={FieldAutoComplete}
                                    />
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        Địa Chỉ:{' '}<span className="text-red">(*)</span>
                                    </Label>
                                    <Field name="address" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md="4">
                                    <Label className="col-form-label">
                                        Người Đại Diện:{' '}
                                    </Label>
                                    <Field name="manager" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        Số Điện Thoại:{' '}
                                    </Label>
                                    <Field name="phone" type="number" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        Email:{' '}
                                    </Label>
                                    <Field name="email" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md="10">
                                    <Label className="col-form-label">
                                        Secret Key:{' '}
                                    </Label>
                                    <Field name="secretKey" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                                <Col md="2">
                                    <Label className="col-form-label">
                                        Department Code:{' '}
                                    </Label>
                                    <Field name="departmentCode" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md="4">
                                    <Label className="col-form-label">
                                        User (request TNMT data):{' '}
                                    </Label>
                                    <Field name="userRequestTNMTData" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                                <Col md="4">
                                    <Label className="col-form-label">
                                        Password (request TNMT data):{' '}
                                    </Label>
                                    <Field name="passwordRequestTNMTData" type="text" component={FieldInputPure}
                                        className="form-control form-control-sm"
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <NavLink to={`/he-thongs/user-groups/list`} className="btn-secondary p-2 text-dark">
                                Trở về Danh mục
                            </NavLink>

                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                {
                                    userGroupDetail && userGroupDetail.id ?
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

UserGroupAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default UserGroupAdd;