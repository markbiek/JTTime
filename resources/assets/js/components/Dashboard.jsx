import React from 'react';
import axios from 'axios';
import store from '../store.js';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            tasks: {
                items: []
            }
        };
    }

    componentWillMount() {
        store.subscribe(() => {
            var state = store.getState();
            this.setState({
                tasks: state.tasks.items
            });
        });
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h1>Time Dashboard</h1>
            </div>
        )
    }
}

export default Dashboard;
