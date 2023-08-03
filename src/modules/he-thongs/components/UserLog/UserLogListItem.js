import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {FormattedDate, FormattedTime} from 'react-intl';
import {METHOD_STATUS} from "../../constants";

const UserLogListItem = ({userLog, handleDeleteClick}) => {
    const { id, method, message, username, event_time, remote_ip, createdByDetail, groupDetail } = userLog;
    var method_name = METHOD_STATUS[method];

    return (
        <tr>
            <td>
                {id}
            </td>
            <td>
                {method_name}
            </td>
            <td>
                {message}
            </td>
            <td>
                {username}
            </td>
            <td>
                {groupDetail && groupDetail.group_name}
            </td>
            <td>
                <FormattedDate value={event_time}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate> {` `}
                <FormattedTime value={event_time}></FormattedTime>
            </td>
            <td>
                {remote_ip}
            </td>
            <td align="center">
                <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Nhật Ký"
                        onClick={() => handleDeleteClick(id)}>
                    <i className="icon-minus"/>
                </button>
            </td>
        </tr>
    )
};

UserLogListItem.propTypes = {
    userLog: PropTypes.object.isRequired
};

export default UserLogListItem;