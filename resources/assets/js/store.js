import { createStore, combineReducers } from 'redux';

/** Meta Store **/
const metaInitialState = {
    companies: []
}

const metaReducer = function (state = metaInitialState, action) {
    switch (action.type) {
        case 'GET_COMPANIES':
            var newState = Object.assign({}, state);
            newState.companies = action.companies;

            return newState;
    }

    return state;
}

/** Invoice Store **/
const invoiceInitialState = {
    invoices: [],
    form: {

    }
}

const invoiceReducer = function (state = invoiceInitialState, action) {
    switch (action.type) {
        case 'GET_UNPAID_INVOICES':
            return Object.assign({}, state, {invoices: action.invoices});

        case 'ADD_INVOICE':
            var invoices = state.invoices.slice(0);
            invoices.push(action.invoice);

            return Object.assign({}, state, {
                invoices: invoices
            });

        case 'DELETE_INVOICE':
            var invoices = _.filter(state.invoices.slice(0), function (o) {
                return o.id != action.invoice.id;
            });

        case 'INVOICE_FORM_CHANGE':
            var newState = Object.assign({}, state);
            newState.form[action.form.prop] = action.form.value;

            return newState;
    }

    return state;
}

/** Task Store **/
const taskInitialState = {
    tasks: [],
    checked: {},
    form: {
        task: '',
        company: -1,
        hours: -1,
        date: null
    }
}

const taskReducer = function (state = taskInitialState, action) {
    switch (action.type) {
        case 'TASK_CHECKED':
            var newState = Object.assign({}, state);
            newState.checked[action.task.id] = action.task.checked;

            return newState;

        case 'GET_BILLED_TASKS':
            return Object.assign({}, state, {tasks: action.tasks});

        case 'ADD_TASK':
            var tasks = state.tasks.slice(0);
            tasks.push(action.task);

            return Object.assign({}, state, {
                tasks: tasks
            });

        case 'DELETE_TASK':
            var tasks = _.filter(state.tasks.slice(0), function (o) {
                return o.id != action.task.id;
            });

            return Object.assign({}, state, {
                tasks: tasks
            });

        case 'TASK_FORM_CHANGE':
            var newState = Object.assign({}, state);
            newState.form[action.form.prop] = action.form.value;

            return newState;
    }

    return state;
}

const reducers = combineReducers({
    taskState: taskReducer,
    metaState: metaReducer
});

const store = createStore(reducers);

export default store;
