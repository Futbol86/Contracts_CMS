import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import {Button, Badge} from 'reactstrap';
import {API_SUB_URL_NGAN_CHAN_FILES} from "../../constants";

const DoiTuongListItem = ({
        hasSelectOption, isEnableAddEdit, userData, asset_prevention, sub_asset_types, staticFileUrl,
        handleDeleteClick, handleSelectAssetPrevention
    }) => {
    const { 
        id, judgments_decision_number, judgments_decision_date, 
        ownerPreventionDetails, assetReleaseDetail, prevention_content, prevention_user, file_name, created_at, created_by, createdByDetail,
    } = asset_prevention || {};

    let owner_detail_names = asset_prevention && asset_prevention.ownerDetails.map(item => item ? item.fullname : "").join(", ");
    var owner_license_nos = asset_prevention && asset_prevention.ownerDetails.map(item => {
        return item ? (item.license_no + "; ") : "";
    });

    let statusComponent;

    if(assetReleaseDetail) {
        if(assetReleaseDetail.id){
            statusComponent = <Badge color="success">Đã Giải toả</Badge> 
        } else {
            statusComponent = <Badge>Đang Ngăn chặn</Badge> 
        }
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
                {/* <NavLink to={`/hop-dongs/asset-preventions/edit/${id}`} title="Sửa Ngăn chặn" className="p-1"> */}
                    {id}
                {/* </NavLink> */}
            </td>
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
                {owner_detail_names}
            </td>
            <td>
                {owner_license_nos}
            </td>
            <td>
                {prevention_content}
            </td>
            <td>
                {prevention_user}
            </td>
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

                {
                    hasSelectOption === false && file_name &&
                    <a href={`${staticFileUrl}${API_SUB_URL_NGAN_CHAN_FILES}/${file_name}`} target="_blank">
                         <i className="icon-docs" />
                    </a> 
                }
            </td>
        </tr>
    )
};

DoiTuongListItem.propTypes = {
    asset_prevention: PropTypes.object.isRequired
};

export default DoiTuongListItem;