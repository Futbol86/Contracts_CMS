import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Table, Button } from 'reactstrap';
import Modal from "react-modal";
import ThuHoiGCNListItem from "./ThuHoiGCNListItem";

const ThuHoiGCNList = ({ thuHoiGCNs, search_keys, staticFileUrl }) => (
    <div className="animated fadeIn" style={{fontSize: '12px'}}>
        <Card>
            <CardHeader>
                <h4>Thông tin Thu hồi/Huỷ Giấy Chứng Nhận</h4>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>Số QĐ Thu hồi/Huỷ</th>
                                    <th>Ngày ban hành</th>
                                    <th>Cơ quan ban hành</th>
                                    <th>Giấy CN trước khi thu hồi</th>
                                    <th style={{minWidth: '200px'}}>Tài sản Thu hồi/Huỷ</th>
                                    <th style={{minWidth: '200px'}}>Nội dung Thu hồi/Huỷ</th>
                                    <th>Văn bản đính kèm</th>
                                    <th>Người tạo</th>
                                    <th>Thuộc đơn vị</th>
                                    <th>Ngày tạo</th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody> 
                                {(thuHoiGCNs && thuHoiGCNs.length > 0)
                                    ? thuHoiGCNs.map((thuHoiGCN, idx) => (
                                        <ThuHoiGCNListItem key={idx} thuHoiGCN={thuHoiGCN} search_keys={search_keys} staticFileUrl={staticFileUrl}/>
                                    ))
                                    : <tr><td colSpan={11}>Không tìm thấy nội dung Thu hồi/Huỷ GCN</td></tr>
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </div>
);

ThuHoiGCNList.propTypes = {
    thuHoiGCNs: PropTypes.array
};

export default ThuHoiGCNList;