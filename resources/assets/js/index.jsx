import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import Dashboard from './components/Dashboard.jsx';

class App extends React.Component {
    render () {
        return (
            <Provider store={store}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <Dashboard />
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}

render(<App/>, document.getElementById('app'));
