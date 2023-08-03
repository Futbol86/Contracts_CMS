import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Table, Button } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import Pagination from '../../../components/common/Pagination';

import RequestTNMTLandDataReportListItem from "./RequestTNMTLandDataReport/RequestTNMTLandDataReportListItem";
import RequestTNMTLandDataReportListFilter from '../containers/RequestTNMTLandDataReport/RequestTNMTLandDataReportListFilter';

const RequestTNMTLandDataReportList = ({requestTNMTLandDataReports, pagination, onChangePage, handleExportExcelFile}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>Tra cứu thông tin đất Tài Nguyên Môi Trường</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <RequestTNMTLandDataReportListFilter />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>NGƯỜI THỰC HIỆN</th>
                                    <th>ĐƠN VỊ</th>
                                    <th>MÃ TRA CỨU</th>
                                    <th>NGÀY TRA CỨU</th>
                                    <th>NỘI DUNG</th>
                                    <th>TRẠNG THÁI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(requestTNMTLandDataReports && requestTNMTLandDataReports.length > 0)
                                    ? requestTNMTLandDataReports.map((requestTNMTLandDataReport, idx) => (
                                        <RequestTNMTLandDataReportListItem key={idx} requestTNMTLandDataReport={requestTNMTLandDataReport}/>
                                    ))
                                    : <tr><td colSpan={7}>Không tìm thấy Tra cứu thông tin đất đai TNMT</td></tr>
                                }
                            </tbody>
                        </Table>

                        <Pagination pagination={pagination} onChangePage={onChangePage} />
                    </Col>
                </Row>
            </CardBody>
            <CardFooter className="d-flex justify-content-end">
                <Button color="secondary" disabled={false} onClick={() => handleExportExcelFile()}>
                    Xuất File Excel
                </Button>
            </CardFooter>
        </Card>
    </div>
);

RequestTNMTLandDataReportList.propTypes = {
    requestTNMTLandDataReports: PropTypes.array
};

export default RequestTNMTLandDataReportList;