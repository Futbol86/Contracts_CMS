import React, {Component} from 'react';
import {Field} from 'redux-form';
import {Form, FormGroup, Row, Col, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';
import FieldDatePicker from '../../../../components/common/Form/FieldDatePicker';
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from '../../../../components/common/Form/index'

class ArchiveBookReportListFilter extends Component {
    render() {
        const {userGroups = [], archive_books = [], archive_book_types = [], archive_book_type_id, handleSubmit} = this.props;
        let _userGroups = userGroups.sort((a, b) => a.id - b.id);
        let _archive_books = archive_books.sort((a, b) => a.id - b.id);
        let _archive_book_types = archive_book_types.sort((a, b) => a.id - b.id);

        const listUserGroup = _userGroups.map(item => {
            return {
                label: item.group_name,
                value: item.id
            }
        });

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
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Row className="mb-2">
                        <Col md="12">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        Chọn Loại Sổ Lưu Trữ
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Field
                                    multi={false}
                                    name="archive_book_type_id"
                                    options={listArchiveBookType}
                                    component={FieldAutoComplete}
                                    validate={FieldLevelValidation.validateRequired}
                                    className="width-300"
                                />
                                <InputGroupAddon addonType="prepend" className="ml-2">
                                    <InputGroupText>
                                        Chọn Sổ Lưu Trữ
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Field
                                    multi={false}
                                    name="archive_book_id"
                                    options={listArchiveBook}
                                    component={FieldAutoComplete}
                                    validate={FieldLevelValidation.validateRequired}
                                    className="width-300"
                                />
                                
                                <InputGroupAddon addonType="append" className="ml-2">
                                    <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                                    data-spinner-lines={12} className="btn btn-dark" type="submit">
                                        Tìm kiếm
                                    </LaddaButton>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="form-inline mb-2">
                        <Col md="12">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        Chọn VPCC
                                    </InputGroupText>
                                </InputGroupAddon>

                                <Field  multi={false}
                                    name="group_id"
                                    options={listUserGroup}
                                    component={FieldAutoComplete}
                                    className="width-300"
                                />
                    
                                <InputGroupAddon addonType="prepend" className="mr-2">
                                    <InputGroupText>
                                        Từ Ngày
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Field name="fromDate" type="date" component={FieldDatePicker}
                                    className="form-control"
                                    placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                    style={{width: '100px'}}
                                />

                                <InputGroupAddon addonType="prepend" className="ml-2">
                                    <InputGroupText>
                                        Đến Ngày
                                    </InputGroupText>
                                </InputGroupAddon>                  
                                <Field  name="toDate" type="date" component={FieldDatePicker}
                                        className="form-control"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                        style={{width: '100px'}} 
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        );
    }
}

export default ArchiveBookReportListFilter;