import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import uuid from "uuid";
import {toast} from 'react-toastify';
import {isEmpty} from 'lodash';

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";

import {
    loadListContractType, loadListLoaiHopDong, loadListSoLuuTru, loadListLoaiSoLuuTru, 
    queryADoiTuong, clearADoiTuong, queryATaiSan, clearATaiSan, setATaiSanQueryIndex, setADoiTuongQueryIndex,
    loadListDistrict, loadListWard, loadATaiSanHistory
} from "../../danh-mucs/actions";
import {
    getContractTypeList, getLoaiHopDongList, getSoLuuTruList, getLoaiSoLuuTruList, 
    getDoiTuongQuery, getDoiTuongQueryType, getTaiSanQuery, getTaiSanQueryIndex, getDoiTuongQueryIndex,
    getDistrictList, getWardList, getTaiSanHistories, getTaiSanInsertContract, getDoiTuongInsertContract,
} from "../../danh-mucs/selectors";

import {DOC_changeActiveModal, DOC_changeTypeModal} from "../../documents/actions";
import {getDocCurrentModalId, getDocCurrentModalType} from "../../documents/selectors";
import {getUserId, getGroupId, getUserData} from "../../users/selectors";

import {requestTNMTLandData, uploadHopDongFiles, deleteAHopDongFile} from "../actions";
import {getHopDongFiles} from "../selectors";
import {HOP_DONG_FORM_NAME} from "../constants";

import HopDongAddComponent from "../components/HopDongAdd";

