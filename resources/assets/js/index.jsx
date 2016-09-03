import React from 'react';
import {render} from 'react-dom';
import Dashboard from './components/Dashboard.jsx';

class App extends React.Component {
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <Dashboard />
                    </div>
                </div>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));
