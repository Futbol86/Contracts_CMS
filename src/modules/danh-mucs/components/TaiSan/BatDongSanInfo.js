import React from 'react';
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, Label} from 'reactstrap';
import {FormattedDate} from 'react-intl';

const BatDongSanInfo = ({batDongSanInfo = {}}) => {
    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Giấy CN Quyền Sử Dụng Đất{' '}<span className="text-red">(*):</span>
                    </Label>
                </Col>
                <Col md="2" className="pr-1 pl-1">
                    <Label className="col-form-label">
                        <strong>{batDongSanInfo.license_number}</strong>
                    </Label>
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Ngày Cấp{' '}<span className="text-red">(*):</span>
                    </Label>
                </Col>
                <Col md="2" className="pr-1 pl-1">
                    <Label className="col-form-label">
                        <strong>
                            <FormattedDate value={batDongSanInfo.issued_at}>
                                {
                                    parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                                }
                            </FormattedDate>
                        </strong>
                    </Label>
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Nơi Cấp{' '}<span className="text-red">(*):</span>
                    </Label>
                </Col>
                <Col md="2" className="pr-1 pl-1">
                    <Label className="col-form-label">
                        <strong>{batDongSanInfo.issued_by}</strong>
                    </Label>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Số vào sổ cấp GCN{' '}:
                    </Label>
                </Col>
                <Col md="2" className="pr-1 pl-1">
                    <Label className="col-form-label">
                        <strong>{batDongSanInfo.cert_number}</strong>
                    </Label>
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Địa Chỉ{' '}<span className="text-red">(*):</span>
                    </Label>
                </Col>
                <Col md="6" className="pr-1 pl-1">
                    <Label className="col-form-label">
                        <strong>{batDongSanInfo.address}</strong>
                    </Label>
                </Col>
            </Row>
        </React.Fragment>
    )
};

export default BatDongSanInfo;