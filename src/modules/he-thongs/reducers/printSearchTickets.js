import { 
    LOAD_LIST_PRINT_SEARCH_TICKET,
    ADD_A_PRINT_SEARCH_TICKET_ACTION
} from '../actions';

import {
    PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME_SUBMIT, 
    PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME_SUCCESS
} from '../constants';

const defaultState = {
    printSearchTickets: [],
    filter: {},
    pagination: {},
    errors: {}
};

const printSearchTicketReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_PRINT_SEARCH_TICKET.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                printSearchTickets: apiRes.data,
                pagination: { total, limit, skip },
                loading: false
            };

        case ADD_A_PRINT_SEARCH_TICKET_ACTION.SUCCESS:
            return {
                ...state,
                printSearchTickets: [action.payload.data.data, ...state.printSearchTickets],
                loading: false
            };

        case LOAD_LIST_PRINT_SEARCH_TICKET.LOADING:  

        case LOAD_LIST_PRINT_SEARCH_TICKET.FAILURE:

        case PRINT_SEARCH_TICKET_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload,
                // filter: {
                //     ...action.payload
                // }
            };

        default:
            return state;
    }
};

export default printSearchTicketReducer;