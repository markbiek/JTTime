import { createStore, combineReducers } from 'redux';
import Immutable from 'immutable';
import { invoiceReducer } from './modules/Invoices/reducer';
import { taskReducer } from './modules/Tasks/reducer';
import { companyReducer } from './modules/Companies/reducer';

const reducers = combineReducers({
    invoiceState: invoiceReducer,
    taskState: taskReducer,
    metaState: companyReducer
});

const store = createStore(reducers);

export default store;
