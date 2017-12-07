import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fromJS } from 'immutable';
import store from '../../store.js';

// Actions
export function actionGetUnbilledTasks(tasks) {
    return {
        type: 'GET_UNBILLED_TASKS',
        tasks
    };
}

export function actionGetUnbilledTaskTotals(totals) {
    return {
        type: 'GET_UNBILLED_TASK_TOTALS',
        totals
    };
}

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

// Helper functions

export const getUnbilledTasks = () => {
    axios.get('/api/tasks?status=unbilled')
    .then(function (response) {
        var tasks = fromJS(response.data);

        store.dispatch(actionGetUnbilledTasks(tasks));
    })
    .catch(function (err) {
        console.log(err);
    });
};

export const getUnbilledTaskTotals = () => {
    axios.get('/api/tasks/totals')
    .then(resp => {
        let totals = fromJS(resp.data);

        store.dispatch(actionGetUnbilledTaskTotals(totals));
    })
    .catch(err => {
        console.log(err);
    });
};

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
