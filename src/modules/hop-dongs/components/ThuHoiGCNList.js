import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Table, Button } from 'reactstrap';
import Modal from "react-modal";
import ThuHoiGCNListItem from "./ThuHoiGCN/ThuHoiGCNListItem";
import Pagination from '../../../components/common/Pagination';
// import ShowModalInfoModal from "../../dashboard/components/Dashboard/ShowMoreInfoModal";
import ThuHoiGCNListFilter from '../containers/ThuHoiGCN/ThuHoiGCNListFilter';

const ThuHoiGCNList = ({
        thuHoiGCNs, userData, staticFileUrl, userGroups, currentModalId, handleModalChange, 
        pagination, onChangePage, handleExportExcelFile, handleDeleteClick
    }) => (
    <div className="animated fadeIn" style={{fontSize: '12px'}}>
        <Card>
            <CardHeader>
                <h2>Danh sách Thu hồi/Huỷ Giấy Chứng Nhận</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2 font-xs">
                            <ThuHoiGCNListFilter userData={userData} userGroups={userGroups}/>
                        </div>
                    </Col>
                </Row>
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
                                        <ThuHoiGCNListItem key={idx} thuHoiGCN={thuHoiGCN} staticFileUrl={staticFileUrl} userData={userData}
                                                           handleDeleteClick={handleDeleteClick}/>
                                    ))
                                    : <tr><td colSpan={11}>Không tìm thấy nội dung Thu hồi/Huỷ GCN</td></tr>
                                }
                            </tbody>
                        </Table>

                        <Pagination pagination={pagination} onChangePage={onChangePage} />
                    </Col>
                </Row>
            </CardBody>
            <CardFooter className="d-flex justify-content-end">
                <Button color="secondary" onClick={() => handleExportExcelFile()}>
                    Xuất File Excel
                </Button>
            </CardFooter>
        </Card>
        {/* <Modal className="Modal__Bootstrap modal-dialog modal-md"
            isOpen={currentModalId === 1}
            onRequestClose={() => handleModalChange(0)}
            contentLabel="Hiển thị thông tin"
            style={{content: {outline: 0}}}
        >
            <ShowModalInfoModal
                fullContext={fullContext}
                handleModalClose={() => handleModalChange(0)}
            />
        </Modal> */}
    </div>
);

ThuHoiGCNList.propTypes = {
    contracts: PropTypes.array
};

export default ThuHoiGCNList;