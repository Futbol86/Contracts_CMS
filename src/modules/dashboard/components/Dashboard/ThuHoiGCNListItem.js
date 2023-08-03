import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import { Button, Badge } from 'reactstrap';
import { isEmpty } from 'lodash';
import {API_SUB_URL_THU_HOI_GCN_FILES} from '../../../hop-dongs/constants';

const ThuHoiGCNListItem = ({thuHoiGCN, search_keys, staticFileUrl}) => {
    const { 
        id, eviction_number, eviction_date, eviction_org, license_number, eviction_file, eviction_asset, eviction_content,
        accountDetail, groupDetail, created_at, created_by, updated_at
    } = thuHoiGCN;

    let highlight_eviction_asset = "", highlight_eviction_number = "", highlight_license_number = "";
    
    if(search_keys) {
        highlight_eviction_asset = eviction_asset || "";
        highlight_eviction_number = eviction_number || "";
        highlight_license_number = license_number || "";

        search_keys && search_keys.map(item => {
            let eviction_asset_search_item = highlight_eviction_asset.search(new RegExp(item, "gi"));
            let eviction_asset_origin_item = highlight_eviction_asset.substring(eviction_asset_search_item, eviction_asset_search_item + item.length);

            highlight_eviction_number = highlight_eviction_number.replace(new RegExp(item, "gi"), '<mark class="highlight-text"><strong>' + item + '</strong></mark>');
            highlight_license_number = highlight_license_number.replace(new RegExp(item, "gi"), '<mark class="highlight-text"><strong>' + item + '</strong></mark>');
            highlight_eviction_asset = highlight_eviction_asset.replace(new RegExp(item, "gi"), '<mark class="highlight-text"><strong>' + eviction_asset_origin_item + '</strong></mark>');
        });
    }

    let eviction_number_text = highlight_eviction_number;
    let eviction_asset_text = highlight_eviction_asset;

    return (
        <tr>
            <td>
                <div dangerouslySetInnerHTML={{__html: eviction_number_text}}></div>
            </td>
            <td>
                <FormattedDate value={eviction_date}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate>
            </td>
            <td>
                {eviction_org}
            </td>
            <td>
                <div dangerouslySetInnerHTML={{__html: highlight_license_number}}></div>
                {/* {license_number} */}
            </td>
            <td style={{whiteSpace: "pre-wrap"}}>
                {
                    <React.Fragment>
                        <div dangerouslySetInnerHTML={{__html: eviction_asset_text}}></div>
                    </React.Fragment>
                }       
            </td>
            <td style={{whiteSpace: "pre-wrap"}}>
                {
                    <React.Fragment>
                           <div dangerouslySetInnerHTML={{__html: eviction_content}}></div>
                    </React.Fragment>
                }       
            </td>
            <td>
                {
                    eviction_file &&
                    <a href={`${staticFileUrl}${API_SUB_URL_THU_HOI_GCN_FILES}/${eviction_file}`} target="_blank">
                         <i className="icon-docs" />
                    </a> 
                }
            </td>
            <td>
                {accountDetail && accountDetail.fullname}
            </td>
            <td>
                {groupDetail && groupDetail.group_name}
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

ThuHoiGCNListItem.propTypes = {
    thuHoiGCN: PropTypes.object.isRequired
};

export default ThuHoiGCNListItem;