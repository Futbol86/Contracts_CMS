import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {STATUS} from "../../constants";

const LoaiSoLuuTruListItem = ({archiveBookType, handleDeleteClick}) => {
    const { id, name, description, status } = archiveBookType;

    return (
        <tr>
            <td>
                <NavLink to={`/danh-mucs/archive-book-type/edit/${id}`} title="Sửa Loại Sổ lưu trữ" className="p-1">
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
                {STATUS[status]}
            </td>
            <td align="center">
                <NavLink to={`/danh-mucs/archive-book-type/edit/${id}`} title="Sửa Loại Sổ lưu trữ" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>
                <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Loại Sổ lưu trữ"
                        onClick={() => handleDeleteClick(id)}>
                    <i className="icon-minus"/>
                </button>
            </td>
        </tr>
    )
};

LoaiSoLuuTruListItem.propTypes = {
    archiveBookType: PropTypes.object.isRequired
};

export default LoaiSoLuuTruListItem;