import React, { Component } from 'react';
import {Card, CardHeader, CardBody, CardTitle, CardText, Row, Col, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
// import DashboardActions from './DashboardActions';
// import ContractStatisticComponent from './Dashboard/ContractStatistic';
// import OwnerStatisticComponent from './Dashboard/OwnerStatistic';
// import AssetStatisticComponent from './Dashboard/AssetStatistic';
import NewMasterHopDongListContainer from '../containers/Dashboard/NewMasterHopDongList';
import RequestTNMTLandDataStatisticContainer from '../containers/Dashboard/RequestTNMTLandDataStatistic';
import StatisticReportsListContainer from '../containers/StatisticReports';

const DashboardComponent = ({reports, tongTienNapTNMT, systemConfigs}) => {
    return (
        <div className="animated fadeIn">
            <Card>
                {/* <CardHeader>
                    <h2>
                        Tra cứu thông tin
                    </h2>
                </CardHeader> */}
                <CardBody>
                    <Row>
                        <Col md="12">
                            <StatisticReportsListContainer />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default DashboardComponent;
