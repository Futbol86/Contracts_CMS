import React, { Component } from 'react';
import {Card, CardHeader, CardBody, CardTitle, CardText, Row, Col, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import DailyReportComponent from './StatisticReports/DailyReport';

const StatisticReportsComponent = ({ newReports }) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardBody>
                    <Row>
                        <Col md="12">
                            <DailyReportComponent newReports={newReports}/>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default StatisticReportsComponent;
