import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import Modal from "react-modal";

import AccountListItem from "./Account/AccountListItem";
import Pagination from '../../../components/common/Pagination';
import AccountListFilter from '../containers/Account/AccountListFilter';
import AccountChangePasswordModal from '../containers/PDFModal/AccountChangePasswordModal'

const AccountList = ({
        accounts, userGroups, currentModalId, handleDeleteClick, 
        handleShowChangePasswordClick, handleModalChange, pagination, onChangePage}) => {

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h2>Danh sách Tài Khoản</h2>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <div className="float-right mb-2">
                                <AccountListFilter />
                            </div>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>TÊN TÀI KHOẢN</th>
                                        <th>HỌ TÊN</th>
                                        <th>VAI TRÒ/QUYỀN</th>
                                        <th>THUỘC ĐƠN VỊ</th>
                                        <th>TRẠNG THÁI</th>
                                        <th align="center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(accounts && accounts.length > 0)
                                        ? accounts.map((account, idx) => (
                                            <AccountListItem key={idx} account={account} 
                                                             userGroups={userGroups} 
                                                             handleDeleteClick={handleDeleteClick}
                                                             handleShowChangePasswordClick={handleShowChangePasswordClick}/>
                                        ))
                                        : <tr><td colSpan={7}>Không tìm thấy Tài Khoản</td></tr>
                                    }
                                </tbody>
                            </Table>

                            <Pagination pagination={pagination} onChangePage={onChangePage} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Modal className="Modal__Bootstrap modal-dialog modal-dialog2 modal-md"
                isOpen={currentModalId === 1}
                contentLabel="Thay đổi Mật khẩu tài khoản"
                style={{content: {outline: 0}}}
            >
                <AccountChangePasswordModal
                    handleModalClose={() => handleModalChange(0)}
                />
            </Modal>
        </div>
    )
};

AccountList.propTypes = {
    accounts: PropTypes.array
};

export default AccountList;