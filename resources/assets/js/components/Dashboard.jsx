import React from 'react';
import { connect } from 'react-redux';
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
import InvoiceForm from './InvoiceForm.jsx';
import DashboardNav from './DashboardNav.jsx';

const { dispatch } = store;

class Dashboard extends React.Component {
    componentDidMount() {
        //dispatch(getUnpaidInvoices());
        //dispatch(getUnbilledTasks());
        //getCompanies();
    }

    renderInvoiceTab() {
        const { tab } = this.props;

        if (tab != 'invoices') {
            return null;
        }

        return (
            <InvoiceList />
        );
    }

    renderTaskTab() {
        const { tab } = this.props;

        if (tab != 'add-task') {
            return null;
        }

        return (
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <TaskForm />
                    </div>
                    <div className="column">
                        <TaskTotals />
                        <InvoiceForm />
                    </div>
                </div>
                <TaskList />
            </div>
        );
    }

    render() {
        return (
            <div className="container dashboard">
                <h1>Time Dashboard</h1>

                <DashboardNav />
                {this.renderTaskTab()}
                {this.renderInvoiceTab()}
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        tab: store.metaState.get('tab'),
        taskState: store.taskState,
        invoiceState: store.invoiceState
    };
};

export default connect(mapStateToProps)(Dashboard);
