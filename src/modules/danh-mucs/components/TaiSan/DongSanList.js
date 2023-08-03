import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import DongSanListItem from "./DongSanListItem";
import DongSanListFilter from '../../containers/TaiSan/DongSanListFilter';

const DongSanList = ({userData, assets, isEnableAddEdit, handleShowHistoryClick, handleDeleteClick}) => {
    return (
        <React.Fragment>
            <div className="float-right mb-2">
                <DongSanListFilter />
            </div>
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>LOẠI TÀI SẢN</th>
                        <th>SỐ GIẤY CHỨNG NHẬN</th>
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
                            <DongSanListItem key={idx} userData={userData} asset={asset} isEnableAddEdit={isEnableAddEdit} 
                                             handleShowHistoryClick={handleShowHistoryClick} handleDeleteClick={handleDeleteClick}/>
                        ))
                        : <tr><td colSpan={7}>Không tìm thấy Động Sản</td></tr>
                    }
                </tbody>
            </Table>
        </React.Fragment>
    )
};

DongSanList.propTypes = {
    assets: PropTypes.array
};

export default DongSanList;