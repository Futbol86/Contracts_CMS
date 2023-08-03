import reportSaga from './sagas/report';
import requestTNMTLandDataReportSaga from './sagas/requestTNMTLandDataReport';

export default
[
    ...reportSaga,
    ...requestTNMTLandDataReportSaga
];