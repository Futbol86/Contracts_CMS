import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';


export const DOC_CHANGE_ACTIVE_MODAL    = 'DOC_CHANGE_ACTIVE_MODAL';
export const DOC_CHANGE_TYPE_MODAL      = 'DOC_CHANGE_TYPE_MODAL';
export const DOC_LOAD_A_DOCUMENT        = defineAction('DOC_LOAD_A_DOCUMENT',  [LOADING, FAILURE, SUCCESS], 'documents');
export const DOC_CONVERT_HTML_TO_PDF    = defineAction('DOC_CONVERT_HTML_TO_PDF',  [LOADING, FAILURE, SUCCESS], 'documents');
export const DOC_QP_UPLOAD_LOGO_FILE    = defineAction('DOC_QP_UPLOAD_LOGO_FILE',  [LOADING, FAILURE, SUCCESS], 'documents');
export const DOC_CHANGE_TAB_ACTION      = 'DOC_CHANGE_TAB_ACTION';

export const DOC_REQUEST_ZIP_CONTENT    = defineAction('DOC_REQUEST_ZIP_CONTENT',  [LOADING, FAILURE, SUCCESS], 'documents');


export const DOC_changeActiveModal  = createAction(DOC_CHANGE_ACTIVE_MODAL);
export const DOC_loadADocument      = createAction(DOC_LOAD_A_DOCUMENT.ACTION);
export const DOC_convertHTMLToPDF   = createAction(DOC_CONVERT_HTML_TO_PDF.ACTION);
export const DOC_requestZipContent  = createAction(DOC_REQUEST_ZIP_CONTENT.ACTION);
export const doChangeTab = createAction(DOC_CHANGE_TAB_ACTION);

export const DOC_changeTypeModal  = createAction(DOC_CHANGE_TYPE_MODAL);
