import { createStore, combineReducers } from 'redux';
import { invoiceReducer } from './modules/Invoices/reducer';
import { taskReducer } from './modules/Tasks/reducer';
import { companyReducer } from './modules/Companies/reducer';

const reducers = combineReducers({
    invoiceState: invoiceReducer,
    taskState: taskReducer,
    metaState: companyReducer
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
