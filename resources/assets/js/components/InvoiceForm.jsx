import React from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import store from '../store.js';

import {
    getUnbilledTasks,
} from '../modules/Tasks/action';

import {
    actionInvoiceFormChange,
    addInvoice,
} from '../modules/Invoices/action';

import CompanySelect from './CompanySelect.jsx';

const { dispatch } = store;

class InvoiceForm extends React.Component {
    constructor(props) {
        super(props);

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
    
        var invoice = this.props.form.toObject();
        invoice.billed = 0;
        invoice.tasks = [];

        const { tasks } = this.props;

        for (var i in tasks) {
            if (tasks.hasOwnProperty(i) && tasks[i]) {
                invoice.tasks.push(i);
            }
        }

        dispatch(addInvoice(invoice));
    }

    change(e) {
        var elem = e.target;
        var form = {
            prop: elem.id,
            value: elem.value
        };

        dispatch(actionInvoiceFormChange(form));
    }

    render() {
        return (
            <div className="card invoice-form">
                <div className="card-content">
                    <h2>Add Invoice</h2>
                    <form>
                        <div className="field">
                            <label className="label">Company:</label>
                            <div className="control">
                                <CompanySelect change={this.change}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="date">Date:</label>
                            <div className="control">
                                <input type="date" id="date" className="input" placeholder="Date" onChange={this.change} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="desc">Description:</label>
                            <div className="control">
                                <input type="text" id="desc" className="input" placeholder="Description" onChange={this.change} />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type="button" className="button" onClick={this.submit}>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        form: store.invoiceState.get('form'),
        taskState: store.taskState,
    };
};

export default connect(mapStateToProps)(InvoiceForm);
