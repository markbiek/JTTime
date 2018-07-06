import { fromJS, List} from 'immutable';
import _ from 'lodash';

/** Task Store **/
const taskInitialState = fromJS({
    loading: false,
    errored: false,
    error: '',
    complete: false,
    totals: [],
    tasks: [],
    checked: {},
    form: {
        task: '',
        company: -1,
        hours: -1,
        date: null
    }
})

export const taskReducer = function (state = taskInitialState, action) {
    switch (action.type) {
        case 'TASKS_IS_LOADING':
            return state.set('loading', action.loading);

        case 'TASKS_IS_ERRORED':
            return state.set('errored', action.errored).set('error', action.error);

        case 'TASKS_IS_COMPLETE':
            return state.set('complete', action.complete).set('tasks', action.tasks);

        case 'TASK_TOTALS_IS_COMPLETE':
            return state.set('totals', action.totals);

        case 'TASK_CHECKED':
            var checked = state.get('checked').set(action.task.id, action.task.checked);

            return state.set('checked', checked);

        case 'CLEAR_CHECKED_TASKS':
            return state.set('checked', fromJS({}));

        case 'ADD_TASK':
            var tasks = state.get('tasks').push(action.task);

            return state.set('tasks', tasks);

        case 'DELETE_TASK':
            var tasks = List(_.filter(state.get('tasks').toArray(), function (o) {
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
