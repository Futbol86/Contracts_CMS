import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button,Label } from 'reactstrap';
import {Field} from "redux-form";
import {isEmpty, isArray} from "lodash";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-modal";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation, FieldInputPure} from "../../../components/common/Form/index";
import FieldDatePicker from "../../../components/common/Form/FieldDatePicker";

import {API_SUB_URL_HOP_DONG_FILES} from "../constants";
import SelectContractTypeModal from '../containers/PDFModal/SelectContractTypeModal';
import ContractPDFModal from '../containers/PDFModal/ContractPDFModal';
import SelectTestimonyTypeModal from '../containers/PDFModal/SelectTestimonyTypeModal';

class NewHopDongAdd extends Component {
    render(){
        const { action, currentModalId, contractDetail, contract_types = [], sub_contract_types = [], contract_type_id, 
                archive_books = [], archive_book_types = [], archive_book_type_id, contract_files, staticFileUrl,
                handleFileDrops, handleDeleteFile, handleSubmit, handleModalChange, error, submitting, pristine, invalid, reset, meta } = this.props;
               
        let _contract_types = contract_types.sort((a, b) => a.id - b.id);
        let _sub_contract_types = sub_contract_types.sort((a, b) => a.id - b.id);

        var listContractType = _contract_types.map(item => {
            return {
                label: item.name,
                value: item.id
            }});

        const listSubContractType = _sub_contract_types.filter(item => item.contract_type_id === parseInt(contract_type_id)).map(item => {
                return {
                    label: item.name,
                    value: item.id
                }
            });
        
        let _archive_books = archive_books.sort((a, b) => a.id - b.id);
        let _archive_book_types = archive_book_types.sort((a, b) => a.id - b.id);

        const listArchiveBookType = _archive_book_types.map(item => {
            return {
                label: item.name,
                value: item.id
            }
        });
    
        const listArchiveBook = _archive_books.filter(item => item.archive_type_id === archive_book_type_id).map(item => {
            return {
                label: item.name,
                value: item.id
            }
        });

        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                { contractDetail && contractDetail.id ? "Sửa Hợp đồng" : "Thêm Hợp đồng" }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col md="1">
                                    <Label><strong>Thông tin:</strong></Label>
                                </Col>
                                <Col md="11">
                                    <Row className="mb-4">
                                        <Col md="2">
                                            <Label className="col-form-label">
                                                <strong>Nhóm hợp đồng:{' '}<span className="text-red">(*)</span></strong>
                                            </Label>
                                        </Col>
                                        <Col md="4">
                                            <Field
                                                multi={false}
                                                name="contract_type_id"
                                                options={listContractType}
                                                component={FieldAutoComplete}
                                                validate={FieldLevelValidation.validateRequired}
                                            />
                                        </Col>
                                        <Col md="2">
                                            <Label className="col-form-label">
                                                <strong>Tên hợp đồng:{' '}<span className="text-red">(*)</span></strong>
                                            </Label>
                                        </Col>
                                        <Col md="4">
                                            <Field
                                                multi={false}
                                                name="sub_contract_type_id"
                                                options={listSubContractType}
                                                component={FieldAutoComplete}
                                                validate={FieldLevelValidation.validateRequired}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md="2">
                                            <Label className="col-form-label">
                                                Số Hợp Đồng:{' '}<span className="text-red">(*):</span>
                                            </Label>
                                        </Col>
                                        <Col md="4">
                                            <Field name="contract_no" type="text" component={FieldInputPure}
                                                className="form-control form-control-sm"
                                                validate={FieldLevelValidation.validateRequired}
                                            />
                                        </Col>
                                        <Col md="2">
                                            <Label className="col-form-label">
                                                Ngày Công Chứng{' '}<span className="text-red">(*):</span>
                                            </Label>
                                        </Col>
                                        <Col md="4">
                                            <Field  name="contract_date" type="date" component={FieldDatePicker}
                                                    className="form-control form-control-sm"
                                                    placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                                    validate={FieldLevelValidation.validateRequired}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col md="2">
                                            <Label className="col-form-label">
                                                Loại Sổ Lưu Trữ
                                            </Label>
                                        </Col>
                                        <Col md="4">
                                            <Field
                                                multi={false}
                                                name="archive_book_type_id"
                                                options={listArchiveBookType}
                                                component={FieldAutoComplete}
                                            />
                                        </Col>
                                        <Col md="2">
                                            <Label className="col-form-label">
                                                Sổ Lưu Trữ
                                            </Label>
                                        </Col>
                                        <Col md="4">
                                            <Field
                                                multi={false}
                                                name="archive_book_id"
                                                options={listArchiveBook}
                                                component={FieldAutoComplete}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md="2">
                                            <Label className="col-form-label">
                                                Công chứng viên
                                            </Label>
                                        </Col>
                                        <Col md="4">
                                            <Field name="notary_name" type="text" component={FieldInputPure}
                                                   className="form-control form-control-sm" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md="1">
                                    <Label><strong>Tài Sản <span className="text-red">(*):</span></strong></Label>
                                </Col>
                                <Col md="11">
                                    <Field name="asset" type="textarea" component={FieldInputPure}
                                           className="form-control" rows={6}
                                           validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md="1">
                                    <Label><strong>Bên A <span className="text-red">(*):</span></strong></Label>
                                </Col>
                                <Col md="11">
                                    <Field name="from_owner" type="textarea" component={FieldInputPure}
                                           className="form-control" rows={6} 
                                           validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col md="1">
                                    <Label><strong>Bên B <span className="text-red">(*):</span></strong></Label>
                                </Col>
                                <Col md="11">
                                    <Field name="to_owner" type="textarea" component={FieldInputPure}
                                           className="form-control" rows={6}
                                           validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md="1">
                                    <Label><strong>Nội dung:</strong></Label>
                                </Col>
                                <Col md="11">
                                    <Field name="note" type="textarea" component={FieldInputPure}
                                           className="form-control" rows={6}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md="1">
                                    <Label className="col-form-label"><strong>File Hợp Đồng{' '}:</strong></Label>
                                </Col>
                                <Col md="5">
                                    <Field
                                        name="upload_file"
                                        component={FieldDropZone}
                                        handleFileDrops={handleFileDrops}
                                        label="Chọn File"
                                        className="btn btn-outline-primary btn-sm btn-block"
                                        listDroppedFiles={false}
                                    />
                                    {
                                        contract_files && !isEmpty(contract_files) && isArray(contract_files) &&
                                        <ul style={{listStyleType: "none", paddingLeft: "0px"}}>
                                            {contract_files.map((rsFile, idx) => (
                                                <li key={idx}>
                                                    <a href={`${staticFileUrl}${API_SUB_URL_HOP_DONG_FILES}/${rsFile}`} target="_blank">{rsFile && rsFile.substring(10)}</a>
                                                    <button type="button" className="btn btn-link pl-3 pt-0" title="Delete This File" onClick={() => handleDeleteFile(rsFile)}>
                                                        <i className="icon-minus" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <NavLink to={`/hop-dongs/new-contract/list`} className="btn-secondary p-2 text-dark">
                                Trở về Danh sách Hợp đồng
                            </NavLink>

                            {/* {
                                contractDetail && 
                                <React.Fragment>
                                    <Button color="secondary" onClick={() => handleModalChange(1-currentModalId)}>
                                        Xuất Hợp Đồng
                                    </Button>
                                    <Button color="secondary" onClick={() => handleModalChange(3-currentModalId)}>
                                        Xuất Lời Chứng
                                    </Button>
                                </React.Fragment>
                            } */}
                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                        data-spinner-lines={12} className="btn btn-dark" type="submit"
                                        loading={submitting} disabled={submitting || invalid || pristine}>
                                                        
                                {
                                    contractDetail && contractDetail.id ?
                                    "Cập nhật" : "Thêm mới"
                                }
                            </LaddaButton>
                        </CardFooter>
                    </Card>
                    
                    <Modal className="Modal__Bootstrap modal-dialog modal-md"
                            isOpen={currentModalId === 1}
                            onRequestClose={() => handleModalChange(0)}
                            contentLabel="Chọn Mẫu Hợp Đồng"
                            style={{content: {outline: 0}}}
                        >
                        <SelectContractTypeModal
                            handleModalClose={() => handleModalChange(0)}
                        />
                    </Modal>

                    <Modal className="Modal__Bootstrap modal-dialog modal-md"
                            isOpen={currentModalId === 3}
                            onRequestClose={() => handleModalChange(0)}
                            contentLabel="Chọn Mẫu Lời Chứng"
                            style={{content: {outline: 0}}}
                        >
                        <SelectTestimonyTypeModal
                            handleModalClose={() => handleModalChange(0)}
                        />
                    </Modal>
                </Form>
                <ToastContainer />
            </div>
        );
    }
}

NewHopDongAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default NewHopDongAdd;