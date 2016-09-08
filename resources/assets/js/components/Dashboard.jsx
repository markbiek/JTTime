import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../store.js';
import TaskList from './TaskList.jsx';

class Dashboard extends React.Component {
    componentDidMount() {
        //TODO, this is just test code
        var tasks = [
            {
                id: 1,
                company_id: 1,
                task: 'This is task 1',
                hours: 1.5,
                billed: false,
                raw_amount: 0.0,
                user_id: 2
            },
            {
                id: 2,
                company_id: 1,
                task: 'This is task 2',
                hours: .5,
                billed: false,
                raw_amount: 0.0,
                user_id: 2
            },
            {
                id: 3,
                company_id: 1,
                task: 'This is task 3',
                hours: 0.0,
                billed: false,
                raw_amount: 10.0,
                user_id: 2
            }
        ];

        store.dispatch({
            type: 'GET_BILLED_TASKS',
            tasks
        });
    }

    render() {
        return (
            <div>
                <h1>Time Dashboard</h1>

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
