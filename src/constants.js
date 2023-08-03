export const LOADING = 'LOADING';
export const FAILURE = 'FAILURE';
export const SUCCESS = 'SUCCESS';

export const LC_KEY_AUTH_TOKEN = 'auth-token';
export const LC_KEY_AUTH_USER_DATA = 'userData';

export const AUTH_MANAGEMENT_API_SUB_URL = '/authManagement';

export const APP_OPEN_MODAL_ACTION = 'APP_OPEN_MODAL_ACTION';
export const APP_CLOSE_MODAL_ACTION = 'APP_CLOSE_MODAL_ACTION';
export const APP_SET_PAGINATION_ACTION = 'APP_SET_PAGINATION';

export const MODAL_TYPE_CONFIRMATION = 'MODAL_CONFIRMATION';
export const MODAL_TYPE_INFORMATION = 'MODAL_INFORMATION';

export const PAGINATION_ITEMS_PER_PAGE = 10;
export const QD_AD_PAGINATION_ITEMS_PER_PAGE = 5;
export const ORDER_NOTE_PAGINATION_ITEMS_PER_PAGE = 5;
export const CONTRUCTION_NOTE_PAGINATION_ITEMS_PER_PAGE = 5;

export const PRODUCT_CATEGORY_GABLE_SHEDS       = 1;
export const PRODUCT_CATEGORY_SKILLION_CARPORTS = 2;
export const PRODUCT_CATEGORY_GABLE_CARPORTS    = 3;
export const PRODUCT_CATEGORY_SKILLION_SHEDS    = 4;


export const LOAI_GIAO_DICH = [
	{id: 1, code: "TheChap", name: "Thế chấp"},
	{id: 2, code: "ChuyenDoi", name: "Chuyển đổi"},
	{id: 3, code: "ChuyenNhuong", name: "Chuyển nhượng"},
	{id: 4, code: "MuaBan", name: "Mua bán"},
	{id: 5, code: "TangCho", name: "Tặng cho"},
	{id: 6, code: "Thue", name: "Thuê"},
	{id: 7, code: "GopVon", name: "Góp vốn"},
	{id: 8, code: "UyQuyen", name: "Ủy quyền"},
	{id: 9, code: "ThuaKe", name: "Thừa kế"},
	{id: 10, code: "HuyBoHopDongTheChap", name: "Hủy bỏ hợp đồng thế chấp"},
	{id: 11, code: "HuyBoHopDongChuyenNhuong", name: "Hủy bỏ hợp đồng chuyển nhượng"},
	{id: 12, code: "HuyBoHopDongMuaBan", name: "Hủy bỏ hợp đồng mua bán"},
	{id: 13, code: "HuyBoHopDongTangCho", name: "Hủy bỏ hợp đồng tặng cho"},
	{id: 14, code: "HuyBoHopDongThue", name: "Hủy bỏ hợp đồng thuê"},
	{id: 15, code: "HuyBoHopDongUyQuyen", name: "Hủy bỏ hợp đồng ủy quyền"},
	{id: 16, code: "HuyBoThuaKe", name: "Hủy bỏ thừa kế"},
];

export const TINH_TRANG_TAI_SAN = [
	{id: 1, code: "TheChapTaiSan", name: "Thế chấp", describe: "Thế chấp, không thể giao dịch"},
	{id: 2, code: "XoaTheChap", name: "Xóa thế chấp", describe: "Đã đăng ký xóa thế chấp, được phép giao dịch"},
	{id: 3, code: "KeBienTaiSan", name: "Kê biên", describe: "Kê biên, không thể giao dịch"},
	{id: 4, code: "GiaiToaKeBienTaiSan", name: "Giải tỏa kê biên", describe: "Đã được giải tỏa kê biên, được phép giao dịch"},
	{id: 5, code: "CamCoTaiSan", name: "Cầm cố", describe: "Cầm cố, không thể giao dịch"},
	{id: 6, code: "GiaiToaCamCoTaiSan", name: "Giải tỏa cầm cố", describe: "Đã được giải tỏa cầm cố, được phép giao dịch"},
	{id: 7, code: "XoaTheChapKhiDangKeBien", name: "Xóa thế chấp khi đang bị kê biên", describe: "Xóa thế chấp, đang bị kê biên, không thể giao dịch"},
	{id: 8, code: "GiaiToaCamCoKhiDangKeBien", name: "Giải tỏa cầm cố khi đang bị kê biên", describe: "Giải tỏa cầm cố, đang bị kê biên, không thể giao dịch"},
	{id: 9, code: "ChuyenDoi", name: "Chuyển đổi quyền sử dụng", describe: "Đã chuyển đổi quyền sử dụng"},
	{id: 10, code: "ChuyenNhuong", name: "Chuyển nhượng quyền sử dụng", describe: "Đã chuyển nhượng quyền sử dụng"},
	{id: 11, code: "MuaBan", name: "Mua bán", describe: "Đã thực hiện giao dịch mua bán"},
	{id: 12, code: "TangCho", name: "Tặng cho", describe: "Đã được tặng cho"},
	{id: 13, code: "Thue", name: "Thuê", describe: "Đang cho thuê"},
	{id: 14, code: "GopVon", name: "Góp vốn", describe: "Đang góp vốn"},
	{id: 15, code: "UyQuyen", name: "Ủy quyền", describe: "Đã ủy quyền"},
	{id: 16, code: "HuyBoUyQuyen", name: "Hủy bỏ ủy quyền", describe: "Đã hủy bỏ ủy quyền"},
	{id: 17, code: "HuyBoTheChap", name: "Hủy bỏ thế chấp", describe: "Đã hủy bỏ thế chấp"},
	{id: 18, code: "HuyBoTangCho", name: "Hủy bỏ tặng cho", describe: "Đã hủy bỏ tặng cho"},
	{id: 19, code: "HuyBoCamCo", name: "Hủy bỏ cầm cố", describe: "Đã hủy bỏ việc cầm cố"},
	{id: 20, code: "HuyBoChuyenNhuong", name: "Hủy bỏ chuyển nhượng", describe: "Đã hủy bỏ chuyển nhượng"},
	{id: 21, code: "HuyBoMuaBan", name: "Hủy bỏ mua bán", describe: "Đã hủy bỏ mua bán"},
	{id: 22, code: "ThuaKe", name: "Được thừa kế", describe: "Được thừa kế"},
	{id: 23, code: "HuyBoThuaKe", name: "Hủy bỏ việc thừa kế", describe: "Đã hủy bỏ việc thừa kế"},	
];

