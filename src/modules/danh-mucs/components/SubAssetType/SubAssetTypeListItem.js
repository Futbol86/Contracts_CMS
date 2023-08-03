import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {STATUS} from "../../constants";

const SubAssetTypeListItem = ({subAssetType, handleDeleteClick}) => {
    const { id, name, assetTypeDetail, description, status } = subAssetType;

    return (
        <tr>
            <td>
                <NavLink to={`/danh-mucs/sub-asset-type/edit/${id}`} title="Sửa Loại Tài Sản" className="p-1">
                    {id}
                </NavLink>
            </td>
            <td>
                {name}
            </td>
            <td>
                {assetTypeDetail && assetTypeDetail.name}
            </td>
            <td>
                {description}
            </td>
            <td>
                {STATUS[status]}
            </td>
            <td align="center">
                <NavLink to={`/danh-mucs/sub-asset-type/edit/${id}`} title="Sửa Loại Tài Sản" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>
                <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Loại Tài Sản"
                        onClick={() => handleDeleteClick(id)}>
                    <i className="icon-minus"/>
                </button>
            </td>
        </tr>
    )
};

SubAssetTypeListItem.propTypes = {
    subAssetType: PropTypes.object.isRequired
};

export default SubAssetTypeListItem;