import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import PrintSearchTicketListItem from "./PrintSearchTicket/PrintSearchTicketListItem";
import Pagination from '../../../components/common/Pagination';
import PrintSearchTicketListFilter from '../containers/PrintSearchTicket/PrintSearchTicketFilter';

const PrintSearchTicketList = ({printSearchTickets, userGroups, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>Lịch Sử Phiếu Tra Cứu</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <PrintSearchTicketListFilter userGroups={userGroups}/>
                        </div>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>MÃ TRA CỨU</th>
                                    <th>NGƯỜI YÊU CẦU</th>
                                    <th>NỘI DUNG TRA CỨU</th>
                                    <th>GHI CHÚ</th>
                                    <th>CÁN BỘ THỰC HIỆN</th>
                                    <th>THUỘC ĐƠN VỊ</th>
                                    <th>NGÀY TẠO</th>
                                    <th>NGƯỜI TẠO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(printSearchTickets && printSearchTickets.length > 0)
                                    ? printSearchTickets.map((printSearchTicket, idx) => (
                                        <PrintSearchTicketListItem key={idx} printSearchTicket={printSearchTicket} />
                                    ))
                                    : <tr><td colSpan={9}>Không tìm thấy thông tin Phiếu Tra Cứu</td></tr>
                                }
                            </tbody>
                        </Table>

                        <Pagination pagination={pagination} onChangePage={onChangePage} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </div>
);

PrintSearchTicketList.propTypes = {
    printSearchTickets: PropTypes.array
};

export default PrintSearchTicketList;