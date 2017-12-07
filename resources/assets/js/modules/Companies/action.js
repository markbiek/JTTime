import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fromJS } from 'immutable';
import store from '../../store.js';

// Actions
export function actionGetCompanies(companies) {
    return {
        type: 'GET_COMPANIES',
        companies
    };
}

// Helper functions

export const getCompanies = () => {
    axios.get('/api/companies')
    .then((response) => {
        var companies = fromJS(response.data);

        store.dispatch(actionGetCompanies(companies));
    })
    .catch(function (err) {
        console.log(err);
    });
};
