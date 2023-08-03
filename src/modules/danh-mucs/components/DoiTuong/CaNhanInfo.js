import React from 'react';
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, Label} from 'reactstrap';
import {FormattedDate} from 'react-intl';

const CaNhanInfo = ({caNhanInfo = {}}) => {
    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Họ và Tên{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{caNhanInfo.fullname}</strong>
                    </Label>
                </Col>
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Giới Tính{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>
                            {caNhanInfo.person_gender === 0 ? 'NỮ' : (caNhanInfo.person_gender === 1 ? 'NAM' : 'KHÁC')}
                        </strong>
                    </Label>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Năm Sinh{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{caNhanInfo.year_of_birth}</strong>
                    </Label>
                </Col>
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Số Điện Thoại{' '}
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{caNhanInfo.phone}</strong>
                    </Label>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Số CMND/CCCD/Hộ Chiếu{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{caNhanInfo.license_no}</strong>
                    </Label>
                </Col>
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Ngày Cấp{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{caNhanInfo.issued_date}</strong>
                    </Label>
                </Col>
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Nơi Cấp{' '}
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{caNhanInfo.issued_by}</strong>
                    </Label>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Địa Chỉ{' '}
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{caNhanInfo.address}</strong>
                    </Label>
                </Col>
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Quốc Tịch{' '}
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{caNhanInfo.description}</strong>
                    </Label>
                </Col>
            </Row>
        </React.Fragment>
    )
};

export default CaNhanInfo;