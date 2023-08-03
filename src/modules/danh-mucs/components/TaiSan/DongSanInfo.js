import React from 'react';
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, Label} from 'reactstrap';
import {FormattedDate} from 'react-intl';

const DongSanInfo = ({dongSanInfo = {}}) => {
    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Số Giấy Tờ{' '}<span className="text-red">(*):</span>
                    </Label>
                </Col>
                <Col md="2" className="pr-1 pl-1">
                    <Label className="col-form-label">
                        <strong>{dongSanInfo.license_number}</strong>
                    </Label>
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Ngày Cấp{' '}:
                    </Label>
                </Col>
                <Col md="2" className="pr-1 pl-1">
                    <Label className="col-form-label">
                        <strong>
                            <FormattedDate value={dongSanInfo.issued_at}>
                                {
                                    parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                                }
                            </FormattedDate>
                        </strong>
                    </Label>
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Nơi Cấp{' '}:
                    </Label>
                </Col>
                <Col md="2" className="pr-1 pl-1">
                    <Label className="col-form-label">
                        <strong>{dongSanInfo.issued_by}</strong>
                    </Label>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="2" className="pl-2">
                    <Label>
                        Biển Số{' '}<span className="text-red">(*):</span>
                    </Label>
                </Col>
                <Col md="2" className="pr-1 pl-1">
                    <Label className="col-form-label">
                        <strong>{dongSanInfo.plate_no}</strong>
                    </Label>
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Nhãn Hiệu{' '}:
                    </Label>
                </Col>
                <Col md="2" className="pr-1 pl-1">
                    <Label className="col-form-label">
                        <strong>{dongSanInfo.brand}</strong>
                    </Label>
                </Col>
                <Col md="2" className="pl-2">
                    <Label>
                        Loại Xe{' '}:
                    </Label>
                </Col>
                <Col md="2" className="pr-1 pl-1">
                    <Label className="col-form-label">
                        <strong>{dongSanInfo.kind_of}</strong>
                    </Label>
                </Col>
            </Row>
        </React.Fragment>
    )
};

export default DongSanInfo;