import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody, Table, Badge} from 'reactstrap';
import {FormattedDate, FormattedTime} from 'react-intl';
import ContractHistoriesComponent from './TaiSanHistoriesModal/ContractHistories';
import PreventionOrReleaseHistoriesComponent from './TaiSanHistoriesModal/PreventionOrReleaseHistories';

const TaiSanHistoriesModal = ({assetHistories, handleModalClose}) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <div className="d-flex justify-content-between">
                        <h2>Lịch sử Tài Sản</h2>
                        <button type="button" className="close" onClick={handleModalClose}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">
                                Đóng
                            </span>
                        </button>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col xs="12">
                            <h5>Hợp Đồng</h5>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="12">
                            <ContractHistoriesComponent assetHistories={assetHistories} handleModalClose={handleModalClose}/>
                        </Col>
                    </Row>
                    <hr />
                    <Row className="mb-2">
                        <Col xs="12">
                            <h5>Ngăn chặn/ Giải toả</h5>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="12">
                            <PreventionOrReleaseHistoriesComponent assetHistories={assetHistories} handleModalClose={handleModalClose}/>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
};

// TaiSanHistoriesModal.propTypes = {
//     assetHistories: PropTypes.array
// };

export default TaiSanHistoriesModal;