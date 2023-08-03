import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import TaiSanListItem from "./TaiSanListItem";
import Pagination from '../../../../components/common/Pagination';

const TaiSanList = ({
        hasSelectOption, isEnableAddEdit, userData, asset_preventions, sub_asset_types, staticFileUrl,
        handleDeleteClick, handleSelectAssetPrevention
    }) => {
    return (
        <Table responsive striped>
            <thead>
                <tr>
                    <th>BẢN ÁN/QUYẾT ĐỊNH</th>
                    <th>NGÀY BAN HÀNH</th>
                    <th>TÀI SẢN NGĂN CHẶN</th>
                    <th>ĐỐI TƯỢNG NGĂN CHẶN</th>
                    <th>NỘI DUNG NGĂN CHẶN</th>
                    <th>VĂN BẢN ĐÍNH KÈM</th>
                    <th>CHẤP HÀNH VIÊN</th>
                    <th>TRẠNG THÁI</th>
                    <th>NGƯỜI TẠO</th>
                    <th>THUỘC ĐƠN VỊ</th>
                    <th>NGÀY TẠO</th>
                    <th align="center"></th>
                </tr>
            </thead>
            <tbody>
                {(asset_preventions && asset_preventions.length > 0)
                    ? asset_preventions.map((asset_prevention, idx) => (
                        <TaiSanListItem key={idx} hasSelectOption={hasSelectOption} 
                                                  isEnableAddEdit={isEnableAddEdit}
                                                  userData={userData}
                                                  asset_prevention={asset_prevention} 
                                                  sub_asset_types={sub_asset_types} 
                                                  staticFileUrl={staticFileUrl}
                                                  handleDeleteClick={handleDeleteClick}
                                                  handleSelectAssetPrevention={handleSelectAssetPrevention}/>
                    ))
                    : <tr><td colSpan={12}>Không tìm thấy Ngăn Chặn</td></tr>
                }
            </tbody>
        </Table>
    )
};

TaiSanList.propTypes = {
    asset_preventions: PropTypes.array
};

export default TaiSanList;