import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Immutable from 'immutable';
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
import TaskList from './TaskList.jsx';
import TaskForm from './TaskForm.jsx';
import InvoiceList from './InvoiceList.jsx';

class Dashboard extends React.Component {
    componentDidMount() {
        getUnpaidInvoices();
        getUnbilledTasks();
        getCompanies();
    }

    render() {
        return (
            <div>
                <h1>Time Dashboard</h1>

                <TaskForm />
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
