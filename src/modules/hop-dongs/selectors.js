import {MODULE_ID} from "./constants";
import {utils} from "../../services";
import {SCHEMA_CONTRUCTION_NOTES} from "./constants";

export const getHopDongList                = (state) => state[MODULE_ID].hopDong.hopDongs;
export const getHopDongInfo                = (state) => state[MODULE_ID].hopDong.contractDetail;
export const getHopDongPaginationInfo      = (state) => state[MODULE_ID].hopDong.pagination;
export const getHopDongFilterInfo          = (state) => state[MODULE_ID].hopDong.filter;
export const getHopDongFiles               = (state) => state[MODULE_ID].hopDong.contract_files;

export const getNganChanList               = (state) => state[MODULE_ID].nganChan.nganChans;
export const getNganChanInfo               = (state) => state[MODULE_ID].nganChan.assetPreventionDetail;
export const getNganChanPaginationInfo     = (state) => state[MODULE_ID].nganChan.pagination;
export const getNganChanTabIndex           = (state) => state[MODULE_ID].nganChan.tabIndex;
export const getAssetPreventionSelected    = (state) => state[MODULE_ID].nganChan.assetPreventionSelected;
export const getNganChanFilterInfo         = (state) => state[MODULE_ID].nganChan.filter;
export const getNganChanFile               = (state) => state[MODULE_ID].nganChan.file_name;

export const getGiaiToaList                = (state) => state[MODULE_ID].giaiToa.giaiToas;
export const getGiaiToaInfo                = (state) => state[MODULE_ID].giaiToa.assetReleaseDetail;
export const getGiaiToaPaginationInfo      = (state) => state[MODULE_ID].giaiToa.pagination;
export const getGiaiToaTabIndex            = (state) => state[MODULE_ID].giaiToa.tabIndex;
export const getGiaiToaFilterInfo          = (state) => state[MODULE_ID].giaiToa.filter;
export const getGiaiToaFile                = (state) => state[MODULE_ID].giaiToa.release_file;

export const getThuHoiGCNList              = (state) => state[MODULE_ID].thuHoiGCN.thuHoiGCNs;
export const getThuHoiGCNInfo              = (state) => state[MODULE_ID].thuHoiGCN.thuHoiGCNDetail;
export const getThuHoiGCNPaginationInfo    = (state) => state[MODULE_ID].thuHoiGCN.pagination;
export const getThuHoiGCNTabIndex          = (state) => state[MODULE_ID].thuHoiGCN.tabIndex;
export const getThuHoiGCNFilterInfo        = (state) => state[MODULE_ID].thuHoiGCN.filter;
export const getThuHoiGCNFile              = (state) => state[MODULE_ID].thuHoiGCN.eviction_file;

export const getRemotePDF                  = (state) => state[MODULE_ID].hopDong.remotePDF;
export const getRemoteDOC                  = (state) => state[MODULE_ID].hopDong.remoteDOC;

export const getTMNTLandData               = (state) => state[MODULE_ID].hopDong.requestTNMTLandData;
export const getTMNTTongTienNap            = (state) => state[MODULE_ID].hopDong.requestTNMTTongTienNap;

export const getNewHopDongList             = (state) => state[MODULE_ID].newHopDong.hopDongs;
export const getNewHopDongSearchList       = (state) => state[MODULE_ID].newHopDong.hopDongSearchs;
export const getNewHopDongTotalSearch      = (state) => state[MODULE_ID].newHopDong.hopDongTotalSearch;
export const getAssetPreventionSearchList  = (state) => state[MODULE_ID].newHopDong.assetPreventionSearchs;
export const getAssetPreventionTotalSearch = (state) => state[MODULE_ID].newHopDong.assetPreventionTotalSearch;
export const getThuHoiGCNSearchList        = (state) => state[MODULE_ID].newHopDong.thuHoiGCNSearchs;
export const getThuHoiGCNTotalSearch       = (state) => state[MODULE_ID].newHopDong.thuHoiGCNTotalSearch;

export const getNewHopDongInfo             = (state) => state[MODULE_ID].newHopDong.contractDetail;
export const getNewHopDongPaginationInfo   = (state) => state[MODULE_ID].newHopDong.pagination;
export const getNewHopDongFilterInfo       = (state) => state[MODULE_ID].newHopDong.filter;
export const getNewHopDongSearchKeys       = (state) => state[MODULE_ID].newHopDong.search_keys;
export const getNewHopDongFullContext      = (state) => state[MODULE_ID].newHopDong.fullContext;
export const getNewHopDongFiles            = (state) => state[MODULE_ID].newHopDong.contract_files;

export const getNewDongAHopDongList        = (state) => state[MODULE_ID].newDongAHopDong.hopDongs;
export const getNewDongAHopDongPaginationInfo   = (state) => state[MODULE_ID].newDongAHopDong.pagination;
export const getNewDongAHopDongFilterInfo  = (state) => state[MODULE_ID].newDongAHopDong.filter;
export const getNewDongAHopDongFullContext = (state) => state[MODULE_ID].newDongAHopDong.fullContext;

export const getRemoteEXCEL                = (state) => state[MODULE_ID].newHopDong.remoteExcel;
