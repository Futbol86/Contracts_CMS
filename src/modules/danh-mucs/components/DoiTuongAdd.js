import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {Field} from "redux-form";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames';

import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, UncontrolledAlert, Label } from 'reactstrap';
import Modal from 'react-modal';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../components/common/Form";
import FieldDatePicker from "../../../components/common/Form/FieldDatePicker";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../components/common/Form/index";

import {OWNER_TYPES} from '../constants';
import DoiTuongAddCaNhan from './DoiTuong/DoiTuongAddCaNhan';
import DoiTuongAddToChuc from './DoiTuong/DoiTuongAddToChuc';

class DoiTuongAdd extends Component {
    render(){
        const {
            ownerDetail, owner_type_id, subOwnerTypes = [], hiddenReturnButton = false, currentModalId, handleModalChange, handleModalClose,
            handleSubmit, error, submitting, pristine, invalid, reset 
        } = this.props;
        
        let _subOwnerTypes = subOwnerTypes.sort((a, b) => a.id - b.id);
        let listOwnerType = OWNER_TYPES.map(item => {return {label: item.name, value: item.id }});
        let listSubOwnerType = _subOwnerTypes.filter(p => p.owner_type_id === owner_type_id).map(item => {return {label: item.name, value: item.id }});

        return (
            <div className="animated fadeIn">
                <Form onSubmit={evt => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    handleSubmit();
                }}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {
                                    ownerDetail && ownerDetail.id ?
                                        "Sửa Chủ sở hữu" : "Thêm Chủ sở hữu"
                                }
                            </h2>
                            {/* <div className="card-actions d-flex justify-content-between">
                                <a href="#" onClick={() => handleModalChange(1-currentModalId)} >
                                    <i className="icon-plus" title="Print" /> Thêm Chủ Sở Hữu
                                </a>

                                <Modal className="Modal__Bootstrap modal-dialog modal-md"
                                    isOpen={currentModalId > 0}
                                    contentLabel="Thêm Chủ Sở Hữu"
                                    style={{content: {outline: 0}}}
                                >
                                </Modal>
                            </div> */}
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Loại Chủ Sở Hữu{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    <Field
                                        multi={false}
                                        name="owner_type_id"
                                        options={listOwnerType}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Chi Tiết Chủ Sở Hữu{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    <Field
                                        multi={false}
                                        name="sub_owner_type_id"
                                        options={listSubOwnerType}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                            </Row>
                            {
                                owner_type_id === 1 && <DoiTuongAddCaNhan {...this.props}/>
                            }
                            {
                                owner_type_id !== 1 && <DoiTuongAddToChuc {...this.props}/>
                            }
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <NavLink to={`/danh-mucs/owner/list`} 
                                    className={classNames("btn-secondary p-2 text-dark", {"disabled": hiddenReturnButton})}>
                                Trở về Danh mục
                            </NavLink>
                            
                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                {
                                    ownerDetail && ownerDetail.id ?
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

DoiTuongAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default DoiTuongAdd;