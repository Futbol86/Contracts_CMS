import React, {Component} from 'react';
import {Field} from 'redux-form';
import {Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';
import FieldDatePicker from '../../../../components/common/Form/FieldDatePicker';

class LandDataOfTNMTReportListFilter extends Component {
    render() {
        const {handleSubmit} = this.props;

        return (
            <Form onSubmit={handleSubmit} className="form-inline">
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend" className="ml-2">
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

export default LandDataOfTNMTReportListFilter;