import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Table, Button, Label, Badge } from 'reactstrap';
import BieuMau31ReportListFilter from '../containers/BieuMau31ReportList/BieuMau31ReportListFilter';

const BieuMau31ReportList = ({bieuMau31Reports, handleExportExcelFile}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>Tình hình tổ chức và hoạt động công chứng</h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <BieuMau31ReportListFilter />
                        </div>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md="12">  
                        <Label className="col-form-label">
                            Số tổ chức hành nghề công chứng (tổ chức): 
                            <strong>{`12`}</strong>
                        </Label>  
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md="12">  
                        <h4>
                            <Badge color="primary">
                                <strong>Số công chứng viên (người)</strong>
                            </Badge>  
                        </h4>
                    </Col>
                    <Col md="6">  
                        <Label className="col-form-label">
                            Tổng số: <strong>{100}</strong>
                        </Label>  
                    </Col>
                    <Col md="6">  
                        <Label className="col-form-label">
                            Trong đó: Số công chứng viên hợp danh: <strong>{100}</strong>
                        </Label>  
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md="12">  
                        <h4>
                            <Badge color="primary">
                                <strong>Số việc công chứng</strong>
                            </Badge>  
                        </h4>
                    </Col>
                    <Col md="4">  
                        <Label className="col-form-label">
                            Tổng số (việc): <strong>{100}</strong>
                        </Label>  
                    </Col>
                    <Col md="4">  
                        <Label className="col-form-label">
                            Công chứng hợp đồng giao dịch (việc): <strong>{100}</strong>
                        </Label>  
                    </Col>
                    <Col md="4">  
                        <Label className="col-form-label">
                            Công chứng bản dịch và các loại việc khác (việc): <strong>{100}</strong>
                        </Label>  
                    </Col>
                    <Col md="4">  
                        <Label className="col-form-label">
                            Tổng số thù lao công chứng (đồng): <strong>{100}</strong>
                        </Label>  
                    </Col>
                    <Col md="4">  
                        <Label className="col-form-label">
                            Tổng số phí công chứng (đồng): <strong>{100}</strong>
                        </Label>  
                    </Col>
                    <Col md="4">  
                        <Label className="col-form-label">
                            Tổng số tiền nộp vào ngân sách/thuế (đồng): <strong>{100}</strong>
                        </Label>  
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md="12">  
                        <h4>
                            <Badge color="primary">
                                <strong>Số việc chứng thực</strong>
                            </Badge>  
                        </h4>
                    </Col>
                    <Col md="12">  
                        <h4>
                            <Badge color="secondary">
                                <strong>Chứng thực bản sao</strong>
                            </Badge>  
                        </h4>
                    </Col>
                    <Col md="4">  
                        <Label className="col-form-label">
                            Số bản sao (bản sao): <strong>{100}</strong>
                        </Label>  
                    </Col>
                    <Col md="4">  
                        <Label className="col-form-label">
                            Phí chứng thực bản sao (đồng): <strong>{100}</strong>
                        </Label>  
                    </Col>
                    <Col md="4">  
                        <Label className="col-form-label">
                            Tổng số tiền nộp vào ngân sách/thuế (đồng): <strong>{100}</strong>
                        </Label>  
                    </Col>
                    <Col md="12">  
                        <h4>
                            <Badge color="secondary">
                                <strong>Chứng thực chữ ký trong giấy tờ, văn bản</strong>
                            </Badge> 
                        </h4> 
                    </Col>
                    <Col md="4">  
                        <Label className="col-form-label">
                            Số việc (việc): <strong>{100}</strong>
                        </Label>  
                    </Col>
                    <Col md="4">  
                        <Label className="col-form-label">
                            Phí chứng thực chữ ký (đồng): <strong>{100}</strong>
                        </Label>  
                    </Col>
                    <Col md="4">  
                        <Label className="col-form-label">
                            Tổng số tiền nộp vào ngân sách/thuế (đồng): <strong>{100}</strong>
                        </Label>  
                    </Col>
                </Row>
            </CardBody>
            <CardFooter className="d-flex justify-content-end">
                <Button color="primary" disabled={false} onClick={() => handleExportExcelFile()}>
                    Xuất File Excel
                </Button>
            </CardFooter>
        </Card>
    </div>
);

BieuMau31ReportList.propTypes = {
    BieuMau31Reports: PropTypes.array
};

export default BieuMau31ReportList;