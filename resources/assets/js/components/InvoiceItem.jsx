import React from 'react';
import store from '../store.js';
import {
    actionInvoiceChecked,
    deleteInvoice,
    payInvoice,
} from '../modules/Invoices/action';

class InvoiceItem extends React.Component {
    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
    }

    delete(id, e) {
        e.nativeEvent.preventDefault();

        if (!confirm('Are you sure you want to delete this invoice?')) {
            return;
        }

        deleteInvoice(id);
    }

    pay(id, e) {
        e.nativeEvent.preventDefault();

        if (!confirm('Are you sure you want to mark this invoice as paid?')) {
            return;
        }

        payInvoice(id);
    }

    check(id, e) {
        var chk = e.target;
        var invoice = {
            id: chk.value,
            checked: chk.checked
        }

        store.dispatch(actionInvoiceChecked(invoice));
    }

    render() {
        const {invoice} = this.props;
        const {id, tag, company, description, total, created_at} = invoice;

        return (
            <tr key={id}>
                <td className="icons">
                    <a href="#" onClick={(e) => this.delete(id, e)}><span className="fa fa-trash-o"></span></a>
                </td>
                <td>
                    <a href="#" onClick={(e) => this.pay(id, e)}><span className="fa fa-usd"></span></a>
                </td>
                <td><a href={'/invoice/' + tag} target="_blank">{company.name}</a></td>
                <td><a href={'/invoice/' + tag} target="_blank">{description}</a></td>
                <td>${total}</td>
                <td>{created_at}</td>
            </tr>
        )
    }
}

export default InvoiceItem;
