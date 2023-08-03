import React from 'react';
import {injectIntl} from 'react-intl';
import {Col, Row, Label} from 'reactstrap';
import {Field} from "redux-form";
import {isEmpty} from "lodash";
import {FieldDropdownList} from "../../../../components/common/Form/index";
import {CONTRACT_TYPE_SHEET} from '../../constants';

class SelectContractTypeModal extends React.Component {
    render(){
        const { currentModalId, contract_type_sheet, handleModalChange, handleModalClose } = this.props;
        const listContractTypeSheet = CONTRACT_TYPE_SHEET.map(item => { 
            return {
                name: item.name,
                id: item.id 
            }
        });

        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        Chọn Mẫu Hợp Đồng
                    </h4>
                    <button type="button" className="close" onClick={handleModalClose}>
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">
                            Đóng
                        </span>
                    </button>
                </div>
                <div className="modal-body">
                    <Row>
                        <Col xs="6" md="4">
                            <Label className="col-form-label">
                                Chọn Mẫu Hợp Đồng{' '}
                            </Label>
                        </Col>
                        <Col xs="6" md="8">
                            <Field name="contract_type_sheet" className="mb-4"
                                textField="name" valueField="id" titleOption="-- Chọn Mẫu Hợp Đồng --"
                                data={listContractTypeSheet}
                                component={FieldDropdownList} />
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                        Đóng
                    </button>

                    <button disabled={isEmpty(contract_type_sheet)} type="button" className="btn btn-primary" onClick={() => handleModalChange(0)}>
                        Đồng Ý
                    </button>
                </div>
            </div>
        );
    }
}

export default injectIntl(SelectContractTypeModal);