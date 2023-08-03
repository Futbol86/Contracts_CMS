import React, {Component} from 'react';
import {Field} from 'redux-form';
import {CardHeader, CardFooter, Card, CardBody, Button, Form, Alert, Label} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';

import {FieldStandard, FieldDropdownList} from '../../../components/common/Form';
import {SECURITY_QUESTIONS} from '../constants';

class ProfileFormComponent extends Component {
    render() {
        const {handleSubmit, submitSucceeded, pristine, submitting, invalid, error, reset, initialValues, intl} = this.props;
        const {id} = initialValues;
        
        const intlStrings = defineMessages({
            Your_Email: {
                id: 'app.users.Your_Email',
                defaultMessage: 'Your Email'
            },
            Full_Name: {
                id: 'app.users.Full_Name',
                defaultMessage: 'Full_Name'
            },
            // Last_Name: {
            //     id: 'app.users.Last_Name',
            //     defaultMessage: 'Last Name'
            // },
            Your_Avatar: {
                id: 'app.users.Your_Avatar',
                defaultMessage: 'Your Avatar'
            },
            Your_Phone: {
                id: 'app.users.Your_Phone',
                defaultMessage: 'Your Phone'
            },
            Security_Answer: {
                id: 'app.users.Security_Answer',
                defaultMessage: 'Câu trả lời của bạn'
            },
        });

        const transStrings = {
            Your_Email: intl.formatMessage(intlStrings.Your_Email),
            Full_Name: intl.formatMessage(intlStrings.Full_Name),
            // Last_Name:  intl.formatMessage(intlStrings.Last_Name),
            Your_Avatar: intl.formatMessage(intlStrings.Your_Avatar),
            Your_Phone: intl.formatMessage(intlStrings.Your_Phone),
            Security_Answer: intl.formatMessage(intlStrings.Security_Answer),
        };

        const listSecurityQuestion = SECURITY_QUESTIONS.map(item => { 
            return {
                name: item.name,
                id: item.id 
            }
        });

        return (
            <Form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <i className="icon-info"></i>
                        <strong>
                            <FormattedMessage id="app.users.Change_Profile_Information" defaultMessage="Change Profile Information" />
                        </strong>
                    </CardHeader>
                    <CardBody>
                        <input type="hidden" name="id" value={id} />
                        {error && <Alert color="danger"><FormattedMessage id="app.Error" defaultMessage="Error" />: {error}</Alert>}
                        {submitSucceeded && <Alert color="success"><FormattedMessage id="app.users.Profile_Information_was_changed_successfully" defaultMessage="Profile Information was changed successfully!" /></Alert>}

                        <Field name="fullname" type="text" label={transStrings.Full_Name} iconClassName="icon-user" className="mb-3"
                                   component={FieldStandard} />

                        <Field name="email" type="text" label={transStrings.Your_Email} iconClassName="icon-user" className="mb-3"
                            component={FieldStandard} />


                        <Field name="phone" type="text" label={transStrings.Your_Phone} iconClassName="icon-user" className="mb-3"
                               component={FieldStandard} />
                        <Label className="col-form-label">Chọn câu hỏi bí mật{' '}</Label>
                        <Field name="security_question" className="mb-4"
                               textField="name" valueField="id" titleOption="-- Chọn câu hỏi bí mật --"
                               data={listSecurityQuestion}
                               parse={(value) => value && parseFloat(value, 10)}
                               component={FieldDropdownList} />
                        <Field name="security_answer" type="text" label={transStrings.Security_Answer} iconClassName="icon-user" className="mb-3"
                               component={FieldStandard} />
                    </CardBody>
                    <CardFooter>
                        <LaddaButton
                            loading={submitting}
                            disabled={pristine || submitting || invalid}
                            data-size={L}
                            data-style={EXPAND_LEFT}
                            data-color="green"
                            data-spinner-lines={12}
                            className="btn btn-dark px-4"
                            type="submit"
                        >
                            <FormattedMessage id="app.Save_Changes" defaultMessage="Save Changes" />
                        </LaddaButton>
                        <Button color="secondary" disabled={pristine || submitting} onClick={reset}>
                            <FormattedMessage id="app.Cancel" defaultMessage="Cancel" />
                        </Button>
                    </CardFooter>
                </Card>
            </Form>
        )
    }
}

export default injectIntl(ProfileFormComponent);