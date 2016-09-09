import { createStore, combineReducers } from 'redux';

const taskInitialState = {
    tasks: [],
    form: {
        task: '',
        company: -1,
        hours: -1
    }
}

const taskReducer = function (state = taskInitialState, action) {
    switch (action.type) {
        case 'GET_BILLED_TASKS':
            return Object.assign({}, state, {tasks: action.tasks});

        case 'ADD_TASK':
            var newState = Object.assign({}, state);
            newState.push(action.task);

            return newState;

        case 'TASK_FORM_CHANGE':
            var newState = Object.assign({}, state);
            newState.form[action.form.prop] = action.form.value;

            return newState;
    }

    return state;
}

const reducers = combineReducers({
    taskState: taskReducer
});

const store = createStore(reducers);

export default store;
