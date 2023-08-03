import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import {FormattedMessage} from 'react-intl';
// import NganChanListItem from "./NganChan/NganChanListItem";
import Pagination from '../../../components/common/Pagination';
import TaiSanList from "./NganChan/TaiSanList";
import DoiTuongList from "./NganChan/DoiTuongList";
import NganChanListFilter from '../containers/NganChan/NganChanListFilter';

const NganChanList = ({
    hasSelectOption = false, isEnableAddEdit, userData, asset_preventions, sub_asset_types, userGroups, staticFileUrl, tabIndex, 
    handleTabChange, handleDeleteClick, handleSelectAssetPrevention, pagination, onChangePage, handleExportExcelFile
}) => {    
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h2>Danh sách Ngăn Chặn</h2>
                </CardHeader>
                <CardBody>
                     <Row>
                        <Col xs="12">
                            <div className="float-right mb-2">
                                <NganChanListFilter userGroups={userGroups} hasSelectOption={hasSelectOption}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <TaiSanList hasSelectOption={hasSelectOption} isEnableAddEdit={isEnableAddEdit} 
                                        userData={userData} asset_preventions={asset_preventions} 
                                        sub_asset_types={sub_asset_types} staticFileUrl={staticFileUrl}
                                        handleDeleteClick={handleDeleteClick} 
                                        handleSelectAssetPrevention={handleSelectAssetPrevention}/>
                            <div className="mt-4 mb-4">
                                <Pagination pagination={pagination} onChangePage={onChangePage} />
                            </div>
                        </Col>
                    </Row>
                </CardBody>
                {
                    hasSelectOption === false &&
                    <CardFooter className="d-flex justify-content-end">
                        <Button color="secondary" onClick={() => handleExportExcelFile()}>
                            Xuất File Excel
                        </Button>
                    </CardFooter>
                }
            </Card>
        </div>
    )
};

NganChanList.propTypes = {
    asset_preventions: PropTypes.array
};

export default NganChanList;