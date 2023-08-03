import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import CaNhanListItem from "./CaNhanListItem";
import CaNhanListFilter from '../../containers/DoiTuong/CaNhanListFilter';

const CaNhanList = ({userData, owners, isEnableAddEdit, handleDeleteClick}) => {
    return (
        <React.Fragment>
            <div className="float-right mb-2">
                <CaNhanListFilter />
            </div>
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>TÊN</th>
                        <th>SỐ GIẤY TỜ</th>
                        <th>GIỚI TÍNH</th>
                        <th>NGÀY SINH</th>
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
                            <CaNhanListItem key={idx} userData={userData} owner={owner} isEnableAddEdit={isEnableAddEdit} handleDeleteClick={handleDeleteClick}/>
                        ))
                        : <tr><td colSpan={10}>Không tìm thấy Chủ Sở Hữu</td></tr>
                    }
                </tbody>
            </Table>
        </React.Fragment>
    )
};

CaNhanList.propTypes = {
    owners: PropTypes.array
};

export default CaNhanList;