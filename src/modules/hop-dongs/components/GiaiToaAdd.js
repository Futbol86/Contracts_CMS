import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import Modal from "react-modal";
import { Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, UncontrolledAlert, Label, FormGroup } from 'reactstrap';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ThongTinNganChanSelectedComponent from './GiaiToa/ThongTinNganChanSelected';
import ThongTinGiaiToaComponent from './GiaiToa/ThongTinGiaiToa';
import AddEditNganChanModal from './GiaiToa/AddEditNganChanModal';

class GiaiToaAdd extends Component {
    render(){
        const { 
            assetReleaseInfo, asset_prevention_selected, archive_books = [], archive_book_types = [], archive_book_type_id, 
            staticFileUrl, release_file, handleFileDrops, handleDeleteFile,  
            currentModalId, handleSubmit, handleModalChange, error, submitting, pristine, invalid, reset } = this.props;
            
        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {
                                    assetReleaseInfo && assetReleaseInfo.id ? "Sửa Giải toả" : "Thêm Giải toả"
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col md="12">
                                    <FormGroup className="d-flex justify-content-end">
                                        <Button color="secondary" onClick={() => handleModalChange(1 - currentModalId)}>
                                            <i className="icon-plus" />  Chọn Quyết Định Ngăn Chặn
                                        </Button>

                                        <Modal className="Modal__Bootstrap modal-dialog modal-xl"
                                            isOpen={currentModalId === 1}
                                            contentLabel="Chọn Quyết Định Ngăn Chặn"
                                            style={{content: {outline: 0}}}
                                        >
                                            <AddEditNganChanModal
                                                handleModalClose={() => handleModalChange(0)}
                                            />
                                        </Modal>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={12}>
                                    <ThongTinNganChanSelectedComponent asset_prevention_selected={asset_prevention_selected} /> 
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={12}>
                                    <ThongTinGiaiToaComponent archive_book_type_id={archive_book_type_id}
                                                              archive_books={archive_books} 
                                                              archive_book_types={archive_book_types}
                                                              staticFileUrl={staticFileUrl}
                                                              release_file={release_file}
                                                              handleFileDrops={handleFileDrops}
                                                              handleDeleteFile={handleDeleteFile}/>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <NavLink to={`/hop-dongs/asset-releases/list`} className="btn-secondary p-2 text-dark">
                                Trở về Danh mục
                            </NavLink>

                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                {
                                    assetReleaseInfo && assetReleaseInfo.id ?
                                    "Cập nhật" : "Thêm mới"
                                }
                            </LaddaButton>
                        </CardFooter>
                    </Card>
                </Form>
                <ToastContainer />
            </div>
        );
    }
}

GiaiToaAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default GiaiToaAdd;