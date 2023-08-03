import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const LOAD_LIST_DOI_TUONG                     = defineAction('LOAD_LIST_DOI_TUONG',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const LOAD_A_DOI_TUONG_INFO                   = defineAction('LOAD_A_DOI_TUONG_INFO',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const QUERY_A_DOI_TUONG                       = defineAction('QUERY_A_DOI_TUONG',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const QUERY_A_DOI_TUONG_TYPE                  = 'QUERY_A_DOI_TUONG_TYPE';
export const ADD_A_DOI_TUONG_ACTION                  = defineAction('ADD_A_DOI_TUONG_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const UPDATE_A_DOI_TUONG_ACTION               = defineAction('UPDATE_A_DOI_TUONG_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const DELETE_A_DOI_TUONG_ACTION               = defineAction('DELETE_A_DOI_TUONG_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const CLEAR_A_DOI_TUONG                       = 'CLEAR_A_DOI_TUONG';
export const SET_A_DOI_TUONG_QUERY_INDEX             = 'SET_A_DOI_TUONG_QUERY_INDEX';
export const CLEAR_A_DOI_TUONG_ERROR_OR_MESSAGES     = 'CLEAR_A_DOI_TUONG_ERROR_OR_MESSAGES';

export const LOAD_LIST_OWNER_TYPE                    = defineAction('LOAD_LIST_OWNER_TYPE',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const ADD_A_OWNER_TYPE_ACTION                 = defineAction('ADD_A_OWNER_TYPE_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const UPDATE_A_OWNER_TYPE_ACTION              = defineAction('UPDATE_A_OWNER_TYPE_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');

export const LOAD_LIST_SUB_OWNER_TYPE                = defineAction('LOAD_LIST_SUB_OWNER_TYPE',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const ADD_A_SUB_OWNER_TYPE_ACTION             = defineAction('ADD_A_SUB_OWNER_TYPE_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const UPDATE_A_SUB_OWNER_TYPE_ACTION          = defineAction('UPDATE_A_SUB_OWNER_TYPE_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');

export const LOAD_LIST_TAI_SAN                       = defineAction('LOAD_LIST_TAI_SAN',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const LOAD_A_TAI_SAN_INFO                     = defineAction('LOAD_A_TAI_SAN_INFO',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const LOAD_A_TAI_SAN_HISTORY                  = defineAction('LOAD_A_TAI_SAN_HISTORY',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const QUERY_A_TAI_SAN                         = defineAction('QUERY_A_TAI_SAN',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const ADD_A_TAI_SAN_ACTION                    = defineAction('ADD_A_TAI_SAN_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const UPDATE_A_TAI_SAN_ACTION                 = defineAction('UPDATE_A_TAI_SAN_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const DELETE_A_TAI_SAN_ACTION                 = defineAction('DELETE_A_TAI_SAN_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const DELETE_A_OWNER_ASSET_RELATION_ACTION    = defineAction('DELETE_A_OWNER_ASSET_RELATION_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const CLEAR_A_TAI_SAN                         = 'CLEAR_A_TAI_SAN';
export const SET_A_TAI_SAN_QUERY_INDEX               = 'SET_A_TAI_SAN_QUERY_INDEX';
export const CLEAR_A_TAI_SAN_ERROR_OR_MESSAGES       = 'CLEAR_A_TAI_SAN_ERROR_OR_MESSAGES';

export const LOAD_LIST_SUB_ASSET_TYPE                = defineAction('LOAD_LIST_SUB_ASSET_TYPE',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const LOAD_A_SUB_ASSET_TYPE_INFO              = defineAction('LOAD_A_SUB_ASSET_TYPE_INFO',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const ADD_A_SUB_ASSET_TYPE_ACTION             = defineAction('ADD_A_SUB_ASSET_TYPE_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const UPDATE_A_SUB_ASSET_TYPE_ACTION          = defineAction('UPDATE_A_SUB_ASSET_TYPE_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const DELETE_A_SUB_ASSET_TYPE_ACTION          = defineAction('DELETE_A_SUB_ASSET_TYPE_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');

export const LOAD_LIST_CONTRACT_TYPE                 = defineAction('LOAD_LIST_CONTRACT_TYPE',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const LOAD_A_CONTRACT_TYPE_INFO               = defineAction('LOAD_A_CONTRACT_TYPE_INFO',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const ADD_A_CONTRACT_TYPE_ACTION              = defineAction('ADD_A_CONTRACT_TYPE_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const UPDATE_A_CONTRACT_TYPE_ACTION           = defineAction('UPDATE_A_CONTRACT_TYPE_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const DELETE_A_CONTRACT_TYPE_ACTION           = defineAction('DELETE_A_CONTRACT_TYPE_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');

export const LOAD_LIST_LOAI_HOP_DONG                 = defineAction('LOAD_LIST_LOAI_HOP_DONG',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const LOAD_A_LOAI_HOP_DONG_INFO               = defineAction('LOAD_A_LOAI_HOP_DONG_INFO',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const ADD_A_LOAI_HOP_DONG_ACTION              = defineAction('ADD_A_LOAI_HOP_DONG_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const UPDATE_A_LOAI_HOP_DONG_ACTION           = defineAction('UPDATE_A_LOAI_HOP_DONG_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const DELETE_A_LOAI_HOP_DONG_ACTION           = defineAction('DELETE_A_LOAI_HOP_DONG_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');

export const LOAD_LIST_LOAI_SO_LUU_TRU               = defineAction('LOAD_LIST_LOAI_SO_LUU_TRU',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const LOAD_A_LOAI_SO_LUU_TRU_INFO             = defineAction('LOAD_A_LOAI_SO_LUU_TRU_INFO',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const ADD_A_LOAI_SO_LUU_TRU_ACTION            = defineAction('ADD_A_LOAI_SO_LUU_TRU_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const UPDATE_A_LOAI_SO_LUU_TRU_ACTION         = defineAction('UPDATE_A_LOAI_SO_LUU_TRU_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const DELETE_A_LOAI_SO_LUU_TRU_ACTION         = defineAction('DELETE_A_LOAI_SO_LUU_TRU_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');

export const LOAD_LIST_SO_LUU_TRU                    = defineAction('LOAD_LIST_SO_LUU_TRU',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const LOAD_A_SO_LUU_TRU_INFO                  = defineAction('LOAD_A_SO_LUU_TRU_INFO',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const ADD_A_SO_LUU_TRU_ACTION                 = defineAction('ADD_A_SO_LUU_TRU_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const UPDATE_A_SO_LUU_TRU_ACTION              = defineAction('UPDATE_A_SO_LUU_TRU_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const DELETE_A_SO_LUU_TRU_ACTION              = defineAction('DELETE_A_SO_LUU_TRU_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');

export const LOAD_LIST_LAND_PURPOSE                  = defineAction('LOAD_LIST_LAND_PURPOSE',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const LOAD_A_LAND_PURPOSE_INFO                = defineAction('LOAD_A_LAND_PURPOSE_INFO',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const ADD_A_LAND_PURPOSE_ACTION               = defineAction('ADD_A_LAND_PURPOSE_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const UPDATE_A_LAND_PURPOSE_ACTION            = defineAction('UPDATE_A_LAND_PURPOSE_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const DELETE_A_LAND_PURPOSE_ACTION            = defineAction('DELETE_A_LAND_PURPOSE_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const DELETE_A_LAND_PURPOSE_RELATION_ACTION   = defineAction('DELETE_A_LAND_PURPOSE_RELATION_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');

export const LOAD_LIST_BANK                          = defineAction('LOAD_LIST_BANK',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const ADD_A_BANK_ACTION                       = defineAction('ADD_A_BANK_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const UPDATE_A_BANK_ACTION                    = defineAction('UPDATE_A_BANK_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');

export const DOI_TUONG_FILTER_LIST_ACTION            = defineAction('DOI_TUONG_FILTER_LIST_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const DELETE_A_DOI_TUONG_FILTER_ACTION        = defineAction('DELETE_A_DOI_TUONG_FILTER_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const CLEAR_DOI_TUONG_FILTER_ACTION           = defineAction('CLEAR_DOI_TUONG_FILTER_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');

export const CHANGE_OWNER_TAB_ACTION                 = 'CHANGE_OWNER_TAB_ACTION';
export const CHANGE_TAI_SAN_TAB_ACTION               = defineAction('CHANGE_TAI_SAN_TAB_ACTION',  [LOADING, FAILURE, SUCCESS], 'danhMucs');

export const LOAD_LIST_DISTRICT                      = defineAction('LOAD_LIST_DISTRICT',  [LOADING, FAILURE, SUCCESS], 'danhMucs');
export const LOAD_LIST_WARD                          = defineAction('LOAD_LIST_WARD',  [LOADING, FAILURE, SUCCESS], 'danhMucs');

export const DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD        = defineAction('DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const CLEAR_DOC_EXPORT                        = 'CLEAR_DOC_EXPORT';

export const loadListDoiTuong                        = createAction(LOAD_LIST_DOI_TUONG.ACTION);
export const loadADoiTuongInfo                       = createAction(LOAD_A_DOI_TUONG_INFO.ACTION);
export const queryADoiTuong                          = createAction(QUERY_A_DOI_TUONG.ACTION);
export const addADoiTuong                            = createAction(ADD_A_DOI_TUONG_ACTION.ACTION);
export const updateADoiTuong                         = createAction(UPDATE_A_DOI_TUONG_ACTION.ACTION);
export const deleteADoiTuong                         = createAction(DELETE_A_DOI_TUONG_ACTION.ACTION);
export const clearADoiTuong                          = createAction(CLEAR_A_DOI_TUONG);
export const setADoiTuongQueryIndex                  = createAction(SET_A_DOI_TUONG_QUERY_INDEX);
export const clearADoiTuongErrorOrMessages           = createAction(CLEAR_A_DOI_TUONG_ERROR_OR_MESSAGES);

export const loadListOwnerType                       = createAction(LOAD_LIST_OWNER_TYPE.ACTION);
export const addAOwnerType                           = createAction(ADD_A_OWNER_TYPE_ACTION.ACTION);
export const updateAOwnerType                        = createAction(UPDATE_A_OWNER_TYPE_ACTION.ACTION);

export const loadListSubOwnerType                    = createAction(LOAD_LIST_SUB_OWNER_TYPE.ACTION);
export const addASubOwnerType                        = createAction(ADD_A_SUB_OWNER_TYPE_ACTION.ACTION);
export const updateASubOwnerType                     = createAction(UPDATE_A_SUB_OWNER_TYPE_ACTION.ACTION);

export const loadListTaiSan                          = createAction(LOAD_LIST_TAI_SAN.ACTION);
export const loadATaiSanInfo                         = createAction(LOAD_A_TAI_SAN_INFO.ACTION);
export const loadATaiSanHistory                      = createAction(LOAD_A_TAI_SAN_HISTORY.ACTION);
export const queryATaiSan                            = createAction(QUERY_A_TAI_SAN.ACTION);
export const addATaiSan                              = createAction(ADD_A_TAI_SAN_ACTION.ACTION);
export const updateATaiSan                           = createAction(UPDATE_A_TAI_SAN_ACTION.ACTION);
export const deleteATaiSan                           = createAction(DELETE_A_TAI_SAN_ACTION.ACTION);
export const deleteAOwnerAssetRelation               = createAction(DELETE_A_OWNER_ASSET_RELATION_ACTION.ACTION);
export const clearATaiSan                            = createAction(CLEAR_A_TAI_SAN);
export const setATaiSanQueryIndex                    = createAction(SET_A_TAI_SAN_QUERY_INDEX);
export const clearATaiSanErrorOrMessages             = createAction(CLEAR_A_TAI_SAN_ERROR_OR_MESSAGES);

export const loadListSubAssetType                    = createAction(LOAD_LIST_SUB_ASSET_TYPE.ACTION);
export const loadASubAssetTypeInfo                   = createAction(LOAD_A_SUB_ASSET_TYPE_INFO.ACTION);
export const addASubAssetType                        = createAction(ADD_A_SUB_ASSET_TYPE_ACTION.ACTION);
export const updateASubAssetType                     = createAction(UPDATE_A_SUB_ASSET_TYPE_ACTION.ACTION);
export const deleteASubAssetType                     = createAction(DELETE_A_SUB_ASSET_TYPE_ACTION.ACTION);

export const loadListContractType                    = createAction(LOAD_LIST_CONTRACT_TYPE.ACTION);
export const loadAContractTypeInfo                   = createAction(LOAD_A_CONTRACT_TYPE_INFO.ACTION);
export const addAContractType                        = createAction(ADD_A_CONTRACT_TYPE_ACTION.ACTION);
export const updateAContractType                     = createAction(UPDATE_A_CONTRACT_TYPE_ACTION.ACTION);
export const deleteAContractType                     = createAction(DELETE_A_CONTRACT_TYPE_ACTION.ACTION);

export const loadListLoaiHopDong                     = createAction(LOAD_LIST_LOAI_HOP_DONG.ACTION);
export const loadALoaiHopDongInfo                    = createAction(LOAD_A_LOAI_HOP_DONG_INFO.ACTION);
export const addALoaiHopDong                         = createAction(ADD_A_LOAI_HOP_DONG_ACTION.ACTION);
export const updateALoaiHopDong                      = createAction(UPDATE_A_LOAI_HOP_DONG_ACTION.ACTION);
export const deleteALoaiHopDong                      = createAction(DELETE_A_LOAI_HOP_DONG_ACTION.ACTION);

export const loadListLoaiSoLuuTru                    = createAction(LOAD_LIST_LOAI_SO_LUU_TRU.ACTION);
export const loadALoaiSoLuuTruInfo                   = createAction(LOAD_A_LOAI_SO_LUU_TRU_INFO.ACTION);
export const addALoaiSoLuuTru                        = createAction(ADD_A_LOAI_SO_LUU_TRU_ACTION.ACTION);
export const updateALoaiSoLuuTru                     = createAction(UPDATE_A_LOAI_SO_LUU_TRU_ACTION.ACTION);
export const deleteALoaiSoLuuTru                     = createAction(DELETE_A_LOAI_SO_LUU_TRU_ACTION.ACTION);

export const loadListSoLuuTru                        = createAction(LOAD_LIST_SO_LUU_TRU.ACTION);
export const loadASoLuuTruInfo                       = createAction(LOAD_A_SO_LUU_TRU_INFO.ACTION);
export const addASoLuuTru                            = createAction(ADD_A_SO_LUU_TRU_ACTION.ACTION);
export const updateASoLuuTru                         = createAction(UPDATE_A_SO_LUU_TRU_ACTION.ACTION);
export const deleteASoLuuTru                         = createAction(DELETE_A_SO_LUU_TRU_ACTION.ACTION);

export const loadListLandPurpose                     = createAction(LOAD_LIST_LAND_PURPOSE.ACTION);
export const loadALandPurposeInfo                    = createAction(LOAD_A_LAND_PURPOSE_INFO.ACTION);
export const addALandPurpose                         = createAction(ADD_A_LAND_PURPOSE_ACTION.ACTION);
export const updateALandPurpose                      = createAction(UPDATE_A_LAND_PURPOSE_ACTION.ACTION);
export const deleteALandPurpose                      = createAction(DELETE_A_LAND_PURPOSE_ACTION.ACTION);
export const deleteALandPurposeRelation              = createAction(DELETE_A_LAND_PURPOSE_RELATION_ACTION.ACTION);

export const loadListBank                            = createAction(LOAD_LIST_BANK.ACTION);
export const addABank                                = createAction(ADD_A_BANK_ACTION.ACTION);
export const updateABank                             = createAction(UPDATE_A_BANK_ACTION.ACTION);

export const doDoiTuongFilterList                    = createAction(DOI_TUONG_FILTER_LIST_ACTION.ACTION);
export const deleteADoiTuongFilter                   = createAction(DELETE_A_DOI_TUONG_FILTER_ACTION.ACTION);
export const clearDoiTuongFilter                     = createAction(CLEAR_DOI_TUONG_FILTER_ACTION.ACTION);

export const doChangeOwnerTab                        = createAction(CHANGE_OWNER_TAB_ACTION);
export const doChangeTaiSanTab                       = createAction(CHANGE_TAI_SAN_TAB_ACTION.ACTION);

export const loadListDistrict                        = createAction(LOAD_LIST_DISTRICT.ACTION);
export const loadListWard                            = createAction(LOAD_LIST_WARD.ACTION);

export const DOC_exportPhieuTraCuuToWORD             = createAction(DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD.ACTION);
export const clearDocExport                          = createAction(CLEAR_DOC_EXPORT);
