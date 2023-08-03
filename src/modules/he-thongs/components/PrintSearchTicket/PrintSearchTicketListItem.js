import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {FormattedDate, FormattedTime} from 'react-intl';

const PrintSearchTicketListItem = ({printSearchTicket}) => {
    const { 
        id, transaction_code, requester, requester_address, requester_phone, user_name, group_name,
        search_result, status, note, created_at, created_by } = printSearchTicket;

    return (
        <tr>
            <td>
                {id}
            </td>
            <td>
                <strong>{transaction_code}</strong>
            </td>
            <td>
                {requester} <br />
                - Địa chỉ: {requester_address} <br />
                - Số điện thoại: {requester_phone}
            </td>
            <td style={{whiteSpace: "pre-wrap"}}>
                {search_result} - Trạng thái <b>{status}</b>
            </td>
            <td style={{whiteSpace: "pre-wrap"}}>
                {note}
            </td>
            <td>
                {user_name}
            </td>
            <td>
                {group_name}
            </td>
            <td>
                <FormattedDate value={created_at}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate> {` `}
                <FormattedTime value={created_at}></FormattedTime>
            </td>
            <td>
                {created_by}
            </td>
        </tr>
    )
};

PrintSearchTicketListItem.propTypes = {
    printSearchTicket: PropTypes.object.isRequired
};

export default PrintSearchTicketListItem;