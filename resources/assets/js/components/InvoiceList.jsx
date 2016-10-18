import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import store from '../store.js';
import InvoiceItem from './InvoiceItem.jsx';

class InvoiceList extends React.Component {
    render() {
        var invoices = this.props.invoices.toArray();

        if (invoices.length <= 0) {
            return (
                <div>
                    <h2>Unbilled Invoices</h2>

                    <p>No unbilled invoices found.</p>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Unpaid Invoices</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Company</th>
                                <th>Description</th>
                                <th>Total</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            invoices.map(invoice => {
                                invoice = invoice.toObject();
                                invoice.company = invoice.company.toObject();

                                return (
                                    <InvoiceItem key={invoice.id} invoice={invoice} />
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

const mapStateToProps = function(store) {
    return {
        invoices: store.invoiceState.get('invoices')
    };
};

export default connect(mapStateToProps)(InvoiceList);
