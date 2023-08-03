import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import DoiTuongListItem from "./DoiTuongListItem";
import Pagination from '../../../../components/common/Pagination';

const DoiTuongList = ({
            hasSelectOption, isEnableAddEdit, userData, asset_preventions, sub_asset_types, staticFileUrl,
            handleDeleteClick, handleSelectAssetPrevention
    }) => {

    return(
        <Table responsive striped>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>BẢN ÁN/QUYẾT ĐỊNH</th>
                    <th>NGÀY BAN HÀNH</th>
                    <th>ĐỐI TƯỢNG NGĂN CHẶN</th>
                    <th>SỐ GIẤY TỜ</th>
                    <th>NỘI DUNG NGĂN CHẶN/VB ĐÍNH KÈM</th>
                    <th>CHẤP HÀNH VIÊN</th>
                    <th>TRẠNG THÁI</th>
                    <th>NGƯỜI TẠO</th>
                    <th>NGÀY TẠO</th>
                    <th align="center"></th>
                </tr>
            </thead>
            <tbody>
                {(asset_preventions && asset_preventions.length > 0)
                    ? asset_preventions.map((asset_prevention, idx) => (
                        <DoiTuongListItem key={idx} hasSelectOption={hasSelectOption} 
                                          isEnableAddEdit={isEnableAddEdit}
                                          userData={userData}
                                          asset_prevention={asset_prevention} 
                                          sub_asset_types={sub_asset_types} 
                                          staticFileUrl={staticFileUrl}
                                          handleDeleteClick={handleDeleteClick}
                                          handleSelectAssetPrevention={handleSelectAssetPrevention}/>
                    ))
                    : <tr><td colSpan={11}>Không tìm thấy Ngăn Chặn</td></tr>
                }
            </tbody>
        </Table>
    )
};

DoiTuongList.propTypes = {
    asset_preventions: PropTypes.array
};

export default DoiTuongList;