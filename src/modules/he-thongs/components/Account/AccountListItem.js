import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import { Badge } from 'reactstrap';
import {ACCOUNT_STATUS, ACCOUNT_PERMISSION} from "./../../constants"
import { isArray } from 'lodash';

const AccountListItem = ({account, userGroups = [], handleDeleteClick, handleShowChangePasswordClick}) => {
    const { id, username, fullname, role_id, role_ids, group_id, status} = account;
   let findAUserGroup = userGroups.find(item => item.id === group_id);
   let findAAccountStatus = ACCOUNT_STATUS.find(item => item.id === status);
   let statusComponent;

   if(findAAccountStatus) {
       if(findAAccountStatus.id === 0){
           statusComponent = <Badge>{findAAccountStatus.name}</Badge> 
       } else if(findAAccountStatus.id === 1){
           statusComponent = <Badge color="danger">{findAAccountStatus.name}</Badge> 
       } else if(findAAccountStatus.id === 2){
           statusComponent = <Badge color="danger">{findAAccountStatus.name}</Badge> 
       }
   }

    // let role_name = "NHÂN VIÊN";
    // let findAnAccountPermission = ACCOUNT_PERMISSION.find(item => item.id === role_id);
    // if(findAnAccountPermission) {
    //     if(findAnAccountPermission.id === 1) {
    //         role_name = "ADMIN";
    //     } else if(findAnAccountPermission.id === 2) {
    //         role_name = "QUẢN LÝ";
    //     } else {
    //         role_name = "NHÂN VIÊN";
    //     }
    // }

    // let listAccountPermission =  role_ids && JSON.parse(role_ids) && isArray(JSON.parse(role_ids)) && JSON.parse(role_ids).map(role_id => {
    //     let findOneAccountPermission = ACCOUNT_PERMISSION.find(doc => doc.id === role_id);
    //     return (findOneAccountPermission ? findOneAccountPermission.name : "");
    // });

    let listAccountPermission =  role_ids && role_ids.map(role_id => {
        let findOneAccountPermission = ACCOUNT_PERMISSION.find(doc => doc.id === role_id);
        return (findOneAccountPermission ? findOneAccountPermission.name : "");
    });

    let accountPermissions = listAccountPermission ? listAccountPermission.join(", ") : null;

    return (
        <tr>
            <td>
                <NavLink to={`/he-thongs/accounts/edit/${id}`} title="Sửa Tài Khoản" className="p-1">
                    {id}
                </NavLink>
            </td>
            <td>
                {username}
            </td>
            <td>
                {fullname}
            </td>
            <td>
                {/* {role_name} */}
                {accountPermissions}
            </td>
            <td>
                {findAUserGroup && findAUserGroup.group_name}
            </td>
            <td>
                {statusComponent}
            </td>
            <td align="center">
                <NavLink to={`/he-thongs/accounts/edit/${id}`} title="Sửa Tài Khoản" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>
                <button type="button" className="btn btn-link pl-1 pt-0" title="Thay Đổi Mật Khẩu"
                        onClick={() => handleShowChangePasswordClick(id)}>
                    <i className="icon-key"/>
                </button>
                <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Tài Khoản"
                        onClick={() => handleDeleteClick(id)}>
                    <i className="icon-minus"/>
                </button>
            </td>
        </tr>
    )
};

AccountListItem.propTypes = {
    account: PropTypes.object.isRequired
};

export default AccountListItem;