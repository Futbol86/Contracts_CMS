import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedDate, FormattedTime} from 'react-intl';
import PropTypes from "prop-types";
import {LOAI_TAI_SAN} from '../../../../constants';

const BatDongSanListItem = ({userData, asset, isEnableAddEdit, handleShowHistoryClick, handleDeleteClick}) => {
    const { 
        id, sub_asset_type_detail, owner_details, license_number, 
        address, issued_at, issued_by, asset_status_detail, related_lands, created_at, created_by, createdByDetail,
    } = asset;

    // let owner_names = owner_details && owner_details.map(item => item ? item.fullname : "").join(",");
    let statusComponent;

    if(asset_status_detail) {
        // if(asset_status_detail.id === 1){
        //     statusComponent = <span>{asset_status_detail && asset_status_detail.name}</span> 
        // } else 
        if(asset_status_detail.id === 2){
            statusComponent = <span className="text-danger">{asset_status_detail && asset_status_detail.name}</span> 
        } else {
            statusComponent = <span>Được phép giao dịch</span> 
        }
        // else {
        //     statusComponent = <span className="text-warning">{asset_status_detail && asset_status_detail.name}</span> 
        // }
    }

    let createdByName;
    let isEnableEditAndDelete = false;

    if(createdByDetail && createdByDetail.username) {
        createdByName = createdByDetail && createdByDetail.username 
                        + ` (` + (createdByDetail && createdByDetail.userGroupDetail && createdByDetail.userGroupDetail.group_name) + `)`
        isEnableEditAndDelete = parseInt(created_by) === userData.id;
    } else {
        createdByName = created_by;
        isEnableEditAndDelete = created_by === userData.username;
    }

    return (
        <tr>
            <td>
                {/* <NavLink to={`/danh-mucs/asset/edit/${id}`} title="Sửa Tài sản" className="p-1"> */}
                    {id}
                {/* </NavLink> */}
            </td>
            <td>
                {sub_asset_type_detail && sub_asset_type_detail.name}
            </td>
            <td>
                {license_number}
            </td>
            <td>
                {address}
            </td>
            <td>
                {
                    related_lands && related_lands.map_paper_number &&
                    <span><strong>Số tờ: {related_lands && related_lands.map_paper_number}</strong></span>
                }
                {
                    related_lands && related_lands.land_number &&
                    <span><strong>, Số thửa: {related_lands && related_lands.land_number}</strong></span>
                }
                {
                    related_lands && related_lands.area &&
                    <span><strong>, Tổng diện tích: {related_lands && related_lands.area}</strong></span>
                }
            </td>
            <td>
                {
                    issued_at &&
                    <FormattedDate value={issued_at}>
                        {
                            parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                        }
                    </FormattedDate>
                }
            </td>
            <td>
                {issued_by}
            </td>
            {/* <td>
                {owner_names}
            </td> */}
            <td>
                {statusComponent}
            </td>
            <td>
                {createdByName}
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
                <button type="button" className="btn btn-link pl-1 pt-0" title="Thông tin lịch sử tài sản"
                        onClick={() => handleShowHistoryClick(id)}>
                    <i className="icon-clock"/>
                </button>
                {
                    isEnableAddEdit === true && isEnableEditAndDelete === true &&
                    <React.Fragment>
                        <NavLink to={`/danh-mucs/asset/edit/${id}`} title="Sửa Tài sản" className="p-1">
                            <i className="icon-pencil" />
                        </NavLink>
                        <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Tài sản"
                                onClick={() => handleDeleteClick(id)}>
                            <i className="icon-minus"/>
                        </button>
                    </React.Fragment>
                }
            </td>
        </tr>
    )
};

BatDongSanListItem.propTypes = {
    asset: PropTypes.object.isRequired
};

export default BatDongSanListItem;