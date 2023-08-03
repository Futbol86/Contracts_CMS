import {combineReducers} from 'redux';
import mainDashboardReducer from './reducers/dashboard';
// import quoteListReducer from './reducers/quoteList';

/**
 *
 *  TODO (if needed): try to use scoped reducer
 *
 * @type {{clientList: function(*=, *=), quoteList: function(*=, *=)}}
 */
let dashboardReducer = {
    dashboard: mainDashboardReducer,
    // quoteList:  quoteListReducer
};

export default combineReducers(dashboardReducer);