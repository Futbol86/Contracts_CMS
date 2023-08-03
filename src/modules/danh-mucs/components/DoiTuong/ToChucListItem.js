import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedDate, FormattedTime} from 'react-intl';
import PropTypes from "prop-types";

const ToChucListItem = ({userData, owner, isEnableAddEdit, handleDeleteClick}) => {
    const { id, fullname, representer, license_no, phone, address, status, created_at, created_by, createdByDetail, } = owner || {};
    let statusComponent;

    if(status !== 3){
        statusComponent = <span>Được phép giao dịch</span> 
    } else {
        statusComponent = <span className="text-danger">Đang bị ngăn chặn</span> 
    }

    let createdByName;
    let isEnableEditAndDelete = false;

    if(createdByDetail && createdByDetail.username) {
        createdByName = createdByDetail && createdByDetail.username 
                        + ` (` + (createdByDetail && createdByDetail.userGroupDetail && createdByDetail.userGroupDetail.group_name) + `)`
        isEnableEditAndDelete = parseInt(created_by) === userData.id;
    } else {
        createdByName = created_by;
        isEnableEditAndDelete = created_by === userData.username;
    }

    return (
        <tr>
            <td>
                {/* <NavLink to={`/danh-mucs/owner/edit/${id}`} title="Sửa Đối tượng" className="p-1"> */}
                    {id}
                {/* </NavLink> */}
            </td>
            <td>
                {fullname}
            </td>
            <td>
                {representer}
            </td>
            <td>
                {license_no}
            </td>
            <td>
                {phone}
            </td>
            <td>
                {address}
            </td>
            <td>
                {statusComponent}
            </td>
            <td>
                {createdByName}
            </td>
            <td>
                <FormattedTime value={created_at}></FormattedTime>{`  `}
                <FormattedDate value={created_at}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate>
            </td>
            <td align="center">
                {
                    isEnableAddEdit === true && isEnableEditAndDelete === true &&
                    <React.Fragment>
                        <NavLink to={`/danh-mucs/owner/edit/${id}`} title="Sửa Đối tượng" className="p-1">
                            <i className="icon-pencil" />
                        </NavLink>
                        <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Đối tượng"
                                onClick={() => handleDeleteClick(id)}>
                            <i className="icon-minus"/>
                        </button>
                    </React.Fragment>
                }       
            </td>
        </tr>
    )
};

ToChucListItem.propTypes = {
    owner: PropTypes.object.isRequired
};

export default ToChucListItem;