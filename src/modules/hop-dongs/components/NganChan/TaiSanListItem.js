import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {Field} from "redux-form";
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import {Button, Badge} from 'reactstrap';
import {API_SUB_URL_NGAN_CHAN_FILES} from "../../constants";

const TaiSanListItem = ({hasSelectOption, isEnableAddEdit, userData, asset_prevention, sub_asset_types, staticFileUrl,
                        handleDeleteClick, handleSelectAssetPrevention}) => {
    const { 
        id, judgments_decision_number, judgments_decision_date,  asset_prevention_type,
        prevention_owner, prevention_content, prevention_user, assetReleaseDetail, asset_info,  
        license_number, land_number, map_paper_number, license_no, file_name, 
        created_at, created_by, createdByDetail, groupDetail,
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

    let isEnableEditAndDelete = parseInt(created_by) === userData.id;

    return (
        <tr>
            <td>
                {judgments_decision_number}
            </td>
            <td>
                <FormattedDate value={judgments_decision_date}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate>
            </td>
            <td>
                {
                    (asset_prevention_type === "asset_prevention_land" || asset_prevention_type === "asset_movables") 
                    && <b>{`Giấy CN: ${license_number}`} {`, Số thửa: ${land_number || ""}`} {`, Số tờ: ${map_paper_number || ""}`}</b>
                }
                { (asset_prevention_type === "asset_prevention_land" || asset_prevention_type === "asset_movables") && asset_info && ` - Chi tiết: ${asset_info}`}
            </td>
            <td>
                {
                    asset_prevention_type === "owner_personal" && <b>{`Số CMND/CCCD/Hộ Chiếu: ${license_no || ""}`}</b>
                }
                {
                    asset_prevention_type === "owner_company" && <b>{`Số GCN Đăng Ký Doanh Nghiệp: ${license_no || ""}`}</b>
                }
                {(asset_prevention_type === "owner_personal" || asset_prevention_type === "owner_company") && asset_info && ` - Chi tiết: ${asset_info}`}
            </td>
            <td>
                {prevention_content}
            </td>
            <td>
                {
                    hasSelectOption === false && file_name &&
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
                {createdByDetail && createdByDetail.username}
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
            <td align="center">
                {
                    hasSelectOption === true ?
                    (
                        !assetReleaseDetail &&
                        <Button color="secondary" onClick={() => handleSelectAssetPrevention(id)}>
                            <i className="fa fa-check"/>
                        </Button>
                    )
                    :
                    isEnableAddEdit === true && isEnableEditAndDelete === true &&
                        <>
                            <NavLink to={`/hop-dongs/asset-preventions/edit/${id}`} title="Sửa Ngăn chặn" className="p-1">
                                <i className="icon-pencil" />
                            </NavLink>
                            <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Ngăn chặn"
                                    onClick={() => handleDeleteClick(id)}>
                                <i className="icon-minus"/>
                            </button>
                        </>
                }
            </td>
        </tr>
    )
};

TaiSanListItem.propTypes = {
    asset_prevention: PropTypes.object.isRequired
};

export default TaiSanListItem;