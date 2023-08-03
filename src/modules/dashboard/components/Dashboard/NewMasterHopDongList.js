import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table, Label, Alert } from 'reactstrap';
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import Modal from "react-modal";
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import NewHopDongListFilter from '../../containers/Dashboard/NewHopDongListFilter'
//import NewHopDongListItem from "./NewHopDongListItem";
import NewHopDongList from "./NewHopDongList";
import NewNganChanList from './NewNganChanList';
import ThuHoiGCNList from './ThuHoiGCNList';
import RequestTNMTLandDataStatisticContainer from '../../containers/Dashboard/RequestTNMTLandDataStatistic';
import QRCodeGeneratorContainer from '../../containers/Dashboard/QRCodeGenerator';
import ShowModalInfoModal from "./ShowMoreInfoModal";
import PhieuTraCuuModal from '../../containers/Dashboard/PDFModal/PhieuTraCuuModal';

const NewMasterHopDongList = ({
    userGroups, contracts, new_contract_total, asset_preventions, asset_prevention_total, thu_hoi_GCNs, thu_hoi_GCN_total,
    search_keys, search_field, fullContext, currentModalId, staticFileUrl, 
    handleShowMoreClick, handleExportPhieuTraCuuClick, handleModalChange, tabIndex, handleTabChange
}) => {
    const tabItems = [
        {
            key: 0,
            tabClassName: 'tab',
            panelClassName: 'tab-content tab-pane',
            title: 'Ngăn chặn/Giải toả (' + asset_prevention_total + ')',
            getContent: () => 
                <NewNganChanList asset_preventions={asset_preventions} search_keys={search_keys} staticFileUrl={staticFileUrl}
                                 handleShowMoreClick={handleShowMoreClick} handleExportPhieuTraCuuClick={handleExportPhieuTraCuuClick}/>
        },

        {
            key: 1,
            tabClassName: 'tab',
            panelClassName: 'tab-content tab-pane',
            title: 'Hợp đồng công chứng (' + new_contract_total + ')',
            getContent: () =>
                <NewHopDongList contracts={contracts} search_keys={search_keys} search_field={search_field} staticFileUrl={staticFileUrl}
                                handleShowMoreClick={handleShowMoreClick} handleExportPhieuTraCuuClick={handleExportPhieuTraCuuClick}/>
        },

        {
            key: 2,
            tabClassName: 'tab',
            panelClassName: 'tab-content tab-pane',
            title: 'Thu hồi/Huỷ GCN (' + thu_hoi_GCN_total + ')',
            getContent: () =>
                <ThuHoiGCNList thuHoiGCNs={thu_hoi_GCNs} search_keys={search_keys} staticFileUrl={staticFileUrl}
                               handleShowMoreClick={handleShowMoreClick} />
        }
    ];

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h2>
                        Tra cứu thông tin
                    </h2>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col xs="12">
                            <div className="ml-4 mb-2">
                                <NewHopDongListFilter userGroups={userGroups}/>
                            </div>
                        </Col>
                    </Row>
                    {
                        ((asset_preventions && asset_preventions.length > 0) || (contracts && contracts.length > 0) || (thu_hoi_GCNs && thu_hoi_GCNs.length > 0)) &&
                        <>
                            <Row className="mb-2">
                                <Col xs="12" className="d-flex justify-content-end text-primary">
                                    <strong>
                                        <h4>
                                            Ngày giờ tra cứu: {`  `} 
                                            <FormattedTime value={new Date()}></FormattedTime>{`  `}
                                            <FormattedDate value={new Date()}>
                                                {
                                                    parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                                                }
                                            </FormattedDate>
                                        </h4>
                                    </strong>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col xs="12" className="zIndexZero">
                                    <Tabs items={tabItems} selectedTabKey={tabIndex} transformWidth={400} onChange={handleTabChange}/>
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        (contracts && contracts.length === 0) && (asset_preventions && asset_preventions.length === 0) && (thu_hoi_GCNs && thu_hoi_GCNs.length === 0) 
                        && search_keys.length > 0 &&
                        <>
                            <Row className="mb-2">
                                <Col xs="12" className="d-flex justify-content-end text-primary">
                                    <strong>
                                        <h4>
                                            Ngày giờ tra cứu: {`  `} 
                                            <FormattedTime value={new Date()}></FormattedTime>{`  `}
                                            <FormattedDate value={new Date()}>
                                                {
                                                    parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                                                }
                                            </FormattedDate>
                                        </h4>
                                    </strong>
                                </Col>
                            </Row>
                            <Alert color="danger"><h5>Không tìm thấy kết quả với từ khoá "{search_keys.join(" ")}"</h5></Alert>
                        </>
                    }
                    {
                        !(contracts && contracts.length > 0 || asset_preventions && asset_preventions.length > 0 || thu_hoi_GCNs && thu_hoi_GCNs.length > 0) &&
                        <Row className="mt-4">
                            <Col xs="6">
                                <Row>
                                    <Col md="12">
                                        <h4>Nhập tìm kiếm theo các điều kiện sau:</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <ul>
                                            <li>
                                                <strong className='text-primary'>
                                                    <h5>Nhập "từ khoá" để tìm kiếm chính xác từ khoá, ví dụ: ("NGUYỄN THỊ NGỌC THY")</h5>
                                                </strong>
                                            </li>
                                            <li>
                                                <strong className='text-primary'>
                                                    <h5>Nhập các từ khoá liên tiếp để tìm chính xác nhất, ví dụ: ("NGUYỄN THỊ NGỌC THY" 158 10)</h5>
                                                </strong>
                                            </li>
                                            <li>
                                                <strong className='text-primary'>
                                                    <h5>Nhấp vào kính lúp <i className="icon-magnifier text-primary" /> để xem đầy đủ thông tin</h5>
                                                </strong>
                                            </li>
                                            <li>
                                                <strong className='text-primary'>
                                                    <h5>Chọn <span className='text-danger'>"Tìm kiếm nâng cao"</span> để khoanh vùng khu vực tìm kiếm</h5>
                                                </strong>
                                            </li>
                                        </ul>                            
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="6">
                                <img src='/assets/search.png'/>
                            </Col>
                        </Row>
                    }
                    {/* PHẦN TRA CỨU ĐẤT ĐAI SỞ TNMT */}
                    {
                        !((contracts && contracts.length > 0) || (asset_preventions && asset_preventions.length > 0) || (thu_hoi_GCNs && thu_hoi_GCNs.length > 0)) &&
                        <React.Fragment>
                            <hr />
                            <Row className="mt-4">
                                <Col md="8">
                                    <RequestTNMTLandDataStatisticContainer />
                                </Col>
                                <Col md="4">
                                    <QRCodeGeneratorContainer />
                                </Col>
                            </Row>
                        </React.Fragment>
                    }
                    <Modal className="Modal__Bootstrap modal-dialog modal-md"
                        isOpen={currentModalId === 1}
                        onRequestClose={() => handleModalChange(0)}
                        contentLabel="Hiển thị thông tin"
                        style={{content: {outline: 0}}}
                    >
                        <ShowModalInfoModal fullContext={fullContext} handleModalClose={() => handleModalChange(0)}/>
                    </Modal>
                    <Modal className="Modal__Bootstrap modal-dialog modal-dialog2 modal-lg"
                            isOpen={currentModalId === 500 || currentModalId === 600}
                            contentLabel="Xuất Phiếu Tra Cứu"
                            style={{content: {outline: 0}}}
                        >
                        <PhieuTraCuuModal
                            search_keys={search_keys}
                            handleModalClose={() => handleModalChange(0)}
                        />
                    </Modal>
                </CardBody>
            </Card>
        </div>
    )
};

NewMasterHopDongList.propTypes = {
    contracts: PropTypes.array
};

export default NewMasterHopDongList;