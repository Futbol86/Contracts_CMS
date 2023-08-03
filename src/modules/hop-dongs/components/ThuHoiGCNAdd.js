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
import ThongTinThuHoiComponent from './ThuHoiGCN/ThongTinThuHoi';

import ThongTinNganChanComponent from './NganChan/ThongTinNganChan';
import TaiSanHistoriesModal from '../../danh-mucs/containers/PDFModal/TaiSanHistoriesModal';

class ThuHoiGCNAdd extends Component {
    render(){
        const { 
            thuHoiGCNInfo, staticFileUrl, eviction_file, handleFileDrops, handleDeleteFile, handleSubmit, 
            error, submitting, pristine, invalid, reset 
        } = this.props;

        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {
                                    thuHoiGCNInfo && thuHoiGCNInfo.id ? "Sửa Thu hồi/Huỷ Giấy chứng nhận" 
                                                                      : "Thêm Thu hồi/Huỷ Giấy chứng nhận"
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col xs={12}>
                                    <ThongTinThuHoiComponent staticFileUrl={staticFileUrl}
                                                             file_name={eviction_file}
                                                             handleFileDrops={handleFileDrops}
                                                             handleDeleteFile={handleDeleteFile}/>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <NavLink to={`/hop-dongs/thu-hoi-gcns/list`} className="btn-secondary p-2 text-dark">
                                Trở về Danh mục
                            </NavLink>

                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                {
                                    thuHoiGCNInfo && thuHoiGCNInfo.id ?
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

ThuHoiGCNAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default ThuHoiGCNAdd;