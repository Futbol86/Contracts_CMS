import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";
import {toast} from 'react-toastify';
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {isEmpty} from 'lodash';
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import auth from "../../../services/auth";

import {TAI_SAN_FORM_NAME} from "../constants";
import {loadATaiSanInfo, queryADoiTuong, clearADoiTuong, deleteAOwnerAssetRelation, deleteALandPurposeRelation, setADoiTuongQueryIndex,
        loadListSubAssetType, loadListDistrict, loadListWard, loadListLandPurpose} from '../actions';

import {getTaiSanInfo, getDoiTuongQuery, getDoiTuongQueryIndex, getSubAssetTypeList, 
        getDistrictList, getWardList, getLandPurposeList} from "../selectors";
import {getDocCurrentModalId} from "../../documents/selectors";

import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";
import TaiSanAddComponent from "../components/TaiSanAdd";

class TaiSanEdit extends Component {
    componentDidMount() {
        const {history} = this.props;
        const userData = auth.getUserFromStorage();

        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(5) === -1) {
                history.push("/dashboard");
            }
        }

        let {id} = this.props.match.params;
        if (id) {
            this.props.loadATaiSanInfo({id});
        }

        this.props.loadListSubAssetType({limit: 10000});
        this.props.loadListDistrict({limit: 10000});
        this.props.loadListWard({limit: 10000});
        this.props.loadListLandPurpose({limit: 10000});
    }

    componentDidUpdate(prevProps) {
        const {assetDetail} = this.props;
        const {sub_asset_type_detail} = this.props.assetDetail;

        if (assetDetail && assetDetail.id !== prevProps.assetDetail.id) {
            let owners = [];

            this.props.assetDetail.owner_details.map(item => {
                owners.push({
                    asset_id: this.props.assetDetail.id,
                    owner_id: item.id,
                    license_no: item.license_no,
                    fullname: item.fullname,
                    address: item.address,
                    phone: item.phone,
                })
            });

            if(this.props.assetDetail.related_lands) {
                let findWard = this.props.wards.find(item => item.id === this.props.assetDetail.related_lands.ward_id);
                if(findWard)
                    this.props.assetDetail.related_lands.district_id = findWard.district_id;
                this.props.assetDetail.hasThongTinThuoDat = true;
            }

            if(this.props.assetDetail.related_assets) {
                this.props.assetDetail.hasTaiSanGanLienVoiDat = true;
            }

            let initialForm = {
                ...this.props.assetDetail,
                owners,
                asset_type_id: sub_asset_type_detail.asset_type_id,
                hasNoLicenseNumber: isEmpty(assetDetail.license_number),
            }

            this.props.initialize(initialForm);
        }

        let {ownerQuery} = this.props;
        if(!isEmpty(ownerQuery) && (ownerQuery.id !== prevProps.ownerQuery.id)) {
            let {owners, ownerQueryIndex} = this.props;
            let findOwner = owners[ownerQueryIndex];

            if(findOwner) {
                findOwner.id = ownerQuery.id;
                findOwner.license_no = ownerQuery.license_no;
                findOwner.fullname = ownerQuery.fullname;
                findOwner.address = ownerQuery.address;
                findOwner.phone = ownerQuery.phone;
            }
         
            this.props.changeFieldValue('owners', owners);
        }

        const {hasNoLicenseNumber} = this.props;
        if(hasNoLicenseNumber === true) {
            this.props.changeFieldValue("license_number", null);
            this.props.changeFieldValue("issued_at", null);
            this.props.changeFieldValue("issued_by", null);
            this.props.changeFieldValue("cert_number", null);
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

    handleSearch = (index) => {
        const {owners} = this.props;
        this.props.clearADoiTuong({});

        if(owners[index]) {
            this.props.setADoiTuongQueryIndex(index);
            this.props.queryADoiTuong({license_no: owners[index].license_no});
        }

        owners[index] = {};
        this.props.changeFieldValue('owners', owners);
    }

    handleDeleteOwnerAssetRelations = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xóa "Chủ sở hữu" không?',
            onConfirm: () => {
                const {owners} = this.props;
                if(owners[index].owner_id) {
                    this.props.deleteAOwnerAssetRelation({
                        asset_id: owners[index].asset_id,
                        owner_id: owners[index].owner_id,
                    })
                }
                fields.remove(index);
            },
        });
    }
  
    handleDeleteOwnerAssetRelations = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xóa "Chủ sở hữu" không?',
            onConfirm: () => {
                const {owners} = this.props;
                if(owners[index].owner_id) {
                    this.props.deleteAOwnerAssetRelation({
                        asset_id: owners[index].asset_id,
                        owner_id: owners[index].owner_id,
                    })
                }
                fields.remove(index);
            },
        });
    }

    handleDeleteLandPurposeRelations = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Bạn có muốn xóa "Mục đích sử dụng đất" không?',
            onConfirm: () => {
                const {related_lands} = this.props;
                if(related_lands && related_lands.land_purpose_relations && related_lands.land_purpose_relations[index]) {
                    this.props.deleteALandPurposeRelation({
                        id: related_lands.land_purpose_relations[index].id,
                    })
                }
                fields.remove(index);
            },
        });
    }

    render() {
        const {related_lands} = this.props;
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        return (
            <TaiSanAddComponent {...this.props}
                                district_id={related_lands && related_lands.district_id}
                                uploadRootURL={uploadRootURL}
                                handleSearch={this.handleSearch}
                                handleDeleteOwnerAssetRelations={this.handleDeleteOwnerAssetRelations}
                                handleDeleteLandPurposeRelations={this.handleDeleteLandPurposeRelations}
            />
        );
    }
}

