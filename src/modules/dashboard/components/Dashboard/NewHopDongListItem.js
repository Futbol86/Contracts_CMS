import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import { Button, Badge } from 'reactstrap';
import { isEmpty } from 'lodash';
import {MAX_DISPLAY_CHARACTER} from "../../../hop-dongs/constants";

const NewHopDongListItem = ({contract, search_keys, search_field, handleShowMoreClick, handleExportPhieuTraCuuClick}) => {
    const { 
        id, contract_no, contract_date, contract_type_id, sub_contract_type_id, asset, from_owner, to_owner,
        note, status, contract_files, isApprove, subContractTypeDetail, accountDetail, userGroupDetail, notary_name, created_at, updated_at
    } = contract;

    let highlight_contract_no = "";
    let highlight_from_ower = "", highlight_to_owner = "";
    let highlight_asset = "";
    
    if(search_keys) {
        highlight_contract_no = contract_no || "";
        highlight_from_ower = from_owner || "";
        highlight_to_owner  = to_owner || "";
        highlight_asset     = asset || "";

        search_keys && search_keys.map(item => {
            let patternItem = `(^|[^a-zA-Z0-9./])` + item + `([^a-zA-Z0-9./]|$)`; //`/\W${item}\W*/`; ; //`(^|[^a-zA-Z0-9])` + item + `([^a-zA-Z0-9]|$)`;

            let from_owner_search_item = highlight_from_ower.search(new RegExp(patternItem, "gi"));
            let from_owner_origin_item = highlight_from_ower.substring(from_owner_search_item, from_owner_search_item + item.length);

            //console.log('--- patternItem', patternItem)
            // console.log('--- from_owner_search_item', from_owner_search_item)
            // console.log('--- from_owner_origin_item', from_owner_origin_item)

            let to_owner_search_item = highlight_to_owner.search(new RegExp(patternItem, "gi"));
            let to_owner_origin_item = highlight_to_owner.substring(to_owner_search_item, to_owner_search_item + item.length);

            let asset_search_item = highlight_asset.search(new RegExp(patternItem, "gi"));
            let asset_origin_item = highlight_asset.substring(asset_search_item, asset_search_item + item.length);

            // console.log('--- contract_no', contract_no)
            // console.log('--- asset_search_item', asset_search_item)
            // console.log('--- item.length', item.length)
            // console.log('--- asset_origin_item', asset_origin_item)

            highlight_contract_no = highlight_contract_no.replace(new RegExp(patternItem, "gi"), '<mark class="highlight-text"><strong>' + item + '</strong></mark>');
            highlight_from_ower = highlight_from_ower.replace(new RegExp(patternItem, "gi"), '<mark class="highlight-text"><strong>' + from_owner_origin_item + '</strong></mark>');
            highlight_to_owner  = highlight_to_owner.replace(new RegExp(patternItem, "gi"), '<mark class="highlight-text"><strong>' + to_owner_origin_item + '</strong></mark>');
           // highlight_asset     = highlight_asset.replace(patternItem, '<mark class="highlight-text"><strong>' + asset_origin_item + '</strong></mark>');

            highlight_asset     = highlight_asset.replace(new RegExp(patternItem, "gi"), '<mark class="highlight-text"><strong>' + item + '</strong></mark>');
        });
     
        // search_keys && search_keys.map(item => {
        //     let item = `(^|[^a-zA-Z0-9])` + item + `([^a-zA-Z0-9]|$)`;

        //     let from_owner_search_item = highlight_from_ower.search(new RegExp(item, "gi"));
        //     let from_owner_origin_item = highlight_from_ower.substring(from_owner_search_item, from_owner_search_item + item.length);

        //     let to_owner_search_item = highlight_to_owner.search(new RegExp(item, "gi"));
        //     let to_owner_origin_item = highlight_to_owner.substring(to_owner_search_item, to_owner_search_item + item.length);

        //     let asset_search_item = highlight_asset.search(new RegExp(item, "gi"));
        //     let asset_origin_item = highlight_asset.substring(asset_search_item, asset_search_item + item.length);

        //     console.log('---- item', item);

        //     highlight_contract_no = highlight_contract_no.replace(new RegExp(item, "gi"), '<mark class="highlight-text"><strong>' + item + '</strong></mark>');
        //     highlight_from_ower = highlight_from_ower.replace(new RegExp(item, "gi"), '<mark class="highlight-text"><strong>' + from_owner_origin_item + '</strong></mark>');
        //     highlight_to_owner  = highlight_to_owner.replace(new RegExp(item, "gi"), '<mark class="highlight-text"><strong>' + to_owner_origin_item + '</strong></mark>');
        //     highlight_asset     = highlight_asset.replace(new RegExp(item, "gi"), '<mark class="highlight-text"><strong>' + asset_origin_item + '</strong></mark>');
        // });
    }

    let owner_text = "<strong>Bên A:</strong> " + (search_field === "asset_content" || contract_no === "contract_no" ? from_owner : highlight_from_ower) 
                   + "\n\n<strong>Bên B:</strong> " + (search_field === "asset_content" || contract_no === "contract_no" ? to_owner : highlight_to_owner);
    let asset_text = "<strong>Tài sản:</strong> " + (search_field === "owner_content" || contract_no === "contract_no" ? asset : highlight_asset) 
                   + (note && note.length > 0 ? ("\n\n <strong>Nội dung Hợp Đồng:</strong> " + note) : "");

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
                <div dangerouslySetInnerHTML={{__html: highlight_contract_no}}></div>
            </td>
            <td>
                {subContractTypeDetail && subContractTypeDetail.name}
            </td>
            <td style={{whiteSpace: "pre-wrap"}}>
                {
                    owner_text && owner_text.length > MAX_DISPLAY_CHARACTER ?
                    <React.Fragment>
                        <span dangerouslySetInnerHTML={{__html: owner_text.substring(0, MAX_DISPLAY_CHARACTER) + ' .........'}}></span>
                        <i onClick={() => handleShowMoreClick(owner_text)} className="icon-magnifier text-primary" style={{fontSize: '20px', fontWeight: "bold", cursor: "pointer"}}/>
                    </React.Fragment> :
                     <React.Fragment>
                           <div dangerouslySetInnerHTML={{__html: owner_text}}></div>
                     </React.Fragment>
                }       
           </td>
            <td style={{whiteSpace: "pre-wrap"}}>
                {
                    asset_text && asset_text.length > MAX_DISPLAY_CHARACTER ?
                    <React.Fragment>
                        <span dangerouslySetInnerHTML={{__html: asset_text.substring(0, MAX_DISPLAY_CHARACTER) + ' .........'}}></span>
                        <i onClick={() => handleShowMoreClick(asset_text)} className="icon-magnifier text-primary" style={{fontSize: '20px', fontWeight: "bold", cursor: "pointer"}}/>
                    </React.Fragment> :
                     <React.Fragment>
                           <div dangerouslySetInnerHTML={{__html: asset_text}}></div>
                     </React.Fragment>
                }
            </td>
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
            <td>
                <Button color="secondary" onClick={() => handleExportPhieuTraCuuClick(asset, 500)}>
                    <i className='fa fa-file'></i>
                </Button>
            </td>
        </tr>
    )
};

NewHopDongListItem.propTypes = {
    contract: PropTypes.object.isRequired
};

export default NewHopDongListItem;