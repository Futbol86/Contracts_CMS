import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import LoaiSoLuuTruListItem from "./LoaiSoLuuTru/LoaiSoLuuTruListItem";
import Pagination from '../../../components/common/Pagination';
import LoaiSoLuuTruListFilter from '../containers/LoaiSoLuuTru/LoaiSoLuuTruListFilter';

const LoaiSoLuuTruList = ({archiveBookTypes, handleDeleteClick, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>Danh sách Loại Sổ Lưu Trữ</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <LoaiSoLuuTruListFilter />
                        </div>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>LOẠI SỔ LƯU TRỮ</th>
                                    <th>MÔ TẢ</th>
                                    <th>TRẠNG THÁI</th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(archiveBookTypes && archiveBookTypes.length > 0)
                                    ? archiveBookTypes.map((archiveBookType, idx) => (
                                        <LoaiSoLuuTruListItem key={idx} archiveBookType={archiveBookType} handleDeleteClick={handleDeleteClick}/>
                                    ))
                                    : <tr><td colSpan={5}>Không tìm thấy Loại Sổ Lưu Trữ</td></tr>
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

LoaiSoLuuTruList.propTypes = {
    archiveBookTypes: PropTypes.array
};

export default LoaiSoLuuTruList;