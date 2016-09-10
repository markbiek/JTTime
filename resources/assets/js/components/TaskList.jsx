import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import TaskItem from './TaskItem.jsx';

class TaskList extends React.Component {
    render() {
        var props = this.props;

        if (props.tasks.length <= 0) {
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
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Company</th>
                                <th>Task</th>
                                <th>Hours</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.tasks.map(task => {
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
        tasks: store.taskState.tasks
    };
};

export default connect(mapStateToProps)(TaskList);
