import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {Field} from "redux-form";
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import {Button, Badge} from 'reactstrap';
import {API_SUB_URL_NGAN_CHAN_FILES, MAX_DISPLAY_CHARACTER} from "../../../hop-dongs/constants";

const NewNganChanListItem = ({asset_prevention, search_keys, staticFileUrl, handleShowMoreClick, handleExportPhieuTraCuuClick}) => {
    const { 
        judgments_decision_number, judgments_decision_date, prevention_content, prevention_user, assetReleaseDetail, 
        asset_prevention_type, license_number, land_number, map_paper_number, license_no,
        asset_info, file_name, created_at, created_by, groupDetail,
    } = asset_prevention || {};

    let statusComponent;

    if(assetReleaseDetail) {
        if(assetReleaseDetail.id){
            statusComponent = 
                <span>
                    Đã Giải toả theo quyết định {`  `}
                    <a href='#'>{assetReleaseDetail && assetReleaseDetail.release_number}</a> 
                </span>
        } else {
            statusComponent = <Badge>Đang Ngăn chặn</Badge> 
        }
    }

    let highlight_asset_info = "", highlight_judgments_decision_number = "";
    
    if(search_keys) {
        highlight_judgments_decision_number = judgments_decision_number || "";

        if(asset_prevention_type === "asset_prevention_land" || asset_prevention_type === "asset_movables") {
            highlight_asset_info = `<b>Giấy CN:` + license_number + `, Số thửa:` + land_number + `, Số tờ:` + map_paper_number
                                 + `</b> - Chi tiết: ` + (asset_info || "");
        } else if(asset_prevention_type === "owner_personal") {
            highlight_asset_info = `<b>Số CMND/CCCD/Hộ Chiếu:` + license_no + `</b> - Chi tiết: ` + (asset_info || "");
        } else if(asset_prevention_type === "owner_company") {
            highlight_asset_info = `<b>Số GCN Đăng Ký Doanh Nghiệp:` + license_no + `</b> - Chi tiết: ` + (asset_info || "");
        }

        search_keys && search_keys.map(item => {
            let asset_info_search_item = highlight_asset_info.search(new RegExp(item, "gi"));
            let asset_info_origin_item = highlight_asset_info.substring(asset_info_search_item, asset_info_search_item + item.length);

            highlight_judgments_decision_number = highlight_judgments_decision_number.replace(new RegExp(item, "gi"), '<mark class="highlight-text"><strong>' + item + '</strong></mark>');
            highlight_asset_info = highlight_asset_info.replace(new RegExp(item, "gi"), '<mark class="highlight-text"><strong>' + asset_info_origin_item + '</strong></mark>');
        });
    }

    let judgments_decision_number_text = highlight_judgments_decision_number;
    let asset_info_text = highlight_asset_info;

    return (
        <tr>
            <td>
                <div dangerouslySetInnerHTML={{__html: judgments_decision_number_text}}></div>
            </td>
            <td>
                <FormattedDate value={judgments_decision_date}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate>
            </td>
            <td style={{whiteSpace: "pre-wrap"}}>
                {
                    (asset_prevention_type === "asset_prevention_land" || asset_prevention_type === "asset_movables") &&
                    (
                        asset_info_text && asset_info_text.length > MAX_DISPLAY_CHARACTER ?
                        <React.Fragment>
                            <span dangerouslySetInnerHTML={{__html: asset_info_text.substring(0, MAX_DISPLAY_CHARACTER) + ' .........'}}></span>
                            <i onClick={() => handleShowMoreClick(asset_info_text)} className="icon-magnifier text-primary" 
                            style={{fontSize: '20px', fontWeight: "bold", cursor: "pointer"}}/>
                        </React.Fragment> :
                        <React.Fragment>
                            <div dangerouslySetInnerHTML={{__html: asset_info_text}}></div>
                        </React.Fragment>
                    )
                }       
           </td>
           <td style={{whiteSpace: "pre-wrap"}}>
                {
                    (asset_prevention_type === "owner_personal" || asset_prevention_type === "owner_company") &&
                    (
                        asset_info_text && asset_info_text.length > MAX_DISPLAY_CHARACTER ?
                        <React.Fragment>
                            <span dangerouslySetInnerHTML={{__html: asset_info_text.substring(0, MAX_DISPLAY_CHARACTER) + ' .........'}}></span>
                            <i onClick={() => handleShowMoreClick(asset_info_text)} className="icon-magnifier text-primary" 
                            style={{fontSize: '20px', fontWeight: "bold", cursor: "pointer"}}/>
                        </React.Fragment> :
                        <React.Fragment>
                            <div dangerouslySetInnerHTML={{__html: asset_info_text}}></div>
                        </React.Fragment>
                    )
                }       
           </td>
            <td>
                {prevention_content}
            </td>
            <td>
                {
                    file_name &&
                    <a href={`${staticFileUrl}${API_SUB_URL_NGAN_CHAN_FILES}/${file_name}`} target="_blank">
                         <i className="icon-docs" />
                    </a> 
                }
            </td>
            <td>
                {prevention_user}
            </td>
            <td>
                {statusComponent}
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
            <td>
                <Button color="secondary" onClick={() => handleExportPhieuTraCuuClick(asset_info, 600)}>
                    <i className='fa fa-file'></i>
                </Button>
            </td>
        </tr>
    )
};

NewNganChanListItem.propTypes = {
    asset_prevention: PropTypes.object.isRequired
};

export default NewNganChanListItem;