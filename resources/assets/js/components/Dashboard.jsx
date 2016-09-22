import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Immutable from 'immutable';
import store from '../store.js';
import TaskList from './TaskList.jsx';
import TaskForm from './TaskForm.jsx';
import InvoiceList from './InvoiceList.jsx';

class Dashboard extends React.Component {
    componentDidMount() {
        axios.get('/api/invoices?status=unpaid')
            .then(function (response) {
                var invoices = response.data;

                store.dispatch({
                    type: 'GET_UNPAID_INVOICES',
                    invoices
                });
            })
            .catch(function (err) {
                console.log(err);
            });

        axios.get('/api/tasks?status=unbilled')
            .then(function (response) {
                var tasks = Immutable.fromJS(response.data);

                store.dispatch({
                    type: 'GET_BILLED_TASKS',
                    tasks
                });
            })
            .catch(function (err) {
                console.log(err);
            });

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
    }

    render() {
        var props = this.props;

        return (
            <div>
                <h1>Time Dashboard</h1>

                <TaskForm />
                <TaskList />

                {/* <InvoiceList /> */}
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
