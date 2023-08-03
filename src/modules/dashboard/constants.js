export const MODULE_ID          = 'dashboard';

export const API_SUB_URL_LOAD_NEW_REPORTS        = '/new-reports';

export const REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME             = 'REQUEST_TNMT_LAND_DATA_STATISTIC_FORM';
export const REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME_SUBMIT      = REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME + '_SUBMIT';
export const REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME_SUCCESS     = REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME + '_SUCCESS';
export const REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME_FAILURE     = REQUEST_TNMT_LAND_DATA_STATISTIC_FORM_NAME + '_FAILURE';

export const PHIEU_TRA_CUU_FORM_NAME             = 'PHIEU_TRA_CUU_FORM';
export const PHIEU_TRA_CUU_FORM_NAME_SUBMIT      = PHIEU_TRA_CUU_FORM_NAME + '_SUBMIT';
export const PHIEU_TRA_CUU_FORM_NAME_SUCCESS     = PHIEU_TRA_CUU_FORM_NAME + '_SUCCESS';
export const PHIEU_TRA_CUU_FORM_NAME_FAILURE     = PHIEU_TRA_CUU_FORM_NAME + '_FAILURE';

export const QR_CODE_FORM_NAME                   = 'QR_CODE_FORM';
export const QR_CODE_FORM_NAME_SUBMIT            = QR_CODE_FORM_NAME + '_SUBMIT';
export const QR_CODE_FORM_NAME_SUCCESS           = QR_CODE_FORM_NAME + '_SUCCESS';
export const QR_CODE_FORM_NAME_FAILURE           = QR_CODE_FORM_NAME + '_FAILURE';

export const SEARCH_TYPES = [
	{id: 1, code: "normal_search", name: "Tìm kiếm chung"},
    {id: 2, code: "enhance_search", name: "Tìm kiếm nâng cao"},
];

export const SEARCH_FILTER_OPTIONS = [
	{id: 1, code: "contract_no", name: "Số hợp đồng"},
    {id: 2, code: "owner_content", name: "Đối tượng (Hợp Đồng)"},
	{id: 3, code: "asset_content", name: "Tài sản (Hợp Đồng)"},
    // {id: 4, code: "asset_prevention_content", name: "Ngăn chặn, giải toả"},
];

export const ASSET_STATUSES = [
	{id: 1, code: "asset_prevention", name: "Đang bị ngăn chặn"},
    {id: 2, code: "asset_valid", name: "Được phép giao dịch"},
];

export const SEARCH_TNMT_LAND_DATA_TYPES = [
	{id: 1, code: "normal_search", name: "Tra cứu thửa đất"},
    {id: 2, code: "apartment_search", name: "Tra cứu nhà chung cư"},
];