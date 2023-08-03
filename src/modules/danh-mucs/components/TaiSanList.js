import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table, CardFooter, Button } from 'reactstrap';
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-modal";
import Pagination from '../../../components/common/Pagination';
import BatDongSanList from "./TaiSan/BatDongSanList";
import DongSanList from "./TaiSan/DongSanList";
import TaiSanHistoriesModal from '../containers/PDFModal/TaiSanHistoriesModal';
import PhieuTraCuuModal from '../containers/PDFModal/PhieuTraCuuModal';

const TaiSanList = ({
        userData, assets, tabIndex, isEnableAddEdit, currentModalId, assetHistories, handleTabChange, handleShowHistoryClick, 
        handleDeleteClick, pagination, onChangePage, handleModalChange }) => {
            
    const tabItems = [
        {
            key: 0,
            tabClassName: 'tab',
            panelClassName: 'tab-content tab-pane',
            title: 'BẤT ĐỘNG SẢN',
            getContent: () => <BatDongSanList userData={userData} assets={assets} isEnableAddEdit={isEnableAddEdit} handleShowHistoryClick={handleShowHistoryClick} handleDeleteClick={handleDeleteClick}/>
        },

        {
            key: 1,
            tabClassName: 'tab',
            panelClassName: 'tab-content tab-pane',
            title: 'ĐỘNG SẢN',
            getContent: () => <DongSanList userData={userData} assets={assets} isEnableAddEdit={isEnableAddEdit} handleShowHistoryClick={handleShowHistoryClick} handleDeleteClick={handleDeleteClick}/>
        }
    ];

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h2>Danh sách Tài sản</h2>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <Tabs items={tabItems} selectedTabKey={tabIndex} transformWidth={400} onChange={handleTabChange}/>
                            <div className="mt-4 mb-4">
                                <Pagination pagination={pagination} onChangePage={onChangePage} />
                            </div>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <div className='d-flex justify-content-end'>
                        <Button color="secondary" onClick={() => handleModalChange(500-currentModalId)}>
                            Xuất Phiếu Tra Cứu
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <ToastContainer />
            <Modal className="Modal__Bootstrap modal-dialog modal-dialog2 modal-xl"
                    isOpen={currentModalId === 1}
                    //onRequestClose={() => handleModalChange(0)}
                    contentLabel="Lịch sử giao dịch tài sản"
                    style={{content: {outline: 0}}}
                >
                    <TaiSanHistoriesModal
                        assetHistories={assetHistories}
                        handleModalClose={() => handleModalChange(0)}
                    />
            </Modal>
            <Modal className="Modal__Bootstrap modal-dialog modal-dialog2 modal-lg"
                    isOpen={currentModalId === 500}
                    contentLabel="Xuất Phiếu Tra Cứu"
                    style={{content: {outline: 0}}}
                >
                <PhieuTraCuuModal
                    handleModalClose={() => handleModalChange(0)}
                />
            </Modal>
        </div>
    )
};

TaiSanList.propTypes = {
    assets: PropTypes.array
};

export default TaiSanList;