export const LOAI_DOI_TUONG = [
	{id: 1, name: "Công dân trong nước"},
	{id: 2, name: "Người nước ngoài"},
	{id: 3, name: "Tổ chức nhà nước"},
	{id: 4, name: "Doanh nghiệp tư nhân"},
	{id: 5, name: "Người không quốc tịch"},
	{id: 6, name: "Ngân hàng"},
	{id: 7, name: "Quỹ tín dụng"},
	{id: 8, name: "Công ty"},
	{id: 9, name: "Hợp tác xã"},
	{id: 10, name: "Dịch vụ"},
	{id: 11, name: "Hộ kinh doanh"},
	{id: 12, name: "Khác"},
];

export const LOAI_DAT = [
	{id: 1, name: "Đất trồng cây lâu năm"},
	{id: 2, name: "Đất rừng sản xuất"},
	{id: 3, name: "Đất rừng phòng hộ"},
	{id: 4, name: "Đất rừng đặc dụng"},
	{id: 5, name: "Đất nuôi trồng thuỷ sản"},
	{id: 6, name: "Đất trồng cây hàng năm"},
	{id: 7, name: "Đất làm muối"},
	{id: 8, name: "Đất nông nghiệp khác"},
	{id: 9, name: "Đất ở"},
	{id: 10, name: "Đất xây dựng trụ sở cơ quan, xây dựng công trình sự nghiệp"},
	{id: 11, name: "Đất sử dụng vào mục đích quốc phòng, an ninh"},
	{id: 12, name: "Đất sản xuất, kinh doanh phi nông nghiệp"},
	{id: 13, name: "Đất sử dụng vào mục đích công cộng"},
	{id: 14, name: "Đất do các cơ sở tôn giáo sử dụng"},
	{id: 15, name: "Đất có công trình là đình, đền, miếu, am, từ đường, nhà thờ họ"},
	{id: 16, name: "Đất làm nghĩa trang, nghĩa địa"},
	{id: 17, name: "Đất sông, ngòi, kênh, rạch, suối và mặt nước chuyên dùng"},
	{id: 18, name: "Đất phi nông nghiệp khác"},
	{id: 19, name: "Đất chưa xác định mục đích sử dụng"},
	{id: 20, name: "Đất ở tại đô thị"},
	{id: 21, name: "Đất ở tại nông thôn"},
	{id: 22, name: "Đất trồng cây hàng năm khác"},
	{id: 23, name: "Đất ở đô thị"},
	{id: 24, name: "Đất ở nông thôn"},
	{id: 25, name: "Đất lúa"},
	{id: 26, name: "Đất trồng cây lâu năm khác"},
	{id: 27, name: "Đất trồng cây công nghiệp lâu năm"},
	{id: 28, name: "CNCP"},
	{id: 29, name: "Đất chuyên trồng lúa nước"},
	{id: 30, name: "Đất cà phê"},
	{id: 31, name: "Đất chung cư"},
	{id: 32, name: "Đất vườn"},
];

export const LOAI_GIAY_TO = [
	{id: 1, name: "CMND", describe: "Chứng minh nhân dân"},
	{id: 2, name: "Hộ chiếu", describe: "Hộ chiếu"},
	{id: 3, name: "GCN đăng ký kinh doanh", describe: "Giấy chứng nhận đăng ký kinh doanh"},
	{id: 4, name: "GP đầu tư", describe: "Giấy phép đầu tư"},
	{id: 5, name: "QĐ thành lập", describe: "Quyết định thành lập"},
	{id: 6, name: "Thẻ thường trú", describe: "Thẻ thường trú"},
	{id: 7, name: "Mã số thuế", describe: "Mã số thuế"},
	{id: 8, name: "Giấy ủy quyền", describe: "Giấy ủy quyền đại diện tổ chức"},
	{id: 9, name: "Sổ hộ khẩu", describe: "Sổ hộ khẩu"},
	{id: 10, name: "Giấy tờ thay thế khác", describe: "Giấy tờ thay thế khác"},	
];

export const NHOM_TAI_SAN = [
	{id: "BAT_DONG_SAN", name: "BẤT ĐỘNG SẢN"},
	{id: "DONG_SAN", name: "ĐỘNG SẢN"},
];

export const LOAI_TAI_SAN = [
	{id: "NHA_DAT", name: "NHÀ ĐẤT", type: "BAT_DONG_SAN"},
	{id: "TAI_SAN_KHAC", name: "TÀI SẢN KHÁC", type: "BAT_DONG_SAN"},
	{id: "O_TO", name: "Ô TÔ", type: "DONG_SAN"},
	{id: "XE_MAY", name: "XE MÁY", type: "DONG_SAN"},
	{id: "TAI_SAN_KHAC", name: "TÀI SẢN KHÁC", type: "DONG_SAN"},
];