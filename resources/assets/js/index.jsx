import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import Dashboard from './components/Dashboard.jsx';

class App extends React.Component {
    render () {
        return (
            <Provider store={store}>
                <Dashboard />
            </Provider>
        );
    }
}

let app = document.getElementById('app');

if (app) {
    render(<App/>, app);
}
