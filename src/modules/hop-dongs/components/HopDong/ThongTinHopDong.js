import React from 'react';
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, Label} from 'reactstrap';
import {Field} from "redux-form";
import { FormattedNumber, FormattedDate } from 'react-intl';
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../components/common/Form";
import FieldDatePicker from "../../../../components/common/Form/FieldDatePicker";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form/index";
import {PAYMENT_METHOD} from '../../constants';
import {isEmpty} from "lodash";
import {API_SUB_URL_HOP_DONG_FILES} from "../../constants";
let formatter = new Intl.NumberFormat('en-US');

const ThongTinHopDong = ({
        contractDetail, archive_books = [], archive_book_types = [], archive_book_type_id, staticFileUrl, 
        contract_files, handleFileDrops, handleDeleteFile, isReadOnly
    }) => {
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

    const listPaymenMethod = PAYMENT_METHOD.map(item => { 
        return {
            name: item.name,
            id: item.id 
        }
    });

    const formatCurrency = (value) => {
        if(value) {
            value = value.replace(/,/g, '');
            if(isNaN(value)) return "0";
            return formatter.format(value);
        }
        return "0"
    }

    return (
        <Card>
            <CardHeader>
                <b>THÔNG TIN HỢP ĐỒNG</b>
            </CardHeader>
            <CardBody>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số Hợp Đồng{' '}<span className="text-red">:</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        {
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{contractDetail && contractDetail.contract_no}</strong>
                                </Label> 
                                :
                                <Field name="contract_no" type="text" component={FieldInputPure}
                                    className="form-control form-control-sm"
                                />
                        }

                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Ngày Hợp Đồng{' '}<span className="text-red">(*):</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        {
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>
                                        <FormattedDate value={contractDetail && contractDetail.contract_date}>
                                            {
                                                parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                                            }
                                        </FormattedDate>
                                    </strong>
                                </Label> 
                                :
                                <Field  name="contract_date" type="date" component={FieldDatePicker}
                                        className="form-control form-control-sm"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                        validate={FieldLevelValidation.validateRequired} 
                                        readOnly={isReadOnly}
                                />
                        }
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Loại Sổ Lưu Trữ{' '}<span className="text-red">(*):</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        {
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{contractDetail && contractDetail.archiveBookDetail 
                                    && contractDetail.archiveBookDetail.archiveBookTypeDetail && contractDetail.archiveBookDetail.archiveBookTypeDetail.name}</strong>
                                </Label> 
                                :
                                <Field
                                    multi={false}
                                    name="archive_book_type_id"
                                    options={listArchiveBookType}
                                    component={FieldAutoComplete}
                                    validate={FieldLevelValidation.validateRequired}
                                />
                        }
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Sổ Lưu Trữ{' '}<span className="text-red">(*):</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        {
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{contractDetail && contractDetail.archiveBookDetail && contractDetail.archiveBookDetail.name}</strong>
                                </Label> 
                                :
                                <Field
                                    multi={false}
                                    name="archive_book_id"
                                    options={listArchiveBook}
                                    component={FieldAutoComplete}
                                    validate={FieldLevelValidation.validateRequired}
                                />
                        }
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số Tiền{' '}:
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        {
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong><FormattedNumber value={contractDetail && contractDetail.contract_amount} /></strong>
                                </Label> 
                                :
                                <Field name="contract_amount" type="text" component={FieldInputPure}
                                       className="form-control form-control-sm"
                                       format={(value) => formatCurrency(value)}
                                       normalize={(value) => formatCurrency(value)}
                                       readOnly={isReadOnly}
                                />
                        }
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số Tiền (Ghi Bằng Chữ){' '}:
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        {
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{contractDetail && contractDetail.contract_amount_in_words}</strong>
                                </Label> 
                                :
                                <Field name="contract_amount_in_words" type="text" component={FieldInputPure}
                                    className="form-control form-control-sm" readOnly={isReadOnly}
                                />
                        }
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Phí Hợp Đồng{' '}:
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        {
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong><FormattedNumber value={contractDetail && contractDetail.contract_fee} /></strong>
                                </Label> 
                                :
                                <Field name="contract_fee" type="text" component={FieldInputPure}
                                    className="form-control form-control-sm"
                                    format={(value) => formatCurrency(value)}
                                    normalize={(value) => formatCurrency(value)}
                                    readOnly={isReadOnly}
                                />
                        }
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Phương Thức Thanh Toán{' '}:
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        {   
                            isReadOnly ?
                                <Label className="col-form-label">
                                    <strong>{
                                        contractDetail &&
                                            PAYMENT_METHOD.find(item => item.id === parseInt(contractDetail.payment_method)) ?
                                            PAYMENT_METHOD.find(item => item.id === parseInt(contractDetail.payment_method)).name : ""
                                    }</strong>
                                </Label> 
                                :
                                <Field name="payment_method" className="mb-4"
                                       textField="name" valueField="id" titleOption="-- Chọn Phương Thức Thanh Toán --"
                                       data={listPaymenMethod}
                                       component={FieldDropdownList} />
                        }
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            File Hợp Đồng{' '}:
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        {
                            !isReadOnly &&
                            <Field
                                name="upload_file"
                                component={FieldDropZone}
                                handleFileDrops={handleFileDrops}
                                label="Chọn File"
                                className="btn btn-outline-primary btn-sm btn-block"
                                listDroppedFiles={false}
                            />
                        }
                        {contract_files && !isEmpty(contract_files) && (
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
                        )}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
};

export default ThongTinHopDong;