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
