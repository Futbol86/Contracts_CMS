import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import { Button, Badge } from 'reactstrap';
import { isEmpty } from 'lodash';
import {MAX_DISPLAY_CHARACTER} from "../../constants";

const NewHopDongListItem = ({contract, handleShowMoreClick}) => {
    const { 
        id, contract_no, contract_date, contract_type_id, sub_contract_type_id,
        asset, from_owner, to_owner, note, status, contract_files, isApprove, 
        subContractTypeDetail, archiveBookDetail, accountDetail, userGroupDetail, created_at, updated_at, notary_name
    } = contract;

    return (
        <tr>
            <td>
                <FormattedDate value={contract_date}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate>
            </td>
            <td>
                {contract_no}
            </td>
            <td>
                {subContractTypeDetail && subContractTypeDetail.name}
            </td>
            <td style={{whiteSpace: "pre-wrap"}}>
                {
                    asset && asset.length > MAX_DISPLAY_CHARACTER ?
                    <React.Fragment>
                        <span dangerouslySetInnerHTML={{__html: asset.substring(0, MAX_DISPLAY_CHARACTER) + ' .........'}}></span>
                        <i onClick={() => handleShowMoreClick(asset)} className="icon-magnifier text-primary" style={{fontSize: '20px', fontWeight: "bold", cursor: "pointer"}}/>
                    </React.Fragment> :
                     <React.Fragment>
                           <div dangerouslySetInnerHTML={{__html: asset}}></div>
                     </React.Fragment>
                }       
            </td>
            <td style={{whiteSpace: "pre-wrap"}}>
                {
                    from_owner && from_owner.length > MAX_DISPLAY_CHARACTER ?
                    <React.Fragment>
                        <span dangerouslySetInnerHTML={{__html: from_owner.substring(0, MAX_DISPLAY_CHARACTER) + ' .........'}}></span>
                        <i onClick={() => handleShowMoreClick(from_owner)} className="icon-magnifier text-primary" style={{fontSize: '20px', fontWeight: "bold", cursor: "pointer"}}/>
                    </React.Fragment> :
                     <React.Fragment>
                           <div dangerouslySetInnerHTML={{__html: from_owner}}></div>
                     </React.Fragment>
                }       
            </td>
            <td style={{whiteSpace: "pre-wrap"}}>
                {
                    to_owner && to_owner.length > MAX_DISPLAY_CHARACTER ?
                    <React.Fragment>
                        <span dangerouslySetInnerHTML={{__html: to_owner.substring(0, MAX_DISPLAY_CHARACTER) + ' .........'}}></span>
                        <i onClick={() => handleShowMoreClick(to_owner)} className="icon-magnifier text-primary" style={{fontSize: '20px', fontWeight: "bold", cursor: "pointer"}}/>
                    </React.Fragment> :
                     <React.Fragment>
                           <div dangerouslySetInnerHTML={{__html: to_owner}}></div>
                     </React.Fragment>
                }       
           </td>
            <td>
                {
                    note && note.length > MAX_DISPLAY_CHARACTER ?
                    <React.Fragment>
                        <span dangerouslySetInnerHTML={{__html: note.substring(0, MAX_DISPLAY_CHARACTER) + ' .........'}}></span>
                        <i onClick={() => handleShowMoreClick(note)} className="icon-magnifier text-primary" style={{fontSize: '20px', fontWeight: "bold", cursor: "pointer"}}/>
                    </React.Fragment> :
                     <React.Fragment>
                           <div dangerouslySetInnerHTML={{__html: note}}></div>
                     </React.Fragment>
                }   
            </td>
            <td>{archiveBookDetail && archiveBookDetail.name}</td>
            <td>
                {notary_name}
                {/* {accountDetail && accountDetail.fullname} */}
            </td>
            <td>
                {userGroupDetail && userGroupDetail.group_name}
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
                {
                    updated_at &&
                    <React.Fragment>
                        <FormattedTime value={updated_at}></FormattedTime>{`  `}
                        <FormattedDate value={updated_at}>
                            {
                                parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                            }
                        </FormattedDate>
                    </React.Fragment>
                }
            </td>
            <td align="center">
                <React.Fragment>
                    <NavLink to={`/hop-dongs/new-contract/edit/${id}`} title="Sửa Hợp đồng" className="p-1">
                        <i className="icon-pencil" />
                    </NavLink>
                </React.Fragment>
            </td>
        </tr>
    )
};

NewHopDongListItem.propTypes = {
    contract: PropTypes.object.isRequired
};

export default NewHopDongListItem;