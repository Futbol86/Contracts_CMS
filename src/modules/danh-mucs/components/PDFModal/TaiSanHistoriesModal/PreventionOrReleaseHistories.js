import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody, Table, Badge} from 'reactstrap';
import {FormattedDate, FormattedTime} from 'react-intl';

const PreventOrReleaseHisories = ({assetHistories}) => {
    return (
        <Table responsive striped>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>TÀI SẢN</th>
                    <th>BẢN ÁN/QUYẾT ĐỊNH</th>
                    <th>CƠ QUAN RA QĐ</th>
                    <th>NGÀY BAN HÀNH</th>
                    <th>TRẠNG THÁI</th>
                    <th>NGƯỜI TẠO</th>
                    <th>NGÀY TẠO</th>
                </tr>
            </thead>
            <tbody>
                {(assetHistories && assetHistories.assetPreventionDetails && assetHistories.assetPreventionDetails.length > 0) ? 
                    assetHistories.assetPreventionDetails.map((item, idx) => {
                        let statusComponent;

                        if(item.assetReleaseDetail) {
                            statusComponent = <Badge color="success">Đã Giải toả</Badge> 
                        } else {
                            statusComponent = <Badge color="danger">Đang Ngăn chặn</Badge> 
                        }

                        let createdByName;
                    
                        if(item.createdByDetail && item.createdByDetail.username) {
                            createdByName = item.createdByDetail && item.createdByDetail.username 
                                            + ` (` + (item.createdByDetail && item.createdByDetail.userGroupDetail && item.createdByDetail.userGroupDetail.group_name) + `)`
                        } else {
                            createdByName = item.created_by;
                        }

                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td><strong>{assetHistories && assetHistories.assetDetail.license_number}</strong></td>
                                <td>{item.judgments_decision_number}</td>
                                <td>{item.judgments_decision_org}</td>
                                <td>
                                    <FormattedDate value={item.judgments_decision_date}>
                                        {
                                            parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                                        }
                                    </FormattedDate>
                                </td>
                                <td>
                                    {statusComponent}
                                </td>
                                <td>{createdByName}</td>
                                <td>
                                    <FormattedTime value={item.created_at}></FormattedTime>{`  `}
                                    <FormattedDate value={item.created_at}>
                                        {
                                            parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                                        }
                                    </FormattedDate>
                                </td>
                            </tr>
                        )
                    })
                    : <tr><td colSpan={7}>Không tìm thấy Lịch sử Ngăn chặn/Giải toả Tài Sản</td></tr>
                }
            </tbody>
        </Table>
    )
}

export default PreventOrReleaseHisories;