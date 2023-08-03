import {combineReducers} from 'redux';
import hopDongReducer from './reducers/hopDong';
import newHopDongReducer from './reducers/newHopDong';
import newDongAHopDongReducer from './reducers/newDongAHopDong';
import nganChanReducer from './reducers/nganChan';
import giaiToaReducer from './reducers/giaiToa';
import thuHoiGCNReducer from './reducers/thuHoiGCN';

let allHopDongReducer = {
    hopDong: 		   hopDongReducer,
    newHopDong:        newHopDongReducer,
    newDongAHopDong:   newDongAHopDongReducer,
    nganChan:          nganChanReducer,
    giaiToa:           giaiToaReducer,
    thuHoiGCN:         thuHoiGCNReducer
};

export default combineReducers(allHopDongReducer);