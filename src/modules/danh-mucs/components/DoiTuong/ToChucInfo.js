import React from 'react';
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, Label} from 'reactstrap';
import {FormattedDate} from 'react-intl';

const ToChucInfo = ({toChucInfo = {}}) => {
    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Tên Tổ Chức{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{toChucInfo.fullname}</strong>
                    </Label>
                </Col>
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Số Điện Thoại{' '}
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{toChucInfo.phone}</strong>
                    </Label>
                </Col>
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Người Đại Diện{' '}
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{toChucInfo.representer}</strong>
                    </Label>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Số GCN Đăng Ký Doanh Nghiệp{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{toChucInfo.license_no}</strong>
                    </Label>
                </Col>
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Ngày Cấp{' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{toChucInfo.issued_date}</strong>
                    </Label>
                </Col>
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Nơi Cấp{' '}
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{toChucInfo.issued_by}</strong>
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
                        <strong>{toChucInfo.e}</strong>
                    </Label>
                </Col>
                <Col xs="6" md="2">
                    <Label className="col-form-label">
                        Email{' '}
                    </Label>
                </Col>
                <Col xs="6" md="4">
                    <Label className="col-form-label">
                        <strong>{toChucInfo.email}</strong>
                    </Label>
                </Col>
            </Row>
        </React.Fragment>
    )
};

export default ToChucInfo;