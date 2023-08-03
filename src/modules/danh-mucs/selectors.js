import {MODULE_ID} from "./constants";
import {utils} from "../../services";
import {SCHEMA_CONTRUCTION_NOTES} from "./constants";

// export const getPaginationInfo         = (state) => state[MODULE_ID].contructionList.pagination;
export const getDoiTuongList = (state) => state[MODULE_ID].doiTuong.doiTuongs;
export const getDoiTuongInfo = (state) => state[MODULE_ID].doiTuong.doiTuongDetail;
export const getDoiTuongQuery = (state) => state[MODULE_ID].doiTuong.doiTuongQuery;
export const getDoiTuongPaginationInfo = (state) => state[MODULE_ID].doiTuong.pagination;
export const getOwnerTabIndex = (state) => state[MODULE_ID].doiTuong.tabIndex;
export const getDoiTuongQueryType  = (state) => state[MODULE_ID].doiTuong.doiTuongQueryType;
export const getDoiTuongQueryIndex = (state) => state[MODULE_ID].doiTuong.doiTuongQueryIndex;
export const getDoiTuongFilterInfo = (state) => state[MODULE_ID].doiTuong.filter;
export const getDoiTuongErrors     = (state) => state[MODULE_ID].doiTuong.errors;
export const getDoiTuongMessage    = (state) => state[MODULE_ID].doiTuong.message;
export const getDoiTuongInsertContract = (state) => state[MODULE_ID].doiTuong.doiTuongInsertContract;

export const getTaiSanList = (state) => state[MODULE_ID].taiSan.taiSans;
export const getTaiSanInfo = (state) => state[MODULE_ID].taiSan.taiSanDetail;
export const getTaiSanHistories = (state) => state[MODULE_ID].taiSan.taiSanHistories;
export const getTaiSanQuery = (state) => state[MODULE_ID].taiSan.taiSanQuery;
export const getTaiSanTabIndex = (state) => state[MODULE_ID].taiSan.tabIndex;
export const getTaiSanQueryIndex = (state) => state[MODULE_ID].taiSan.taiSanQueryIndex;
export const getTaiSanPaginationInfo = (state) => state[MODULE_ID].taiSan.pagination;
export const getTaiSanFilterInfo     = (state) => state[MODULE_ID].taiSan.filter;
export const getTaiSanErrors     = (state) => state[MODULE_ID].taiSan.errors;
export const getTaiSanMessage    = (state) => state[MODULE_ID].taiSan.message;
export const getTaiSanInsertContract = (state) => state[MODULE_ID].taiSan.taiSanInsertContract;
export const getRemoteDOC          = (state) => state[MODULE_ID].taiSan.remoteDOC;

export const getContractTypeList = (state) => state[MODULE_ID].contractType.contractTypes;
export const getContractTypeInfo = (state) => state[MODULE_ID].contractType.contractTypeDetail;
export const getContractTypePaginationInfo = (state) => state[MODULE_ID].contractType.pagination;
export const getContractTypeFilterInfo     = (state) => state[MODULE_ID].contractType.filter;

export const getLoaiHopDongList = (state) => state[MODULE_ID].loaiHopDong.loaiHopDongs;
export const getLoaiHopDongInfo = (state) => state[MODULE_ID].loaiHopDong.loaiHopDongDetail;
export const getLoaiHopDongPaginationInfo = (state) => state[MODULE_ID].loaiHopDong.pagination;
export const getLoaiHopDongFilterInfo     = (state) => state[MODULE_ID].loaiHopDong.filter;

export const getLoaiSoLuuTruList = (state) => state[MODULE_ID].loaiSoLuuTru.loaiSoLuuTrus;
export const getLoaiSoLuuTruInfo = (state) => state[MODULE_ID].loaiSoLuuTru.loaiSoLuuTruDetail;
export const getLoaiSoLuuTruPaginationInfo = (state) => state[MODULE_ID].loaiSoLuuTru.pagination;
export const getLoaiSoLuuTruFilterInfo     = (state) => state[MODULE_ID].loaiSoLuuTru.filter;

export const getSoLuuTruList = (state) => state[MODULE_ID].soLuuTru.soLuuTrus;
export const getSoLuuTruInfo = (state) => state[MODULE_ID].soLuuTru.soLuuTruDetail;
export const getSoLuuTruPaginationInfo = (state) => state[MODULE_ID].soLuuTru.pagination;
export const getSoLuuTruFilterInfo     = (state) => state[MODULE_ID].soLuuTru.filter;

export const getSubAssetTypeList = (state) => state[MODULE_ID].subAssetType.subAssetTypes;
export const getSubAssetTypeInfo = (state) => state[MODULE_ID].subAssetType.subAssetTypeDetail;
export const getSubAssetTypePaginationInfo = (state) => state[MODULE_ID].subAssetType.pagination;
export const getSubAssetTypeFilterInfo     = (state) => state[MODULE_ID].subAssetType.filter;

export const getOwnerTypeList = (state) => state[MODULE_ID].ownerType.ownerTypes;
export const getOwnerTypePaginationInfo = (state) => state[MODULE_ID].ownerType.pagination;

export const getSubOwnerTypeList = (state) => state[MODULE_ID].subOwnerType.subOwnerTypes;
export const getSubOwnerTypePaginationInfo = (state) => state[MODULE_ID].subOwnerType.pagination;

export const getLandPurposeList = (state) => state[MODULE_ID].landPurpose.landPurposes;
export const getLandPurposeInfo = (state) => state[MODULE_ID].landPurpose.landPurposeDetail;
export const getLandPurposePaginationInfo = (state) => state[MODULE_ID].landPurpose.pagination;

export const getBankList = (state) => state[MODULE_ID].bank.banks;
export const getBankPaginationInfo = (state) => state[MODULE_ID].bank.pagination;

export const getDistrictList = (state) => state[MODULE_ID].district.districts;
export const getWardList = (state) => state[MODULE_ID].ward.wards;

export const getDoiTuongFilterList = (state) => state[MODULE_ID].doiTuongFilter.doiTuongFilters;
