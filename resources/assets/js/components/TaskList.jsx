import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import TaskItem from './TaskItem.jsx';

class TaskList extends React.Component {
    componentWillMount() {
        store.subscribe(() => {
            var state = store.getState();
            this.setState({
                tasks: state.tasks
            });
        });
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.tasks.map(task => {
                            return (
                                <TaskItem key={task.id} task={task} />
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        tasks: store.taskState.tasks
    };
};

export default connect(mapStateToProps)(TaskList);
