import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import NewNganChanListItem from "./NewNganChanListItem";

const NewNganChanList = ({asset_preventions, staticFileUrl, search_keys, handleShowMoreClick, handleExportPhieuTraCuuClick}) => {
    return (
        <Card>
            <CardHeader>
                <h4>
                    Thông tin Ngăn chặn/Giải toả
                </h4>
            </CardHeader>
            <CardBody>
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>Bản án/Quyết định</th>
                            <th>Ngày ban hành</th>
                            <th>Tài sản ngăn chặn</th>
                            <th>Đối tượng ngăn chặn</th>
                            <th>Nội dung ngăn chặn</th>
                            <th>Văn bản đính kèm</th>
                            <th>Chấp hành viên</th>
                            <th>Trạng thái</th>
                            <th>Đơn vị tạo</th>
                            <th>Ngày tạo</th>
                            <th align="center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(asset_preventions && asset_preventions.length > 0)
                            ? asset_preventions.map((asset_prevention, idx) => (
                                <NewNganChanListItem key={idx} asset_prevention={asset_prevention} staticFileUrl={staticFileUrl} 
                                                     search_keys={search_keys} handleShowMoreClick={handleShowMoreClick} 
                                                     handleExportPhieuTraCuuClick={handleExportPhieuTraCuuClick}/>
                            ))
                            : <tr><td colSpan={11}>Không tìm thấy thông tin Ngăn chặn</td></tr>
                        }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
};

NewNganChanList.propTypes = {
    asset_preventions: PropTypes.array
};

export default NewNganChanList;