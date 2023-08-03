import React, {Component} from 'react';
import {Field} from 'redux-form';
import {Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';

import {FieldPrepend, FieldAutoComplete} from '../../../../components/common/Form';
import FieldDatePicker from '../../../../components/common/Form/FieldDatePicker';

class UserLogListFilter extends Component {
    render() {
        const {userGroups = [], handleSubmit, submitting, pristine, invalid} = this.props;
        let listUserGroup = userGroups.map(item => {return {label: item.group_name, value: item.id }});

        return (
            <Form onSubmit={handleSubmit} className="form-inline">
                <FormGroup>
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

                        <InputGroupAddon addonType="prepend">
                            <Field name="search" type="text" label="Tìm kiếm" iconClassName="icon-magnifier"
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
                </FormGroup>
            </Form>
        );
    }
}

export default UserLogListFilter;