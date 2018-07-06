import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fromJS } from 'immutable';
import store from '../../store.js';

const { dispatch } = store;

export function actionSetActiveTab(tab) {
    return dispatch({
        type: 'META_SET_ACTIVE_TAB',
        tab
    });
}
