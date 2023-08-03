import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import LoaiHopDongListItem from "./LoaiHopDong/LoaiHopDongListItem";
import Pagination from '../../../components/common/Pagination';
import LoaiHopDongListFilter from '../containers/LoaiHopDong/LoaiHopDongListFilter';

const LoaiHopDongList = ({contractTypes, handleDeleteClick, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>Danh sách Loại Hợp Đồng</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                             <LoaiHopDongListFilter />
                        </div>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>LOẠI HỢP ĐỒNG</th>
                                    <th>LOẠI GIAO DỊCH</th>
                                    <th>TRẠNG THÁI</th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(contractTypes && contractTypes.length > 0)
                                    ? contractTypes.map((contractType, idx) => (
                                        <LoaiHopDongListItem key={idx} contractType={contractType} handleDeleteClick={handleDeleteClick}/>
                                    ))
                                    : <tr><td colSpan={4}>Không tìm thấy Loại Hợp Đồng</td></tr>
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

LoaiHopDongList.propTypes = {
    contractTypes: PropTypes.array
};

export default LoaiHopDongList;