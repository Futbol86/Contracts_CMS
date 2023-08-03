import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import NewHopDongListItem from "./NewHopDongListItem";

const NewHopDongList = ({contracts, staticFileUrl, search_keys, search_field, handleShowMoreClick, handleExportPhieuTraCuuClick}) => {
    return (
        <Card>
            <CardHeader>
                <h4>
                    Thông tin Hợp đồng
                </h4>
            </CardHeader>
            <CardBody>
                    <Table responsive striped>
                        <thead>
                            <tr>
                                <th className='text-center'>Ngày công chứng</th>
                                <th className='text-center'>Số hợp đồng</th>
                                <th className='text-center'>Tên hợp đồng</th>
                                <th style={{minWidth: '250px'}} className='text-center'>Bên liên quan</th>
                                <th style={{minWidth: '250px'}} className='text-center'>Nội dung</th>
                                <th className='text-center'>Công chứng viên</th>
                                <th className='text-center'>Tổ chức công chứng</th>
                                <th className='text-center'>Thời gian đưa lên hệ thống</th>
                                <th className='text-center'>Lần cập nhật cuối</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {(contracts && contracts.length > 0)
                                ? contracts.map((contract, idx) => (
                                    <NewHopDongListItem key={idx} contract={contract} search_keys={search_keys} search_field={search_field}
                                                        handleShowMoreClick={handleShowMoreClick}
                                                        handleExportPhieuTraCuuClick={handleExportPhieuTraCuuClick}/>
                                ))
                                : <tr><td colSpan={9}>Không tìm thấy thông tin</td></tr>
                            }
                        </tbody>
                    </Table>
            </CardBody>
        </Card>
    )
};

NewHopDongList.propTypes = {
    asset_preventions: PropTypes.array
};

export default NewHopDongList;