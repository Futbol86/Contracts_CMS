import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import UserGroupListItem from "./UserGroup/UserGroupListItem";
import Pagination from '../../../components/common/Pagination';
import UserGroupListFilter from '../containers/UserGroup/UserGroupListFilter';

const UserGroupList = ({userGroups, handleDeleteClick, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>Quản Lý Đơn Vị</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                             <UserGroupListFilter />
                        </div>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>MÃ ĐƠN VỊ</th> 
                                    <th>TÊN ĐƠN VỊ</th> 
                                    <th>LOẠI ĐƠN VỊ</th> 
                                    <th>ĐỊA CHỈ</th> 
                                    <th>ĐƠN VỊ QUẢN LÝ</th> 
                                    <th>SECRET KEY</th> 
                                    <th>DEPARTMENT CODE</th> 
                                    <th>USER</th> 
                                    <th>PASSWORD</th> 
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(userGroups && userGroups.length > 0)
                                    ? userGroups.map((userGroup, idx) => (
                                        <UserGroupListItem key={idx} userGroup={userGroup} handleDeleteClick={handleDeleteClick}/>
                                    ))
                                    : <tr><td colSpan={11}>Không tìm thấy Đơn Vị</td></tr>
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

UserGroupList.propTypes = {
    userGroups: PropTypes.array
};

export default UserGroupList;