class HopDongAdd extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        
        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(6) === -1) {
                history.push("/dashboard");
            }
        }

        this.props.initialize({
            created_at: new Date(),
            created_by: this.props.userId,
            notary_name: userData && userData.fullname,
            group_name: userData && userData.userGroupDetail.group_name,
            group_address: userData && userData.userGroupDetail.address,
            group_id: userData && userData.userGroupDetail.id,
        })

        this.props.loadListDistrict({limit: 10000});
        this.props.loadListWard({limit: 10000});
        this.props.loadListContractType({limit: 10000});
        this.props.loadListLoaiHopDong({limit: 10000});
        this.props.loadListSoLuuTru({limit: 10000000, filter: {group_id: userData.group_id}});
        this.props.loadListLoaiSoLuuTru({limit: 10000});
    }

    componentDidUpdate(prevProps) {
        let {ownerQuery, assetQuery, ownerQueryType, assetQueryIndex, ownerQueryIndex, changeFieldValue} = this.props;
        
        if(assetQuery !== prevProps.assetQuery) {
            if(isEmpty(assetQuery)) {
                let {assets} = this.props;
                let findAsset = assets[assetQueryIndex];

                if(findAsset) {
                    findAsset.error = "Không tìm thấy thông tin tài sản '" + (findAsset && findAsset.license_number) + "'";
                    changeFieldValue('assets', assets);
                }
            }
        }

        if(ownerQuery !== prevProps.ownerQuery) {
            if(!ownerQuery) {
                if(ownerQueryType === "from_owners") {
                    let {from_owners} = this.props;
                    let findFromOwner = from_owners[ownerQueryIndex];

                    if(findFromOwner) {
                        findFromOwner.error = "Không tìm thấy thông tin Chủ Sở Hữu Bên A '" + (findFromOwner && findFromOwner.license_no) + "'";
                        changeFieldValue('from_owners', from_owners);
                    }
                }

                if(ownerQueryType === "to_owners") {
                    let {to_owners} = this.props;
                    let findToOwner = to_owners[ownerQueryIndex];

                    if(findToOwner) {
                        findToOwner.error = "Không tìm thấy thông tin Chủ Sở Hữu Bên B '" + (findToOwner && findToOwner.license_no) + "'";
                        changeFieldValue('to_owners', to_owners);
                    }
                }

                if(ownerQueryType === "mid_owners") {
                    let {mid_owners} = this.props;
                    let findMidOwner = mid_owners[ownerQueryIndex];

                    if(findMidOwner) {
                        findMidOwner.error = "Không tìm thấy thông tin Chủ Sở Hữu Bên Thứ 3 '" + (findMidOwner && findMidOwner.license_no) + "'";
                        changeFieldValue('mid_owners', mid_owners);
                    }
                }
            }
        }

        if(!isEmpty(assetQuery) && (prevProps.assetQuery && assetQuery.id !== prevProps.assetQuery.id)) {
            let {assets, from_owners = []} = this.props;
            let findAsset = assets[assetQueryIndex];

            if(findAsset) {
                findAsset.id = assetQuery.id;
                findAsset.asset_type_id = assetQuery.sub_asset_type_detail && assetQuery.sub_asset_type_detail.asset_type_id;
                findAsset.subAssetTypeDetail = {};
                findAsset.subAssetTypeDetail.name = assetQuery.sub_asset_type_detail && assetQuery.sub_asset_type_detail.name;
                findAsset.sub_asset_type_name = assetQuery.sub_asset_type_detail && assetQuery.sub_asset_type_detail.name;
                findAsset.license_number = assetQuery.license_number;
                findAsset.asset_status_id = assetQuery.asset_status_id;
                findAsset.issued_at = assetQuery.issued_at;
                findAsset.issued_by = assetQuery.issued_by;
                findAsset.address = assetQuery.address;
                findAsset.totalArea = assetQuery.related_lands && parseFloat(assetQuery.related_lands.area);
                findAsset.land_number = assetQuery.related_lands && assetQuery.related_lands.land_number;
                findAsset.map_paper_number = assetQuery.related_lands && assetQuery.related_lands.map_paper_number;
                findAsset.district_id = assetQuery.related_lands && assetQuery.related_lands.district_id;
                findAsset.ward_id = assetQuery.related_lands && assetQuery.related_lands.ward_id;

                let error = null;
                if(assetQuery.asset_status_id ===  2) {
                    error = "Đang bị ngăn chặn"
                } else if(assetQuery.asset_status_id ===  3) {
                    error = "Đang thế chấp"
                } 
                // else if(assetQuery.asset_status_id ===  4) {
                //     error = "Đang trong giao dịch khác"
                // }

                findAsset.error = error;

                // if(assetQuery.owner_details) {
                //     assetQuery.owner_details.map(owner_detail => {
                //         let findFromOwner = from_owners && from_owners.find(item => item.license_no === owner_detail.license_no);
                //         let error = null;
                //         if(owner_detail.status === 3) {
                //             error = "Đang bị ngăn chặn"
                //         }

                //         if(findFromOwner) {
                //             findFromOwner.id = owner_detail.id;
                //             findFromOwner.fullname = owner_detail.fullname;
                //             findFromOwner.address = owner_detail.address;
                //             findFromOwner.phone = owner_detail.phone;
                //             findFromOwner.asset_id = assetQuery.id;
                //             findFromOwner.license_number = assetQuery.license_number;
                //             findFromOwner.status = owner_detail.status;
                //             findFromOwner.error = error;
                //         } else {
                //             from_owners.push({
                //                 "id": owner_detail.id,
                //                 "license_no": owner_detail.license_no,
                //                 "fullname": owner_detail.fullname,
                //                 "address": owner_detail.address,
                //                 "phone": owner_detail.phone,
                //                 "asset_id": assetQuery.id,
                //                 "license_number": assetQuery.license_number,
                //                 "status": owner_detail.status,
                //                 "error": error,
                //             });
                //         }
                //     });

                //     this.props.changeFieldValue('from_owners', from_owners);
                // }
            }

            this.props.changeFieldValue('assets', assets);
        }

        if(!isEmpty(ownerQuery) && (prevProps.ownerQuery && ownerQuery.id !== prevProps.ownerQuery.id)) {
            let {from_owners = [], to_owners = [], mid_owners = []} = this.props;
            if(ownerQueryType === "from_owners") {
                let findFromOwner = from_owners[ownerQueryIndex];

                if(findFromOwner) {
                    findFromOwner.id = ownerQuery.id;
                    findFromOwner.subOwnerTypeDetail = {};
                    findFromOwner.subOwnerTypeDetail.name = ownerQuery.subOwnerTypeDetail && ownerQuery.subOwnerTypeDetail.name;
                    findFromOwner.license_no = ownerQuery.license_no;
                    findFromOwner.fullname = ownerQuery.fullname;
                    findFromOwner.address = ownerQuery.address;
                    findFromOwner.phone = ownerQuery.phone;
                    findFromOwner.status = ownerQuery.status;
                    
                    let error = null;
                    if(ownerQuery.status === 3) {
                        error = "Đang bị ngăn chặn"
                    }
                    findFromOwner.error = error;

                    this.props.changeFieldValue('from_owners', from_owners);
                }
            }

            if(ownerQueryType === "to_owners") {
                let findToOwner = to_owners[ownerQueryIndex];

                if(findToOwner) {
                    findToOwner.id = ownerQuery.id;
                    findToOwner.subOwnerTypeDetail = {};
                    findToOwner.subOwnerTypeDetail.name = ownerQuery.subOwnerTypeDetail && ownerQuery.subOwnerTypeDetail.name;
                    findToOwner.license_no = ownerQuery.license_no;
                    findToOwner.fullname = ownerQuery.fullname;
                    findToOwner.address = ownerQuery.address;
                    findToOwner.phone = ownerQuery.phone;
                    findToOwner.status = ownerQuery.status;

                    let error = null;
                    if(ownerQuery.status === 3) {
                        error = "Đang bị ngăn chặn"
                    }
                    findToOwner.error = error;

                    this.props.changeFieldValue('to_owners', to_owners);
                }
            }

            if(ownerQueryType === "mid_owners") {
                let findMidOwner = mid_owners[ownerQueryIndex];

                if(findMidOwner) {
                    findMidOwner.id = ownerQuery.id;
                    findMidOwner.subOwnerTypeDetail = {};
                    findMidOwner.subOwnerTypeDetail.name = ownerQuery.subOwnerTypeDetail && ownerQuery.subOwnerTypeDetail.name;
                    findMidOwner.license_no = ownerQuery.license_no;
                    findMidOwner.fullname = ownerQuery.fullname;
                    findMidOwner.address = ownerQuery.address;
                    findMidOwner.phone = ownerQuery.phone;
                    findMidOwner.status = ownerQuery.status;
                    let error = null;
                    if(ownerQuery.status === 3) {
                        error = "Đang bị ngăn chặn"
                    }
                    findMidOwner.error = error;

                    this.props.changeFieldValue('mid_owners', mid_owners);
                }
            }
        }

        // Insert Tai San nếu thêm mới từ hợp đồng
        if(this.props.taiSanInsertContract && !prevProps.taiSanInsertContract 
       || (this.props.taiSanInsertContract && prevProps.taiSanInsertContract && this.props.taiSanInsertContract.id !== prevProps.taiSanInsertContract.id)) {
            const {license_number} = this.props.taiSanInsertContract;
            let {assets = []} = this.props;
            let newIndex = assets.length;

            this.props.clearATaiSan({});

            this.props.setATaiSanQueryIndex(newIndex);
            this.props.queryATaiSan({license_number});
    
            assets[newIndex] = {};
            assets[newIndex].license_number = license_number;
            this.props.changeFieldValue('assets', assets);
        }

        // Insert Doi Tuong nếu thêm mới từ hợp đồng
        if(this.props.doiTuongInsertContract && !prevProps.doiTuongInsertContract 
        || (this.props.doiTuongInsertContract && prevProps.doiTuongInsertContract && this.props.doiTuongInsertContract.id !== prevProps.doiTuongInsertContract.id)) {

            if(this.props.doiTuongInsertContract.doiTuongType === "from_owners") {
                const {license_no} = this.props.doiTuongInsertContract;
                let {from_owners = []} = this.props;
                let newIndex = from_owners.length;
                this.props.clearADoiTuong({});

                this.props.setADoiTuongQueryIndex(newIndex);
                this.props.queryADoiTuong({
                    query_type: 'from_owners',
                    license_no
                });
        
                from_owners[newIndex] = {};
                from_owners[newIndex].license_no = license_no;
                this.props.changeFieldValue('from_owners', from_owners);
            } else if(this.props.doiTuongInsertContract.doiTuongType === "to_owners") {
                const {license_no} = this.props.doiTuongInsertContract;
                let {to_owners = []} = this.props;
                let newIndex = to_owners.length;
                this.props.clearADoiTuong({});

                this.props.setADoiTuongQueryIndex(newIndex);
                this.props.queryADoiTuong({
                    query_type: 'to_owners',
                    license_no
                });
        
                to_owners[newIndex] = {};
                to_owners[newIndex].license_no = license_no;
                this.props.changeFieldValue('to_owners', to_owners);
            }
        }

        // Upload contract files
        const {contract_files} = this.props;

        if(contract_files && (contract_files !== prevProps.contract_files)) {
            this.props.changeFieldValue("contract_files", contract_files);
        }

        const {submitDatas = {}} = this.props;
        if(submitDatas && !prevProps.submitDatas || (submitDatas && prevProps.submitDatas && submitDatas.id !== prevProps.submitDatas.id)) {
            if(submitDatas.status === false) {
                toast.error(submitDatas.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } else {
                toast.success(submitDatas.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    // From Owner
    handleSearchFromOwner = (index) => {
        let {from_owners} = this.props;
        let license_no;
        this.props.clearADoiTuong({});
        
        if(from_owners && from_owners[index]) {
            license_no = from_owners[index].license_no;
            this.props.setADoiTuongQueryIndex(index);
            this.props.queryADoiTuong({
                query_type: 'from_owners',
                license_no: from_owners[index].license_no
            });
        }

        from_owners[index] = {};
        from_owners[index].license_no = license_no;
        this.props.changeFieldValue('from_owners', from_owners);
    }

    handleDeleteFromOwner = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xóa "Bên A" không?',
            onConfirm: () => {
                fields.remove(index);
            },
        });
    }

    // To Owner
    handleSearchToOwner = (index) => {
        let {to_owners} = this.props;
        let license_no;
        this.props.clearADoiTuong({});

        if(to_owners && to_owners[index]) {
            license_no = to_owners[index].license_no;
            this.props.setADoiTuongQueryIndex(index);
            this.props.queryADoiTuong({
                query_type: 'to_owners',
                license_no: to_owners[index].license_no
            });
        }

        to_owners[index] = {};
        to_owners[index].license_no = license_no;
        this.props.changeFieldValue('to_owners', to_owners);
    }

    handleDeleteToOwner = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xóa "Bên B" không?',
            onConfirm: () => {
                fields.remove(index);
            },
        });
    }

    // Mid Owner
    handleSearchMidOwner = (index) => {
        let {mid_owners} = this.props;
        let license_no;

        this.props.clearADoiTuong({});

        if(mid_owners && mid_owners[index]) {
            license_no = mid_owners[index].license_no;
            this.props.setADoiTuongQueryIndex(index);
            this.props.queryADoiTuong({
                query_type: 'mid_owners',
                license_no: mid_owners[index].license_no
            });
        }

        mid_owners[index] = {};
        mid_owners[index].license_no = license_no;
        this.props.changeFieldValue('mid_owners', mid_owners);
    }

    handleDeleteMidOwner = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xóa "Bên Thứ 3" không?',
            onConfirm: () => {
                fields.remove(index);
            },
        });
    }

    // Asset
    handleSearchAsset = (index) => {
        let {assets} = this.props;   
        let license_number;
        
        this.props.clearATaiSan({});

        if(assets && assets[index]) {
            license_number = assets[index].license_number;
            this.props.setATaiSanQueryIndex(index);
            this.props.queryATaiSan({license_number: assets[index].license_number});
        }

        assets[index] = {};
        assets[index].license_number = license_number;
        this.props.changeFieldValue('assets', assets);
    }

    handleDeleteAsset = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xóa "Tài Sản" không?',
            onConfirm: () => {
                let {assets = [], from_owners = []} = this.props;

                if(assets && assets[index]) {
                    from_owners = from_owners.filter(item => item.asset_id !== assets[index].id);
                }

                fields.remove(index);
                this.props.changeFieldValue('from_owners', from_owners);
            },
        });
    }

    handleFileDrops = (acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach(file => {
            this.props.uploadHopDongFiles(file);
        });
    };

    handleDeleteFile = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xoá file này không?',
            onConfirm: () => this.props.deleteAHopDongFile({id}),
        });
    }
 
    handleShowHistoryClick = (index) => {
        let {assets} = this.props;   

        if(assets && assets[index]) {
            this.props.loadATaiSanHistory({id: assets[index].id});
            this.props.DOC_changeActiveModal({modalId: 400});
        }
    }
    
    handleRequestTNMTLandData = (index) => {
        let {userId, groupId, userData, assets, districts, wards} = this.props;
        let findAsset = assets[index];
        if(findAsset) {
            this.props.openModalAction({
                id: uuid.v4(),
                type: MODAL_TYPE_CONFIRMATION,
                text: 'Bạn có muốn tra cứu thông tin đất đai (Sở TNTT)?',
                onConfirm: () => {
                    let {land_number, map_paper_number, district_id, ward_id} = findAsset;
                    let findADistrict = districts.find(item => item.id === district_id);
                    let findAWard = wards.find(item => item.id === ward_id);
                    
                    let villageCode = findAWard ? findAWard.code : 0;
                    let districtCode = findADistrict ? findADistrict.code : 0;

                    this.props.requestTNMTLandData({
                        transaction_code: uuid.v4(),
                        land_number,
                        map_paper_number,
                        villageCode,
                        districtCode,
                        userId,
                        groupId,
                        secretKey: userData.userGroupDetail.secretKey,
                        departmentCode: userData.userGroupDetail.departmentCode,
                        username: userData.userGroupDetail.userRequestTNMTData,
                        password: userData.userGroupDetail.passwordRequestTNMTData,
                    });

                    this.handleModalChange(100);
                },
            });
        }
    }

    render() {
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        return (
            <HopDongAddComponent {...this.props}
                                 staticFileUrl={uploadRootURL}
                                 handleModalChange={this.handleModalChange}
                                 handleSearchFromOwner={this.handleSearchFromOwner}
                                 handleSearchToOwner={this.handleSearchToOwner}
                                 handleSearchMidOwner={this.handleSearchMidOwner}
                                 handleSearchAsset={this.handleSearchAsset}
                                 handleShowHistoryClick={this.handleShowHistoryClick}
                                 handleDeleteToOwner ={this.handleDeleteToOwner}
                                 handleDeleteFromOwner={this.handleDeleteFromOwner}
                                 handleDeleteMidOwner={this.handleDeleteMidOwner}
                                 handleDeleteAsset={this.handleDeleteAsset}
                                 handleFileDrops={this.handleFileDrops}
                                 handleDeleteFile={this.handleDeleteFile}
                                 handleRequestTNMTLandData={this.handleRequestTNMTLandData}
            />
        );
    }
}

