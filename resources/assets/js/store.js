import { createStore, combineReducers } from 'redux';

const taskInitialState = {
    tasks: []
}

const taskFormInitialState = {
    task: '',
    hours: -1
}

const taskReducer = function (state = taskInitialState, action) {
    switch (action.type) {
        case 'GET_BILLED_TASKS':
            return Object.assign({}, state, {tasks: action.tasks});

        case 'ADD_TASK':
            var newState = Object.assign({}, state);
            newState.push(action.task);

            return newState;
    }

    return state;
}

const taskFormReducer = function (state = taskFormInitialState, action) {
    switch (action.type) {
        case 'TASK_FORM_CHANGE':
            var newState = Object.assign({}, state);
            newState[action.form.prop] = action.form.value;

            return newState;
    }

    return state;
}

const reducers = combineReducers({
    taskState: taskReducer,
    taskFormState: taskFormReducer
});

const store = createStore(reducers);

export default store;
