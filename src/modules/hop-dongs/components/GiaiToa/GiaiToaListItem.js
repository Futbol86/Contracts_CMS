import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import {API_SUB_URL_GIAI_TOA_FILES} from "../../constants";

const GiaiToaListItem = ({isEnableAddEdit, userData, asset_release, sub_asset_types, staticFileUrl, handleDeleteClick}) => {
    const { 
        id, release_number, release_date, asset_id, assetDetails, assetPreventionDetail, 
        release_content, release_user, release_file, created_at, created_by, createdByDetail, groupDetail,
    } = asset_release || {};

    let isEnableEditAndDelete = parseInt(created_by) === userData.id;

    return (
        <tr>
            <td>
                {release_number}
            </td>
            <td>
                <FormattedDate value={release_date}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate>
            </td>
            <td>
                {assetPreventionDetail && assetPreventionDetail.asset_info}
            </td>
            <td>
                {release_content}
            </td>
            <td>
                {
                    release_file &&
                    <a href={`${staticFileUrl}${API_SUB_URL_GIAI_TOA_FILES}/${release_file}`} target="_blank">
                         <i className="icon-docs" />
                    </a> 
                }
            </td>
            <td>
                {release_user}
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
                    isEnableAddEdit === true && isEnableEditAndDelete === true &&
                    <React.Fragment>
                        <NavLink to={`/hop-dongs/asset-releases/edit/${id}`} title="Sửa Giải toả" className="p-1">
                            <i className="icon-pencil" />
                        </NavLink>
                        <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Giải toả"
                                onClick={() => handleDeleteClick(id)}>
                            <i className="icon-minus"/>
                        </button>
                    </React.Fragment>
                }
            </td>
        </tr>
    )
};

GiaiToaListItem.propTypes = {
    asset_release: PropTypes.object.isRequired
};

export default GiaiToaListItem;