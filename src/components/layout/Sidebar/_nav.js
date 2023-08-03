export default {
    items: [
        {
            name: 'Trang Chủ',
            code: 'Home',
            url: '/dashboard',
            icon: 'icon-speedometer',
            // badge: {
            //     variant: 'info',
            //     text: 'NEW'
            // }
        },
        {
            name: 'Tra cứu thông tin',
            code: 'Search Information',
            url: '/dashboard/search-information',
            icon: 'icon-chart',
        },
        // {
        //     divider: true
        // },
        // {
        //     title: true,        // Not a title
        //     name: 'USER SECTION',
        //     wrapper: {            // optional wrapper object
        //         element: '',        // required valid HTML5 element tag
        //         attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        //     },
        //     class: ''             // optional class names space delimited list for title item ex: "text-center"
        // },
        {
            name: 'Danh Mục',
            code: 'List',
            url: '/danh-mucs',
            icon: 'icon-list',
            children: [
                {
                    name: 'Đối tượng',
                    code: 'Owner',
                    url: '/danh-mucs/owner/list',
                    icon: 'icon-people',
                    children: [ 
                        {
                            name: 'Danh Sách',
                            url: '/danh-mucs/owner/list',
                            icon: 'icon-list',
                        },
                        {
                            name: 'Thêm Mới',
                            url: '/danh-mucs/owner/add',
                            icon: 'icon-plus',
                        }
                    ]
                },
                {
                    name: 'Tài Sản',
                    code: 'Asset',
                    url: '/danh-mucs/tai-sans/list',
                    icon: 'icon-diamond',
                    children: [ 
                        {
                            name: 'Danh Sách',
                            url: '/danh-mucs/asset/list',
                            icon: 'icon-list',
                        },
                        {
                            name: 'Thêm Mới',
                            url: '/danh-mucs/asset/add',
                            icon: 'icon-plus',
                        }
                    ]
                },
                {
                    name: 'Loại Hợp Đồng',
                    code: 'ContractType',
                    url: '/danh-mucs/sub-contract-type/list',
                    icon: 'icon-docs',
                    children: [ 
                        {
                            name: 'Danh Sách',
                            url: '/danh-mucs/sub-contract-type/list',
                            icon: 'icon-list',
                        },
                        {
                            name: 'Thêm Mới',
                            url: '/danh-mucs/sub-contract-type/add',
                            icon: 'icon-plus',
                        }
                    ]
                },
                {
                    name: 'Loại Tài Sản',
                    code: 'AssetType',
                    url: '/danh-mucs/sub-asset-type/list',
                    icon: 'icon-docs',
                    children: [ 
                        {
                            name: 'Danh Sách',
                            url: '/danh-mucs/sub-asset-type/list',
                            icon: 'icon-list',
                        },
                        {
                            name: 'Thêm Mới',
                            url: '/danh-mucs/sub-asset-type/add',
                            icon: 'icon-plus',
                        }
                    ]
                },
                {
                    name: 'Loại Sổ Lưu Trữ',
                    code: 'ArchiveBookType',
                    url: '/danh-mucs/archive-book-type/list',
                    icon: 'icon-docs',
                    children: [ 
                        {
                            name: 'Danh Sách',
                            url: '/danh-mucs/archive-book-type/list',
                            icon: 'icon-list',
                        },
                        {
                            name: 'Thêm Mới',
                            url: '/danh-mucs/archive-book-type/add',
                            icon: 'icon-plus',
                        }
                    ]
                },
                {
                    name: 'Sổ Lưu Trữ',
                    code: "ArchiveBook",
                    url: '/danh-mucs/archive-book/list',
                    icon: 'icon-note',
                    children: [ 
                        {
                            name: 'Danh Sách',
                            url: '/danh-mucs/archive-book/list',
                            icon: 'icon-list',
                        },
                        {
                            name: 'Thêm Mới',
                            url: '/danh-mucs/archive-book/add',
                            icon: 'icon-plus',
                        }
                    ]
                },
                {
                    name: 'Mục Đích Sử Dụng Đất',
                    code: "LandPurpose",
                    url: '/danh-mucs/land-purpose/list',
                    icon: 'icon-location-pin',
                    children: [ 
                        {
                            name: 'Danh Sách',
                            url: '/danh-mucs/land-purpose/list',
                            icon: 'icon-list',
                        },
                        {
                            name: 'Thêm Mới',
                            url: '/danh-mucs/land-purpose/add',
                            icon: 'icon-plus',
                        }
                    ]
                },
            ]
        },

        {
            name: 'Hợp Đồng',
            url: '/hop-dongs',
            icon: 'icon-docs',
            children: [
                {
                    name: 'Hợp đồng',
                    code: "Contract",
                    url: '/hop-dongs/list',
                    icon: 'icon-docs',
                    children: [ 
                        {
                            name: 'Danh sách',
                            url: '/hop-dongs/new-contract/list',
                            icon: 'icon-list',
                        },
                        {
                            name: 'Thêm hợp đồng',
                            url: '/hop-dongs/new-contract/add',
                            icon: 'icon-plus',
                        },
                    ]
                },
                {
                    name: 'Hợp đồng (Lịch Sử)',
                    code: "ContractHistories",
                    url: '/hop-dongs/list',
                    icon: 'icon-docs',
                    children: [ 
                        {
                            name: 'Danh sách',
                            url: '/hop-dongs/contract-histories/list',
                            icon: 'icon-list',
                        }
                    ]
                },
            ]
        },
        {
            name: 'Ngăn chặn/Giải toả/Thu hồi-Huỷ',
            url: '/hop-dongs',
            icon: 'icon-docs',
            children: [
                {
                    name: 'Ngăn chặn',
                    code: "AssetPrevention",
                    url: '/hop-dongs/asset-preventions/list',
                    icon: 'icon-lock',
                    children: [ 
                        {
                            name: 'Danh sách',
                            url: '/hop-dongs/asset-preventions/list',
                            icon: 'icon-list',
                        },
                        {
                            name: 'Thêm Mới',
                            url: '/hop-dongs/asset-preventions/add',
                            icon: 'icon-plus',
                        }
                    ]
                },
                {
                    name: 'Giải toả',
                    code: "AssetRelease",
                    url: '/hop-dongs/asset-releases/list',
                    icon: 'icon-magic-wand',
                    children: [ 
                        {
                            name: 'Danh sách',
                            url: '/hop-dongs/asset-releases/list',
                            icon: 'icon-list',
                        },
                        {
                            name: 'Thêm Mới',
                            url: '/hop-dongs/asset-releases/add',
                            icon: 'icon-plus',
                        }
                    ]
                },
                {
                    name: 'Thu hồi/Huỷ GCN',
                    code: "ThuHoiGCN",
                    url: '/hop-dongs/thu-hoi-gcns/list',
                    icon: 'icon-magnifier-remove',
                    children: [ 
                        {
                            name: 'Danh sách',
                            url: '/hop-dongs/thu-hoi-gcns/list',
                            icon: 'icon-list',
                        },
                        {
                            name: 'Thêm Mới',
                            url: '/hop-dongs/thu-hoi-gcns/add',
                            icon: 'icon-plus',
                        }
                    ]
                },
            ]
        },
        {
            name: 'Thống Kê',
            code: "Statistic",
            url: '/thong-kes',
            icon: 'icon-chart',
            children: [
                {
                    name: 'Tra cứu (Thống kê của phần mềm)',
                    url: '/thong-kes/request-tnmt-land-data-reports/list',
                    icon: 'icon-chart',
                },
                {
                    name: 'Tra cứu (Thống kê của TNMT)',
                    url: '/thong-kes/request-land-data-of-tnmt-reports/list',
                    icon: 'icon-chart',
                },
                {
                    name: 'Sổ lưu trữ',
                    url: '/thong-kes/archive-book-reports/list',
                    icon: 'icon-chart',
                },
            ]
        },
        {
            name: 'Báo Cáo',
            code: "Report",
            url: '/reports',
            icon: 'icon-docs',
            children: [
                {
                    name: 'Biểu mẫu 31',
                    url: '/reports/sample-31/list',
                    icon: 'icon-docs',
                },
            ]
        },
        {
            name: 'Quản Trị Hệ Thống',
            code: "System",
            url: '/he-thongs',
            icon: 'icon-settings',
            children: [
                {
                    name: 'Quản lý Đơn Vị',
                    url: '/he-thongs/user-groups/list',
                    icon: 'icon-people',     
                    children: [ 
                        {
                            name: 'Danh sách',
                            url: '/he-thongs/user-groups/list',
                            icon: 'icon-list',
                        },
                        {
                            name: 'Thêm Mới',
                            url: '/he-thongs/user-groups/add',
                            icon: 'icon-plus',
                        }
                    ]
                },
                {
                    name: 'Quản lý Tài khoản',
                    url: '/he-thongs/accounts/list',
                    icon: 'icon-user',
                    children: [ 
                        {
                            name: 'Danh sách',
                            url: '/he-thongs/accounts/list',
                            icon: 'icon-list',
                        },
                        {
                            name: 'Thêm Mới',
                            url: '/he-thongs/accounts/add',
                            icon: 'icon-plus',
                        }
                    ]
                },
                {
                    name: 'Quản lý Quyền',
                    url: '/he-thongs/permissions/list',
                    icon: 'icon-organization'
                },
                {
                    name: 'Quản lý Nhật Ký',
                    url: '/he-thongs/user-logs/list',
                    icon: 'icon-event'
                },
                {
                    name: 'Quản lý Phiếu Tra Cứu',
                    url: '/he-thongs/print-search-tickets/list',
                    icon: 'icon-event'
                },
                // {
                //     name: 'Quản lý Đăng Nhập',
                //     url: '/he-thongs/user-logins/list',
                //     icon: 'icon-clock'
                // },
                {
                    name: 'Cấu hình Hệ thống',
                    url: '/he-thongs/system-configs',
                    icon: 'icon-settings'
                },
            ]
        },
    ]
};
