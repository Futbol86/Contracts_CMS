import {combineReducers} from 'redux';
import doiTuongReducer from './reducers/doiTuong';
import taiSanReducer from './reducers/taiSan';
import contractTypeReducer from './reducers/contractType';
import loaiHopDongReducer from './reducers/loaiHopDong';
import loaiSoLuuTruReducer from './reducers/loaiSoLuuTru';
import soLuuTruReducer from './reducers/soLuuTru';
import subAssetTypeReducer from './reducers/subAssetType';
import ownerTypeReducer from './reducers/ownerType';
import subOwnerTypeReducer from './reducers/subOwnerType';
import landPurposeReducer from './reducers/landPurpose';
import bankReducer from './reducers/bank';
import districtReducer from './reducers/district';
import wardReducer from './reducers/ward';

let allDanhMucReducer = {
    doiTuong:          doiTuongReducer,
    taiSan:   		   taiSanReducer,
    contractType:      contractTypeReducer,
    loaiHopDong:       loaiHopDongReducer,
    loaiSoLuuTru:      loaiSoLuuTruReducer,
    soLuuTru:          soLuuTruReducer,
    subAssetType:      subAssetTypeReducer,
    ownerType:         ownerTypeReducer,
    subOwnerType:      subOwnerTypeReducer,
    landPurpose:       landPurposeReducer,
    bank:              bankReducer,
    district:          districtReducer,
    ward:              wardReducer,
};

export default combineReducers(allDanhMucReducer);