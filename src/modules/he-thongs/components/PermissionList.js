import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import PermissionListItem from "./Permission/PermissionListItem";
import Pagination from '../../../components/common/Pagination';
import PermissionListFilter from '../containers/Permission/PermissionListFilter';

const PermissionList = ({permissions, handleDeleteClick, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>Quản Lý Quyền</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <PermissionListFilter />
                        </div>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>TÊN QUYỀN</th> 
                                    <th>MÔ TẢ</th> 
                                    {/* <th>TRẠNG THÁI</th>  */}
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(permissions && permissions.length > 0)
                                    ? permissions.map((permission, idx) => (
                                        <PermissionListItem key={idx} permission={permission} handleDeleteClick={handleDeleteClick}/>
                                    ))
                                    : <tr><td colSpan={5}>Không tìm thấy Quyền</td></tr>
                                }
                            </tbody>
                        </Table>

                        <Pagination pagination={pagination} onChangePage={onChangePage} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </div>
);

PermissionList.propTypes = {
    permissions: PropTypes.array
};

export default PermissionList;