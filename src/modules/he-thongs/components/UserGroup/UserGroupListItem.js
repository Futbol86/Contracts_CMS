import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {ACCOUNT_STATUS, GROUP_TYPES} from "../../constants";

const UserGroupListItem = ({userGroup, handleDeleteClick}) => {
    const { 
        id, group_code, group_name, group_type, address, parent_group, parentGroupDetail, 
        status, secretKey, departmentCode, userRequestTNMTData, passwordRequestTNMTData } = userGroup;
    
    let findAGroupType = GROUP_TYPES.find(item => item.id === parseInt(group_type));

    return (
        <tr>
            <td>
                {id}
            </td>
            <td>
                {group_code}
            </td>
            <td>
                {group_name}
            </td>
            <td>
                {findAGroupType && findAGroupType.name}
            </td>
            <td>
                {address}
            </td>
            <td>
                {parentGroupDetail && parentGroupDetail.group_name}
            </td>
            <td>
                {secretKey}
            </td>
            <td>
                {departmentCode}
            </td>
            <td>
                {userRequestTNMTData}
            </td>
            <td>
                {passwordRequestTNMTData}
            </td>
            <td align="center">
                <NavLink to={`/he-thongs/user-groups/edit/${id}`} title="Sửa Đơn Vị" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>
                <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Đơn Vị"
                        onClick={() => handleDeleteClick(id)}>
                    <i className="icon-minus"/>
                </button>
            </td>
        </tr>
    )
};

UserGroupListItem.propTypes = {
    userGroup: PropTypes.object.isRequired
};

export default UserGroupListItem;