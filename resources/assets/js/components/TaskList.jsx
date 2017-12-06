import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import TaskItem from './TaskItem.jsx';
import InvoiceForm from './InvoiceForm.jsx';

import {
    getUnbilledTasks,
    getUnbilledTaskTotals,
    combineTasks
} from '../modules/Tasks/action';

class TaskList extends React.Component {
    combineButton() {
        const { checked } = this.props;

        const all = checked.toJS();
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
                        await store.dispatch({type: 'CLEAR_CHECKED_TASKS'});

                        getUnbilledTasks();
                        getUnbilledTaskTotals();
                    }
                }}>Combine Tasks</button>
            );
        } else {
            return null;
        }
    }

    render() {
        var props = this.props;

        if (props.tasks.size <= 0) {
            return (
                <div>
                    <h2>Unbilled Tasks</h2>

                    <p>No unbilled tasks found.</p>
                </div>
            )
        } else {
            return (
                <div>
                    <InvoiceForm checkedTasks={props.checked} />
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
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.tasks.toArray().map(task => {
                                task = task.toJS();
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
        tasks: store.taskState.get('tasks'),
        checked: store.taskState.get('checked')
    };
};

export default connect(mapStateToProps)(TaskList);
