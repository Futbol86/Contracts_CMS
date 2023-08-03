import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedDate, FormattedTime} from 'react-intl';
import {Badge} from 'reactstrap'
import PropTypes from "prop-types";

const RequestTNMTLandDataReportListItem = ({requestTNMTLandDataReport}) => {
    const { 
        id, requester, group_id, accountDetail, groupDetail, transaction_code, 
        has_result, search_result, created_at, create_by 
    } = requestTNMTLandDataReport || {};
    return (
        <tr>
            <td>
                {id}
            </td>
            <td>
                {accountDetail && accountDetail.username}
            </td>
            <td>
                {accountDetail && accountDetail.groupDetail && accountDetail.groupDetail.group_code}
            </td>
            <td>
                {transaction_code}
            </td>
            <td>
                <FormattedTime value={created_at}></FormattedTime>{`  `}
                <FormattedDate value={created_at}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate>
        
            </td>
            <td>
                {search_result && search_result.length > 100 ? search_result.substring(0, 100) + "....................." : search_result}
            </td>
            <td>
                {has_result ? <Badge color="success">Thành công</Badge> : <Badge color="danger">Thất bại</Badge>}
            </td>
        </tr>
    )
};

RequestTNMTLandDataReportListItem.propTypes = {
    requestTNMTLandDataReport: PropTypes.object.isRequired
};

export default RequestTNMTLandDataReportListItem;