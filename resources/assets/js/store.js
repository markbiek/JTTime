import { createStore, combineReducers } from 'redux';

const taskInitialState = {
    tasks: []
}

const taskReducer = function (state = taskInitialState, action) {
    switch (action.type) {
        case 'GET_BILLED_TASKS':
            return Object.assign({}, state, {tasks: action.tasks});
    }

    return state;
}

const reducers = combineReducers({
    taskState: taskReducer
});

const store = createStore(reducers);

export default store;
