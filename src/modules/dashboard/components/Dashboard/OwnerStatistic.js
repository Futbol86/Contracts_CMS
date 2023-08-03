import React, { Component } from 'react';
import {Card, CardHeader, CardBody, CardTitle, CardText, Row, Col, Label} from 'reactstrap';

const OwnerStatisticComponent = ({reports}) => {
    const {daily, weekly, monthly,} = reports || {};
    
    return (
        <Row className="mb-3">
            <Col md="4">
                <Card body inverse color="danger">
                    <CardTitle tag="h5">
                        TRONG NGÀY
                    </CardTitle>
                    <CardText>
                        <Label className="font-2xl">{daily && daily.totalOwnerDaily}</Label>
                    </CardText>
                </Card>
            </Col>
            <Col md="4">
                <Card body inverse color="success">
                    <CardTitle tag="h5">
                        TUẦN NÀY
                    </CardTitle>
                    <CardText>
                        <Label className="font-2xl">{weekly && weekly.totalOwnerWeekly}</Label>
                    </CardText>
                </Card>
            </Col>
            <Col md="4">
                <Card body inverse color="primary">
                    <CardTitle tag="h5">
                        THÁNG NÀY
                    </CardTitle>
                    <CardText>
                        <Label className="font-2xl">{monthly && monthly.totalOwnerMonthly}</Label>
                    </CardText>
                </Card>
            </Col>
        </Row>
    )
}

export default OwnerStatisticComponent;