const validate = (values) => {
    const errors = {};

    if(values.asset_type_id === 1) {
        errors.license_number = validateRequired(values.license_number);
        //errors.plate_no = validateRequired(values.plate_no);
    } else if(values.asset_type_id === 2) {
        if(values.hasNoLicenseNumber === false) {
            errors.license_number = validateRequired(values.license_number);
            errors.issued_by = validateRequired(values.issued_by);
        }
        errors.address = validateRequired(values.address);
        
        errors.related_lands = {};
        errors.related_assets = {};

        if(values.hasThongTinThuoDat) {
            if(values.related_lands) {
                errors.related_lands.land_number = validateRequired(values.related_lands.land_number);
                errors.related_lands.map_paper_number = validateRequired(values.related_lands.map_paper_number);
            }
        }

        if(values.hasTaiSanGanLienVoiDat) {
            if(values.related_assets) {
                errors.related_assets.kind_of = validateRequired(values.related_assets.kind_of);
                errors.related_assets.total_area = validateRequired(values.related_assets.total_area);       
            }
        }
    }

    return errors;
};

const formSelector = formValueSelector(TAI_SAN_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:             getDocCurrentModalId(state),
    assetDetail:                getTaiSanInfo(state),

    districts:                  getDistrictList(state),
    wards:                      getWardList(state),
    land_purposes:              getLandPurposeList(state),
    subAssetTypes:              getSubAssetTypeList(state),
    ownerQuery:                 getDoiTuongQuery(state),
    ownerQueryIndex:            getDoiTuongQueryIndex(state),

    asset_type_id:              formSelector(state, "asset_type_id"),
    related_lands:              formSelector(state, "related_lands"),

    hasNoLicenseNumber:         formSelector(state, "hasNoLicenseNumber"),
    hasThongTinThuoDat:         formSelector(state, "hasThongTinThuoDat"),
    hasTaiSanGanLienVoiDat:     formSelector(state, "hasTaiSanGanLienVoiDat"),

    owners:                     formSelector(state, "owners"),

    //formDatas:                  getFormValues(TAI_SAN_FORM_NAME)(state),
    submitDatas:                formSelector(state, "submitDatas"),
});

const mapDispatchToProps = (dispatch) => ({
    loadATaiSanInfo:               payload => dispatch(loadATaiSanInfo(payload)),
    queryADoiTuong:                payload => dispatch(queryADoiTuong(payload)),

    deleteAOwnerAssetRelation:     payload => dispatch(deleteAOwnerAssetRelation(payload)), 
    deleteALandPurposeRelation:    payload => dispatch(deleteALandPurposeRelation(payload)), 

    loadListSubAssetType:          payload => dispatch(loadListSubAssetType(payload)),
    loadListDistrict:              payload => dispatch(loadListDistrict(payload)),
    loadListWard:                  payload => dispatch(loadListWard(payload)),
    loadListLandPurpose:           payload => dispatch(loadListLandPurpose(payload)),

    setADoiTuongQueryIndex:        payload => dispatch(setADoiTuongQueryIndex(payload)),
    clearADoiTuong:                payload => dispatch(clearADoiTuong(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(TAI_SAN_FORM_NAME, field, value))
    },

    openModalAction:               payload => dispatch(openModalAction(payload))
});

const onSubmitSuccess = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": true,
        "color": "success",
        "message": "Bạn đã sửa " + (result.data.data.license_number || "") + " thành công!"
    }
    dispatch(change(TAI_SAN_FORM_NAME, "submitDatas", returnData));
};

const onSubmitFail = (result, dispatch) => {
    let returnData = {
        "id": uuid.v4(),
        "status": false,
        "color": "danger",
        "message": result._error
    }
    dispatch(change(TAI_SAN_FORM_NAME, "submitDatas", returnData));
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: TAI_SAN_FORM_NAME,
        onSubmit: onSubmitActions(TAI_SAN_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        onSubmitFail: onSubmitFail,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(TaiSanEdit)
);