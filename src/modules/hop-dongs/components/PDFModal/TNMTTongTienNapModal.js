import React from 'react';
import {injectIntl} from 'react-intl';
import {Col, Row, Label} from 'reactstrap';
import {Field} from "redux-form";
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import {FieldDropdownList} from "../../../../components/common/Form/index";
import {isObject} from 'lodash';

class TNMTTongTienNapModal extends React.Component {
    render(){
        const { tongTienNapTNMT, handleModalClose } = this.props;

        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        Tổng tiền nạp Tra cứu thông tin đất đai (TNMT)
                    </h4>
                    <button type="button" className="close" onClick={handleModalClose}>
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">
                            Đóng
                        </span>
                    </button>
                </div>
                <div className="modal-body">
                    <React.Fragment>
                        <Row className="mb-2">
                            <Col md="6">
                                <Label className="col-form-label">
                                    TÊN ĐƠN VỊ:
                                </Label>
                            </Col>
                            <Col md="6">
                                <Label className="col-form-label text-warning font-xl">
                                    <strong>{tongTienNapTNMT && tongTienNapTNMT.TENDONVI}</strong>
                                </Label>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="6">
                                <Label className="col-form-label">
                                    NGÀY NẠP:
                                </Label>
                            </Col>
                            <Col md="6">
                                <Label className="col-form-label font-xl">
                                    <strong>
                                        {tongTienNapTNMT &&
                                            <React.Fragment>
                                                <FormattedTime value={tongTienNapTNMT.NGAYNAP}></FormattedTime>{`  `}
                                                <FormattedDate value={tongTienNapTNMT.NGAYNAP}>
                                                    {
                                                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                                                    }
                                                </FormattedDate>
                                            </React.Fragment>
                                        }
                                    </strong>
                                </Label>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="6">
                                <Label className="col-form-label">
                                    TỔNG NẠP:
                                </Label>
                            </Col>
                            <Col md="6">
                                <Label className="col-form-label font-xl">
                                    <strong>{tongTienNapTNMT && tongTienNapTNMT.TONGNAP}</strong>
                                </Label>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="6">
                                <Label className="col-form-label">
                                    TIỀN CÒN LẠI:
                                </Label>
                            </Col>
                            <Col md="6">
                                <Label className="col-form-label text-warning font-xl">
                                    <strong>{tongTienNapTNMT && tongTienNapTNMT.TIENCONLAI}</strong>
                                </Label>
                            </Col>
                        </Row>
                    </React.Fragment>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                        Đóng
                    </button>
                </div>
            </div>
        );
    }
}

export default injectIntl(TNMTTongTienNapModal);