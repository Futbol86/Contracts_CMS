import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import HopDongListItem from "./HopDong/HopDongListItem";
import Pagination from '../../../components/common/Pagination';
import HopDongListFilter from '../containers/HopDong/HopDongListFilter';

const HopDongList = ({contracts, isEnableAddEdit, handleDeleteClick, handleConfirmCompleteClick, handleConfirmCancelClick, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>Danh sách Hợp Đồng</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <HopDongListFilter />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>LOẠI HĐ</th>
                                    <th>SỐ HĐ</th>
                                    <th>NGÀY HĐ</th>
                                    <th>BÊN A</th>
                                    <th>BÊN B</th>
                                    <th>TÀI SẢN GIAO DỊCH</th>
                                    <th>CÔNG CHỨNG VIÊN</th>
                                    <th>PHÒNG CÔNG CHỨNG</th>
                                    <th>GIÁ TRỊ HĐ</th>
                                    <th>TRẠNG THÁI HĐ</th>
                                    <th>NGÀY TẠO</th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(contracts && contracts.length > 0)
                                    ? contracts.map((contract, idx) => (
                                        <HopDongListItem key={idx} contract={contract} isEnableAddEdit={isEnableAddEdit} 
                                                                  handleDeleteClick={handleDeleteClick} handleConfirmCompleteClick={handleConfirmCompleteClick}
                                                                  handleConfirmCancelClick={handleConfirmCancelClick}/>
                                    ))
                                    : <tr><td colSpan={13}>Không tìm thấy Hợp Đồng</td></tr>
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

HopDongList.propTypes = {
    contracts: PropTypes.array
};

export default HopDongList;