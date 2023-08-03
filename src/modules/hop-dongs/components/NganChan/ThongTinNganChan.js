import React from 'react';
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, Label} from 'reactstrap';
import {Field} from "redux-form";
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../components/common/Form";
import FieldDatePicker from "../../../../components/common/Form/FieldDatePicker";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form/index";
import {isEmpty} from "lodash";
import {API_SUB_URL_NGAN_CHAN_FILES, ASSET_PREVENTION_TYPES} from "../../constants";

const ThongTinNganChan = ({
        title, archive_books = [], archive_book_types = [], archive_book_type_id, asset_prevention_type, staticFileUrl, 
        file_name, handleFileDrops, handleDeleteFile
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

    const listPreventionType = ASSET_PREVENTION_TYPES.map(item => {
        return {
            name: item.name,
            code: item.code,
        }
    });

    return (
        <Card>
            <CardHeader>
                <b>THÔNG TIN NGĂN CHẶN</b>
            </CardHeader>
            <CardBody>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số quyết định ngăn chặn{' '}<span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="judgments_decision_number" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Ngày ban hành{' '}<span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field  name="judgments_decision_date" type="date" component={FieldDatePicker}
                                className="form-control form-control-sm"
                                placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                validate={FieldLevelValidation.validateRequired}
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Cơ quan ban hành quyết định ngăn chặn{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="judgments_decision_org" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Cơ quan thực hiện quyết định{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="prevention_org" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Người thực hiện quyết định{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="prevention_user" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                        />
                    </Col>
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Cá nhân/tổ chức bị ngăn chặn{' '}
                        </Label>
                    </Col>
                    <Col xs="6" md="4">
                        <Field name="prevention_owner" type="text" component={FieldInputPure}
                               className="form-control form-control-sm"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Số quyết định/công văn{' '}<span className="text-red">(*)</span>
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
                        {file_name && !isEmpty(file_name) && (
                            <ul style={{listStyleType: "none", paddingLeft: "0px"}}>
                                {/* {files.map((rsFile, idx) => ( */}
                                    <li>
                                        <a href={`${staticFileUrl}${API_SUB_URL_NGAN_CHAN_FILES}/${file_name}`} target="_blank">{file_name && file_name.substring(10)}</a>
                                        <button type="button" className="btn btn-link pl-3 pt-0" title="Delete This File" onClick={() => handleDeleteFile(file_name)}>
                                            <i className="icon-minus" />
                                        </button>
                                    </li>
                                {/* ))} */}
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
                    <Col md="2">
                        <Label className="col-form-label">
                            Loại ngăn chặn:{' '}
                        </Label>
                    </Col>
                    <Col md="2">
                        <Field name="asset_prevention_type" className="width-200"
                                textField="name" valueField="code" titleOption="-- Chọn loại ngăn chặn --"
                                data={listPreventionType}
                                component={FieldDropdownList} />
                    </Col>
                    <Col md="8">
                        <Row>
                            {
                                (asset_prevention_type === "asset_prevention_land" || asset_prevention_type === "asset_movables") &&
                                <Col md="4">
                                    <div className='d-flex justify-content-start'>
                                        <span>Giấy CN:{` `}<span className="text-red">(*)</span></span>
                                        <Field name="license_number" type="text" component={FieldInputPure}
                                               className="form-control form-control-sm ml-2"
                                               validate={FieldLevelValidation.validateRequired}
                                        />
                                    </div>
                                </Col>
                            }
                            {
                                asset_prevention_type === "asset_prevention_land" &&
                                <React.Fragment>
                                    <Col md="4">
                                        <div className='d-flex justify-content-start'>
                                            <span>Thửa đất số:{` `}<span className="text-red">(*)</span></span>
                                            <Field name="land_number" type="text" component={FieldInputPure}
                                                   className="form-control form-control-sm ml-2"
                                                   validate={FieldLevelValidation.validateRequired}
                                            />
                                         </div>
                                    </Col>
                                    <Col md="4">
                                        <div className='d-flex justify-content-start'>
                                            <span>Tờ bản đồ số:{` `}<span className="text-red">(*)</span></span>
                                            <Field name="map_paper_number" type="text" component={FieldInputPure}
                                                   className="form-control form-control-sm ml-2"
                                                   validate={FieldLevelValidation.validateRequired}
                                            />
                                        </div>
                                    </Col>
                                </React.Fragment>
                            }
                        </Row>
                        <Row>
                            {
                                asset_prevention_type === "owner_personal" &&
                                <Col md="6">
                                    <div className='d-flex justify-content-start'>
                                        <span>Số CMND/CCCD/Hộ Chiếu:{` `}<span className="text-red">(*)</span></span>
                                        <Field name="license_no" type="text" component={FieldInputPure}
                                               className="form-control form-control-sm ml-2"
                                               validate={FieldLevelValidation.validateRequired}
                                        />
                                    </div>
                                </Col>
                            }
                            {
                                asset_prevention_type === "owner_company" &&
                                <Col md="6">
                                    <div className='d-flex justify-content-start'>
                                        <span>Số GCN Đăng Ký Doanh Nghiệp:{` `}<span className="text-red">(*)</span></span>
                                        <Field name="license_no" type="text" component={FieldInputPure}
                                               className="form-control form-control-sm ml-2"
                                               validate={FieldLevelValidation.validateRequired}
                                        />
                                    </div>
                                </Col>
                            }
                        </Row>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Chi tiết thông tin ({asset_prevention_type === "owner_personal" || asset_prevention_type === "owner_company" ? "Đối tượng" : "Tài sản"}){' '}
                            <span className="text-red">(*)</span>
                        </Label>
                    </Col>
                    <Col xs="6" md="10">
                        <Field name="asset_info" type="textarea" component={FieldInputPure}
                               className="form-control" rows={6} validate={FieldLevelValidation.validateRequired}
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="6" md="2">
                        <Label className="col-form-label">
                            Nội dung ngăn chặn
                        </Label>
                    </Col>
                    <Col xs="6" md="10">
                        <Field name="prevention_content" type="textarea" component={FieldInputPure}
                               className="form-control" rows={6}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
};

export default ThongTinNganChan;