import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table, CardFooter, Button } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import GiaiToaListItem from "./GiaiToa/GiaiToaListItem";
import Pagination from '../../../components/common/Pagination';
import GiaiToaListFilter from '../containers/GiaiToa/GiaiToaListFilter';

const GiaiToaList = ({
    userData, asset_releases,  userGroups, isEnableAddEdit, sub_asset_types, staticFileUrl, 
    handleDeleteClick, pagination, onChangePage, handleExportExcelFile}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>Danh sách Giải Toả</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <GiaiToaListFilter userGroups={userGroups}/>
                        </div>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>SỐ QĐ GIẢI TOẢ</th> 
                                    <th>NGÀY GIẢI TOẢ</th>
                                    <th>TÀI SẢN GIẢI TOẢ</th>
                                    <th>NỘI DUNG GIẢI TOẢ</th>
                                    <th>VĂN BẢN ĐÍNH KÈM</th>
                                    <th>CHẤP HÀNH VIÊN</th>
                                    <th>NGƯỜI TẠO</th>
                                    <th>THUỘC ĐƠN VỊ</th>
                                    <th>NGÀY TẠO</th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(asset_releases && asset_releases.length > 0)
                                    ? asset_releases.map((asset_release, idx) => (
                                        <GiaiToaListItem key={idx} isEnableAddEdit={isEnableAddEdit} userData={userData} asset_release={asset_release} staticFileUrl={staticFileUrl}
                                                         sub_asset_types={sub_asset_types} handleDeleteClick={handleDeleteClick}/>
                                    ))
                                    : <tr><td colSpan={10}>Không tìm thấy Giải Toả</td></tr>
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
    </div>
);

GiaiToaList.propTypes = {
    asset_releases: PropTypes.array
};

export default GiaiToaList;