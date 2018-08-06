import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fromJS } from 'immutable';

import store from '../../store.js';

const TASK_TOTALS_IS_COMPLETE = 'TASK_TOTALS_IS_COMPLETE';
const TASKS_IS_LOADING = 'TASKS_IS_LOADING';
const TASKS_IS_ERRORED = 'TASKS_IS_ERRORED';
const TASKS_IS_COMPLETE = 'TASKS_IS_COMPLETE';

// Actions

export function actionGetUnbilledTaskTotals(totals) {
    return {
        type: TASK_TOTALS_IS_COMPLETE,
        totals
    };
}

export function actionTasksIsLoading(bool) {
    return {
        type: TASKS_IS_LOADING,
        loading: bool
    };
}

export function actionTasksIsErrored(bool, err) {
    return {
        type: TASKS_IS_ERRORED,
        errored: bool,
        error: err
    };
}

export function actionTasksIsComplete(tasks) {
    return {
        type: TASKS_IS_COMPLETE,
        complete: tasks !== null,
        tasks
    };
}

/*
export function actionClearCheckedTasks() {
    return {
        type: 'CLEAR_CHECKED_TASKS'
    };
}

export function actionDeleteTask(task) {
    return {
        type: 'DELETE_TASK',
        task
    };
}

export function actionTaskChecked(task) {
    return {
        type: 'TASK_CHECKED',
        task
    };
}

export function actionAddTask(task) {
    return {
        type: 'ADD_TASK',
        task
    };
}

export function actionTaskFormChange(form) {
    return {
        type: 'TASK_FORM_CHANGE',
        form
    };
}

export const addTask = task => {
    return dispatch => {
        axios.post('/api/tasks/add', task)
        .then((response) => {
            task = fromJS(response.data);

            dispatch(actionAddTask(task));
            dispatch(getUnbilledTaskTotals());

            this.clearForm();
        })
        .catch(function (err) {
            console.log('Error adding task.');
            console.log(err);
        });
    };
};

export const deleteTask = task => {
    return dispatch => {
        dispatch(actionDeleteTask(task));

        axios.post('/api/tasks/delete', {
            id: task.id
        })
        .then(function (response) {
            var data = response.data;

            if (data.status == 'ok') {
                dispatch(getUnbilledTaskTotals());
            } else {
                alert(data.msg);
            }
        })
        .catch(function (err) {
            console.log('Error deleting task.');
            console.log(err);
        });
    };
};
*/

export const fetchUnbilledTasks = () => {
    return axios.get('/api/tasks?status=unbilled');
}

export const fetchUnbilledTaskTotals = () => {
    return axios.get('/api/tasks/totals');
};

/*
export const combineTasks = (tasks) => {
    console.log('combineTasks');

    axios.post('/api/tasks/combine', {tasks})
    .then(resp => {
        console.log(resp.data)
        if (resp.status == 'error') {
            alert(resp.msg);
        }
    })
    .catch(err => {
        console.log(err);
    });
};
*/
