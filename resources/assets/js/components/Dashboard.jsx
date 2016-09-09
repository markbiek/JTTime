import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../store.js';
import TaskList from './TaskList.jsx';
import TaskForm from './TaskForm.jsx';

class Dashboard extends React.Component {
    componentDidMount() {
        axios.get('/api/tasks?status=unbilled')
            .then(function (response) {
                var tasks = response.data;

                store.dispatch({
                    type: 'GET_BILLED_TASKS',
                    tasks
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <h1>Time Dashboard</h1>

                <TaskForm />
                <TaskList />
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        tasks: store.taskState.tasks
    };
};

export default connect(mapStateToProps)(Dashboard);
