import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fromJS } from 'immutable';
import store from '../../store.js';

export const getUnbilledTasks = () => {
    axios.get('/api/tasks?status=unbilled')
    .then(function (response) {
        var tasks = fromJS(response.data);

        store.dispatch({
            type: 'GET_UNBILLED_TASKS',
            tasks
        });
    })
    .catch(function (err) {
        console.log(err);
    });
};

export const getUnbilledTaskTotals = () => {
    axios.get('/api/tasks/totals')
    .then(resp => {
        let totals = fromJS(resp.data);

        store.dispatch({
            type: 'GET_UNBILLED_TASK_TOTALS',
            totals
        })
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
