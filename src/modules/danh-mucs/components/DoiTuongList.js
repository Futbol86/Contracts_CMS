import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CaNhanList from "./DoiTuong/CaNhanList";
import ToChucList from "./DoiTuong/ToChucList";
import Pagination from '../../../components/common/Pagination';

const DoiTuongList = ({userData, owners, tabIndex, isEnableAddEdit, handleChangeTabs, handleDeleteClick, pagination, onChangePage}) => {
    const tabItems = [
        {
            key: 0,
            tabClassName: 'tab',
            panelClassName: 'tab-content tab-pane',
            title: 'CÁ NHÂN',
            getContent: () => <CaNhanList userData={userData} owners={owners} isEnableAddEdit={isEnableAddEdit} handleDeleteClick={handleDeleteClick}/>
        },

        {
            key: 1,
            tabClassName: 'tab',
            panelClassName: 'tab-content tab-pane',
            title: 'TỔ CHỨC',
            getContent: () => <ToChucList userData={userData} owners={owners} isEnableAddEdit={isEnableAddEdit} handleDeleteClick={handleDeleteClick}/>
        }
    ];

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h2>Danh sách Chủ Sở Hữu</h2>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <Tabs items={tabItems} transformWidth={400} selectedTabKey={tabIndex} onChange={handleChangeTabs}/>
                            <div className="mt-4 mb-4">
                                <Pagination pagination={pagination} onChangePage={onChangePage} />
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <ToastContainer />
        </div>
    )
};

DoiTuongList.propTypes = {
    owners: PropTypes.array
};

export default DoiTuongList;