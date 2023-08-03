import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import ToChucListItem from "./ToChucListItem";
import ToChucListFilter from '../../containers/DoiTuong/ToChucListFilter';

const ToChucList = ({userData, owners, isEnableAddEdit, handleDeleteClick, pagination, onChangePage}) => {
    return (
        <React.Fragment>
            <div className="float-right mb-2">
                <ToChucListFilter />
            </div>
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>TÊN</th>
                        <th>NGƯỜI ĐẠI DIỆN</th>
                        <th>SỐ GCN DOANH NGHIỆP</th>
                        <th>SDT</th>
                        <th>ĐỊA CHỈ</th>
                        <th>TÌNH TRẠNG</th>
                        <th>NGƯỜI TẠO</th>
                        <th>NGÀY TẠO</th>
                        <th align="center"></th>
                    </tr>
                </thead>
                <tbody>
                    {(owners && owners.length > 0)
                        ? owners.map((owner, idx) => (
                            <ToChucListItem key={idx} userData={userData} owner={owner} isEnableAddEdit={isEnableAddEdit} handleDeleteClick={handleDeleteClick}/>
                        ))
                        : <tr><td colSpan={10}>Không tìm thấy Chủ Sở Hữu</td></tr>
                    }
                </tbody>
            </Table>
        </React.Fragment>
    )
};

ToChucList.propTypes = {
    owners: PropTypes.array
};

export default ToChucList;