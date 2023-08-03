export const MODULE_ID          = 'he-thongs';
export const API_SUB_URL        = '/he-thongs';

export const API_SUB_URL_ACCOUNT = '/accounts';
export const API_SUB_URL_ACCOUNT_CHANGE_PASSWORD = '/accounts/update-password';
export const API_SUB_URL_USER_LOG = '/user-logs';
export const API_SUB_URL_USER_GROUP = '/user-groups';
export const API_SUB_URL_PRINT_SEARCH_TICKET = '/print-search-tickets';
export const API_SUB_URL_PERMISSION = '/permissions';
export const API_SUB_URL_SYSTEM_CONFIG = '/system-configs';

export const API_SUB_URL_SYSTEM_FILE = '/systems';

export {PAGINATION_ITEMS_PER_PAGE} from '../../constants';

//
export const ACCOUNT_FORM_NAME             = 'ACCOUNT_FORM';
export const ACCOUNT_FORM_NAME_SUBMIT      = ACCOUNT_FORM_NAME + '_SUBMIT';
export const ACCOUNT_FORM_NAME_SUCCESS     = ACCOUNT_FORM_NAME + '_SUCCESS';
export const ACCOUNT_FORM_NAME_FAILURE     = ACCOUNT_FORM_NAME + '_FAILURE';

export const ACCOUNT_CHANGE_PASSWORD_FORM_NAME             = 'ACCOUNT_CHANGE_PASSWORD';
export const ACCOUNT_CHANGE_PASSWORD_FORM_NAME_SUBMIT      = ACCOUNT_CHANGE_PASSWORD_FORM_NAME + '_SUBMIT';
export const ACCOUNT_CHANGE_PASSWORD_FORM_NAME_SUCCESS     = ACCOUNT_CHANGE_PASSWORD_FORM_NAME + '_SUCCESS';
export const ACCOUNT_CHANGE_PASSWORD_FORM_NAME_FAILURE     = ACCOUNT_CHANGE_PASSWORD_FORM_NAME + '_FAILURE';

export const ACCOUNT_LIST_FILTER_FORM_NAME          = 'ACCOUNT_LIST_FILTER_FORM';
export const ACCOUNT_LIST_FILTER_FORM_NAME_SUBMIT   = ACCOUNT_LIST_FILTER_FORM_NAME + '_SUBMIT';
export const ACCOUNT_LIST_FILTER_FORM_NAME_SUCCESS  = ACCOUNT_LIST_FILTER_FORM_NAME + '_SUCCESS';
export const ACCOUNT_LIST_FILTER_FORM_NAME_FAILURE  = ACCOUNT_LIST_FILTER_FORM_NAME + '_FAILURE';

export const USER_LOG_FORM_NAME            = 'USER_LOG_FORM';
export const USER_LOG_FORM_NAME_SUBMIT     = USER_LOG_FORM_NAME + '_SUBMIT';
export const USER_LOG_FORM_NAME_SUCCESS    = USER_LOG_FORM_NAME + '_SUCCESS';
export const USER_LOG_FORM_NAME_FAILURE    = USER_LOG_FORM_NAME + '_FAILURE';

export const USER_LOG_LIST_FILTER_FORM_NAME          = 'USER_LOG_LIST_FILTER_FORM';
export const USER_LOG_LIST_FILTER_FORM_NAME_SUBMIT   = USER_LOG_LIST_FILTER_FORM_NAME + '_SUBMIT';
export const USER_LOG_LIST_FILTER_FORM_NAME_SUCCESS  = USER_LOG_LIST_FILTER_FORM_NAME + '_SUCCESS';
export const USER_LOG_LIST_FILTER_FORM_NAME_FAILURE  = USER_LOG_LIST_FILTER_FORM_NAME + '_FAILURE';

// export const PRINT_SEARCH_TICKET_FORM_NAME            = 'PRINT_SEARCH_TICKET_FORM';
// export const PRINT_SEARCH_TICKET_FORM_NAME_SUBMIT     = PRINT_SEARCH_TICKET_FORM_NAME + '_SUBMIT';
// export const PRINT_SEARCH_TICKET_FORM_NAME_SUCCESS    = PRINT_SEARCH_TICKET_FORM_NAME + '_SUCCESS';
// export const PRINT_SEARCH_TICKET_FORM_NAME_FAILURE    = PRINT_SEARCH_TICKET_FORM_NAME + '_FAILURE';

export const PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME          = 'PRINT_SEARCH_TICKET_LIST_FILTER_FORM';
export const PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME_SUBMIT   = PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME + '_SUBMIT';
export const PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME_SUCCESS  = PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME + '_SUCCESS';
export const PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME_FAILURE  = PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME + '_FAILURE';

