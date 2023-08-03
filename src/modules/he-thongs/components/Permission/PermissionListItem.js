import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
// import {ACCOUNT_STATUS} from "../../constants";

const PermissionListItem = ({permission, handleDeleteClick}) => {
    const { id, name, description, status } = permission || {};
    //var status_name = ACCOUNT_STATUS[status];
    // if(findAnAccountPermission) {
    //     if(findAnAccountPermission.id === 1) {
    //         role_name = "ADMIN";
    //     } else if(findAnAccountPermission.id === 2) {
    //         role_name = "QUẢN LÝ";
    //     } else {
    //         role_name = "NHÂN VIÊN";
    //     }
    // }

    return (
        <tr>
            <td>
                {id}
            </td>
            <td>
                {name}
            </td>
            <td>
                {description}
            </td>
            {/* <td>
                {status}
            </td> */}
            <td align="center">
                <NavLink to={`/he-thongs/user-group/edit/${id}`} title="Sửa Quyền" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>
                <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Quyền"
                        onClick={() => handleDeleteClick(id)}>
                    <i className="icon-minus"/>
                </button>
            </td>
        </tr>
    )
};

PermissionListItem.propTypes = {
    permission: PropTypes.object.isRequired
};

export default PermissionListItem;