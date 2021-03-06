import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { metaReducer } from './modules/Meta/reducer';
import { invoiceReducer } from './modules/Invoices/reducer';
import { taskReducer } from './modules/Tasks/reducer';
import { companyReducer } from './modules/Companies/reducer';

const reducers = combineReducers({
    metaState: metaReducer,
    invoiceState: invoiceReducer,
    taskState: taskReducer,
    companyState: companyReducer
});

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

export default store;