export const USER_GROUP_FORM_NAME          = 'USER_GROUP_FORM';
export const USER_GROUP_FORM_NAME_SUBMIT   = USER_GROUP_FORM_NAME + '_SUBMIT';
export const USER_GROUP_FORM_NAME_SUCCESS  = USER_GROUP_FORM_NAME + '_SUCCESS';
export const USER_GROUP_FORM_NAME_FAILURE  = USER_GROUP_FORM_NAME + '_FAILURE';

export const USER_GROUP_LIST_FILTER_FORM_NAME          = 'USER_GROUP_LIST_FILTER_FORM';
export const USER_GROUP_LIST_FILTER_FORM_NAME_SUBMIT   = USER_GROUP_LIST_FILTER_FORM_NAME + '_SUBMIT';
export const USER_GROUP_LIST_FILTER_FORM_NAME_SUCCESS  = USER_GROUP_LIST_FILTER_FORM_NAME + '_SUCCESS';
export const USER_GROUP_LIST_FILTER_FORM_NAME_FAILURE  = USER_GROUP_LIST_FILTER_FORM_NAME + '_FAILURE';

export const PERMISSION_FORM_NAME          = 'PERMISSION_FORM';
export const PERMISSION_FORM_NAME_SUBMIT   = PERMISSION_FORM_NAME + '_SUBMIT';
export const PERMISSION_FORM_NAME_SUCCESS  = PERMISSION_FORM_NAME + '_SUCCESS';
export const PERMISSION_FORM_NAME_FAILURE  = PERMISSION_FORM_NAME + '_FAILURE';

export const PERMISSION_LIST_FILTER_FORM_NAME          = 'PERMISSION_LIST_FILTER_FORM';
export const PERMISSION_LIST_FILTER_FORM_NAME_SUBMIT   = PERMISSION_LIST_FILTER_FORM_NAME + '_SUBMIT';
export const PERMISSION_LIST_FILTER_FORM_NAME_SUCCESS  = PERMISSION_LIST_FILTER_FORM_NAME + '_SUCCESS';
export const PERMISSION_LIST_FILTER_FORM_NAME_FAILURE  = PERMISSION_LIST_FILTER_FORM_NAME + '_FAILURE';

export const SYSTEM_CONFIG_FORM_NAME          = 'SYSTEM_CONFIG_FORM';
export const SYSTEM_CONFIG_FORM_NAME_SUBMIT   = SYSTEM_CONFIG_FORM_NAME + '_SUBMIT';
export const SYSTEM_CONFIG_FORM_NAME_SUCCESS  = SYSTEM_CONFIG_FORM_NAME + '_SUCCESS';
export const SYSTEM_CONFIG_FORM_NAME_FAILURE  = SYSTEM_CONFIG_FORM_NAME + '_FAILURE';

export const ACCOUNT_PERMISSION = [
    {id: 1, code: "Admin", name: "Admin"}, 
    // {id: 2, code: "Manager", name: "Quản lý"}, 
    // {id: 3, code: "Staff", name: "Nhân viên"}, 
    {id: 4, code: "OwnerPermission", name: "Đối Tượng"}, 
    {id: 5, code: "AssetPermission", name: "Tài Sản"}, 
    {id: 6, code: "ContractPermission", name: "Hợp Đồng"}, 
    {id: 7, code: "AssetPreventionPermission", name: "Ngăn Chặn"}, 
    {id: 8, code: "AssetReleasePermission", name: "Giải Toả"}, 
    {id: 9, code: "StatisticPermission", name: "Thống Kê"}, 
    {id: 10, code: "ArchiveBookPermission", name: "Sổ Lưu Trữ"}, 
    {id: 11, code: "ContractTypePermission", name: "Loại Hợp Đồng"}, 
    {id: 12, code: "AssetTypePermission", name: "Loại Tài Sản"}, 
    {id: 13, code: "ArchiveBookTypePermission", name: "Loại Sổ Lưu Trữ"}, 
    {id: 14, code: "LandPurposePermission", name: "Mục Đích Sử Dụng Đất"}, 
    {id: 15, code: "EvictionPermission", name: "Thu Hồi/Huỷ GCN"}, 
]

export const ACCOUNT_STATUS = [
    {id: 0, name: "Đang hoạt động"}, 
    {id: 1, name: "Đang khóa"}, 
    {id: 2, name: "Xóa"}
]

export const METHOD_STATUS = {
    "LOGIN": "ĐĂNG NHẬP", 
    "LOGOUT": "ĐĂNG XUẤT",
    "READ": "ĐỌC", 
    "CREATE": "TẠO MỚI",
    "UPDATE": "CẬP NHẬT",
    "DELETE": "XOÁ"
}

export const GROUP_TYPES = [
	{id: 1, code: "prevention_release_asset", name: "Ngăn chặn, giải toả tài sản"}
];