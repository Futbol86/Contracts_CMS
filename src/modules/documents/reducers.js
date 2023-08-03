import {combineReducers} from 'redux';
import contractTermsReducer from "./reducers/contractTerms";
import quotePageReducer from './reducers/quotePage';
import quotePrinterReducer from './reducers/quotePrinter';

const documentsReducer = {
    contractTerms:  contractTermsReducer,
    quotePage:      quotePageReducer,
    quotePrinter:   quotePrinterReducer
};

export default combineReducers(documentsReducer);