import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import { Button, Badge } from 'reactstrap';
import { isEmpty } from 'lodash';

const HopDongListItem = ({contract, isEnableAddEdit, handleDeleteClick, handleConfirmCompleteClick, handleConfirmCancelClick}) => {
    const { id, subContractTypeDetail, contract_no, contract_date, exchangeContractDetail, 
            assetDetails, fromOwnerDetails, toOwnerDetails, midOwnerDetails, 
            from_owners, to_owners, mid_owners,
            statusDetail, notary_name, contract_amount, created_at, groupDetail } = contract;

    let asset_names = assetDetails && assetDetails.map(item => item.license_number).join(", ");
    let from_owner_names, to_owner_names;
    
    if(isEmpty(fromOwnerDetails)) {
        if(!isEmpty(from_owners)) {
            from_owner_names = JSON.parse(from_owners) && JSON.parse(from_owners).related_owners 
                            && JSON.parse(from_owners).related_owners.map(item => item.fullname).join(", ");
        }
    } else {
        from_owner_names = fromOwnerDetails && fromOwnerDetails.map(
            item => item.fullname + " (Số giấy tờ: " + (item.license_no || item.identityId) + ")"
        ).join(", ");
    }

    if(isEmpty(toOwnerDetails)) {
        if(!isEmpty(to_owners)) {
            to_owner_names = JSON.parse(to_owners) && JSON.parse(to_owners).related_owners 
                        && JSON.parse(to_owners).related_owners.map(item => item.fullname).join(", ");
        }
    } else {
        to_owner_names = toOwnerDetails && toOwnerDetails.map(
            item => item.fullname + " (Số giấy tờ: " + (item.license_no || item.identityId) + ")"
        ).join(", ");
    }

    let statusComponent;

    if(statusDetail) {
        if(statusDetail.id === 1){
            statusComponent = <Badge>{statusDetail && statusDetail.name}</Badge> 
        } else if(statusDetail.id === 2){
            statusComponent = <Badge color="danger">{statusDetail && statusDetail.name}</Badge> 
        } else if(statusDetail.id === 3){
            statusComponent = <Badge color="success">{statusDetail && statusDetail.name}</Badge> 
        } else if(statusDetail.id === 4){
            statusComponent = <Badge>{statusDetail && statusDetail.name}</Badge> 
        } else if(statusDetail.id === 5){
            statusComponent = <Badge color="danger">{statusDetail && statusDetail.name}</Badge> 
        }
    }

    return (
        <tr>
            <td>
                <NavLink to={`/hop-dongs/contract/view/${id}`} title="Xem Hợp đồng" className="p-1">
                    {id}
                </NavLink>
            </td>
            <td>
                {subContractTypeDetail && subContractTypeDetail.name}
            </td>
            <td>
                {contract_no}
            </td>
            <td>
                <FormattedDate value={contract_date}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate>
            </td>
            <td>
                {from_owner_names}
            </td>
            <td>
                {to_owner_names}
            </td>
            <td>
                {asset_names}
            </td>
            <td>
                {notary_name}
            </td>
            <td>
                {groupDetail && groupDetail.group_name}
            </td>
            <td>
                <FormattedNumber value={contract_amount}></FormattedNumber>
            </td>
            <td>
                {statusComponent}
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
                    isEnableAddEdit === true &&
                    <React.Fragment>
                        <NavLink to={`/hop-dongs/contract/edit/${id}`} title="Sửa Hợp đồng" className="p-1">
                            <i className="icon-pencil" />
                        </NavLink>
                        <button type="button" className="btn btn-link pl-1 pt-0" title="Huỷ Hợp đồng"
                                onClick={() => handleConfirmCancelClick(id)}>
                            <i className="icon-minus"/>
                        </button>
                        <button type="button" className="btn btn-link pl-1 pt-0" title="Hoàn thành hợp đồng"
                                onClick={() => handleConfirmCompleteClick(id)}>
                            <i className="fa fa-check"/>
                        </button>
                    </React.Fragment>
                }
            </td>
        </tr>
    )
};

HopDongListItem.propTypes = {
    contract: PropTypes.object.isRequired
};

export default HopDongListItem;