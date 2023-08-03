import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedDate, FormattedTime} from 'react-intl';
import PropTypes from "prop-types";
import {CONTRACT_TYPE_STATUS} from "../../constants";

const LandPurposeListItem = ({landPurpose, handleDeleteClick}) => {
    const { id, name, description, status } = landPurpose || {};
    return (
        <tr>
            <td>
                <NavLink to={`/danh-mucs/land-purpose/edit/${id}`} title="Sửa Mục Đích Sử Dụng Đất" className="p-1">
                    {id}
                </NavLink>
            </td>
            <td>
                {name}
            </td>      
            <td>
                {description}
            </td>
            <td>
                {CONTRACT_TYPE_STATUS[status]}
            </td>
            <td align="center">
                <NavLink to={`/danh-mucs/land-purpose/edit/${id}`} title="Sửa Mục Đích Sử Dụng Đất" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>
                <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Mục Đích Sử Dụng Đất"
                        onClick={() => handleDeleteClick(id)}>
                    <i className="icon-minus"/>
                </button>
            </td>
        </tr>
    )
};

LandPurposeListItem.propTypes = {
    landPurpose: PropTypes.object.isRequired
};

export default LandPurposeListItem;