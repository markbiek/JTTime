import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fromJS } from 'immutable';
import store from '../../store.js';
import {
    getUnbilledTasks,
} from '../Tasks/action';

// Actions
export function actionGetUnpaidInvoices(invoices) {
    return {
        type: 'GET_UNPAID_INVOICES',
        invoices
    };
}

export function actionDeleteInvoice(invoice) {
    return {
        type: 'DELETE_INVOICE',
        invoice
    };
}

export function actionInvoiceChecked(invoice) {
    return {
        type: 'INVOICE_CHECKED',
        invoice
    };
}

export function actionAddInvoice(invoice) {
    return {
        type: 'ADD_INVOICE',
        invoice
    };
}

export function actionInvoiceFormChange(form) {
    return {
        type: 'INVOICE_FORM_CHANGE',
        form
    };
}

// Helper functions

export const getUnpaidInvoices = () => {
    axios.get('/api/invoices?status=unpaid')
    .then(response => {
        var invoices = fromJS(response.data);

        store.dispatch(actionGetUnpaidInvoices(invoices));
    })
    .catch(function (err) {
        console.log(err);
    });
};

export const deleteInvoice = (id) => {
    axios.post('/api/invoices/delete', {
            id: id
        })
        .then(function (response) {
            var data = response.data;
            var invoice = {id: id};

            if (data.status == 'ok') {
                store.dispatch(actionDeleteInvoice(invoice));

                getUnbilledTasks();
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
                getUnpaidInvoices();
            } else {
                alert(data.msg);
            }
        })
        .catch(function (err) {
            console.log('Error paying invoice.');
            console.log(err);
        });
};
