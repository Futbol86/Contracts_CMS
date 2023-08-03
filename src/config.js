export const enabledModules = [
    'auth',
    'users',
    // 'clients',
    'documents',
    'dashboard',
    'danh-mucs',
    'hop-dongs',
    'he-thongs',
    'thong-kes',
    'reports'
];

export const menuRoutes = {
    '/':                    'Trang chủ',
    '/dashboard':           'Thống kê',
    '/users/profile':       'Hồ sơ cá nhân',
    
    '/danh-mucs/doi-tuongs':                                'Đối tượng',
    '/danh-mucs/doi-tuongs/list':                           'Đối tượng',
    '/danh-mucs/doi-tuongs/add':                            'Thêm Đối tượng',
    '/danh-mucs/doi-tuongs/edit/:id':                       'Sửa Đối tượng',

    '/hop-dongs':                                           'Hợp đồng',
    '/hop-dongs/list':                                      'Hợp đồng',
    '/hop-dongs/add':                                       'Thêm Hợp đồng',
    '/hop-dongss/edit/:id':                                 'Sửa Hợp đồng',

    '/he-thongs/accounts/list':                             'Tài khoản',
    '/he-thongs/accounts/add':                              'Thêm Tài khoản',
    '/he-thongs/accounts/edit/:id':                         'Sửa Tài khoản',
    '/he-thongs/user-logs/add':                             'Nhật ký Tài khoản',

    '/admin/users':             'All Users',
    '/admin/users/:id':         'User Detail',
    '/admin/users/edit/:id':    'Edit User Information',
    '/admin/users/list':        'List',
    '/admin/users/add':         'Add New User',

    '/thong-kes':                                           'Báo Cáo Thống Kê',
};