import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import Pagination from '../../../components/common/Pagination';
import LandDataOfTNMTReportListItem from "./LandDataOfTNMTReport/LandDataOfTNMTReportListItem";
import LandDataOfTNMTReportListFilter from '../containers/LandDataOfTNMTReport/LandDataOfTNMTReportListFilter';

const LandDataOfTNMTReportList = ({requestLandDataOfTNMTReports, pagination, onChangePage}) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h2>Thống kê tra cứu của (Tài Nguyên Môi Trường)</h2>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <div className="float-right mb-2">
                                <LandDataOfTNMTReportListFilter />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>MÃ ĐƠN VỊ</th>
                                        <th>TÊN ĐƠN VỊ</th>
                                        <th>MÃ TRA CỨU</th>
                                        <th>NGÀY TRA CỨU</th>
                                        <th>GIÁ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(requestLandDataOfTNMTReports && requestLandDataOfTNMTReports.length > 0)
                                        ? requestLandDataOfTNMTReports.map((requestLandDataOfTNMTReport, idx) => (
                                            <LandDataOfTNMTReportListItem key={idx} index={idx + 1} requestLandDataOfTNMTReport={requestLandDataOfTNMTReport}/>
                                        ))
                                        : <tr><td colSpan={6}>Không tìm thấy thông tin</td></tr>
                                    }
                                </tbody>
                            </Table>

                            <Pagination pagination={pagination} onChangePage={onChangePage} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
};

// LandDataOfTNMTReportList.propTypes = {
//     requestLandDataOfTNMTReports: PropTypes.array
// };

export default LandDataOfTNMTReportList;