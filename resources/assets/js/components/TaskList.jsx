import React from 'react';
import { connect } from 'react-redux';

import store from '../store.js';
import TaskItem from './TaskItem.jsx';

import {
    actionClearCheckedTasks,
    getUnbilledTasks,
    getUnbilledTaskTotals,
    combineTasks
} from '../modules/Tasks/action';

const { dispatch } = store;

class TaskList extends React.Component {
    combineButton() {
        const { checked } = this.props.taskState;

        const all = checked;
        let tasks = [];
        for (let k in all) {
            if (all[k]) {
                tasks.push(k);
            }
        }

        if (tasks.length > 1) {
            return (
                <button className="btn btn-default" onClick={async e => {
                    e.preventDefault();

                    if (confirm('Are you sure you want to combine these tasks? This cannot be undone.')) {
                        await combineTasks(tasks);
                        await store.dispatch(actionClearCheckedTasks(actionClearCheckedTasks()));

                        store.dispatch(getUnbilledTasks());
                        getUnbilledTaskTotals();
                    }
                }}>Combine Tasks</button>
            );
        } else {
            return null;
        }
    }

    render() {
        const { checked, loading, errored, complete, error, tasks } = this.props.taskState;

        if (loading) {
            return null;
        }

        if (!tasks || tasks.length <= 0) {
            return (
                <div>
                    <h2>Unbilled Tasks</h2>

                    <p>No unbilled tasks found.</p>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Unbilled Tasks</h2>
                    <div className="actions">
                        { this.combineButton() }
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                                <th>Company</th>
                                <th>Task</th>
                                <th>Hours</th>
                                <th>$</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            tasks.map(task => {
                                task = task;
                                return (
                                    <TaskItem key={task.id} task={task} />
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
        taskState: store.taskState.toJS()
    };
};

export default connect(mapStateToProps)(TaskList);
