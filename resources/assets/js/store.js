import { createStore, combineReducers } from 'redux';
import Immutable from 'immutable';

/** Meta Store **/
const metaInitialState = Immutable.fromJS({
    companies: []
})

const metaReducer = function (state = metaInitialState, action) {
    switch (action.type) {
        case 'GET_COMPANIES':
            return state.set('companies', action.companies);
    }

    return state;
}

/** Invoice Store **/
const invoiceInitialState = Immutable.fromJS({
    invoices: [],
    checked: {},
    form: {

    }
})

const invoiceReducer = function (state = invoiceInitialState, action) {
    switch (action.type) {
        case 'GET_UNPAID_INVOICES':
            return state.set('invoices', action.invoices);

        case 'ADD_INVOICE':
            var invoices = state.get('invoices').push(action.invoice);

            return state.set('invoices', invoices);

        case 'DELETE_INVOICE':
            var invoices = Immutable.List(_.filter(state.get('invoices').toArray(), function (o) {
                o = o.toObject();
                return o.id != action.invoice.id;
            }));

            return state.set('invoices', invoices);

        case 'INVOICE_FORM_CHANGE':
            var form = state.get('form').set(action.form.prop, action.form.value);

            return state.set('form', form);

        case 'INVOICE_CHECKED':
            var checked = state.get('checked').set(action.invoice.id, action.invoice.checked);

            return state.set('checked', checked);
    }

    return state;
}

/** Task Store **/
const taskInitialState = Immutable.fromJS({
    tasks: [],
    checked: {},
    form: {
        task: '',
        company: -1,
        hours: -1,
        date: null
    }
})

const taskReducer = function (state = taskInitialState, action) {
    switch (action.type) {
        case 'TASK_CHECKED':
            var checked = state.get('checked').set(action.task.id, action.task.checked);

            return state.set('checked', checked);

        case 'GET_BILLED_TASKS':
            return state.set('tasks', action.tasks);

        case 'ADD_TASK':
            var tasks = state.get('tasks').push(action.task);

            return state.set('tasks', tasks);

        case 'DELETE_TASK':
            var tasks = Immutable.List(_.filter(state.get('tasks').toArray(), function (o) {
                o = o.toObject();
                return o.id != action.task.id;
            }));

            return state.set('tasks', tasks);

        case 'TASK_FORM_CHANGE':
            var form = state.get('form').set(action.form.prop, action.form.value);

            return state.set('form', form);
    }

    return state;
}

const reducers = combineReducers({
    invoiceState: invoiceReducer,
    taskState: taskReducer,
    metaState: metaReducer
});

const store = createStore(reducers);

export default store;
