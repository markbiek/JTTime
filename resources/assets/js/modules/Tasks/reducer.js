import Immutable from 'immutable';

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

export const taskReducer = function (state = taskInitialState, action) {
    switch (action.type) {
        case 'TASK_CHECKED':
            var checked = state.get('checked').set(action.task.id, action.task.checked);

            return state.set('checked', checked);

        case 'GET_UNBILLED_TASKS':
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
