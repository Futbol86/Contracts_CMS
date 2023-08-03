import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import UserLogListItem from "./UserLog/UserLogListItem";
import Pagination from '../../../components/common/Pagination';
import UserLogListFilter from '../containers/UserLog/UserLogListFilter';

const UserLogList = ({userLogs, userGroups, handleDeleteClick, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>Quản Lý Nhật Ký</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <UserLogListFilter userGroups={userGroups}/>
                        </div>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>THAO TÁC</th>
                                    <th>NỘI DUNG</th>
                                    <th>NGƯỜI DÙNG</th>
                                    <th>THUỘC ĐƠN VỊ</th>
                                    <th>THỜI GIAN</th>
                                    <th>ĐỊA CHỈ IP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(userLogs && userLogs.length > 0)
                                    ? userLogs.map((userLog, idx) => (
                                        <UserLogListItem key={idx} userLog={userLog} handleDeleteClick={handleDeleteClick}/>
                                    ))
                                    : <tr><td colSpan={7}>Không tìm thấy Nhật ký</td></tr>
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

UserLogList.propTypes = {
    userLogs: PropTypes.array
};

export default UserLogList;