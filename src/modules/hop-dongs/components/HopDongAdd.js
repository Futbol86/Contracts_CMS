import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, UncontrolledAlert, Label } from 'reactstrap';
import {Field} from "redux-form";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-modal";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../components/common/Form/index";

import DoiTuongAComponent from './HopDong/DoiTuongA';
import DoiTuongBComponent from './HopDong/DoiTuongB';
import DoiTuongThu3Component from './HopDong/DoiTuongThu3';
import TaiSanComponent from './HopDong/TaiSan';
import ThongTinHopDongComponent from './HopDong/ThongTinHopDong';
import LoiChungComponent from './HopDong/LoiChung';

import SelectContractTypeModal from '../containers/PDFModal/SelectContractTypeModal';
import ContractPDFModal from '../containers/PDFModal/ContractPDFModal';
import SelectTestimonyTypeModal from '../containers/PDFModal/SelectTestimonyTypeModal';
import TNMTLandDataModal from '../containers/PDFModal/TNMTLandDataModal'
import TaiSanHistoriesModal from '../../danh-mucs/containers/PDFModal/TaiSanHistoriesModal';

class HopDongAdd extends Component {
    render(){
        const { action, currentModalId, contractDetail, contract_types = [], sub_contract_types = [], contract_type_id, 
                archive_books = [], archive_book_types = [], archive_book_type_id,
                districts, wards, assetHistories, staticFileUrl, contract_files,
                assetQuery, handleFileDrops, handleDeleteFile,
                handleSubmit, handleSearchFromOwner, handleSearchToOwner, handleSearchMidOwner, handleSearchAsset, handleShowHistoryClick,
                handleDeleteAsset, handleDeleteFromOwner, handleDeleteToOwner, handleDeleteMidOwner, handleModalChange, 
                handleRequestTNMTLandData,
                error, submitting, pristine, invalid, reset, meta } = this.props;
               
        let _contract_types = contract_types.sort((a, b) => a.id - b.id);
        let _sub_contract_types = sub_contract_types.sort((a, b) => a.id - b.id);

        var findAContracType = _contract_types.find(item => item.id === contract_type_id);
        var title = findAContracType ? findAContracType.name : "";

        var listContractType = _contract_types.map(item => {
            return {
                label: item.name,
                value: item.id
            }});

        const listSubContractType = _sub_contract_types.filter(item => item.contract_type_id === parseInt(contract_type_id)).map(item => {
                return {
                    label: item.name,
                    value: item.id
                }
            });
        
        const isReadOnly = action === "view";
        
        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {
                                    contractDetail && contractDetail.id ? 
                                        (action === "view" ? "Xem Hợp Đồng" : "Sửa Hợp đồng") : "Thêm Hợp đồng"
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Loại hợp đồng{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    <Field
                                        multi={false}
                                        name="contract_type_id"
                                        options={listContractType}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Chi tiết loại hợp đồng{' '}<span className="text-red">(*)</span>
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    <Field
                                        multi={false}
                                        name="sub_contract_type_id"
                                        options={listSubContractType}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs="12" md="12">
                                    <TaiSanComponent 
                                        isReadOnly={isReadOnly}
                                        assetQuery={assetQuery}
                                        districts={districts}
                                        wards={wards}
                                        currentModalId={currentModalId}
                                        handleSearchAsset={handleSearchAsset} 
                                        handleShowHistoryClick={handleShowHistoryClick}
                                        handleDeleteAsset={handleDeleteAsset}
                                        handleRequestTNMTLandData={handleRequestTNMTLandData}
                                        handleModalChange={handleModalChange}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs="12" md="12">
                                    <DoiTuongAComponent title={title.toUpperCase()} isReadOnly={isReadOnly}
                                                        currentModalId={currentModalId}
                                                        handleSearchFromOwner={handleSearchFromOwner} 
                                                        handleDeleteFromOwner={handleDeleteFromOwner}
                                                        handleModalChange={handleModalChange}/>
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xs="12" md="12">
                                    <DoiTuongBComponent title={title.toUpperCase()} isReadOnly={isReadOnly}
                                                        currentModalId={currentModalId}
                                                        handleSearchToOwner={handleSearchToOwner} 
                                                        handleDeleteToOwner={handleDeleteToOwner}
                                                        handleModalChange={handleModalChange}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs="12" md="12">
                                    <DoiTuongThu3Component title={title.toUpperCase()} isReadOnly={isReadOnly}
                                                           handleSearchMidOwner={handleSearchMidOwner} 
                                                           handleDeleteMidOwner={handleDeleteMidOwner}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs="12" md="12">
                                    <ThongTinHopDongComponent isReadOnly={isReadOnly} contractDetail={contractDetail}
                                                              archive_book_type_id={archive_book_type_id}
                                                              archive_books={archive_books} 
                                                              archive_book_types={archive_book_types}
                                                              staticFileUrl={staticFileUrl}
                                                              contract_files={contract_files}
                                                              handleFileDrops={handleFileDrops}
                                                              handleDeleteFile={handleDeleteFile}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs="12" md="12">
                                    <LoiChungComponent isReadOnly={isReadOnly} contractDetail={contractDetail}/>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <NavLink to={`/hop-dongs/contract/list`} className="btn-secondary p-2 text-dark">
                                Trở về Danh mục
                            </NavLink>

                            {
                                contractDetail && 
                                <React.Fragment>
                                    <Button color="secondary" onClick={() => handleModalChange(1-currentModalId)}>
                                        Xuất Hợp Đồng
                                    </Button>
                                    <Button color="secondary" onClick={() => handleModalChange(3-currentModalId)}>
                                        Xuất Lời Chứng
                                    </Button>
                                </React.Fragment>
                            }
                            {
                                isReadOnly === false &&
                                <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                            data-spinner-lines={12} className="btn btn-dark" type="submit"
                                            loading={submitting} disabled={submitting || invalid || pristine}>
                                                            
                                    {
                                        contractDetail && contractDetail.id ?
                                        "Cập nhật" : "Thêm mới"
                                    }
                                </LaddaButton>
                            }
                        </CardFooter>
                    </Card>
                    
                    <Modal className="Modal__Bootstrap modal-dialog modal-md"
                            isOpen={currentModalId === 1}
                            onRequestClose={() => handleModalChange(0)}
                            contentLabel="Chọn Mẫu Hợp Đồng"
                            style={{content: {outline: 0}}}
                        >
                        <SelectContractTypeModal
                            handleModalClose={() => handleModalChange(0)}
                        />
                    </Modal>

                    <Modal className="Modal__Bootstrap modal-dialog modal-md"
                            isOpen={currentModalId === 3}
                            onRequestClose={() => handleModalChange(0)}
                            contentLabel="Chọn Mẫu Lời Chứng"
                            style={{content: {outline: 0}}}
                        >
                        <SelectTestimonyTypeModal
                            handleModalClose={() => handleModalChange(0)}
                        />
                    </Modal>

                    <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                            isOpen={currentModalId === 100}
                            onRequestClose={() => handleModalChange(0)}
                            contentLabel="Kết Quả Tra Cứu Thông Tin Đất Đai"
                            style={{content: {outline: 0}}}
                        >
                            <TNMTLandDataModal
                                handleModalClose={() => handleModalChange(0)}
                            />
                    </Modal>

                    <Modal className="Modal__Bootstrap modal-dialog modal-dialog2 modal-lg"
                            isOpen={currentModalId === 400}
                            contentLabel="Lịch sử tài sản"
                            style={{content: {outline: 0}}}
                        >
                            <TaiSanHistoriesModal
                                assetHistories={assetHistories}
                                handleModalClose={() => handleModalChange(0)}
                            />
                    </Modal>

                    {/* <Modal className="Modal__Bootstrap modal-dialog modal-dialog2 modal-lg"
                            isOpen={currentModalId === 1000}
                            contentLabel="Xuat Hop Dong Test"
                            style={{content: {outline: 0}}}
                        >
                            <ContractPDFModal
                                handleModalClose={() => handleModalChange(0)}
                            />
                    </Modal> */}
                </Form>
                <ToastContainer />
            </div>
        );
    }
}

HopDongAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default HopDongAdd;