/**
 * Form validation
 *
 * @param values
 */
const validate = (values) => {
    const errors = {};

    //errors.contract_no = validateRequired(values.contract_no);
    errors.notary_name = validateRequired(values.notary_name);

    return errors;
};

const formSelector = formValueSelector(HOP_DONG_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:         getDocCurrentModalId(state),
    userId:                 getUserId(state),
    groupId:                getGroupId(state),
    userData:               getUserData(state),
    districts:              getDistrictList(state),
    wards:                  getWardList(state),
 
    contract_type_id:       formSelector(state, "contract_type_id"),
    archive_book_type_id:   formSelector(state, "archive_book_type_id"),

    assets:                 formSelector(state, "assets"),
    from_owners:            formSelector(state, "from_owners"),
    to_owners:              formSelector(state, "to_owners"),
    mid_owners:             formSelector(state, "mid_owners"),

    contract_types:         getContractTypeList(state),
    sub_contract_types:     getLoaiHopDongList(state),
    archive_books:          getSoLuuTruList(state),
    archive_book_types:     getLoaiSoLuuTruList(state),
    ownerQuery:             getDoiTuongQuery(state),
    ownerQueryType:         getDoiTuongQueryType(state),
    assetQuery:             getTaiSanQuery(state),
    assetQueryIndex:        getTaiSanQueryIndex(state),
    ownerQueryIndex:        getDoiTuongQueryIndex(state),

    contract_files:         getHopDongFiles(state),

    assetHistories:         getTaiSanHistories(state),
    taiSanInsertContract:   getTaiSanInsertContract(state),
    doiTuongInsertContract: getDoiTuongInsertContract(state),

    //formDatas:              getFormValues(HOP_DONG_FORM_NAME)(state),
    submitDatas:             formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    DOC_changeTypeModal:        payload => dispatch(DOC_changeTypeModal(payload)),

    loadListDistrict:           payload => dispatch(loadListDistrict(payload)),
    loadListWard:               payload => dispatch(loadListWard(payload)),

    loadListContractType:       payload => dispatch(loadListContractType(payload)),
    loadListLoaiHopDong:        payload => dispatch(loadListLoaiHopDong(payload)),
    loadListSoLuuTru:           payload => dispatch(loadListSoLuuTru(payload)),
    loadListLoaiSoLuuTru:       payload => dispatch(loadListLoaiSoLuuTru(payload)),
    loadATaiSanHistory:         payload => dispatch(loadATaiSanHistory(payload)),

    queryADoiTuong:             payload => dispatch(queryADoiTuong(payload)),
    queryATaiSan:               payload => dispatch(queryATaiSan(payload)),
    clearADoiTuong:             payload => dispatch(clearADoiTuong(payload)),
    clearATaiSan:               payload => dispatch(clearATaiSan(payload)),
    setATaiSanQueryIndex:       payload => dispatch(setATaiSanQueryIndex(payload)),
    setADoiTuongQueryIndex:     payload => dispatch(setADoiTuongQueryIndex(payload)),

    requestTNMTLandData:        payload => dispatch(requestTNMTLandData(payload)),
    uploadHopDongFiles:         payload => dispatch(uploadHopDongFiles(payload)),
    deleteAHopDongFile:         payload => dispatch(deleteAHopDongFile(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(HOP_DONG_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload))
});

const onSubmitSuccess = (result, dispatch) => {
    //return dispatch(push(`/hop-dongs/contract/list`));
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã thêm thành công!"
    }

    dispatch(reset(HOP_DONG_FORM_NAME));
    dispatch(change(HOP_DONG_FORM_NAME, "submitDatas", returnData));
};

const onSubmitFail = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": false,
        "color": "danger",
        "message": result._error
    }

    dispatch(change(HOP_DONG_FORM_NAME, "submitDatas", returnData));
}


export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: HOP_DONG_FORM_NAME,
        onSubmit: onSubmitActions(HOP_DONG_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        onSubmitFail: onSubmitFail,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(HopDongAdd)
);