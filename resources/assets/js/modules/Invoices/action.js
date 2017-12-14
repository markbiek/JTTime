import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fromJS } from 'immutable';
import store from '../../store.js';
import {
    getUnbilledTasks,
} from '../Tasks/action';

const { dispatch } = store;

// Actions
export function actionInvoicesIsLoading(bool) {
    return dispatch => {
        if (bool) {
            dispatch(actionInvoicesIsErrored(false, null));
            dispatch(actionInvoicesIsComplete(null));
        }

        dispatch({
            type: 'INVOICES_IS_LOADING',
            loading: bool
        });
    };
}

export function actionInvoicesIsErrored(bool, err) {
    return dispatch({
        type: 'INVOICES_IS_ERRORED',
        errored: bool,
        error: err
    });
}

export function actionInvoicesIsComplete(invoices) {
    return dispatch({
        type: 'INVOICES_IS_COMPLETE',
        complete: invoices !== null,
        invoices: invoices
    });
}

export function actionInvoiceFormChange(form) {
    return {
        type: 'INVOICE_FORM_CHANGE',
        form
    };
}

export function actionAddInvoice(invoice) {
    return {
        type: 'ADD_INVOICE',
        invoice
    };
}

export function actionDeleteInvoice(invoice) {
    return {
        type: 'DELETE_INVOICE',
        invoice
    };
}

export const addInvoice = invoice => {
    return dispatch => {
        axios.post('/api/invoices/add', invoice)
        .then(function (response) {
            invoice = fromJS(response.data);

            dispatch(actionAddInvoice(invoice));
            dispatch(getUnbilledTasks());
        })
        .catch(function (err) {
            console.log('Error adding invoice.');
            console.log(err);
        });
    };
};

export const getUnpaidInvoices = () => {
    return dispatch => {
        dispatch(actionInvoicesIsLoading(true));

        axios.get('/api/invoices?status=unpaid')
        .then(response => {
            var invoices = fromJS(response.data);

            dispatch(actionInvoicesIsLoading(false));
            dispatch(actionInvoicesIsComplete(invoices))
        })
        .catch(err => {
            dispatch(actionInvoicesIsErrored(true, err));
        });
    };
}

export const deleteInvoice = (id) => {
    axios.post('/api/invoices/delete', {
            id: id
        })
        .then(function (response) {
            var data = response.data;
            var invoice = {id: id};

            if (data.status == 'ok') {
                dispatch(actionDeleteInvoice(invoice));

                dispatch(getUnbilledTasks());
            } else {
                alert(data.msg);
            }
        })
        .catch(function (err) {
            console.log('Error deleting invoice.');
            console.log(err);
        });
};

export const payInvoice = (id) => {
    axios.post('/api/invoices/pay', {
            id: id
        })
        .then(function (response) {
            var data = response.data;

            if (data.status == 'ok') {
                dispatch(getUnpaidInvoices());
            } else {
                alert(data.msg);
            }
        })
        .catch(function (err) {
            console.log('Error paying invoice.');
            console.log(err);
        });
};
