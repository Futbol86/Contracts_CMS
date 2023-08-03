import React from 'react';
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, Label} from 'reactstrap';
import {Field} from "redux-form";
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../components/common/Form";
import FieldDatePicker from "../../../../components/common/Form/FieldDatePicker";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form/index";
import {isEmpty} from "lodash";
import {API_SUB_URL_GIAI_TOA_FILES} from "../../constants";

const ThongTinGiaiToa = ({title, archive_books = [], archive_book_types = [], archive_book_type_id, staticFileUrl, release_file, handleFileDrops, handleDeleteFile}) => {
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
        <Card>
            <CardHeader>
                <b>THÔNG TIN GIẢI TOẢ NGĂN CHẶN</b> 
            </CardHeader>
            <CardBody>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số quyết định giải toả{' '}<span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="release_number" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Ngày giải toả{' '}<span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field  name="release_date" type="date" component={FieldDatePicker}
                                className="form-control form-control-sm"
                                placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                validate={FieldLevelValidation.validateRequired}
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Người thực thi quyết định giải toả{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="release_user" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Văn bản/quyết định giải toả đính kèm{' '}<span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field
                            name="upload_file"
                            component={FieldDropZone}
                            handleFileDrops={handleFileDrops}
                            label="Chọn File"
                            className="btn btn-outline-primary btn-sm btn-block"
                            listDroppedFiles={false}
                            validate={FieldLevelValidation.validateRequired}
                        />
                        {release_file && !isEmpty(release_file) && (
                            <ul style={{listStyleType: "none", paddingLeft: "0px"}}>
                                <li>
                                    <a href={`${staticFileUrl}${API_SUB_URL_GIAI_TOA_FILES}/${release_file}`} target="_blank">{release_file && release_file.substring(10)}</a>
                                    <button type="button" className="btn btn-link pl-3 pt-0" title="Delete This File" onClick={() => handleDeleteFile(release_file)}>
                                        <i className="icon-minus" />
                                    </button>
                                </li>
                            </ul>
                        )}
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Loại Sổ Lưu Trữ{' '}<span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field
                            multi={false}
                            name="archive_book_type_id"
                            options={listArchiveBookType}
                            component={FieldAutoComplete}
                            validate={FieldLevelValidation.validateRequired}
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Sổ Lưu Trữ{' '}<span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field
                            multi={false}
                            name="archive_book_id"
                            options={listArchiveBook}
                            component={FieldAutoComplete}
                            validate={FieldLevelValidation.validateRequired}
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Ghi chú
                        </Label>
                    </Col>
                    <Col xs="6" md="10">
                        <Field name="release_content" type="textarea" component={FieldInputPure}
                               className="form-control" rows={5}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
};

export default ThongTinGiaiToa;