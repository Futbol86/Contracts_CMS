import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import LandPurposeListItem from "./LandPurpose/LandPurposeListItem";
import Pagination from '../../../components/common/Pagination';
import LandPurposeListFilter from '../containers/LandPurpose/LandPurposeListFilter';

const LandPurposeList = ({landPurposes, handleDeleteClick, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>Danh mục Mục Đính Sử Dụng Đất</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <LandPurposeListFilter />
                        </div>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>MỤC ĐÍCH SỬ DỤNG ĐẤT</th>
                                    <th>MÔ TẢ</th>
                                    <th>TRẠNG THÁI</th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(landPurposes && landPurposes.length > 0)
                                    ? landPurposes.map((landPurpose, idx) => (
                                        <LandPurposeListItem key={idx} landPurpose={landPurpose} handleDeleteClick={handleDeleteClick}/>
                                    ))
                                    : <tr><td colSpan={4}>Không tìm thấy Mục Đính Sử Dụng Đất</td></tr>
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

LandPurposeList.propTypes = {
    landPurposes: PropTypes.array
};

export default LandPurposeList;