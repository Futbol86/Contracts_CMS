import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody, Table, Badge} from 'reactstrap';
import {FormattedDate, FormattedTime} from 'react-intl';
import {isEmpty} from 'lodash';

const ContractHisories = ({assetHistories}) => {
    return (
    <Table responsive striped>
        <thead>
            <tr>
                <th>ID</th>
                <th>TÀI SẢN</th>
                <th>LOẠI HỢP ĐỒNG</th> 
                <th>SỐ HỢP ĐỒNG</th>
                <th>NGÀY HỢP ĐỒNG</th>
                <th>BÊN A</th>
                <th>BÊN B</th>
                <th>TRẠNG THÁI</th>
                <th>PHÒNG GIAO DỊCH</th>
                <th>NGÀY TẠO</th>
            </tr>
        </thead>
        <tbody>
            {(assetHistories && assetHistories.contractDetails && assetHistories.contractDetails.length > 0) ? 
                assetHistories.contractDetails.map((item, idx) => {
                    let statusComponent;
                    let statusDetail = item.contractDetail && item.contractDetail.statusDetail;

                    let fromOwnerDetails = item.contractDetail && item.contractDetail.fromOwnerDetails;
                    let toOwnerDetails = item.contractDetail && item.contractDetail.toOwnerDetails;
                    let from_owners = item.from_owners;
                    let to_owners = item.to_owners;
                    let from_owner_names, to_owner_names;

                    if(isEmpty(fromOwnerDetails)) {
                        if(!isEmpty(from_owners)) {
                            from_owner_names = JSON.parse(from_owners) && JSON.parse(from_owners).related_owners 
                                            && JSON.parse(from_owners).related_owners.map(doc => doc.fullname).join(", ");
                        }
                    } else {
                        from_owner_names = fromOwnerDetails && fromOwnerDetails.map(
                            doc => doc ? doc.fullname + " (Số giấy tờ: " + (doc.license_no || doc.identityId) + ")" : ""
                        ).join(", ");
                    }
                
                    if(isEmpty(toOwnerDetails)) {
                        if(!isEmpty(to_owners)) {
                            to_owner_names = JSON.parse(to_owners) && JSON.parse(to_owners).related_owners 
                                          && JSON.parse(to_owners).related_owners.map(doc => doc.fullname).join(", ");
                        }
                    } else {
                        to_owner_names = toOwnerDetails && toOwnerDetails.map(
                            doc => doc ? doc.fullname + " (Số giấy tờ: " + (doc.license_no || doc.identityId) + ")" : ""
                        ).join(", ");
                    }

                    if(statusDetail) {
                        if(statusDetail.id === 1){
                            statusComponent = <Badge>{statusDetail && statusDetail.name}</Badge> 
                        } else if(statusDetail.id === 2){
                            statusComponent = <Badge color="danger">{statusDetail && statusDetail.name}</Badge> 
                        } else if(statusDetail.id === 3){
                            statusComponent = <Badge color="success">{statusDetail && statusDetail.name}</Badge> 
                        } else if(statusDetail.id === 4){
                            statusComponent = <Badge>{statusDetail && statusDetail.name}</Badge> 
                        } else if(statusDetail.id === 5){
                            statusComponent = <Badge color="danger">{statusDetail && statusDetail.name}</Badge> 
                        }
                    }

                    return (
                        <tr key={idx}>
                            <td>
                                {/* <NavLink to={`/hop-dongs/contract/view/${item.contractDetail && item.contractDetail.id}`} 
                                        target={`_blank`}
                                        title="Xem Hợp đồng" className="p-1"> */}
                                    {item.contractDetail && item.contractDetail.id}
                                {/* </NavLink> */}
                            </td>
                            <td><strong>{assetHistories && assetHistories.assetDetail.license_number}</strong></td>
                            <td>
                                {item.contractDetail && item.contractDetail.subContractTypeDetail && item.contractDetail.subContractTypeDetail.name}
                            </td>
                            <td>
                                {item.contractDetail && item.contractDetail.contract_no}
                            </td>
                            <td>
                                <FormattedDate value={item.contractDetail && item.contractDetail.contract_date}>
                                    {
                                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                                    }
                                </FormattedDate>
                            </td>
                            <td><strong>{from_owner_names}</strong></td>
                            <td><strong>{to_owner_names}</strong></td>
                            <td>
                                {statusComponent}
                            </td>
                            <td>
                                {item.contractDetail && item.contractDetail.groupDetail && item.contractDetail.groupDetail.group_name}
                            </td>
                            <td>
                                <FormattedTime value={item.contractDetail && item.contractDetail.created_at}></FormattedTime>{`  `}
                                <FormattedDate value={item.contractDetail && item.contractDetail.created_at}>
                                    {
                                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                                    }
                                </FormattedDate>
                            </td>
                        </tr>
                    )
                })
                : <tr><td colSpan={7}>Không tìm thấy Lịch sử giao dịch Tài Sản</td></tr>
            }
        </tbody>
    </Table>
    )
}

export default ContractHisories;