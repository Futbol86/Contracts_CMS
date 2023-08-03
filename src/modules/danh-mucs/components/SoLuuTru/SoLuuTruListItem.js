import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedDate, FormattedTime} from 'react-intl';
import PropTypes from "prop-types";
import {STATUS} from "../../constants";

const SoLuuTruListItem = ({archiveBook, handleDeleteClick}) => {
    const { id, archiveBookTypeDetail, name, description, open_date, close_date, status, created_by, userGroupDetail } = archiveBook;

    return (
        <tr>
            <td>
                <NavLink to={`/danh-mucs/archive-book/edit/${id}`} title="Sửa Sổ lưu trữ" className="p-1">
                    {id}
                </NavLink>
            </td>
            <td>
                {archiveBookTypeDetail && archiveBookTypeDetail.name}
            </td>
            <td>
                {name}
            </td>
            <td>
                {description}
            </td>
            <td>
                <FormattedDate value={open_date}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate>
            </td>
            <td>
                <FormattedDate value={close_date}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate>
            </td>
            <td>
                {STATUS[status]}
            </td>
            <td>{userGroupDetail && userGroupDetail.group_name || created_by}</td>
            <td align="center">
                <NavLink to={`/danh-mucs/archive-book/edit/${id}`} title="Sửa Sổ lưu trữ" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>
                <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Sổ lưu trữ"
                        onClick={() => handleDeleteClick(id)}>
                    <i className="icon-minus"/>
                </button>
            </td>
        </tr>
    )
};

SoLuuTruListItem.propTypes = {
    archiveBook: PropTypes.object.isRequired
};

export default SoLuuTruListItem;