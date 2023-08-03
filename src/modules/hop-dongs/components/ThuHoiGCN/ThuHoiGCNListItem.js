import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import { Button, Badge } from 'reactstrap';
import { isEmpty } from 'lodash';
import {API_SUB_URL_THU_HOI_GCN_FILES} from '../../constants';

const ThuHoiGCNListItem = ({thuHoiGCN, userData, staticFileUrl, handleDeleteClick}) => {
    const { 
        id, eviction_number, eviction_date, eviction_org, license_number, eviction_file, eviction_asset, eviction_content,
        accountDetail, groupDetail, created_at, created_by, updated_at
    } = thuHoiGCN;

    let isEnableEditAndDelete = parseInt(created_by) === userData.id;

    return (
        <tr>
            <td>{eviction_number}</td>
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
                {license_number}
            </td>
            <td style={{whiteSpace: "pre-wrap"}}>
                {
                    <React.Fragment>
                           <div dangerouslySetInnerHTML={{__html: eviction_asset}}></div>
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
            <td align="center">
                {
                    isEnableEditAndDelete === true &&
                    <React.Fragment>
                        <NavLink to={`/hop-dongs/thu-hoi-gcns/edit/${id}`} title="Sửa Thu hồi GCN" className="p-1">
                            <i className="icon-pencil" />
                        </NavLink>
                        <button type="button" className="btn btn-link pl-1 pt-0" title="Xóa Thu hồi GCN"
                                onClick={() => handleDeleteClick(id)}>
                            <i className="icon-minus"/>
                        </button>
                    </React.Fragment>
                }
            </td>
        </tr>
    )
};

ThuHoiGCNListItem.propTypes = {
    contract: PropTypes.object.isRequired
};

export default ThuHoiGCNListItem;