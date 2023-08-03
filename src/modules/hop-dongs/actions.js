import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const LOAD_LIST_HOP_DONG                      = defineAction('LOAD_LIST_HOP_DONG',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const LOAD_A_HOP_DONG_INFO                    = defineAction('LOAD_A_HOP_DONG_INFO',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const ADD_A_HOP_DONG_ACTION                   = defineAction('ADD_A_HOP_DONG_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const UPDATE_A_HOP_DONG_STATUS_ACTION         = defineAction('UPDATE_A_HOP_DONG_STATUS_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DELETE_A_HOP_DONG_ACTION                = defineAction('DELETE_A_HOP_DONG_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const CLEAR_A_HOP_DONG_ACTION                 = 'CLEAR_A_HOP_DONG_ACTION';
export const UPLOAD_HOP_DONG_FILES_ACTION            = defineAction('UPLOAD_HOP_DONG_FILES_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DELETE_A_HOP_DONG_FILE_ACTION           = defineAction('DELETE_A_HOP_DONG_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');

export const LOAD_LIST_NEW_HOP_DONG                  = defineAction('LOAD_LIST_NEW_HOP_DONG',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const LOAD_A_NEW_HOP_DONG_INFO                = defineAction('LOAD_A_NEW_HOP_DONG_INFO',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const ADD_A_NEW_HOP_DONG_ACTION               = defineAction('ADD_A_NEW_HOP_DONG_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const CLEAR_A_NEW_HOP_DONG_ACTION             = 'CLEAR_A_NEW_HOP_DONG_ACTION';
export const DISPLAY_FULL_CONTEXT_ACTION             = 'DISPLAY_FULL_CONTEXT_ACTION';
export const UPLOAD_NEW_HOP_DONG_FILES_ACTION        = defineAction('UPLOAD_NEW_HOP_DONG_FILES_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DELETE_A_NEW_HOP_DONG_FILE_ACTION       = defineAction('DELETE_A_NEW_HOP_DONG_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');

export const LOAD_LIST_NEW_DONG_A_HOP_DONG           = defineAction('LOAD_LIST_NEW_DONG_A_HOP_DONG',  [LOADING, FAILURE, SUCCESS], 'hopDongs');

export const LOAD_LIST_NGAN_CHAN                     = defineAction('LOAD_LIST_NGAN_CHAN',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const LOAD_A_NGAN_CHAN_INFO                   = defineAction('LOAD_A_NGAN_CHAN_INFO',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const LOAD_AN_ASSET_PREVENTION_SELECTED       = defineAction('LOAD_AN_ASSET_PREVENTION_SELECTED',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const ADD_A_NGAN_CHAN_ACTION                  = defineAction('ADD_A_NGAN_CHAN_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const UPDATE_A_NGAN_CHAN_ACTION               = defineAction('UPDATE_A_NGAN_CHAN_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DELETE_A_NGAN_CHAN_ACTION               = defineAction('DELETE_A_NGAN_CHAN_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DELETE_AN_ASSET_PREVENTION_DETAIL_ACTION  = defineAction('DELETE_AN_ASSET_PREVENTION_DETAIL_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DELETE_AN_OWNER_PREVENTION_DETAIL_ACTION  = defineAction('DELETE_AN_OWNER_PREVENTION_DETAIL_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const CLEAR_A_NGAN_CHAN_ACTION                = 'CLEAR_A_NGAN_CHAN_ACTION';
export const CLEAR_A_NGAN_CHAN_FILTER                = 'CLEAR_A_NGAN_CHAN_FILTER';
export const SET_ASSET_PREVENTION_SELECTED           = 'SET_ASSET_PREVENTION_SELECTED';
export const REMOVE_ASSET_PREVENTION_SELECTED        = 'REMOVE_ASSET_PREVENTION_SELECTED';
export const UPLOAD_ASSET_PREVENTION_FILES_ACTION    = defineAction('UPLOAD_ASSET_PREVENTION_FILES_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DELETE_AN_ASSET_PREVENTION_FILE_ACTION  = defineAction('DELETE_AN_ASSET_PREVENTION_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');

export const LOAD_LIST_GIAI_TOA                      = defineAction('LOAD_LIST_GIAI_TOA',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const LOAD_A_GIAI_TOA_INFO                    = defineAction('LOAD_A_GIAI_TOA_INFO',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const ADD_A_GIAI_TOA_ACTION                   = defineAction('ADD_A_GIAI_TOA_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const UPDATE_A_GIAI_TOA_ACTION                = defineAction('UPDATE_A_GIAI_TOA_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DELETE_A_GIAI_TOA_ACTION                = defineAction('DELETE_A_GIAI_TOA_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const CLEAR_A_GIAI_TOA_ACTION                 = 'CLEAR_A_GIAI_TOA_ACTION';
export const UPLOAD_GIAI_TOA_FILES_ACTION            = defineAction('UPLOAD_GIAI_TOA_FILES_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DELETE_A_GIAI_TOA_FILE_ACTION           = defineAction('DELETE_A_GIAI_TOA_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');

export const LOAD_LIST_THU_HOI_GCN                   = defineAction('LOAD_LIST_THU_HOI_GCN',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const LOAD_A_THU_HOI_GCN_INFO                 = defineAction('LOAD_A_THU_HOI_GCN_INFO',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const ADD_A_THU_HOI_GCN_ACTION                = defineAction('ADD_A_THU_HOI_GCN_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const UPDATE_A_THU_HOI_GCN_ACTION             = defineAction('UPDATE_A_THU_HOI_GCN_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DELETE_A_THU_HOI_GCN_ACTION             = defineAction('DELETE_A_THU_HOI_GCN_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const CLEAR_A_THU_HOI_GCN_ACTION              = 'CLEAR_A_THU_HOI_GCN_ACTION';
export const UPLOAD_THU_HOI_GCN_FILES_ACTION         = defineAction('UPLOAD_THU_HOI_GCN_FILES_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DELETE_A_THU_HOI_GCN_FILE_ACTION        = defineAction('DELETE_A_THU_HOI_GCN_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');

export const LOAD_LIST_CONG_CHUNG_VIEN               = defineAction('LOAD_LIST_CONG_CHUNG_VIEN',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const LOAD_A_CONG_CHUNG_VIEN_INFO             = defineAction('LOAD_A_CONG_CHUNG_VIEN_INFO',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const ADD_A_CONG_CHUNG_VIEN_ACTION            = defineAction('ADD_A_CONG_CHUNG_VIEN_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const UPDATE_A_CONG_CHUNG_VIEN_ACTION         = defineAction('UPDATE_A_CONG_CHUNG_VIEN_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DELETE_A_CONG_CHUNG_VIEN_ACTION         = defineAction('DELETE_A_CONG_CHUNG_VIEN_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');

export const CHANGE_NGAN_CHAN_TAB_ACTION             = 'CHANGE_NGAN_CHAN_TAB_ACTION';
export const CHANGE_GIAI_TOA_TAB_ACTION              = 'CHANGE_GIAI_TOA_TAB_ACTION';

export const DOC_EXPORT_CONTRACT_TO_PDF              = defineAction('DOC_EXPORT_CONTRACT_TO_PDF',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DOC_EXPORT_TESTIMONIAL_TO_PDF           = defineAction('DOC_EXPORT_TESTIMONIAL_TO_PDF',  [LOADING, FAILURE, SUCCESS], 'hopDongs');

export const DOC_EXPORT_CONTRACT_TO_WORD             = defineAction('DOC_EXPORT_CONTRACT_TO_WORD',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DOC_EXPORT_TESTIMONIAL_TO_WORD          = defineAction('DOC_EXPORT_TESTIMONIAL_TO_WORD',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const CLEAR_DOC_EXPORT                        = 'CLEAR_DOC_EXPORT';

export const REQUEST_TNMT_LAND_DATA_ACTION           = defineAction('REQUEST_TNMT_LAND_DATA_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const CLEAR_TNMT_LAND_DATA_ACTION             = 'CLEAR_TNMT_LAND_DATA_ACTION';
export const REQUEST_TNMT_TONG_TIEN_NAP_ACTION       = defineAction('REQUEST_TNMT_TONG_TIEN_NAP_ACTION',  [LOADING, FAILURE, SUCCESS], 'hopDongs');

export const DOC_EXPORT_NEW_CONTRACT_LIST_TO_EXCEL   = defineAction('DOC_EXPORT_NEW_CONTRACT_LIST_TO_EXCEL',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DOC_EXPORT_NGAN_CHAN_LIST_TO_EXCEL      = defineAction('DOC_EXPORT_NGAN_CHAN_LIST_TO_EXCEL',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DOC_EXPORT_GIAI_TOA_LIST_TO_EXCEL       = defineAction('DOC_EXPORT_GIAI_TOA_LIST_TO_EXCEL',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DOC_EXPORT_THU_HOI_GCN_LIST_TO_EXCEL    = defineAction('DOC_EXPORT_THU_HOI_GCN_LIST_TO_EXCEL',  [LOADING, FAILURE, SUCCESS], 'hopDongs');

export const CLEAR_EXCEL_EXPORT                      = 'CLEAR_EXCEL_EXPORT';

export const CLEAR_A_NEW_HOP_DONG_SEARCHS_ACTION     = 'CLEAR_A_NEW_HOP_DONG_SEARCHS_ACTION';

export const loadListHopDong                 = createAction(LOAD_LIST_HOP_DONG.ACTION);
export const loadAHopDongInfo                = createAction(LOAD_A_HOP_DONG_INFO.ACTION);
export const addAHopDong                     = createAction(ADD_A_HOP_DONG_ACTION.ACTION);
export const updateAHopDongStatus            = createAction(UPDATE_A_HOP_DONG_STATUS_ACTION.ACTION);
export const deleteAHopDong                  = createAction(DELETE_A_HOP_DONG_ACTION.ACTION);
export const clearAHopDong                   = createAction(CLEAR_A_HOP_DONG_ACTION);
export const uploadHopDongFiles              = createAction(UPLOAD_HOP_DONG_FILES_ACTION.ACTION);
export const deleteAHopDongFile              = createAction(DELETE_A_HOP_DONG_FILE_ACTION.ACTION);

export const loadListNewHopDong              = createAction(LOAD_LIST_NEW_HOP_DONG.ACTION);
export const loadANewHopDongInfo             = createAction(LOAD_A_NEW_HOP_DONG_INFO.ACTION);
export const clearANewHopDong                = createAction(CLEAR_A_NEW_HOP_DONG_ACTION);
export const setDisplayFullContext           = createAction(DISPLAY_FULL_CONTEXT_ACTION);
export const uploadNewHopDongFiles           = createAction(UPLOAD_NEW_HOP_DONG_FILES_ACTION.ACTION);
export const deleteANewHopDongFile           = createAction(DELETE_A_NEW_HOP_DONG_FILE_ACTION.ACTION);

export const loadListNewDongAHopDong         = createAction(LOAD_LIST_NEW_DONG_A_HOP_DONG.ACTION);

export const loadListNganChan                = createAction(LOAD_LIST_NGAN_CHAN.ACTION);
export const loadANganChanInfo               = createAction(LOAD_A_NGAN_CHAN_INFO.ACTION);
export const loadAnAssetPreventionSelected   = createAction(LOAD_AN_ASSET_PREVENTION_SELECTED.ACTION);
export const addANganChan                    = createAction(ADD_A_NGAN_CHAN_ACTION.ACTION);
export const updateANganChan                 = createAction(UPDATE_A_NGAN_CHAN_ACTION.ACTION);
export const deleteANganChan                 = createAction(DELETE_A_NGAN_CHAN_ACTION.ACTION);
export const deleteAnAssetPreventionDetail   = createAction(DELETE_AN_ASSET_PREVENTION_DETAIL_ACTION.ACTION);
export const deleteAnOwnerPreventionDetail   = createAction(DELETE_AN_OWNER_PREVENTION_DETAIL_ACTION.ACTION);
export const clearANganChan                  = createAction(CLEAR_A_NGAN_CHAN_ACTION);
export const clearANganChanFilterInfo        = createAction(CLEAR_A_NGAN_CHAN_FILTER);
export const doSetAssetPreventionSelected    = createAction(SET_ASSET_PREVENTION_SELECTED);
export const doRemoveAssetPreventionSelected = createAction(REMOVE_ASSET_PREVENTION_SELECTED);
export const uploadAssetPreventionFiles      = createAction(UPLOAD_ASSET_PREVENTION_FILES_ACTION.ACTION);
export const deleteAnAssetPreventionFile     = createAction(DELETE_AN_ASSET_PREVENTION_FILE_ACTION.ACTION);

export const loadListGiaiToa                 = createAction(LOAD_LIST_GIAI_TOA.ACTION);
export const loadAGiaiToaInfo                = createAction(LOAD_A_GIAI_TOA_INFO.ACTION);
export const addAGiaiToa                     = createAction(ADD_A_GIAI_TOA_ACTION.ACTION);
export const updateAGiaiToa                  = createAction(UPDATE_A_GIAI_TOA_ACTION.ACTION);
export const deleteAGiaiToa                  = createAction(DELETE_A_GIAI_TOA_ACTION.ACTION);
export const clearAGiaiToa                   = createAction(CLEAR_A_GIAI_TOA_ACTION);
export const uploadGiaiToaFiles              = createAction(UPLOAD_GIAI_TOA_FILES_ACTION.ACTION);
export const deleteAGiaiToaFile              = createAction(DELETE_A_GIAI_TOA_FILE_ACTION.ACTION);

export const loadListThuHoiGCN               = createAction(LOAD_LIST_THU_HOI_GCN.ACTION);
export const loadAThuHoiGCNInfo              = createAction(LOAD_A_THU_HOI_GCN_INFO.ACTION);
export const addAThuHoiGCN                   = createAction(ADD_A_THU_HOI_GCN_ACTION.ACTION);
export const updateAThuHoiGCN                = createAction(UPDATE_A_THU_HOI_GCN_ACTION.ACTION);
export const deleteAThuHoiGCN                = createAction(DELETE_A_THU_HOI_GCN_ACTION.ACTION);
export const clearAThuHoiGCN                 = createAction(CLEAR_A_THU_HOI_GCN_ACTION);
export const uploadThuHoiGCNFiles            = createAction(UPLOAD_THU_HOI_GCN_FILES_ACTION.ACTION);
export const deleteAThuHoiGCNFile            = createAction(DELETE_A_THU_HOI_GCN_FILE_ACTION.ACTION);

export const loadListCongChungVien           = createAction(LOAD_LIST_CONG_CHUNG_VIEN.ACTION);
export const loadACongChungVienInfo          = createAction(LOAD_A_CONG_CHUNG_VIEN_INFO.ACTION);
export const addACongChungVien               = createAction(ADD_A_CONG_CHUNG_VIEN_ACTION.ACTION);
export const updateACongChungVien            = createAction(UPDATE_A_CONG_CHUNG_VIEN_ACTION.ACTION);
export const deleteACongChungVien            = createAction(DELETE_A_CONG_CHUNG_VIEN_ACTION.ACTION);

export const doChangeNganChanTab             = createAction(CHANGE_NGAN_CHAN_TAB_ACTION);
export const doChangeGiaiToaTab              = createAction(CHANGE_GIAI_TOA_TAB_ACTION);

export const DOC_exportContractToPDF         = createAction(DOC_EXPORT_CONTRACT_TO_PDF.ACTION);
export const DOC_exportTestimonialToPDF      = createAction(DOC_EXPORT_TESTIMONIAL_TO_PDF.ACTION);

export const DOC_exportContractToWORD        = createAction(DOC_EXPORT_CONTRACT_TO_WORD.ACTION);
export const DOC_exportTestimonialToWORD     = createAction(DOC_EXPORT_TESTIMONIAL_TO_WORD.ACTION);
export const clearDocExport                  = createAction(CLEAR_DOC_EXPORT);

export const requestTNMTLandData             = createAction(REQUEST_TNMT_LAND_DATA_ACTION.ACTION);
export const clearTNMTLandData               = createAction(CLEAR_TNMT_LAND_DATA_ACTION);
export const requestTNMTTongTienNap          = createAction(REQUEST_TNMT_TONG_TIEN_NAP_ACTION.ACTION);

export const DOC_exportNewContractListToEXCEL = createAction(DOC_EXPORT_NEW_CONTRACT_LIST_TO_EXCEL.ACTION);
export const DOC_exportNganChanListToEXCEL    = createAction(DOC_EXPORT_NGAN_CHAN_LIST_TO_EXCEL.ACTION);
export const DOC_exportGiaiToaListToEXCEL     = createAction(DOC_EXPORT_GIAI_TOA_LIST_TO_EXCEL.ACTION);
export const DOC_exportThuHoiGCNListToEXCEL   = createAction(DOC_EXPORT_THU_HOI_GCN_LIST_TO_EXCEL.ACTION);

export const clearExcelExport                 = createAction(CLEAR_EXCEL_EXPORT);

export const clearANewHopDongSearchs          = createAction(CLEAR_A_NEW_HOP_DONG_SEARCHS_ACTION);