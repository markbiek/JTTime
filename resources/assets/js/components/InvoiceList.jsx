import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import InvoiceItem from './InvoiceItem.jsx';

class InvoiceList extends React.Component {
    render() {
        const { loading, errored, complete, error, invoices } = this.props.invoiceState;

        if (loading || !invoices) {
            return null;
        }

        /*
        if (errored) {
            alert(`Error loading invoices: ${error}`);
            return null;
        }
       */

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
                    <table className="table is-fullwidth is-hoverable">
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
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
        invoiceState: store.invoiceState.toJS(),
    };
};

export default connect(mapStateToProps)(InvoiceList);
