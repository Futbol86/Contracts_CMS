import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const LOAD_LIST_REPORT                   = defineAction('LOAD_LIST_REPORT',  [LOADING, FAILURE, SUCCESS], 'thongkes');
export const LOAD_LIST_TNMT_LAND_DATA_REPORT    = defineAction('LOAD_LIST_TNMT_LAND_DATA_REPORT',  [LOADING, FAILURE, SUCCESS], 'thongkes');
export const LOAD_LIST_LAND_DATA_REPORT_OF_TNMT = defineAction('LOAD_LIST_LAND_DATA_REPORT_OF_TNMT',  [LOADING, FAILURE, SUCCESS], 'thongkes');
export const LOAD_LIST_ARCHIVE_BOOK_FILTER      = defineAction('LOAD_LIST_ARCHIVE_BOOK_FILTER',  [LOADING, FAILURE, SUCCESS], 'thongkes');

export const DOC_EXPORT_ARCHIVE_BOOK_TO_EXCEL   = defineAction('DOC_EXPORT_ARCHIVE_BOOK_TO_EXCEL',  [LOADING, FAILURE, SUCCESS], 'thongkes');
export const DOC_EXPORT_SAMPLE_31_TO_EXCEL      = defineAction('DOC_EXPORT_SAMPLE_31_TO_EXCEL',  [LOADING, FAILURE, SUCCESS], 'thongkes');
export const CLEAR_EXCEL_EXPORT                 = 'CLEAR_EXCEL_EXPORT';

export const loadListReport                  = createAction(LOAD_LIST_REPORT.ACTION);
export const loadListTNMTLandDataReport      = createAction(LOAD_LIST_TNMT_LAND_DATA_REPORT.ACTION);
export const loadListLandDataReportOfTNTM    = createAction(LOAD_LIST_LAND_DATA_REPORT_OF_TNMT.ACTION);
export const loadListArchiveBookFilter       = createAction(LOAD_LIST_ARCHIVE_BOOK_FILTER.ACTION);

export const DOC_exportSample31ToEXCEL       = createAction(DOC_EXPORT_SAMPLE_31_TO_EXCEL.ACTION);
export const clearExcelExport                = createAction(CLEAR_EXCEL_EXPORT);