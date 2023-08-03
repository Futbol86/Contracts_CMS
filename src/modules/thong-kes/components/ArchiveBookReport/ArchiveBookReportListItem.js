import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import { Button, Badge } from 'reactstrap';
import {MAX_DISPLAY_CHARACTER} from '../../../hop-dongs/constants';

const ArchiveBookReportListItem = ({contract, handleShowMoreClick}) => {
    const { 
        id, contract_no, contract_date, contract_type_id, sub_contract_type_id,
        asset, from_owner, to_owner, note, status, contract_files, isApprove, 
        subContractTypeDetail, archiveBookDetail, accountDetail, userGroupDetail, created_at, updated_at
    } = contract;

    let owner_text = "<strong>Bên A:</strong> " + from_owner + "\n\n<strong>Bên B:</strong> " + to_owner;
    let asset_text = "<strong>Tài sản:</strong> " + (asset || "");

    return (
        <tr>
            <td>{id}</td>
            <td>
                {archiveBookDetail && archiveBookDetail.name}
            </td>
            <td>
                {userGroupDetail && userGroupDetail.group_name}
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
            <td style={{whiteSpace: "pre-wrap"}}>
                {
                    owner_text && owner_text.length > MAX_DISPLAY_CHARACTER ?
                    <React.Fragment>
                        <span dangerouslySetInnerHTML={{__html: owner_text.substring(0, MAX_DISPLAY_CHARACTER) + ' .........'}}></span>
                        <i onClick={() => handleShowMoreClick(owner_text)} className="icon-magnifier text-primary" 
                           style={{fontSize: '20px', fontWeight: "bold", cursor: "pointer"}}/>
                    </React.Fragment> :
                     <React.Fragment>
                           <div dangerouslySetInnerHTML={{__html: owner_text}}></div>
                     </React.Fragment>
                }
            </td>
            <td>
                {subContractTypeDetail && subContractTypeDetail.name}
            </td>
            <td>
               {accountDetail && accountDetail.fullname}
            </td>
            <td style={{whiteSpace: "pre-wrap"}}>
                {
                    asset_text && asset_text.length > MAX_DISPLAY_CHARACTER ?
                    <React.Fragment>
                        <span dangerouslySetInnerHTML={{__html: asset_text.substring(0, MAX_DISPLAY_CHARACTER) + ' .........'}}></span>
                        <i onClick={() => handleShowMoreClick(asset_text)} className="icon-magnifier text-primary" 
                           style={{fontSize: '20px', fontWeight: "bold", cursor: "pointer"}}/>
                    </React.Fragment> :
                     <React.Fragment>
                           <div dangerouslySetInnerHTML={{__html: asset_text}}></div>
                     </React.Fragment>
                }
            </td>
            <td>
                {note}
            </td>
            <td>
                <FormattedTime value={created_at}></FormattedTime>{`  `}
                <FormattedDate value={created_at}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate>
            </td>
        </tr>
    )
};

ArchiveBookReportListItem.propTypes = {
    contract: PropTypes.object.isRequired
};

export default ArchiveBookReportListItem;