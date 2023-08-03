import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const LOAD_LIST_ACCOUNT                     = defineAction('LOAD_LIST_ACCOUNT',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const LOAD_AN_ACCOUNT_INFO                  = defineAction('LOAD_AN_ACCOUNT_INFO',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const ADD_AN_ACCOUNT_ACTION                 = defineAction('ADD_AN_ACCOUNT_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const UPDATE_AN_ACCOUNT_ACTION              = defineAction('UPDATE_AN_ACCOUNT_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const DELETE_AN_ACCOUNT_ACTION              = defineAction('DELETE_AN_ACCOUNT_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const CLEAR_AN_ACCOUN_ACTION                = 'CLEAR_AN_ACCOUN_ACTION';

export const LOAD_LIST_USER_LOG                    = defineAction('LOAD_LIST_USER_LOG',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const LOAD_A_USER_LOG_INFO                  = defineAction('LOAD_A_USER_LOG_INFO',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const ADD_A_USER_LOG_ACTION                 = defineAction('ADD_A_USER_LOG_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const UPDATE_A_USER_GROUP_ACTION            = defineAction('UPDATE_A_USER_GROUP_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const DELETE_A_USER_LOG_ACTION              = defineAction('DELETE_A_USER_LOG_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');

export const LOAD_LIST_USER_GROUP                  = defineAction('LOAD_LIST_USER_GROUP',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const LOAD_A_USER_GROUP_INFO                = defineAction('LOAD_A_USER_GROUP_INFO',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const ADD_A_USER_GROUP_ACTION               = defineAction('ADD_A_USER_GROUP_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const DELETE_A_USER_GROUP_ACTION            = defineAction('DELETE_A_USER_GROUP_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const CLEAR_A_USER_GROUP_ACTION             = 'CLEAR_A_USER_GROUP_ACTION';

export const LOAD_LIST_PRINT_SEARCH_TICKET         = defineAction('LOAD_LIST_PRINT_SEARCH_TICKET',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const ADD_A_PRINT_SEARCH_TICKET_ACTION      = defineAction('ADD_A_PRINT_SEARCH_TICKET_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');

export const LOAD_LIST_PERMISSION                  = defineAction('LOAD_LIST_PERMISSION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const LOAD_A_PERMISSION_INFO                = defineAction('LOAD_A_PERMISSION_INFO',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const ADD_A_PERMISSION_ACTION               = defineAction('ADD_A_PERMISSION_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const UPDATE_A_PERMISSION_ACTION            = defineAction('UPDATE_A_PERMISSION_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const DELETE_A_PERMISSION_ACTION            = defineAction('DELETE_A_PERMISSION_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const CLEAR_A_PERMISSION_ACTION             = 'CLEAR_A_PERMISSION_ACTION';

export const LOAD_LIST_SYSTEM_CONFIG               = defineAction('LOAD_LIST_SYSTEM_CONFIG',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const ADD_A_SYSTEM_CONFIG_ACTION            = defineAction('ADD_A_SYSTEM_CONFIG_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const UPDATE_A_SYSTEM_CONFIG_ACTION         = defineAction('UPDATE_A_SYSTEM_CONFIG_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const CLEAR_A_SYSTEM_CONFIG_ACTION          = 'CLEAR_A_SYSTEM_CONFIG_ACTION';

export const UPLOAD_HDSD_FILE_ACTION               = defineAction('UPLOAD_HDSD_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const DELETE_HDSD_FILE_ACTION               = defineAction('DELETE_HDSD_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'heThongs');
export const SET_HDSD_FILE_ACTION                  = 'SET_HDSD_FILE_ACTION';

export const loadListAccount                       = createAction(LOAD_LIST_ACCOUNT.ACTION);
export const loadAnAccountInfo                     = createAction(LOAD_AN_ACCOUNT_INFO.ACTION);
export const addAnAccount                          = createAction(ADD_AN_ACCOUNT_ACTION.ACTION);
export const updateAnAccount                       = createAction(UPDATE_AN_ACCOUNT_ACTION.ACTION);
export const deleteAnAccount                       = createAction(DELETE_AN_ACCOUNT_ACTION.ACTION);
export const clearAnAccount                        = createAction(CLEAR_AN_ACCOUN_ACTION);

export const loadListUserLog                       = createAction(LOAD_LIST_USER_LOG.ACTION);
export const loadAnUserLogInfo                     = createAction(LOAD_A_USER_LOG_INFO.ACTION);
export const addAnUserLog                          = createAction(ADD_A_USER_LOG_ACTION.ACTION);
export const deleteAnUserLog                       = createAction(DELETE_A_USER_LOG_ACTION.ACTION);

export const loadListPrintSearchTicket             = createAction(LOAD_LIST_PRINT_SEARCH_TICKET.ACTION);
export const addAPrintSearchTicket                 = createAction(ADD_A_PRINT_SEARCH_TICKET_ACTION.ACTION);

export const loadListUserGroup                     = createAction(LOAD_LIST_USER_GROUP.ACTION);
export const loadAUserGroupInfo                    = createAction(LOAD_A_USER_GROUP_INFO.ACTION);
export const addAUserGroup                         = createAction(ADD_A_USER_GROUP_ACTION.ACTION);
export const updateAUserGroup                      = createAction(UPDATE_A_USER_GROUP_ACTION.ACTION);
export const deleteAUserGroup                      = createAction(DELETE_A_USER_GROUP_ACTION.ACTION);
export const clearAUserGroup                       = createAction(CLEAR_A_USER_GROUP_ACTION);

export const loadListPermission                    = createAction(LOAD_LIST_PERMISSION.ACTION);
export const loadAPermissionInfo                   = createAction(LOAD_A_PERMISSION_INFO.ACTION);
export const addAPermission                        = createAction(ADD_A_PERMISSION_ACTION.ACTION);
export const updateAPermission                     = createAction(UPDATE_A_PERMISSION_ACTION.ACTION);
export const deleteAPermission                     = createAction(DELETE_A_PERMISSION_ACTION.ACTION);
export const clearAPermission                      = createAction(CLEAR_A_PERMISSION_ACTION);

export const loadListSystemConfig                  = createAction(LOAD_LIST_SYSTEM_CONFIG.ACTION);
export const addASystemConfig                      = createAction(ADD_A_SYSTEM_CONFIG_ACTION.ACTION);
export const updateASystemConfig                   = createAction(UPDATE_A_SYSTEM_CONFIG_ACTION.ACTION);
export const clearASystemConfig                    = createAction(CLEAR_A_SYSTEM_CONFIG_ACTION);

export const uploadHDSDFile                        = createAction(UPLOAD_HDSD_FILE_ACTION.ACTION);
export const deleteHDSDFile                        = createAction(DELETE_HDSD_FILE_ACTION.ACTION);
export const setHDSDFile                           = createAction(SET_HDSD_FILE_ACTION);