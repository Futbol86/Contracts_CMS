import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedDate, FormattedTime} from 'react-intl';
import PropTypes from "prop-types";
import {CONTRACT_TYPE_STATUS} from "../../constants";

const LoaiHopDongListItem = ({contractType, handleDeleteClick}) => {
    const { id, name, contractTypeDetail, status } = contractType || {};
    return (
        <tr>
            <td>
                <NavLink to={`/danh-mucs/sub-contract-type/edit/${id}`} title="Sửa Loại Hợp đồng" className="p-1">
                    {id}
                </NavLink>
            </td>
            <td>
                {name}
            </td>
            <td>
                {contractTypeDetail && contractTypeDetail.name}
            </td>
            <td>
                {CONTRACT_TYPE_STATUS[status]}
            </td>
            <td align="center">
                <NavLink to={`/danh-mucs/sub-contract-type/edit/${id}`} title="Sửa Loại Hợp đồng" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>
                <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Loại Hợp đồng"
                        onClick={() => handleDeleteClick(id)}>
                    <i className="icon-minus"/>
                </button>
            </td>
        </tr>
    )
};

LoaiHopDongListItem.propTypes = {
    contractType: PropTypes.object.isRequired
};

export default LoaiHopDongListItem;