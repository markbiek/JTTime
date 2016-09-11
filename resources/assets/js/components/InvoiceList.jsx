import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import InvoiceItem from './InvoiceItem.jsx';

class InvoiceList extends React.Component {
    render() {
        var props = this.props;

        if (props.invoices.length <= 0) {
            return (
                <div>
                    <h2>Unbilled Invoices</h2>

                    <p>No unbilled invoices found.</p>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Unbilled Invoices</h2>
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
                            this.props.invoices.map(invoice => {
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
        invoices: store.invoiceState.invoices
    };
};

export default connect(mapStateToProps)(InvoiceList);
