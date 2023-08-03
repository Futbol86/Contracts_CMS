import React from 'react';
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, Label} from 'reactstrap';
import {isEmpty} from 'lodash';
import {Field} from "redux-form";
import {FormattedDate} from 'react-intl';

import BatDongSanInfoComponent from '../../../danh-mucs/components/TaiSan/BatDongSanInfo';
import DongSanInfoComponent from '../../../danh-mucs/components/TaiSan/DongSanInfo';

import CaNhanInfoComponent from '../../../danh-mucs/components/DoiTuong/CaNhanInfo';
import ToChucInfoComponent from '../../../danh-mucs/components/DoiTuong/ToChucInfo';

const ThongTinNganChan = ({asset_prevention_selected = {}, handleDeleteAssetPreventionSelected}) => {
    let {id, judgments_decision_number, judgments_decision_date, judgments_decision_org, prevention_org, 
        prevention_user, prevention_owner, prevention_content, assetDetails = [], ownerDetails = [], asset_info,
    } = asset_prevention_selected;

    return (
        <Card>
            <CardHeader>
                <div className="d-flex justify-content-between">
                    <b>THÔNG TIN NGĂN CHẶN</b>
                </div>
            </CardHeader>
            <CardBody>
                {
                    !isEmpty(asset_prevention_selected) &&
                    <React.Fragment>
                        <Card>
                            <CardHeader>
                                <b>THÔNG TIN</b>
                            </CardHeader>
                            <CardBody>
                                <Row className="mb-2">
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            Số quyết định ngăn chặn{' '}<span className="text-red">(*):</span>
                                        </Label>
                                    </Col>
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label text-danger">
                                            <strong>{judgments_decision_number}</strong>
                                        </Label>
                                    </Col>
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            Ngày ban hành{' '}<span className="text-red">(*):</span>
                                        </Label>
                                    </Col>
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            <strong>
                                                <FormattedDate value={judgments_decision_date}>
                                                    {
                                                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                                                    }
                                                </FormattedDate>
                                            </strong>
                                        </Label>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            Cơ quan ban hành quyết định ngăn chặn{' '}:
                                        </Label>
                                    </Col>
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            <strong>{judgments_decision_org}</strong>
                                        </Label>
                                    </Col>
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            Cơ quan thực hiện quyết định{' '}:
                                        </Label>
                                    </Col>
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            <strong>{prevention_org}</strong>
                                        </Label>
                                    </Col>
                                </Row>
                                {/* <Row className="mb-2">
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            Người thực hiện quyết định{' '}:
                                        </Label>
                                    </Col>
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            <strong>{prevention_user}</strong>
                                        </Label>
                                    </Col>
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            Cá nhân/tổ chức bị ngăn chặn{' '}:
                                        </Label>
                                    </Col>
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            <strong>{prevention_owner}</strong>
                                        </Label>
                                    </Col>
                                </Row> */}
                                <Row className="mb-2">
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            Tài sản ngăn chặn:
                                        </Label>
                                    </Col>
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            <strong>{asset_info}</strong>
                                        </Label>
                                    </Col>
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            Nội dung ngăn chặn:
                                        </Label>
                                    </Col>
                                    <Col xs="6" md="3">
                                        <Label className="col-form-label">
                                            <strong>{prevention_content}</strong>
                                        </Label>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        {/* <Card>
                            <CardHeader>
                                <b>CHI TIẾT</b>
                            </CardHeader>
                            <CardBody>
                                {
                                    assetDetails && assetDetails.map((item, index) => {
                                        if(item.sub_asset_type_id === 7) {
                                            return (
                                                <div key={index} className="shadow p-4 mb-2">
                                                    <Row className="mb-2">
                                                        <Col md="2">  
                                                            <Label className="col-form-label">
                                                                <strong><u>Tài Sản {index + 1}:</u></strong>
                                                            </Label>  
                                                        </Col>
                                                    </Row>
                                                    <BatDongSanInfoComponent batDongSanInfo={item}/>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={index} className="shadow p-4 mb-2">
                                                    <Row className="mb-2">
                                                        <Col md="2">  
                                                            <Label className="col-form-label">
                                                                <strong><u>Tài Sản {index + 1}:</u></strong>
                                                            </Label>  
                                                        </Col>
                                                    </Row>
                                                    <DongSanInfoComponent dongSanInfo={item}/>
                                                </div>
                                            )
                                        }
                                    })
                                }
                                {
                                    ownerDetails && ownerDetails.map((item, index) => {
                                        if(item.sub_owner_type_id === 1) {
                                            return (
                                                <div key={index} className="shadow p-4 mb-2">
                                                    <Row className="mb-2">
                                                        <Col md="2">  
                                                            <Label className="col-form-label">
                                                                <strong><u>Đối Tượng {index + 1}:</u></strong>
                                                            </Label>  
                                                        </Col>
                                                    </Row>
                                                    <CaNhanInfoComponent caNhanInfo={item}/>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={index} className="shadow p-4 mb-2">
                                                    <Row className="mb-2">
                                                        <Col md="2">  
                                                            <Label className="col-form-label">
                                                                <strong><u>Đối Tượng {index + 1}:</u></strong>
                                                            </Label>  
                                                        </Col>
                                                    </Row>
                                                    <ToChucInfoComponent toChucInfo={item}/>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </CardBody>
                        </Card> */}
                    </React.Fragment>
                }
                {
                    isEmpty(asset_prevention_selected) &&
                    <div className="d-flex justify-content-center">
                        <h4>Hiện chưa chọn Quyết định ngăn chặn</h4>
                    </div>
                }
            </CardBody>
        </Card>
    )
};

export default ThongTinNganChan;