import React, {Component} from 'react';
import {Field} from 'redux-form';
import {Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';
import FieldDatePicker from '../../../../components/common/Form/FieldDatePicker';
import {FieldAutoComplete, FieldLevelValidation} from '../../../../components/common/Form/index'

class RequestTNMTLandDataReportListFilter extends Component {
    render() {
        const {userData, user_groups = [], group_id, handleSubmit} = this.props;
        let _user_groups = user_groups.sort((a, b) => a.id - b.id);
        let listUserGroup = []
        if(userData.username === "admin") {
            listUserGroup = _user_groups.map(item => {
                return {
                    label: item.group_name,
                    value: item.id
                }
            });
        } else {
            listUserGroup = _user_groups.filter(item => item.id === group_id).map(item => {
                return {
                    label: item.group_name,
                    value: item.id
                }
            });
        }



        return (
            <Form onSubmit={handleSubmit} className="form-inline">
                <FormGroup>
                    <InputGroup>
                        {/* <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <FormattedMessage id="app.reporting.Option" defaultMessage="Option" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field component="select" name="option" id="option"
                            className="form-control" style={{width: '200px'}}
                        >
                            {REPORT_FILTER_OPTIONS && REPORT_FILTER_OPTIONS.map((option, idx) => {
                                return <option key={idx} value={option.value}>{option.name}</option>
                            })}
                        </Field> */}
                        <InputGroupAddon addonType="prepend" className="ml-2">
                            <InputGroupText>
                                Phòng Công Chứng
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            multi={false}
                            name="group_id"
                            options={listUserGroup}
                            component={FieldAutoComplete}
                            validate={FieldLevelValidation.validateRequired}
                            className="width-300"
                        />
                        <InputGroupAddon addonType="prepend" className="ml-2">
                            <InputGroupText>
                                Từ Ngày
                                {/* <FormattedMessage id="app.reporting.From_Date" defaultMessage="From Date" /> */}
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
                                {/* <FormattedMessage id="app.reporting.To_Date" defaultMessage="To Date" /> */}
                            </InputGroupText>
                        </InputGroupAddon>

                        <Field  name="toDate" type="date" component={FieldDatePicker}
                                className="form-control"
                                placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                style={{width: '100px'}} 
                        />
                        
                        <InputGroupAddon addonType="append" className="ml-2">
                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                            data-spinner-lines={12} className="btn btn-dark" type="submit">
                                Tìm kiếm
                            </LaddaButton>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Form>
        );
    }
}

export default RequestTNMTLandDataReportListFilter;