import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import SubAssetTypeListItem from "./SubAssetType/SubAssetTypeListItem";
import Pagination from '../../../components/common/Pagination';
import SubAssetTypeListFilter from '../containers/SubAssetType/SubAssetTypeListFilter';

const SubAssetTypeList = ({subAssetTypes, handleDeleteClick, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>Danh sách Loại Tài Sản</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <SubAssetTypeListFilter />
                        </div>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>LOẠI TÀI SẢN</th>
                                    <th>NHÓM TÀI SẢN</th>
                                    <th>MÔ TẢ</th>
                                    <th>TRẠNG THÁI</th>
                                    <th align="center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(subAssetTypes && subAssetTypes.length > 0)
                                    ? subAssetTypes.map((subAssetType, idx) => (
                                        <SubAssetTypeListItem key={idx} subAssetType={subAssetType} handleDeleteClick={handleDeleteClick}/>
                                    ))
                                    : <tr><td colSpan={4}>Không tìm thấy Loại Tài Sản</td></tr>
                                }
                            </tbody>
                        </Table>

                        <Pagination pagination={pagination} onChangePage={onChangePage} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </div>
);

SubAssetTypeList.propTypes = {
    subAssetTypes: PropTypes.array
};

export default SubAssetTypeList;