import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const LIST_CLIENTS_ACTION    = defineAction('LIST_CLIENTS_ACTION',   [LOADING, FAILURE, SUCCESS], 'dashboard');
export const LIST_QUOTES_ACTION     = defineAction('LIST_QUOTES_ACTION',    [LOADING, FAILURE, SUCCESS], 'dashboard');
export const DELETE_A_QUOTE_ACTION  = defineAction('DELETE_A_QUOTE_ACTION', [LOADING, FAILURE, SUCCESS], 'dashboard');
export const CHANGE_TAB_ACTION      = 'CHANGE_TAB_ACTION';

export const DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD        = defineAction('DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD',  [LOADING, FAILURE, SUCCESS], 'dashboard');
export const CLEAR_DOC_EXPORT                        = 'CLEAR_DOC_EXPORT';

export const SET_PHIEU_TRA_CUU_ASSET_DETAIL          = 'SET_PHIEU_TRA_CUU_ASSET_DETAIL';
export const LOAD_LIST_NEW_REPORTS_ACTION            = defineAction('LOAD_LIST_NEW_REPORTS_ACTION',    [LOADING, FAILURE, SUCCESS], 'dashboard');

export const loadListClientsAction  = createAction(LIST_CLIENTS_ACTION.ACTION);
export const loadListQuotesAction   = createAction(LIST_QUOTES_ACTION.ACTION);
export const deleteAQuoteAction     = createAction(DELETE_A_QUOTE_ACTION.ACTION);

export const doChangeTab            = createAction(CHANGE_TAB_ACTION);

export const DOC_exportPhieuTraCuuToWORD             = createAction(DOC_EXPORT_PHIEU_TRA_CUU_TO_WORD.ACTION);
export const clearDocExport                          = createAction(CLEAR_DOC_EXPORT);

export const setPhieuTraCuuAssetDetail               = createAction(SET_PHIEU_TRA_CUU_ASSET_DETAIL);
export const DOC_loadListNewReports                  = createAction(LOAD_LIST_NEW_REPORTS_ACTION.ACTION);