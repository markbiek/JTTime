import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import TaskItem from './TaskItem.jsx';
import InvoiceForm from './InvoiceForm.jsx';

class TaskList extends React.Component {
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
                                task = task.toObject();
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
