import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../store.js';
import {
    getUnbilledTasks,
} from '../modules/Tasks/action';
import {
    getUnpaidInvoices,
} from '../modules/Invoices/action';
import {
    getCompanies,
} from '../modules/Companies/action';
import TaskTotals from './TaskTotals.jsx';
import TaskList from './TaskList.jsx';
import TaskForm from './TaskForm.jsx';
import InvoiceList from './InvoiceList.jsx';

const { dispatch } = store;

class Dashboard extends React.Component {
    componentDidMount() {
        dispatch(getUnpaidInvoices());
        dispatch(getUnbilledTasks());
        getCompanies();
    }

    render() {
        return (
            <div>
                <h1>Time Dashboard</h1>

                <TaskForm />
                <TaskTotals />
                <TaskList />

                <InvoiceList />
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        taskState: store.taskState,
        invoiceState: store.invoiceState
    };
};

export default connect(mapStateToProps)(Dashboard);
