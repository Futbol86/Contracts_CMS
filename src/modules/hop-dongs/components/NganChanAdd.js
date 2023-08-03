import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, UncontrolledAlert, Label } from 'reactstrap';
import {Field} from "redux-form";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../components/common/Form/index";
import Modal from "react-modal";

import TaiSanComponent from './HopDong/TaiSan';
import DoiTuongComponent from './HopDong/DoiTuong';
import ThongTinNganChanComponent from './NganChan/ThongTinNganChan';
import TaiSanHistoriesModal from '../../danh-mucs/containers/PDFModal/TaiSanHistoriesModal';

import {PREVENTION_TYPES} from '../constants';

class NganChanAdd extends Component {
    render(){
        const { assetPreventionInfo, prevention_type_id, asset_prevention_type, archive_books = [], archive_book_types = [], 
                archive_book_type_id, districts, wards, assetHistories, assetQuery, staticFileUrl, file_name,
                handleSearchAsset, handleDeleteAsset, handleSearchOwner, handleDeleteOwner, handleFileDrops, handleDeleteFile, handleShowHistoryClick,
                currentModalId, handleSubmit, handleModalChange, handleModalClose, error, submitting, pristine, invalid, reset } = this.props;

        const listPreventionType = PREVENTION_TYPES.map(item => { 
            return {
                name: item.name,
                id: item.id 
            }
        });

        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {
                                    assetPreventionInfo && assetPreventionInfo.id ? "Sửa Ngăn chặn" : "Thêm Ngăn chặn"
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            {/* <Row className="mb-2">
                                <Col xs="6" md="2">
                                    <Label className="col-form-label">
                                        Loại Ngăn Chặn{' '}
                                    </Label>
                                </Col>
                                <Col xs="6" md="4">
                                    <Field name="prevention_type_id" className="mb-4"
                                        textField="name" valueField="id" titleOption="-- Chọn Loại Ngăn Chặn --"
                                        data={listPreventionType}
                                        parse={(value) => value && parseFloat(value, 10)}
                                        component={FieldDropdownList} />
                                </Col>
                            </Row>
                            { 
                                prevention_type_id === 1 &&
                                <Row className="mb-2">
                                    <Col xs="12" md="12">
                                        <TaiSanComponent  assetQuery={assetQuery}
                                                          districts={districts}
                                                          wards={wards}
                                                          currentModalId={currentModalId}
                                                          handleSearchAsset={handleSearchAsset} 
                                                          handleDeleteAsset={handleDeleteAsset}
                                                          handleShowHistoryClick={handleShowHistoryClick}
                                                          handleModalChange={handleModalChange}/>
                                    </Col>
                                </Row>
                            }
                            { 
                                prevention_type_id === 2 &&
                                <Row className="mb-2">
                                    <Col xs="12" md="12">
                                        <DoiTuongComponent handleSearchOwner={handleSearchOwner} 
                                                           handleDeleteOwner={handleDeleteOwner}/>
                                    </Col>
                                </Row>
                            } */}
                            <Row className="mb-2">
                                <Col xs={12}>
                                    <ThongTinNganChanComponent archive_book_type_id={archive_book_type_id}
                                                               archive_books={archive_books} 
                                                               archive_book_types={archive_book_types}
                                                               asset_prevention_type={asset_prevention_type}
                                                               staticFileUrl={staticFileUrl}
                                                               file_name={file_name}
                                                               handleFileDrops={handleFileDrops}
                                                               handleDeleteFile={handleDeleteFile}/>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <NavLink to={`/hop-dongs/asset-preventions/list`} className="btn-secondary p-2 text-dark">
                                Trở về Danh mục
                            </NavLink>

                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                {
                                    assetPreventionInfo && assetPreventionInfo.id ?
                                    "Cập nhật" : "Thêm mới"
                                }
                            </LaddaButton>
                        </CardFooter>
                    </Card>
                </Form>
                <ToastContainer />
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
            </div>
        );
    }
}

NganChanAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default NganChanAdd;