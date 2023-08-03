import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, CardFooter, Table, Label, Button} from 'reactstrap';
import Modal from "react-modal";
import {Field} from "redux-form";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from '../../../components/common/Form/index'

import Pagination from '../../../components/common/Pagination';
import ArchiveBookReportListItem from "./ArchiveBookReport/ArchiveBookReportListItem";
import ArchiveBookReportListFilter from '../containers/ArchiveBookReport/ArchiveBookReportListFilter';

import ShowModalInfoModal from "../../dashboard/components/Dashboard/ShowMoreInfoModal";

const ArchiveBookReportList = ({
        contracts, userGroups, archive_book_id, currentModalId, fullContext, pagination, onChangePage, 
        handleShowMoreClick, handleModalChange, handleExportExcelFile
    }) => {

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h2>Thống kê Sổ lưu trữ</h2>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <div className="mb-2"> 
                                <ArchiveBookReportListFilter userGroups={userGroups}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>SỔ LƯU TRỮ</th>
                                        <th>PHÒNG CÔNG CHỨNG</th>
                                        <th>SỐ CÔNG CHỨNG</th>
                                        <th>NGÀY, THÁNG, NĂM CÔNG CHỨNG</th>
                                        <th>HỌ TÊN, CMND/HỘ CHIẾU/CĂN CƯỚC CÔNG DÂN, NƠI CƯ TRÚ CỦA NGƯỜI YÊU CẦU CÔNG CHỨNG</th>
                                        <th>LOẠI HỢP ĐỒNG, GIAO DỊCH</th>
                                        <th>HỌ TÊN CÔNG CHỨNG VIÊN KÝ VĂN BẢN CÔNG CHỨNG</th>
                                        {/* <th>PHÍ CÔNG CHỨNG (6)</th>
                                        <th>THÙ LAO CÔNG CHỨNG, CHI PHÍ KHÁC (7)</th> */}
                                        <th>TÀI SẢN LÀ ĐỐI TƯỢNG CỦA HỢP ĐỒNG, GIAO DỊCH</th>
                                        <th>GHI CHÚ</th>
                                        <th>NGÀY TẠO</th>
                                        {/* <th>THUỘC HỢP ĐỒNG</th> */}
                                        {/* <th>TÌNH TRẠNG (11)</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {(contracts && contracts.length > 0)
                                        ? contracts.map((contract, idx) => (
                                            <ArchiveBookReportListItem key={idx} contract={contract} handleShowMoreClick={handleShowMoreClick}/>
                                        ))
                                        : <tr><td colSpan={11}>Không tìm thấy thông tin</td></tr>
                                    }
                                </tbody>
                            </Table>

                            <Pagination pagination={pagination} onChangePage={onChangePage} />
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter className="d-flex justify-content-end">
                    <Button color="secondary" disabled={!archive_book_id} onClick={() => handleExportExcelFile()}>
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
    )
};

export default ArchiveBookReportList;