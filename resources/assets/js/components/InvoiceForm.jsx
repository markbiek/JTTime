import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../store.js';
import CompanySelect from './CompanySelect.jsx';

class InvoiceForm extends React.Component {
    constructor(props) {
        super(props);

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
    
        var props = this.props;
        var invoice = Object.assign({}, this.props.form);
        invoice.billed = 0;
        invoice.tasks = [];

        for (var i in props.checkedTasks) {
            if (props.checkedTasks.hasOwnProperty(i) &&
                props.checkedTasks[i]) {
                invoice.tasks.push(i);
            }
        }

        axios.post('/api/invoices/add', invoice)
            .then(function (response) {
                var invoice = response.data;

                store.dispatch({
                    type: 'ADD_INVOICE',
                    invoice
                });
            })
            .catch(function (err) {
                console.log('Error adding invoice.');
                console.log(err);
            });
    }

    change(e) {
        var elem = e.target;
        var form = {
            prop: elem.id,
            value: elem.value
        };

        store.dispatch({
            type: 'INVOICE_FORM_CHANGE',
            form
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-10">
                    <h2>Add Invoice</h2>
                    <form className="form-inline">
                        <div className="form-group">
                            <label>Company:</label>
                            <CompanySelect change={this.change}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date:</label>
                            <input type="date" id="date" className="form-control" placeholder="Date" onChange={this.change} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc">Description:</label>
                            <input type="text" id="desc" className="form-control" placeholder="Description" onChange={this.change} />
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-primary" onClick={this.submit}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        form: store.invoiceState.form
    };
};

export default connect(mapStateToProps)(InvoiceForm);