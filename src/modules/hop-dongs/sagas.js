import hopDongSaga from './sagas/hopDong';
import newHopDongSaga from './sagas/newHopDong';
import newDongAHopDongSaga from './sagas/newDongAHopDong';
import nganChanSaga from './sagas/nganChan';
import giaiToaSaga from './sagas/giaiToa';
import thuHoiGCNSaga from './sagas/thuHoiGCN';

export default
[
    ...hopDongSaga,
    ...newHopDongSaga,
    ...newDongAHopDongSaga,
    ...nganChanSaga,
    ...giaiToaSaga,
    ...thuHoiGCNSaga,
];