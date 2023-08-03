import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import BatDongSanListItem from "./BatDongSanListItem";
import BatDongSanListFilter from '../../containers/TaiSan/BatDongSanListFilter';

const BatDongSanList = ({userData, assets, isEnableAddEdit, handleShowHistoryClick, handleDeleteClick}) => {
    return (
        <React.Fragment>
            <div className="float-right mb-2">
                <BatDongSanListFilter />
            </div>
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>LOẠI TÀI SẢN</th>
                        <th>SỐ GIẤY CHỨNG NHẬN</th>
                        <th>ĐỊA CHỈ</th>
                        <th>THÔNG TIN</th>
                        <th>NGÀY CẤP</th>
                        <th>NƠI CẤP</th>
                        {/* <th>CHỦ SỠ HỮU</th> */}
                        <th>TRẠNG THÁI</th>
                        <th>NGƯỜI TẠO</th>
                        <th>NGÀY TẠO</th>
                        <th align="center"></th>
                    </tr>
                </thead>
                <tbody>
                    {(assets && assets.length > 0)
                        ? assets.map((asset, idx) => (
                            <BatDongSanListItem key={idx} userData={userData} asset={asset} isEnableAddEdit={isEnableAddEdit} 
                                                handleShowHistoryClick={handleShowHistoryClick} handleDeleteClick={handleDeleteClick}/>
                        ))
                        : <tr><td colSpan={9}>Không tìm thấy Bất Động Sản</td></tr>
                    }
                </tbody>
            </Table>
        </React.Fragment>
    )
};

BatDongSanList.propTypes = {
    assets: PropTypes.array
};

export default BatDongSanList;