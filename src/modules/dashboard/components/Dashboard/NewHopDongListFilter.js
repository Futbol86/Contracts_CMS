import React, {Component} from 'react';
import {Field} from 'redux-form';
import {Form, FormGroup, Row, Col, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';

import {SEARCH_FILTER_OPTIONS, SEARCH_TYPES} from '../../constants';
import {FieldPrepend, FieldAutoComplete, FieldDropdownList} from '../../../../components/common/Form';
import FieldDatePicker from '../../../../components/common/Form/FieldDatePicker';

class NewHopDongListFilter extends Component {
    render() {
        const {userGroups = [], search_type, handleSubmit, submitting, pristine, invalid} = this.props;

        const listSearchType = SEARCH_TYPES.map(item => { 
            return {
                name: item.name,
                code: item.code 
            }
        });

        let _userGroups = userGroups.sort((a, b) => a.id - b.id);
        const listUserGroup = _userGroups.map(item => {
            return {
                label: item.group_name,
                value: item.id
            }
        });

        const listSearchFilterOptions = SEARCH_FILTER_OPTIONS.map(item => {
            return {
                label: item.name,
                value: item.code,
            }
        });

        return (
            <Form onSubmit={handleSubmit} >
                <FormGroup>
                    <Row className="mb-4">
                        <Col md="4">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        Loại Tìm kiếm
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Field name="search_type" className="width-200"
                                            textField="name" valueField="code" titleOption="-- Chọn Loại Tìm Kiếm --"
                                            data={listSearchType}
                                            component={FieldDropdownList} />
                            </InputGroup>
                        </Col>
                        <Col md="8">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <Field name="search" type="text" label="Nhập từ khoá tìm kiếm" iconClassName="icon-magnifier" 
                                        className='minWidth-600'
                                        // style={{width: 5000}}
                                        component={FieldPrepend} />
                                </InputGroupAddon>

                                <InputGroupAddon addonType="append">
                                    <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                                data-spinner-lines={12} className="btn btn-dark" type="submit"
                                                loading={submitting} disabled={submitting || invalid}>
                                        <FormattedMessage id="app.Search" defaultMessage="Search" />
                                    </LaddaButton>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row>
                    {   search_type === "enhance_search" &&
                        <Row className="form-inline mt-2 mb-2">
                            <Col md="12">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            Chọn Đơn vị
                                        </InputGroupText>
                                    </InputGroupAddon>

                                    <Field  multi={false}
                                        name="group_id"
                                        options={listUserGroup}
                                        component={FieldAutoComplete}
                                        className="width-300"
                                    />

                                    <InputGroupAddon addonType="prepend" className="ml-4">
                                        <InputGroupText>
                                            Tìm trong
                                        </InputGroupText>
                                    </InputGroupAddon>

                                    <Field  multi={false}
                                        name="search_field"
                                        options={listSearchFilterOptions}
                                        component={FieldAutoComplete}
                                        className="width-200"
                                    />

                                    <InputGroupAddon addonType="prepend" className="ml-2 mr-2">
                                        <InputGroupText>
                                            Từ Ngày
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Field name="fromDate" type="date" component={FieldDatePicker}
                                        className="form-control width-150"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                        // style={{width: '50px'}}
                                    />

                                    <InputGroupAddon addonType="prepend" className="ml-2">
                                        <InputGroupText>
                                            Đến Ngày
                                        </InputGroupText>
                                    </InputGroupAddon>                  
                                    <Field  name="toDate" type="date" component={FieldDatePicker}
                                            className="form-control width-150"
                                            placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                            // style={{width: '50px'}} 
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    }
                </FormGroup>
            </Form>
        );
    }
}

export default NewHopDongListFilter;