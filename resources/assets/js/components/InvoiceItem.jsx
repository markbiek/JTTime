import React from 'react';
import axios from 'axios';
import store from '../store.js';

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

        axios.post('/api/invoices/delete', {
            id: id    
            })
            .then(function (response) {
                var data = response.data;
                var invoice = {id: id};

                if (data.status == 'ok') {
                    store.dispatch({
                        type: 'DELETE_INVOICE',
                        invoice
                    });
                } else {
                    alert(data.msg);
                }
            })
            .catch(function (err) {
                console.log('Error deleting invoice.');
                console.log(err);
            });
    }

    render() {
        var props = this.props;

        return (
            <tr key={props.invoice.id}>
                <td className="icons">
                    <a href="#" onClick={(e) => this.delete(props.invoice.id, e)}><span className="fa fa-trash-o"></span></a>
                </td>
                <td><a href={'/invoice/' + props.invoice.tag} target="_blank">{props.invoice.company.name}</a></td>
                <td><a href={'/invoice/' + props.invoice.tag} target="_blank">{props.invoice.description}</a></td>
                <td>TODO</td>
                <td>{props.invoice.created_at}</td>
            </tr>
        )
    }
}

export default InvoiceItem;
