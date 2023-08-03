import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Table, Button } from 'reactstrap';
import Modal from "react-modal";
import NewDongAHopDongListItem from "./NewDongAHopDong/NewDongAHopDongListItem";
import Pagination from '../../../components/common/Pagination';
import ShowModalInfoModal from "../../dashboard/components/Dashboard/ShowMoreInfoModal";
import NewDongAHopDongListFilter from '../containers/NewDongAHopDong/NewDongAHopDongListFilter';

const NewDongAHopDongList = ({contracts, fullContext, userGroups, currentModalId, handleShowMoreClick, handleModalChange, pagination, onChangePage, handleExportExcelFile}) => (
    <div className="animated fadeIn" style={{fontSize: '12px'}}>
        <Card>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2 font-xs">
                            <NewDongAHopDongListFilter userGroups={userGroups}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>Ngày công chứng</th>
                                    <th>Số hợp đồng</th>
                                    <th>Tên hợp đồng</th>
                                    <th style={{minWidth: '200px'}}>Tài sản</th>
                                    {/* <th style={{minWidth: '200px'}}>Bên A</th>
                                    <th style={{minWidth: '200px'}}>Bên B</th> */}
                                    <th>Thông tin Hợp đồng</th>
                                    <th>Số lưu trữ</th>
                                    <th>Công chứng viên</th>
                                    <th>Tổ chức công chứng</th>
                                    <th>Thời gian đưa lên hệ thống</th>
                                    <th>Cập nhật lần cuối</th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody> 
                                {(contracts && contracts.length > 0)
                                    ? contracts.map((contract, idx) => (
                                        <NewDongAHopDongListItem key={idx} contract={contract} handleShowMoreClick={handleShowMoreClick}/>
                                    ))
                                    : <tr><td colSpan={11}>Không tìm thấy Hợp Đồng</td></tr>
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
        <Modal className="Modal__Bootstrap modal-dialog modal-md"
            isOpen={currentModalId === 1}
            onRequestClose={() => handleModalChange(0)}
            contentLabel="Hiển thị thông tin"
            style={{content: {outline: 0}}}
        >
            <ShowModalInfoModal
                fullContext={fullContext}
                handleModalClose={() => handleModalChange(0)}
            />
        </Modal>
    </div>
);

NewDongAHopDongList.propTypes = {
    contracts: PropTypes.array
};

export default NewDongAHopDongList;