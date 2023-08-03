import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import SoLuuTruListItem from "./SoLuuTru/SoLuuTruListItem";
import Pagination from '../../../components/common/Pagination';
import SoLuuTruListFilter from '../containers/SoLuuTru/SoLuuTruListFilter';

const SoLuuTruList = ({archiveBooks, handleDeleteClick, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>Danh sách Sổ lưu trữ</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <SoLuuTruListFilter />
                        </div>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>LOẠI SỔ LƯU TRỮ</th>
                                    <th>SỔ LƯU TRỮ</th>
                                    <th>MÔ TẢ</th>
                                    <th>MỞ SỔ NGÀY</th>
                                    <th>KHOÁ SỔ NGÀY</th>
                                    <th>TRẠNG THÁI</th>
                                    <th>PHÒNG CÔNG CHỨNG</th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(archiveBooks && archiveBooks.length > 0)
                                    ? archiveBooks.map((archiveBook, idx) => (
                                        <SoLuuTruListItem key={idx} archiveBook={archiveBook} handleDeleteClick={handleDeleteClick}/>
                                    ))
                                    : <tr><td colSpan={9}>Không tìm thấy Sổ lưu trữ</td></tr>
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

SoLuuTruList.propTypes = {
    archiveBooks: PropTypes.array
};

export default SoLuuTruList;