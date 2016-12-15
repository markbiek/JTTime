import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Immutable from 'immutable';
import store from '../../store.js';

export const getCompanies = () => {
    axios.get('/api/companies')
    .then((response) => {
        var companies = Immutable.fromJS(response.data);

        store.dispatch({
            type: 'GET_COMPANIES',
            companies
        });
    })
    .catch(function (err) {
        console.log(err);
    });
};
