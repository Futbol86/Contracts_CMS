import doiTuongSaga from './sagas/doituong';
import taiSanSaga from './sagas/taiSan';
import contractTypeSaga from './sagas/contractType';
import loaiHopDongSaga from './sagas/loaiHopDong';
import loaiSoLuuTruSaga from './sagas/loaiSoLuuTru';
import soLuuTruSaga from './sagas/soLuuTru';
import subAssetTypeSaga from './sagas/subAssetType';
import ownerTypeSaga from './sagas/ownerType';
import subOwnerTypeSaga from './sagas/subOwnerType';
import landPurposeSaga from './sagas/landPurpose';
import bankSaga from './sagas/bank';
import districtSaga from './sagas/district';
import wardSaga from './sagas/ward';

export default
[
    ...doiTuongSaga,
    ...taiSanSaga,
    ...contractTypeSaga,
    ...loaiHopDongSaga,
    ...loaiSoLuuTruSaga,
    ...soLuuTruSaga,
    ...subAssetTypeSaga,
    ...ownerTypeSaga,
    ...subOwnerTypeSaga,
    ...landPurposeSaga,
    ...bankSaga,
    ...districtSaga,
    ...wardSaga,
];