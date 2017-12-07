import { fromJS, List } from 'immutable';

/** Invoice Store **/
const invoiceInitialState = fromJS({
    loading: false,
    errored: false,
    error: '',
    complete: false,
    invoices: [],
    checked: {},
    form: {}
})

export const invoiceReducer = function (state = invoiceInitialState, action) {
    switch (action.type) {
        case 'INVOICES_IS_LOADING':
            return state.set('loading', action.loading);

        case 'INVOICES_IS_ERRORED':
            return state.set('errored', action.errored).set('error', action.error);

        case 'INVOICES_IS_COMPLETE':
            return state.set('complete', action.complete).set('invoices', action.invoices);

        case 'ADD_INVOICE':
            var invoices = state.get('invoices').push(action.invoice);

            return state.set('invoices', invoices);

        case 'DELETE_INVOICE':
            var invoices = List(_.filter(state.get('invoices').toArray(), function (o) {
                o = o.toObject();
                return o.id != action.invoice.id;
            }));

            return state.set('invoices', invoices);

        case 'INVOICE_FORM_CHANGE':
            var form = state.get('form').set(action.form.prop, action.form.value);

            return state.set('form', form);

        case 'INVOICE_CHECKED':
            var checked = state.get('checked').set(action.invoice.id, action.invoice.checked);

            return state.set('checked', checked);
    }

    return state;
}
