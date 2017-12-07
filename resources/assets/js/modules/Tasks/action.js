import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fromJS } from 'immutable';
import store from '../../store.js';

const { dispatch } = store;

// Actions
export function actionTasksIsLoading(bool) {
    return dispatch => {
        if (bool) {
            dispatch(actionTasksIsErrored(false, null));
            dispatch(actionTasksIsComplete(null));
        }

        dispatch({
            type: 'TASKS_IS_LOADING',
            loading: bool
        });
    };
}

export function actionTasksIsErrored(bool, err) {
    return dispatch({
        type: 'TASKS_IS_ERRORED',
        errored: bool,
        error: err
    });
}

export function actionTasksIsComplete(tasks) {
    return dispatch({
        type: 'TASKS_IS_COMPLETE',
        complete: tasks !== null,
        tasks: tasks
    });
}

export function actionGetUnbilledTaskTotals(totals) {
    return dispatch({
        type: 'TASK_TOTALS_IS_COMPLETE',
        totals: totals
    });
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
    return dispatch => {
        dispatch(actionTasksIsLoading(true));

        axios.get('/api/tasks?status=unbilled')
        .then(function (response) {
            var tasks = fromJS(response.data);

            dispatch(actionTasksIsLoading(false));
            dispatch(actionTasksIsComplete(tasks));
            dispatch(getUnbilledTaskTotals());
        })
        .catch(function (err) {
            dispatch(actionTasksIsLoading(true, err));
        });
    };
};

export const getUnbilledTaskTotals = () => {
    return dispatch => {
        axios.get('/api/tasks/totals')
        .then(resp => {
            let totals = fromJS(resp.data);

            dispatch(actionGetUnbilledTaskTotals(totals));
        })
        .catch(err => {
            console.log(err);
        });
    };
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
